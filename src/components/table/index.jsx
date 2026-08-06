const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found.",
  rowKey = "id",
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-background p-5 text-center sm:p-8">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border border-border bg-background p-5 text-center text-text-muted sm:p-8">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-[640px] border-collapse md:min-w-full">

          <thead className="bg-surface">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="border-b border-border px-4 py-3 text-left text-sm font-semibold text-text md:px-6 md:py-4"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row[rowKey]}
                className="border-b border-border hover:bg-surface transition"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="px-4 py-3 text-sm text-text md:px-6 md:py-4"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Table;
