import { Dialog, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Scanner } from "@yudiel/react-qr-scanner";

interface Props {
  open: boolean
  setHash: (hash: string) => void
  onClose: () => void
}
const QrScannerDialog = ({setHash, open, onClose}:Props) => {
  const theme = useTheme<any>();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiPaper-root': { background: theme.palette.background.default }, //minHeight: '90%',

      //  left: '20%',
       // transform: 'translateX(-50%)',
      //  margin: 0,
      }}
      PaperProps={{
        sx: {
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          margin: 0,
        },
      }}
      fullWidth
      maxWidth={"sm"}
    >
{/*      <DialogTitle>
        <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
          <Typography variant="h6">

          </Typography>
          <IconButton onClick={onClose}>
            <ClearIcon fontSize={"large"}/>
          </IconButton>
        </Stack>
      </DialogTitle>*/}
      <DialogContent sx={{ minHeight: '590px'}}>
        <Scanner onScan={(result) => setHash(result[0].rawValue)} allowMultiple={true} />
      </DialogContent>
    </Dialog>
  );
};

export default QrScannerDialog;