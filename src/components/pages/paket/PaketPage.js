import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import paket from "./PaketAPI";
import getRole from "../../../utils/access";
import { Grid } from "@mui/material";

// icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  textAlign: "center",
  boxShadow: "none",
  p: 4,
  borderRadius: "8px",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#868974",
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

const createForm = (label, id, disabled, required, value) => {
  return { label, id, disabled, required, value };
};

const createPayload = (id_paket, jenis, harga) => {
  return { id_paket, jenis, harga };
};

export default function PaketPage() {
  React.useEffect(() => {
    const User = getRole();
    if (User !== "admin") {
      window.location = "/denied";
    }

    const fetch = async () => {
      const result = await paket.show();
      setRows(result);
    };

    fetch();
    setPayload(createPayload(0, "", 0));

  }, []);

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [payload, setPayload] = React.useState({});

  // handler modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handler button
  const handleDelete = async (item) => {
    const result = await paket.destroy(item);
    if (!result.success) {
      window.alert("failed delete paket");
    } else {
      window.alert("success delete paket");

      // fetching new data
      const newFetch = await paket.show();
      setRows(newFetch);
    }
  };

  const handleUpdate = async (item) => {
    handleOpen();
    setPayload(item);
    setAction("update");
  };

  const handleAdd = async () => {
    setPayload(createPayload(0, "", 0));
    handleOpen();
    setAction("add");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === "update") {
      const result = await paket.update(payload);
      if (!result.success) {
        window.alert("failed update paket");
      } else {
        window.alert("success update paket");
        handleClose(); //close modal

        // fetching new data
        const newFetch = await paket.show();
        setRows(newFetch);
      }
    } else {
      const result = await paket.add(payload);
      if (!result.success) {
        window.alert("failed add paket");
      } else {
        window.alert("success add paket");
        handleClose(); //close modal

        // fetching new data
        const newFetch = await paket.show();
        setRows(newFetch);
      }
    }
  };

  const forms = [
    createForm("ID Paket", "id_paket", true, false, payload.id_paket),
    createForm("Jenis Paket", "jenis", false, true, payload.jenis),
    createForm("Harga", "harga", false, true, payload.harga),
  ];

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        sx={{
          backgroundColor: "#ffff",
          padding: "16px 24px",
          borderRadius: 2,
          mt: 6,
          mb: 4,
          boxShadow: "0px 10px 20px #3030300D",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>Paket</Typography>
        <Button
          startIcon={<AddRoundedIcon sx={{ color: "#A27741" }} />}
          aria-label="add"
          onClick={() => handleAdd()}
          sx={{
            backgroundColor: "#FFF0DE",
            color: "#A27741",
            padding: "6px 20px",
            "&:hover": {
              backgroundColor: "#FFF0DE",
              color: "#A27741",
            },
          }}
        >
          Add Data
        </Button>
      </Grid>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "0px 10px 20px #3030300D",
          p: 2,
          borderRadius: 3,
        }}
      >
        <TableContainer
          sx={{
            maxHeight: "54vh",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#C1C1C1",
            },
            borderRadius: 2,
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width={60}>
                  #
                </StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Jenis Paket</StyledTableCell>
                <StyledTableCell align="center">Harga</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow key={row.id_paket}>
                  <StyledTableCell align="center">{i + 1}</StyledTableCell>
                  <StyledTableCell>{row.id_paket}</StyledTableCell>
                  <StyledTableCell>{row.jenis}</StyledTableCell>
                  <StyledTableCell align="center">
                    Rp {row.harga}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon
                      fontSize="small"
                      onClick={() => handleUpdate(row)}
                      sx={{
                        color: "#868974",
                        cursor: "pointer",
                        margin: "0px 8px",
                        "&:hover": {
                          color: "#A27741",
                        },
                      }}
                    />
                    <DeleteIcon
                      onClick={() => handleDelete(row)}
                      sx={{
                        color: "#868974",
                        cursor: "pointer",
                        margin: "0px 8px",
                        "&:hover": {
                          color: "#A27741",
                        },
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* modal start */}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          sx={{
            backdropFilter: "blur(2px)",
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Paket
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {forms.map((form, i) => (
                <TextField
                  onChange={(e) =>
                    setPayload({ ...payload, [form.id]: e.target.value })
                  }
                  disabled={form.disabled}
                  required={form.required}
                  value={form.value}
                  margin="normal"
                  fullWidth
                  id={form.id}
                  label={form.label}
                  name={form.id}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              ))}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#868974",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#868974",
                    boxShadow: "0px 10px 20px #8689741A",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
