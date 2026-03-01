import client from "./client";

export const adminLogin = async (payload) => {
  const response = await client.post("/admin/login/", payload);
  return response.data;
};

export const adminLogout = async () => {
  const response = await client.post("/admin/logout/");
  return response.data;
};

export const getDashboard = async () => {
  const response = await client.get("/admin/dashboard/");
  return response.data;
};

export const getApplications = async (params) => {
  const response = await client.get("/admin/applications/", { params });
  return response.data;
};

export const getApplicationDetail = async (id) => {
  const response = await client.get(`/admin/applications/${id}/`);
  return response.data;
};

export const approveApplication = async (id) => {
  const response = await client.patch(`/admin/applications/${id}/approve/`);
  return response.data;
};

export const rejectApplication = async (id) => {
  const response = await client.patch(`/admin/applications/${id}/reject/`);
  return response.data;
};

export const toggleFlag = async (id, flagged) => {
  const response = await client.patch(`/admin/applications/${id}/flag/`, { flagged });
  return response.data;
};

export const updateNotes = async (id, admin_notes) => {
  const response = await client.patch(`/admin/applications/${id}/notes/`, { admin_notes });
  return response.data;
};

export const getAuditLogs = async (params) => {
  const response = await client.get("/admin/audit-logs/", { params });
  return response.data;
};
