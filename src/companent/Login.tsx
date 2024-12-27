import { ChangeEvent, useState } from 'react';
import { Box, InputAdornment } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import useSourceText from "../hooks/useSourceText.ts";
import { StyledLoginBox, StyledLoginBoxWrapper } from "./styled/StyledBox.tsx";
import { StyledTextFieldLogin } from "./styled/StyledTextField.tsx";
import { StyledButtonNotFillLoad } from './styled/StyledButton.tsx';
import { useAuthenticateMutation } from "../service/rtk/api/authApi.ts";
import { useUserStore } from "../store/store.ts";
import { IDecodedToken } from "../interfaces/state.ts";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Login = () => {
  const theme = useTheme<any>();
  const navigate = useNavigate();
  const logo = '/images/logo.png';
  const label = useSourceText().login;
  const [login, setLogin] = useState<string>('');
  const [password, setPass] = useState<string>('');
  const [errors, setErrors] = useState<any>({});
  const [viewPass, setViewPass] = useState<boolean>(true);
  const [type, setType] = useState<string>('password');
  const [authenticate] = useAuthenticateMutation();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const cleanToken = useUserStore((state) => state.cleanToken);

  const handleLogin = async () => {
    try {
      if (!validateLogin()) return;
      const token = await authenticate({ username:login, password }).unwrap();
      const decoded: IDecodedToken = jwtDecode(token);

      setCurrentUser({
        token,
        permissions: decoded.roles.map((i) => i.authority),
        login: decoded.login,
        name: decoded.displayName,
        id: decoded.id,
        depId: decoded.depId || "",
      });
      toast.success("Login successful!");
      if (token !== '') {
        navigate('/mine');
      }
    } catch (error: any) {
      console.error(error);
      if (error?.originalStatus === 403) {
        toast.error("Invalid username or password.");
      } else if (error?.message === "Network Error") {
        toast.error("TIMEOUT, Server unavailable.");
      } else {
        toast.error("An error occurred.");
      }

      cleanToken();
    }
  };

  const validateLogin = () => {
    let error: any = [];
    error.login = login ? '' : `${label.loginError}`;
    error.password = password
      ? ''
      : `${label.passwordError}`;
    setErrors(error);
    return Object.values(error).every((x) => x === '');
  };

  const handleKeyDown = async (e: any) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      await handleLogin();
    }
  };

  const handleViewPass = () => {
    setViewPass(!viewPass);
    setType(viewPass ? 'text' : 'password');
  };

  return (
    <StyledLoginBoxWrapper sx={{ backgroundSize: 'cover' }}>
      <StyledLoginBox>
        <img
          style={{
            width: '10rem',
            height: '10rem',
            marginBottom: '2rem'
          }}
          alt="logo"
          src={logo}
        />
        <Box sx={{ p: 2, pt: 0, minWidth: 320, maxWidth: 600 }}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <LoginIcon fontSize="large" sx={{ color: 'red' }}/>
            <Typography sx={{ color: theme.palette.color.normal }} variant="h5">
              {import.meta.env.VITE_TITLE}
            </Typography>
          </Stack>
          <Stack direction={'column'}>
            <StyledTextFieldLogin
              label={label.loginLabel}
              slotProps={{
                input:{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle
                        sx={{
                          color: theme.palette.color.normal
                        }}
                      />
                    </InputAdornment>
                  )
                }
              }}
              value={login}
              error={Boolean(errors?.login)}
              helperText={errors?.login}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <StyledTextFieldLogin
              type={type}
              label={label.passwordLabel}
              slotProps={{
                input:{
                  startAdornment: (
                    <InputAdornment position="start">
                      {viewPass ? (
                        <VisibilityIcon
                          onClick={handleViewPass}
                          sx={{ color: theme.palette.color.normal }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={handleViewPass}
                          sx={{ color: theme.palette.color.normal }}
                        />
                      )}
                    </InputAdornment>
                  )
                }
              }}
              error={Boolean(errors?.password)}
              helperText={errors?.password}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <StyledButtonNotFillLoad
              sx={{ m: 2 }}
              variant="contained"
              onClick={handleLogin}
              loading={false}
            >
              {label.buttonLabel}
            </StyledButtonNotFillLoad>
          </Stack>
        </Box>
      </StyledLoginBox>
    </StyledLoginBoxWrapper>
  );
};

export default Login;
