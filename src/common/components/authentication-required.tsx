import { useIsAuthenticated } from '@/security/hooks/use-is-authenticated';
import { FC, ReactNode, useCallback, useState } from 'react';
import { AuthRequiredModal } from './auth-required-modal';

export type AuthenticationRequiredProps = {
  handleClick: (e?: any) => void | Promise<void>;
  render: (
    handleClick: AuthenticationRequiredProps['handleClick']
  ) => ReactNode;
};

export const AuthenticationRequired: FC<AuthenticationRequiredProps> = ({
  handleClick,
  render,
}) => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const wrappedHandleClick = useCallback(
    (e: any) => {
      e?.stopPropagation();
      if (isAuthenticated) {
        return handleClick();
      }

      setOpen(true);
    },
    [isAuthenticated, setOpen]
  );

  return (
    <>
      {render(wrappedHandleClick)}
      <AuthRequiredModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
