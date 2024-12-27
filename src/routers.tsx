import { createBrowserRouter, Navigate } from "react-router-dom";
import { RequireAuth } from "./companent/access/RequireAuth.tsx";
import Layout from "./companent/layout/Layout.tsx";
import DeviceListPage from "./companent/page/device/DeviceListPage.tsx";
import UserCountsPage from "./companent/page/UserCountsPage.tsx";
import DeviceAddPage from "./companent/page/device/DeviceAddPage.tsx";
import Login from "./companent/Login.tsx";
import SettingsPage from "./companent/page/SettingsPage.tsx";
import SimListPage from "./companent/page/device/SimListPage.tsx";
import SimAddPage from "./companent/page/device/SimAddPage.tsx";
import LogListPage from "./companent/page/device/LogListPage.tsx";

export const routers = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '*',
    element: <Navigate to={'/device/all'}/>
  },
  {
    path: '/device/all',
    element:
      <RequireAuth>
        <Layout Component={DeviceListPage}/>
      </RequireAuth>
  },
  {
    path: '/device/add',
    element:
      <RequireAuth>
        <Layout Component={DeviceAddPage}/>
      </RequireAuth>
  },
  {
    path: '/sim/all',
    element:
      <RequireAuth>
        <Layout Component={SimListPage}/>
      </RequireAuth>
  },
  {
    path: '/sim/add',
    element:
      <RequireAuth>
        <Layout Component={SimAddPage}/>
      </RequireAuth>
  },
  {
    path: '/users',
    element:
      <RequireAuth>
        <Layout Component={UserCountsPage}/>
      </RequireAuth>
  },
  {
    path: '/logging',
    element:
      <RequireAuth>
        <Layout Component={LogListPage}/>
      </RequireAuth>
  },
  {
    path: '/settings',
    element:
      <RequireAuth>
        <Layout Component={SettingsPage}/>
      </RequireAuth>
  },
])