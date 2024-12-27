import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import useSourceText from "../../hooks/useSourceText.ts";
import { ChangeEvent, useState } from "react";
import CustomButton from "../box/button/CustomButton.tsx";

interface Props {
  open: boolean,
  title: string,
  onYes: (comment: string) => void;
  onNo: () => void;
}

const DeleteDialog = ({ open, title, onYes, onNo }: Props) => {
  const label = useSourceText()
  const [comment, setComment] = useState<string | undefined>()

  return (
    <Dialog
      open={open}
      onClose={onNo}
      maxWidth={'xs'}
      fullWidth
      PaperProps={{
        style: {
          boxShadow: 'none',
          backgroundSize: 'cover',
          borderRadius: '10px',
        }
      }}
    >
      <DialogTitle> {title}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          multiline
          rows={3}
          label={label.comment}
          value={comment || ''}
          size="small"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
        />
      </DialogContent>
      <DialogActions sx={{ ml: 2, pt: 0 }}>
        <Stack sx={{ width: '100%' }} direction={"row"} spacing={2} justifyContent={"start"}>
          <CustomButton
            disabled={comment == undefined || comment?.trim().length == 0}
            title={label.yes}
            onClick={() => comment && onYes(comment)}
          />
          <CustomButton
            variant="outlined"
            title={label.no}
            onClick={onNo}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;