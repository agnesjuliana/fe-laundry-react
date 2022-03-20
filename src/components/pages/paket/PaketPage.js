import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import paket from './PaketAPI';
import getRole from '../../../utils/access';



// icon
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  textAlign: 'center',
  boxShadow: 24,
  p: 4,
  borderRadius: 4

};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const createForm = (label, id, disabled, required, value) => {
  return { label, id, disabled, required, value }
}

const createPayload = (id_paket, jenis, harga) => {
  return { id_paket, jenis, harga }
}

export default function PaketPage() {
  React.useEffect(() => {
    const User = getRole()
    if (User !== 'admin') {
      window.location = '/denied'
    }

    const fetch = async () => {
      const result = await paket.show()
      setRows(result)
    }

    fetch()
    setPayload(createPayload(0, "", 0))
  }, [])

  const [rows, setRows] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [payload, setPayload] = React.useState({});



  // handler modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handler button
  const handleDelete = async (item) => {
    const result = await paket.destroy(item)
    if (!result.success) {
      window.alert("failed delete paket")
    } else {
      window.alert("success delete paket")

      // fetching new data
      const newFetch = await paket.show()
      setRows(newFetch)
    }
  }

  const handleUpdate = async (item) => {
    handleOpen()
    setPayload(item)
    setAction("update")
  }

  const handleAdd = async () => {
    setPayload(createPayload(0, "", 0))
    handleOpen()
    setAction("add")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === "update") {
      const result = await paket.update(payload)
      if (!result.success) {
        window.alert("failed update paket")
      } else {
        window.alert("success update paket")
        handleClose() //close modal

        // fetching new data
        const newFetch = await paket.show()
        setRows(newFetch)
      }
    } else {
      const result = await paket.add(payload)
      if (!result.success) {
        window.alert("failed add paket")
      } else {
        window.alert("success add paket")
        handleClose() //close modal

        // fetching new data
        const newFetch = await paket.show()
        setRows(newFetch)
      }
    }
  };

  const forms = [
    createForm("ID Paket", "id_paket", true, false, payload.id_paket),
    createForm("Jenis Paket", "jenis", false, true, payload.jenis),
    createForm("Harga", "harga", false, true, payload.harga)
  ]

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        <Typography noWrap sx={{ textAlign: 'center', paddingY: '1rem', color: "#6d1b7b" }} variant='h4' component='h6'>
          <b>Daftar Paket Laundry</b>
        </Typography>
      </Box>
      <Box component={Paper} elevation={5} sx={{ borderRadius: 3, padding: 2, width: '100%' }}>
      <TableContainer component={Paper} elevation={0} sx={{borderRadius:3}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" >
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Jenis Paket</StyledTableCell>
              <StyledTableCell>Harga</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.id_paket}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>{row.id_paket}</StyledTableCell>
                <StyledTableCell>{row.jenis}</StyledTableCell>
                <StyledTableCell>Rp {row.harga}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="edit" onClick={() => handleUpdate(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', width: '100%' }}>
        <Button
          variant="contained"
          elevation={5}
          sx={{ mt: 3, mb: 2, borderRadius: 5 }}
          onClick={() => handleAdd()}
          color="secondary"
        >
          Tambah Paket
        </Button>
      </Box>

      {/* modal start */}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <b>MODAL PAKET</b>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {forms.map((form, i) => (
                <TextField
                  onChange={(e) => setPayload({ ...payload, [form.id]: e.target.value })}
                  disabled={form.disabled}
                  required={form.required}
                  value={form.value}
                  margin="normal"
                  fullWidth
                  id={form.id}
                  label={form.label}
                  name={form.id}
                  size='small'
                  InputLabelProps={{ shrink: true }}
                />
              ))}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
                color="secondary"
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