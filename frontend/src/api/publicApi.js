import client from "./client";

export const createApplication = async (formData) => {
  const response = await client.post("/applications/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const checkApplicationStatus = async (payload) => {
  const response = await client.post("/applications/status/", payload);
  return response.data;
};
