import {
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

function ApplicationsTable({ rows, count, limit, offset, onPageChange, onLimitChange, onRowClick }) {
  const page = Math.floor(offset / limit);

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #d9e5e2" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Loan Amount</TableCell>
            <TableCell>Monthly Income</TableCell>
            <TableCell>LTI Ratio</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Flagged</TableCell>
            <TableCell>Submission Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography color="text.secondary">No applications found.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick(item.id)}
              >
                <TableCell>{item.full_name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.loan_amount}</TableCell>
                <TableCell>{item.monthly_income}</TableCell>
                <TableCell>{item.loan_to_income_ratio}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>{item.status}</TableCell>
                <TableCell>{item.flagged ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage * limit)}
        onRowsPerPageChange={(event) => onLimitChange(Number(event.target.value))}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </TableContainer>
  );
}

export default ApplicationsTable;
