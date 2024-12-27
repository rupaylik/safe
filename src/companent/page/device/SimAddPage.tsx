import useSourceText from "../../../hooks/useSourceText.ts";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import EditDeviceBox from "../../box/device/EditDeviceBox.tsx";
import EditSimBox from "../../box/sim/EditSimBox.tsx";

const SimAddPage = () => {
  const label = useSourceText();
  const navigate = useNavigate();

  const handleOnSaved = () => {
    navigate('/sim/all')
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {label.addSim}
      </Typography>
      <EditSimBox onSaved={handleOnSaved}/>
    </div>
  );
};

export default SimAddPage;