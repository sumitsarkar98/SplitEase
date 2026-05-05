import { useDeleteTransaction } from "../../../HOOKS/transaction/useDeleteTransactions";

const DeleteTransactionBtn = ({
  ids,
  clearSelection,
}: {
  ids: number[];
  clearSelection: () => void;
}) => {
  const { mutate, isPending } = useDeleteTransaction();

  const handleDelete = () => {
    if (!ids.length) return;

    const confirmDelete = window.confirm(
      `Delete ${ids.length} transaction(s)?`,
    );

    if (!confirmDelete) return;

    mutate(ids, {
      onSuccess: () => {
        clearSelection(); // ✅ FIX: reset selection
      },
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs md:text-base cursor-pointer hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteTransactionBtn;
