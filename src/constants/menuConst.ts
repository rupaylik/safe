import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import DevicesIcon from '@mui/icons-material/Devices';
import SimCardIcon from '@mui/icons-material/SimCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

export interface IMainMenuStateItem {
  id: number;
  titleRu: string;
  to?: string;
  highlightForPaths?: string[]
  Icon: OverridableComponent<SvgIconTypeMap>;
  permissions: string[];
  subItems?: IMainMenuStateItem[];
}

export interface IMainMenuState {
  devices: IMainMenuStateItem,
  settings: IMainMenuStateItem

  [key: string]: IMainMenuStateItem
}

export const mainMenu: IMainMenuState = {
  devices: {
    id: 1,
    titleRu: 'Устройства',
    to: '/device/all',
    Icon: DevicesIcon,
    permissions: [],
    subItems: [
      {
        id: 10,
        to: '/device/add',
        titleRu: 'Добавить устройство',
        Icon: AddToQueueIcon,
        permissions: ['DEVICE:DEP_MANAGER_EDIT', 'DEVICE:EDIT']
      }
    ]
  },
  sims: {
    id: 2,
    titleRu: 'SIM',
    to: '/sim/all',
    Icon: SimCardIcon,
    highlightForPaths: ['/sim/all'],
    permissions: [],
    subItems: [
      {
        id: 11,
        to: '/sim/add',
        titleRu: 'Добавить SIM',
        Icon: SimCardDownloadIcon,
        permissions: ['SIM:DEP_MANAGER_EDIT', 'SIM:EDIT']
      }
    ]
  },
  users: {
    id: 3,
    titleRu: 'Сотрудники',
    to: '/users',
    Icon: PeopleAltIcon,
    highlightForPaths: ['/users'],
    permissions: []
  },
  logging: {
    id: 4,
    titleRu: 'Логирование',
    to: '/logging',
    Icon: FormatListBulletedIcon,
    highlightForPaths: ['/logging'],
    permissions: []
  },
  settings: {
    id: 25,
    titleRu: 'Настройки',
    to: '/settings',
    Icon: SettingsIcon,
    permissions: ['SETTING:VIEW']
  }
};
