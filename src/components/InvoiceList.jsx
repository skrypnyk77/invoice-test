import * as React from "react";

import { useState } from "react";

import { addInvoice, removeInvoice } from "../store/invoiceSlice";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [showAlert, setShowAlert] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);

  const [formState, setFormState] = useState({
    userId: undefined,
    currency: undefined,
    amount: undefined,
    type: undefined,
    paymentMethod: undefined,
    comment: undefined,
  });

  const rows = useSelector((state) => state.invoices.invoiceData);

  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          You successfully created invoice!
        </Alert>
      </Snackbar>

      <Dialog
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
      >
        <DialogTitle>Invoice Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInvoiceModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        open={showCreateInvoiceModal}
        onClose={() => setShowCreateInvoiceModal(false)}
      >
        <DialogTitle>Create Invoice</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <TextField
              id="payment-amount"
              label="User ID"
              variant="outlined"
              value={formState.userId}
              onChange={(e) =>
                setFormState({ ...formState, userId: e.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel id="demo-simple-select-label">
              Select Currency
            </InputLabel>
            <Select
              id="payment-currency"
              value={formState.currency}
              onChange={(e) =>
                setFormState({ ...formState, currency: e.target.value })
              }
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="UAH">UAH</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <TextField
              id="payment-amount"
              label="Amount"
              variant="outlined"
              value={formState.amount}
              onChange={(e) =>
                setFormState({ ...formState, amount: e.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel id="demo-simple-select-label">
              Select Payment Type
            </InputLabel>
            <Select
              id="payment-type"
              value={formState.type}
              onChange={(e) =>
                setFormState({ ...formState, type: e.target.value })
              }
            >
              <MenuItem value="Deposit">Deposit</MenuItem>
              <MenuItem value="Withdrawal">Withdrawal</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel id="demo-simple-select-label">
              Select Payment Method
            </InputLabel>
            <Select
              id="payment-method"
              value={formState.paymentMethod}
              onChange={(e) =>
                setFormState({ ...formState, paymentMethod: e.target.value })
              }
            >
              <MenuItem value="Wallet">Wallet</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Crypto Wallet">Crypto Wallet</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <TextField
              id="payment-comment"
              label="Comment"
              variant="outlined"
              value={formState.comment}
              multiline
              onChange={(e) =>
                setFormState({ ...formState, comment: e.target.value })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowCreateInvoiceModal(false);

              dispatch(addInvoice(formState));

              setFormState({
                userId: undefined,
                currency: undefined,
                amount: undefined,
                type: undefined,
                paymentMethod: undefined,
                comment: undefined,
              });

              setShowAlert(true);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        style={{ marginBottom: 20 }}
        onClick={() => setShowCreateInvoiceModal(true)}
      >
        Create Invoice
      </Button>

      {rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Invoice ID</StyledTableCell>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>Currency</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Payment Method</StyledTableCell>
                <StyledTableCell>Comment</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Button
                      type="link"
                      onClick={() => setShowInvoiceModal(true)}
                    >
                      {row.id}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>{row.userId || "-"}</StyledTableCell>
                  <StyledTableCell>{row.currency || "-"}</StyledTableCell>
                  <StyledTableCell>{row.amount || "-"}</StyledTableCell>
                  <StyledTableCell>{row.type || "-"}</StyledTableCell>
                  <StyledTableCell>{row.paymentMethod || "-"}</StyledTableCell>
                  <StyledTableCell>{row.comment || "-"}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(removeInvoice(row.id))}
                    >
                      Remove
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
