import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog';
import { useMemo } from 'react';

type GifModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  gifSrc: string;
};

export const GifModal = ({
  open,
  onOpenChange,
  title,
  gifSrc,
}: GifModalProps) => {
  const gifWithTimestamp = useMemo(() => {
    return open ? `${gifSrc}?t=${Date.now()}` : gifSrc;
  }, [open, gifSrc]);

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <img
          src={gifWithTimestamp}
          alt={title}
          className="rounded-[15px] mx-auto"
        />
      </DialogContent>
    </Dialog>
  );
};
