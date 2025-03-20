import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/shared/ui/sheet";

export function useResponsiveModal() {
  const isMobile = useIsMobile();

  return {
    Modal: isMobile ? Sheet : Dialog,
    ModalTrigger: isMobile ? SheetTrigger : DialogTrigger,
    ModalContent: isMobile ? SheetContent : DialogContent,
    ModalHeader: isMobile ? SheetHeader : DialogHeader,
    ModalTitle: isMobile ? SheetTitle : DialogTitle,
    ModalDescription: isMobile ? SheetDescription : DialogDescription,
    ModalClose: isMobile ? SheetClose : DialogClose,
  };
}
