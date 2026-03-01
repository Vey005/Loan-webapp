import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import ApplicationDetailPage from "./pages/admin/ApplicationDetailPage";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import AuditLogsPage from "./pages/admin/AuditLogsPage";
import DashboardPage from "./pages/admin/DashboardPage";
import LoginPage from "./pages/admin/LoginPage";
import ApplyPage from "./pages/public/ApplyPage";
import LandingPage from "./pages/public/LandingPage";
import StatusPage from "./pages/public/StatusPage";
import SuccessPage from "./pages/public/SuccessPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/applications" element={<ApplicationsPage />} />
        <Route path="/admin/applications/:id" element={<ApplicationDetailPage />} />
        <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
