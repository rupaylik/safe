import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button/Button";

interface Props extends ButtonProps {
  title?: string
}

function CustomButton(props: Props) {
  const { title, children } = props

  return (
    <Button
      color={'secondary'}
      variant="contained"
      {...props}
    >
      {title != undefined
        ? title
        : children
      }
    </Button>
  );
}

export default CustomButton;