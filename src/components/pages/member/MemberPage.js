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
import member from './MemberAPI';

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
};

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

const createPayload = (id_member, nama_member, alamat, jenis_kelamin, telp) => {
  return { id_member, nama_member, alamat, jenis_kelamin, telp}
}

export default function MemberPage() {
  React.useEffect(() => {
    const User = getRole()
    if (User !== 'admin' && User !== 'kasir') {
      window.location = '/denied'
    }

    const fetch = async () => {
      const result = await member.show()
      setRows(result)
    }

    
    fetch()
    setPayload(createPayload(0, "", "", "", ""))
  }, [])

  const [rows, setRows] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState({});
  let action = ""



  // handler modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handler button
  const handleDelete = async (item) => {
    const result = await member.destroy(item)
    if (!result.success) {
      window.alert("failed delete member")
    } else {
      window.alert("success delete member")

      // fetching new data
      const newFetch = await member.show()
      setRows(newFetch)
    }
  }

  const handleUpdate = async (item) => {
    handleOpen()
    setPayload(item)
    action = "update"
  }

  const handleAdd = async () => {
    handleOpen()
    action = "add"
    console.log(action)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(action === "update"){
      const result = await member.update(payload)
      if (!result.success) {
        window.alert("failed update member")
      } else {
        window.alert("success update member")
        handleClose() //close modal

        // fetching new data
        const newFetch = await member.show()
        setRows(newFetch)
      }
    }else{
      const result = await member.add(payload)
      if (!result.success) {
        window.alert("failed add member")
      } else {
        window.alert("success add member")
        handleClose() //close modal

        // fetching new data
        const newFetch = await member.show()
        setRows(newFetch)
      }
    }    
  };

  const forms = [
    createForm("ID Member", "id_member", true, false, payload.id_member),
    createForm("Nama Member", "nama_member", false, true, payload.nama_member),
    createForm("Alamat", "alamat", false, true, payload.alamat),
    createForm("Jenis Kelamin", "jenis_kelamin", false, true, payload.jenis_kelamin),
    createForm("No. Telpon", "telp", false, true, payload.telp)
  ]

  return (
    <>
      <h1>Member</h1>
      <IconButton aria-label="add" onClick={()=>handleAdd()}>
        <AddCircleIcon sx={{fontSize: '2rem'}}/>
      </IconButton>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nama Member</StyledTableCell>
              <StyledTableCell>Alamat</StyledTableCell>
              <StyledTableCell>Jenis Kelamin</StyledTableCell>
              <StyledTableCell>No. Telpon</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.id_member}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>{row.id_member}</StyledTableCell>
                <StyledTableCell>{row.nama_member}</StyledTableCell>
                <StyledTableCell>{row.alamat}</StyledTableCell>
                <StyledTableCell>{row.jenis_kelamin}</StyledTableCell>
                <StyledTableCell>{row.telp}</StyledTableCell>
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
              Update Member
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
                sx={{ mt: 3, mb: 2 }}
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