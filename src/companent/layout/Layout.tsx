import MainMenu from "./MainMenu";
import { StyledLayoutArea } from "../styled/StyledLayoutArea.tsx";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";

const Layout = ({ Component }: { Component: any }) => {
  const location = useLocation()

  return (
    <Stack
      direction="column"
      sx={{
        backgroundColor: 'background.app',
        minHeight: '100vh'
      }}
    >
      <NavBar/>
      <Stack sx={{ p: 1, flexGrow: 1 }}>
        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              flexGrow={1}
        >
          <Grid size={{ xs: 4, xl: 2 }} sx={{ display: 'flex', flexDirection: 'column' }}>
            <MainMenu/>
          </Grid>
          <Grid size={{ xs: 8, xl: 10 }} sx={{ display: 'flex', flexDirection: 'column' }}>
            <StyledLayoutArea>
              <Component> {location.pathname}</Component>
            </StyledLayoutArea>
          </Grid>
        </Grid>

      </Stack>
    </Stack>
  );
};
export default Layout;
