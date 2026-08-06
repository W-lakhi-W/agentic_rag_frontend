import { Trash2, Eye } from "lucide-react";
import Tooltip from "../../../components/tooltip";
import Button from "../../../components/button";

const cols = ({onView, onDelete}) => [
  {
    header: "Document",
    accessor: "filename",
  },
  {
    header: "Pages",
    accessor: "id",
  },
  {
    header: "Size",
    accessor: "user_id",
  },
  {
    header: "Uploaded",
    accessor: "updated_at",
  },
  {
    header: "Actions",

    render: (row) => (
      <div className="flex items-center gap-2">
        <Tooltip content="View Document" size="sm">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-primary hover:bg-surface"
            onClick={() => onView(row.id)}
          >
            <Eye size={18} />
          </button>
        </Tooltip>

        <Tooltip content="Delete Document" size="sm">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-error hover:bg-surface"
            onClick={() => onDelete(row.id)}
          >
            <Trash2 size={18} />
          </button>
        </Tooltip>
      </div>
    ),
  },
];

export default cols;
