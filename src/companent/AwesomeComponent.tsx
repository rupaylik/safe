import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

const AwesomeComponent = ({ children }: PropsWithChildren) => {
  const params = useParams();
  return (<Box>
    {children}
    <p>{JSON.stringify(params)}</p>
  </Box>)
}
export default AwesomeComponent