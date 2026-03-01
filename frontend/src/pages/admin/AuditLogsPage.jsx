import { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { getAuditLogs } from "../../api/adminApi";
import { extractErrorMessage } from "../../api/extractErrorMessage";

function AuditLogsPage() {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await getAuditLogs({ limit, offset });
        const payload = response?.data ?? {};
        setRows(payload.results ?? []);
        setCount(payload.count ?? 0);
      } catch (errorPayload) {
        setErrorMessage(extractErrorMessage(errorPayload));
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [limit, offset]);

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Audit Logs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #d9e5e2" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Application</TableCell>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No audit logs found.</TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{row.admin_username}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.application_id}</TableCell>
                    <TableCell>{row.ip_address || "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={count}
            page={Math.floor(offset / limit)}
            rowsPerPage={limit}
            onPageChange={(_, newPage) => setOffset(newPage * limit)}
            onRowsPerPageChange={(event) => {
              const value = Number(event.target.value);
              setLimit(value);
              setOffset(0);
            }}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </TableContainer>
      )}
    </>
  );
}

export default AuditLogsPage;
