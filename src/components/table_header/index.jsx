const TableHeader = ({
  title,
  description,
  search,
  onSearch,
  searchPlaceholder = "Search...",
  actions,
  children,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:gap-5 sm:p-5">

      {/* Top Row */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div className="min-w-0">
          {title && (
            <h2 className="text-lg font-semibold text-text sm:text-xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-text-muted">
              {description}
            </p>
          )}
        </div>
        {onSearch && (
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="
              w-full
              rounded-lg
              border
              border-border
              bg-background
              px-4
              py-2.5
              text-text
              placeholder:text-text-muted
              focus:border-primary
              focus:outline-none
              md:max-w-sm
            "
          />
        )}



      </div>

    </div>
  );
};

export default TableHeader;
