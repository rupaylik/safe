import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import 'dayjs/locale/ru';
import { ToastContainer, Zoom } from "react-toastify";
import { routers } from "./routers.tsx";
import customParseFormat from "dayjs/plugin/customParseFormat"
import dayjs from "dayjs";
import { useUserStore } from "./store/store.ts";
import { getDesignTokens } from "./constants/defaultTheme.ts";
import { ruRU } from "@mui/x-data-grid/locales";

dayjs.extend(customParseFormat);
dayjs.locale('ru')

function App() {
  const { isDarkMode } = useUserStore((state) => state);
  const mode = isDarkMode ? 'dark' : 'light'
  const theme = createTheme(getDesignTokens(mode), ruRU)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        pauseOnFocusLoss
        theme={'light'}
        closeOnClick
        closeButton={false}
        transition={Zoom}
        autoClose={5000}
      />
      <RouterProvider router={routers}/>
    </ThemeProvider>
  )
}

export default App
