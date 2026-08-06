import { useMemo, useState, useEffect } from "react";
import { Eye, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";

import Table from "../../components/table/index";
import { useAuth } from "../../context/auth/AuthContext";
import TableHeader from "../../components/table_header/index";
import Pagination from "../../components/pagination/index";
import Button from "../../components/button/index";
import Tooltip from "../../components/tooltip/index";
import Modal from "../../components/modal";
import {
  getDocuments,
  deleteDocument,
  viewDocument,
} from "../../api/documentapi";
import cols from "./content/index.jsx";

const PAGE_SIZE = 6;

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchDocuments();
  }, [isAuthenticated]);

  const fetchDocuments = async () => {
    if (!isAuthenticated) return;

    try {
      const { data } = await getDocuments();

      setDocuments(data?.documents);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
    }
  };

  const handleDeleteRequest = (id) => {
    setDocumentToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteDocument = async () => {
    if (!documentToDelete || !isAuthenticated) return;

    try {
      await deleteDocument(documentToDelete);

      setDocuments((prev) =>
        prev.filter((document) => document.id !== documentToDelete),
      );

      toast.success("Document deleted successfully");
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
      console.log("Document deleted successfully.");
    } catch (error) {
      console.error("Failed to delete document:", error);
      toast.error("Failed to delete document");
    }
  };

  const handleViewDocument = async (id) => {
    if (!isAuthenticated) return;

    try {
      const response = await viewDocument(id);

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("failed to view document", error);
    }
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.filename.toLowerCase().includes(search.toLowerCase()),
    );
  }, [documents, search]);

  const totalPages = Math.ceil(filteredDocuments.length / PAGE_SIZE);

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filteredDocuments.slice(start, start + PAGE_SIZE);
  }, [filteredDocuments, page]);

  return (
    <div className="space-y-4 p-4 pt-16 md:space-y-6 md:p-6">
      <TableHeader
        title="Documents"
        description="Manage your uploaded PDF documents."
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder="Search documents..."
        // actions={
        //   <Button
        //     leftIcon={<Upload size={18} />}
        //   >
        //     Upload PDF
        //   </Button>
        // }
      />

      <Table
        columns={cols({
          onDelete: handleDeleteRequest,
          onView: handleViewDocument,
        })}
        data={paginatedDocuments}
        emptyMessage="No documents found."
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDocumentToDelete(null);
        }}
        title="Delete document?"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setDeleteModalOpen(false);
                setDocumentToDelete(null);
              }}
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text hover:bg-background"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteDocument}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        }
      >
        <p className="text-sm text-text-muted">
          This action cannot be undone. Are you sure you want to delete this
          document?
        </p>
      </Modal>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredDocuments.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default DocumentsPage;
