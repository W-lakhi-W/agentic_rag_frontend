import { useMemo, useState, useEffect } from "react";
import { Eye, Trash2, Upload } from "lucide-react";

import Table from "../../components/table/index"
import TableHeader from "../../components/table_header/index"
import Pagination from "../../components/pagination/index";
import Button from "../../components/button/index";
import Tooltip from "../../components/tooltip/index";
import { getDocuments, deleteDocument, viewDocument } from "../../api/documentapi";
import cols from "./content/index.jsx";

const PAGE_SIZE = 10;

const DocumentsPage = () => {
  const [documents,setDocuments] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(()=>{
    fetchDocuments();
  },[]);

  const fetchDocuments = async () => {
    try {

      const { data } = await getDocuments();

      setDocuments(data?.documents);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);

      // Remove document from state
      setDocuments((prev) =>
        prev.filter((document) => document.id !== id)
      );

      console.log("Document deleted successfully.");
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleViewDocument = async (id) => {
    try{
      const response = await viewDocument(id);

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, "_blank");

    }catch(error){
      console.error("failed to view document", error)
    }
  }

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.filename.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  const totalPages = Math.ceil(
    filteredDocuments.length / PAGE_SIZE
  );

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filteredDocuments.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredDocuments, page]);

  

  return (
    <div className="space-y-6 p-6">

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
        columns={cols({onDelete:handleDeleteDocument,onView:handleViewDocument})}
        data={paginatedDocuments}
        emptyMessage="No documents found."
      />

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