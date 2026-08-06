import { FileText, Check, X } from "lucide-react";
import CircularProgress from "../circular_progress";

const UploadPreview = ({ files, onRemove }) => {
  return (
    <div className="mb-3 flex max-w-full flex-wrap gap-2 px-3 sm:gap-3 sm:px-0">
      {files.map((item) => (
        <div
          key={item.id}
          className="flex min-w-0 max-w-full items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 sm:max-w-xs"
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
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-background"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UploadPreview;
