import { styled, TextField, TextFieldProps } from "@mui/material";

export const StyledTextFieldLogin = styled((props: TextFieldProps) => (
  <TextField {...props} size="small" />
))(({ theme }) => ({
  '& input:-internal-autofill-selected': {
    WebkitBoxShadow: `0 0 0 30px ${
      theme.palette.mode === 'dark' ? '#000' : '#fff'
    } inset !important`,
    WebkitTextFillColor: `${theme.palette.mode === 'dark' ? '#D6D6D6' : '#000000'} !important`
  },
  margin: 4,
  marginTop: 6,
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.mode === 'dark' ? '#AEAEAE' : '#000000'}`

  },
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark' ? '#D6D6D6' : '#000000'
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.mode === 'dark' ? '#AEAEAE' : '#000000'
  }
}));