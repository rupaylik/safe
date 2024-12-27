import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { useUserStore } from "../../../store/store.ts";
import useSourceText from "../../../hooks/useSourceText.ts";

export const NavAccount = () => {
  const navigate = useNavigate();
  const { currentUser, cleanToken } = useUserStore((state) => state);
  const label = useSourceText();
  const theme = useTheme<any>();

  const handleSignOut = () => {
    cleanToken();
    navigate('/login');
  };

  return (
    currentUser != undefined &&
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
      <Typography sx={{ fontSize: '15px', }}>{currentUser.name}</Typography>
      <Tooltip title={label.exit}>
        <IconButton onClick={handleSignOut}>
          <LogoutIcon fontSize={'large'} sx={{ color: theme.palette.error.main }}
          />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};