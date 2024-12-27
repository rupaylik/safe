import InventorySetting from "../box/setting/InventorySetting.tsx";
import { Stack } from "@mui/material";
import HasPermission from "../access/HasPermission.tsx";
import OsesEdit from "../box/setting/OsesEdit.tsx";
import BrandEdit from "../box/setting/BrandEdit.tsx";
import EquipmentTypeEditor from "../box/setting/EquipmentTypeEditor.tsx";

const SettingsPage = () => {
  return (
    <Stack direction={"row"} spacing={2} sx={{ flexWrap: 'wrap' }}>
      <HasPermission permissions={['SETTING:DEP_MANAGER_START_INVENTORY']}>
        <InventorySetting/>
      </HasPermission>
      <HasPermission>
        <OsesEdit/>
        <BrandEdit/>
        <EquipmentTypeEditor/>
      </HasPermission>
    </Stack>
  );
};

export default SettingsPage;