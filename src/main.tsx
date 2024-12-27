import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import middlewareApi from "./service/rtk/middlewareApi.ts";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApiProvider api={middlewareApi}>
    <App/>
  </ApiProvider>
)
