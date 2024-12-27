import { Box, CircularProgress } from "@mui/material";

const LoadingBox = () => {
  return (
    <Box sx={{
      position: 'absolute',
      display: 'flex',
      backgroundColor: 'background.loading',
      justifyContent: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 15
    }}>
      <Box sx={{ position: "fixed", top: '50%' }}>
        <CircularProgress/>
      </Box>
    </Box>
  );
};

export default LoadingBox;