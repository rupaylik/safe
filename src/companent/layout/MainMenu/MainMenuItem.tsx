import { Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IMainMenuStateItem } from "../../../constants/menuConst.ts";

interface Props extends IMainMenuStateItem {

}

export const MainMenuItem = ({ titleRu, to, highlightForPaths, Icon, subItems }: Props) => {
  const location = useLocation();
  const theme = useTheme<any>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const isActive = (to?: string, highlightForPaths?: string[]) : boolean |undefined  =>{
    return (to && location.pathname == to) ||
      highlightForPaths?.some(h =>location.pathname.indexOf(h) > -1 && location.pathname.indexOf(h) < 2)
  }

  const isActiveOrAnyChild = (to?: string, highlightForPaths?: string[], subItems?: IMainMenuStateItem[]) : boolean | undefined =>{
    return isActive(to, highlightForPaths) ||
      subItems?.some(si => isActiveOrAnyChild(si.to, si.highlightForPaths, si.subItems));
  }

  useEffect(() => {
    if (isActiveOrAnyChild(to, highlightForPaths, subItems) ) { //subItems?.some(si => isActive(si.to, si.highlightForPaths))
      setOpen(true);
    }
  /*  else {
      setOpen(false);
    }*/
  }, []);

  const getColor = () => {
    return isActive(to, highlightForPaths)
      ? theme.palette.color.red
      : theme.palette.color.up
  };

  const onClick = () => {
    to && navigate(to)
    if (subItems != null && subItems?.length != 0 && !open) {
      setOpen(true)
    }
  }

  const onClickExpand = (e: any) => {
    e.preventDefault()
    setOpen(!open)
  }

  return (<>
    <ListItemButton
      onClick={onClick}
      sx={{
        '&:before': {
          content: '""',
          width: '6px',
          height: '100%',
          position: 'absolute',
          backgroundColor: getColor(),
          left: '0px',
          bottom: '0px',
          transition: '0.5s',
          borderRadius: '10px'
        }
      }}>
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <Icon sx={{ fontSize: 25 }}/>
      </ListItemIcon>
      <ListItemText primary={titleRu}/>
      {subItems != null && subItems?.length != 0 &&
        <IconButton onClick={onClickExpand}>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </IconButton>
      }
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding sx={{ pl: 2 }}>
        {subItems?.map((item) => (
          <MainMenuItem {...item} key={item.id}/>
        ))}
      </List>
    </Collapse>
  </>);
};