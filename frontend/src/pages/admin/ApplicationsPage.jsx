import { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getApplications } from "../../api/adminApi";
import { extractErrorMessage } from "../../api/extractErrorMessage";
import ApplicationsTable from "../../components/admin/ApplicationsTable";

function ApplicationsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "-date",
    limit: 20,
    offset: 0,
  });

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await getApplications(filters);
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
  }, [filters]);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "offset" ? { offset: 0 } : {}),
    }));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Applications</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Search name, phone, or ID"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Sort"
            value={filters.sort}
            onChange={(event) => updateFilter("sort", event.target.value)}
          >
            <MenuItem value="-date">Newest First</MenuItem>
            <MenuItem value="date">Oldest First</MenuItem>
            <MenuItem value="-amount">Loan Amount: High-Low</MenuItem>
            <MenuItem value="amount">Loan Amount: Low-High</MenuItem>
            <MenuItem value="-income">Income: High-Low</MenuItem>
            <MenuItem value="income">Income: Low-High</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      {loading ? (
        <CircularProgress />
      ) : (
        <ApplicationsTable
          rows={rows}
          count={count}
          limit={filters.limit}
          offset={filters.offset}
          onPageChange={(offset) => updateFilter("offset", offset)}
          onLimitChange={(limit) => setFilters((prev) => ({ ...prev, limit, offset: 0 }))}
          onRowClick={(id) => navigate(`/admin/applications/${id}`)}
        />
      )}
    </Stack>
  );
}

export default ApplicationsPage;
