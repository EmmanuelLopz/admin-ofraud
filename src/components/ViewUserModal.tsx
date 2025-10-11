import { X } from "lucide-react"; // <- X para cerrar
export default function Modal({children, onClose,}: {children: React.ReactNode; onClose: () => void;}) {

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onMouseDown={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Botón X */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
}
