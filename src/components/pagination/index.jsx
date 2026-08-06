const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-3 sm:p-4 md:flex-row md:items-center md:justify-between">

      {/* Info */}
      <p className="text-sm text-text-muted">
        Showing {startItem} - {endItem} of {totalItems}
      </p>

      {/* Buttons */}
      <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            rounded-lg
            border
            border-border
            min-h-11
            px-3
            py-2
            disabled:cursor-not-allowed
            disabled:opacity-50
            hover:bg-surface
          "
        >
          Previous
        </button>

        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              h-10
              min-w-10
              rounded-lg
              transition

              ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "border border-border hover:bg-surface"
              }
            `}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            rounded-lg
            border
            border-border
            min-h-11
            px-3
            py-2
            disabled:cursor-not-allowed
            disabled:opacity-50
            hover:bg-surface
          "
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Pagination;
