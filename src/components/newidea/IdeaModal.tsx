import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    //-backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-primary/50" : "invisible"}`}
      data-testid="modal-overlay"
    >
      {/* modal */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-secondary w-[85%] h-[36rem%] md:w-[50%] md:h-[55%] lg:w-[40rem] lg:h-[40rem] rounded-xl shadow-xl p-6 transition-all border-primary
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        data-testid="new-idea-modal"
      >
        <Button
          size={"icon"}
          onClick={onClose}
          className="bg-secondary h-6 w-6 absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:bg-inherit"
          data-testid="close-modal-button"
        >
          <X size={16} className="transition duration-400 hover:scale-125" />
        </Button>
        {children}
      </div>
    </div>
  );
}
