import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/common/components/ui/button';
import { GithubIcon } from '@/common/components';
import { authProvider } from '@/providers';

type AuthRequiredModalProps = {
  open: boolean;
  onClose: () => void;
};

export const AuthRequiredModal: FC<AuthRequiredModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:text-black"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Authentication Required
            </h2>
            <p className="mb-4">
              You must be <strong>logged in</strong> first.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-gray-100 dark:bg-[#1c1f26] dark:text-white dark:hover:bg-[#2a2e39]"
                onClick={() => authProvider.login()}
              >
                <GithubIcon />
                Sign In with GitHub
              </Button>
              <Button size="sm" variant="destructive" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
