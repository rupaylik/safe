import { AppBar, Stack, Toolbar, Typography, useTheme } from "@mui/material"
import { NavAccount } from "./NavAccount.tsx";
import { DarkModeSwitch } from "animated-toggle-button";
import { useUserStore } from "../../../store/store.ts";
import logoUrl from '../../../assets/a1logo.svg';

const NavBar = () => {
  const theme = useTheme<any>();
  const { isDarkMode, setDarkMode } = useUserStore((state) => state);

  return (
    <AppBar
      position="static"
      sx={{
        color: 'color.normal',
        fontFamily: 'A1Serif-Regular',
        height: '60px',
        borderBottom: theme.palette.border.schemaItem,
        boxShadow: 'none',
        backgroundImage: 'none',
        backgroundColor: 'background.paper',
        justifyContent: 'center',
      }}>
      <Toolbar>
        <img style={{ paddingRight: '1rem' }} height={45} alt="logo" src={logoUrl}/>
        <Typography sx={{
          fontSize: '24px',
          fontWeight: 700,
        }}>
          {import.meta.env.VITE_TITLE}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} spacing={2} sx={{ flexGrow: 1 }}>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={setDarkMode}
            size={30}
          />
          <NavAccount/>
        </Stack>
      </Toolbar>
    </AppBar>)
}
export default NavBar