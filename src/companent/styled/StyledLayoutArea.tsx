import { Box, BoxProps, styled } from '@mui/material';

export const StyledLayoutArea = styled((props: BoxProps) => <Box {...props} />)(
  ({ theme }) => ({
    borderRadius: '4px',
    border: theme.palette.border.schemaItem,
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'left',
    position: 'relative',
    alignItems: "stretch",
    flexGrow: 1,
  }))
