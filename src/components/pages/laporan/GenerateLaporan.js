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
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import transaksi from "../transaksi/TransaksiAPI";
import user from "../user/UserAPI";
import member from "../member/MemberAPI";
import paket from "../paket/PaketAPI";
import outlet from "../outlet/OutletAPI";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { MenuItem, Grid } from "@mui/material";
import getRole from "../../../utils/access";

// icon

import EditIcon from "@mui/icons-material/Edit";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Pdf from "react-to-pdf";
const ref = React.createRef();

function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  textAlign: "center",
  boxShadow: 24,
  p: 4,
};

const styleModalAdd = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
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

const createForm = (label, id, disabled, required, select, value, nested) => {
  return { label, id, disabled, required, select, value, nested };
};

const createPayload = (id_transaksi, id_user, id_member, id_outlet) => {
  return { id_transaksi, id_user, id_member, id_outlet };
};

export default function GenerateLaporan() {
  React.useEffect(() => {
    const User = getRole();
    if (User !== "admin" && User !== "owner") {
      window.location = "/denied";
    }

    const fetchData = async () => {
      const result = await transaksi.show();
      setRows(result);
    };

    fetchData();

  }, []);

  const [rows, setRows] = React.useState([]);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [bill, setBill] = React.useState({});
  const [detail, setDetail] = React.useState([]);

  // handler modal
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const handleInfo = async (item) => {
    setBill(item);

    const dataDetail = item.detail;
    let total = 0;
    dataDetail.map((item) => {
      let price = item.qty * item.paket.harga;
      total += price;
    });

    dataDetail.total = total;
    setDetail(dataDetail);

    handleOpenInfo();
  };

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
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
          Transaction
        </Typography>
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
        <div ref={ref}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" width={60}>
                    #
                  </StyledTableCell>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Nama Petugas</StyledTableCell>
                  <StyledTableCell>Nama Member</StyledTableCell>
                  <StyledTableCell>Tgl Diterima</StyledTableCell>
                  <StyledTableCell>Batas Waktu</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Dibayar</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <StyledTableRow key={row.id_transaksi}>
                    <StyledTableCell>{i + 1}</StyledTableCell>
                    <StyledTableCell>{row.id_transaksi}</StyledTableCell>
                    <StyledTableCell>{row.user.nama_user}</StyledTableCell>
                    <StyledTableCell>{row.member.nama_member}</StyledTableCell>
                    <StyledTableCell>{row.tgl_diterima}</StyledTableCell>
                    <StyledTableCell>{row.batas_waktu}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>{row.dibayar}</StyledTableCell>
                    <StyledTableCell>
                      <EditIcon
                        fontSize="small"
                        onClick={() => handleInfo(row)}
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


          <Box sx={{ display: 'flex', width: "100%", justifyContent: "flex-end" }}>
            <Pdf targetRef={ref} filename="struk-pembayaran.pdf" x={.5} y={.5} scale={0.8}>
              {({ toPdf }) =>
                <Button variant="contained"
                  sx={{
                    backgroundColor: "#FFF0DE",
                    color: "#A27741",
                    padding: "6px 20px",
                    "&:hover": {
                      backgroundColor: "#FFF0DE",
                      color: "#A27741",
                    },
                  }}
                  color='secondary' onClick={toPdf}>
                  Download
                </Button>
              }
            </Pdf>
          </Box>
        </div>
      </Paper>


      <div>
        {/* Modal Info */}
        <Modal
          open={openInfo}
          onClose={handleCloseInfo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <div ref={ref}>
              <Box sx={{ borderBottom: "dashed black 2px" }} >
                <Typography
                  id="modal-modal-title"
                  sx={{ fontWeight: "bold" }}
                  variant="h5"
                  component="h2"
                >
                  Struk Transaksi Laundry
                </Typography>
                <Typography variant="p" component="h3">
                  {getSafe(() => bill.outlet.alamat)}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "dashed black 2px",
                  textAlign: "left",
                  paddingY: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h4">
                    ID Transaksi
                  </Typography>
                  <Typography variant="p" component="h4">
                    {bill.id_transaksi}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h4">
                    Tanggal Diterima
                  </Typography>
                  <Typography variant="p" component="h4">
                    {bill.tgl_diterima}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h4">
                    Tanggal Batas
                  </Typography>
                  <Typography variant="p" component="h4">
                    {bill.batas_waktu}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h4">
                    Tanggal Dibayar
                  </Typography>
                  <Typography variant="p" component="h4">
                    {bill.tgl_bayar}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  borderBottom: "dashed black 2px",
                  textAlign: "left",
                  paddingY: "1rem",
                }}
              >
                {detail.map((item) => (
                  <Box sx={{ paddingY: "0.2rem" }}>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="p"
                      component="h3"
                    >
                      {item.paket.jenis}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Typography variant="p" component="h5">
                        {item.qty}x{item.paket.harga}
                      </Typography>
                      <Typography variant="p" component="h4">
                        {item.qty * item.paket.harga}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ textAlign: "left", paddingTop: "2rem" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h2">
                    Total
                  </Typography>
                  <Typography variant="p" component="h2">
                    {detail.total}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h4">
                    Status Pengerjaan
                  </Typography>
                  <Typography variant="p" component="h4">
                    {bill.status}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Typography variant="p" component="h4">
                    Status Bayar
                  </Typography>
                  <Typography variant="p" component="h4">
                    {bill.dibayar}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left", paddingTop: "1.5rem" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Pdf targetRef={ref} filename="struk-pembayaran.pdf" x={.5} y={.5} scale={0.8}>
                    {({ toPdf }) =>
                      <Button variant="contained" sx={{ ml: '3px' }} color='secondary' onClick={toPdf}>
                        Download
                      </Button>
                    }
                  </Pdf>
                </Box>
              </Box>
            </div>
          </Box>
        </Modal>


      </div>
    </>
  );
}
