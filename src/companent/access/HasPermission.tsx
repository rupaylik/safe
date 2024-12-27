import { PropsWithChildren } from "react";
import { IPermissionProp } from "../../interfaces/types.ts";
import { useHasAccessByPermissions } from "../../hooks/useHasAccessByPermissions.ts";

interface Props extends PropsWithChildren {
  permissions?: string[]
  data?: IPermissionProp
}

const HasPermission = ({ permissions, data, children }: Props) => {
  const hasAccess = useHasAccessByPermissions(permissions, data)

  return (<>
    {hasAccess ? <>{children}</> : null}
  </>);
};

export default HasPermission;