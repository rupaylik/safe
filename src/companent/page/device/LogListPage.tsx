import useSourceText from "../../../hooks/useSourceText.ts";
import { Typography } from "@mui/material";
import LogListBox from "../../box/logging/LogListBox.tsx";

const LogListPage = () => {
  const label = useSourceText();

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {label.viewLog}
      </Typography>
      <LogListBox/>
    </div>
  );
};

export default LogListPage;