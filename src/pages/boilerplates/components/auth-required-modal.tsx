import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/common/components/ui/button';
import { GithubIcon } from '@/common/components';
import { authProvider } from '@/providers';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
}

export const AuthRequiredModal: FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  templateName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:text-black"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              Authentication Required
            </h2>
            <p className="mb-4">
              You must be <strong>logged in</strong> to use the{' '}
              <strong>{templateName}</strong> template.
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
