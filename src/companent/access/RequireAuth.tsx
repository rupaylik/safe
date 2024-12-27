import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from "../../store/store.ts";

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const { token } = useUserStore((state) => state.currentUser);
  const authed = token !== '' && token !== undefined;
  return authed ? <>{children}</> : <Navigate to="/login"/>;
};
