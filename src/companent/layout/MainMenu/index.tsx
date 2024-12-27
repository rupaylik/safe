import { List } from "@mui/material";
import { StyledLayoutArea } from "../../styled/StyledLayoutArea.tsx";
import useAuthMenu from "../../../hooks/useAuthMenu.ts";

import { MainMenuItem } from "./MainMenuItem.tsx";

const MainMenu = () => {
  //const { permissions } = = useAppSelectorSlice(state => state.userSlice.currentUser)
  const { authMenu } = useAuthMenu();

  return (<StyledLayoutArea>
    <List>
      {authMenu.map((item, i) =>
        <MainMenuItem {...item} key={i} />
      )}
    </List>
  </StyledLayoutArea>)
}

export default MainMenu