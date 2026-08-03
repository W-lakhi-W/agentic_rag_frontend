import api from "./api";
import API from "./endpoints";

export const getDocuments = () => api.get(API.DOCUMENT.LIST);

// export const uploadDocuments = (formData) =>
//   api.post(API.DOCUMENT.UPLOAD, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });


export const uploadDocuments = (formData, onProgress) =>
  api.post(API.DOCUMENT.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress: (event) => {
      if (!event.total) return;

      const percent = Math.round((event.loaded * 100) / event.total);

      onProgress?.(percent);
    },
  });

export const deleteDocument = (id) => api.delete(API.DOCUMENT.DELETE(id));

export const viewDocument = (id) => api.get(API.DOCUMENT.DETAILS(id),{
    responseType: "blob",
});