import { Box, BoxProps, styled } from '@mui/material';

export const StyledMainBoxWrapper = styled((props: BoxProps) => <Box {...props} />)(
  ({ theme }: { theme: any }) => ({
    background: theme.palette.background.app,
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    /* overflow: 'hidden'*/
  }));

export const StyledLoginBoxWrapper = styled((props: BoxProps) => <Box {...props} />)(
  ({ theme }: { theme: any }) => ({
  position: 'relative',
  background: theme.palette.background.app,
  height: '100vh',
  width: '100%',
  overflow: 'hidden'
}));

export const StyledLoginBox = styled((props: BoxProps) => <Box {...props} />)({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0
});