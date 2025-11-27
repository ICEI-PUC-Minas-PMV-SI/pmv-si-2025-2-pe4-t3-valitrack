import { HiOutlineExclamation } from 'react-icons/hi'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center mx-4">
        <div className="mx-auto bg-red-100 rounded-full h-12 w-12 flex items-center justify-center">
          <HiOutlineExclamation className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mt-4">
          Excluir Produto
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Tem certeza que deseja excluir este produto? Esta ação não pode ser
          desfeita.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  )
}
