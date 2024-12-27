import EditDeviceBox from "../../box/device/EditDeviceBox.tsx";
import useSourceText from "../../../hooks/useSourceText.ts";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeviceAddPage = () => {
  const label = useSourceText();
  const navigate = useNavigate();

  const handleOnSaved = () => {
    navigate('/device/all')
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {label.addDevice}
      </Typography>
      <EditDeviceBox onSaved={handleOnSaved}/>
    </div>
  );
};

export default DeviceAddPage;