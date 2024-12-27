import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import useSourceText from "../../hooks/useSourceText.ts";
import CustomButton from "../box/button/CustomButton.tsx";

interface Props {
  open: boolean,
  title: string,
  body: string,
  onYes: () => void;
  onNo: () => void;
  btnYesTitle?: string
  btnNoTitle?: string
}

const YesNoDialog = ({ open, title, body, onYes, onNo, btnYesTitle, btnNoTitle }: Props) => {
  const label = useSourceText()

  return (
    <Dialog
      open={open}
      onClose={onNo}
      maxWidth={'xs'}
      fullWidth={true}
      PaperProps={{
        style: {
          boxShadow: 'none',
          backgroundSize: 'cover',
          borderRadius: '10px',
          alignItems: "center"
        }
      }}
    >
      <DialogTitle> {title}</DialogTitle>
      <DialogContent>
        {body}
      </DialogContent>
      <DialogActions>
        <CustomButton
          title={btnYesTitle ? btnYesTitle : label.yes}
          onClick={onYes}
        />
        <CustomButton
          variant="outlined"
          title={btnNoTitle ? btnNoTitle : label.no}
          onClick={onNo}
        />
      </DialogActions>
    </Dialog>
  );
};

export default YesNoDialog;