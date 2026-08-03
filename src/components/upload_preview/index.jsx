import { FileText, Check, X } from "lucide-react";
import CircularProgress from "../circular_progress";

const UploadPreview = ({ files, onRemove }) => {
  return (
    <div className="mb-3 flex flex-wrap gap-3">
      {files.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2"
        >
          <FileText className="text-primary" size={18} />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {item.file.name}
            </p>

            <p className="text-xs text-text-muted">
              {(item.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          {item.status === "uploading" && (
            <CircularProgress progress={item.progress} />
          )}

          {item.status === "success" && (
            <Check
              size={18}
              className="text-success"
            />
          )}

          <button
            onClick={() => onRemove(item.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UploadPreview;