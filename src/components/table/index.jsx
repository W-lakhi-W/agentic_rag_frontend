const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found.",
  rowKey = "id",
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">

          <thead className="bg-surface">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="border-b border-border px-6 py-4 text-left text-sm font-semibold text-text"
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
                    className="px-6 py-4 text-sm text-text"
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