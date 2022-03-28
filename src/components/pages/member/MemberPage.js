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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import member from './MemberAPI';

import getRole from '../../../utils/access';


// icon
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { MenuItem } from '@mui/material';


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

const createForm = (label, id, disabled, required, select, value, nested) => {
  return { label, id, disabled, required, select, value, nested }
}

const createPayload = (id_member, nama_member, alamat, jenis_kelamin, telp) => {
  return { id_member, nama_member, alamat, jenis_kelamin, telp }
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
  const [action, setAction] = React.useState("");



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
    setAction("update")
  }

  const handleAdd = async () => {
    handleOpen()
    setPayload({})
    setAction("add")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === "update") {
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
    } else {
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

  const gender = ["perempuan", "laki-laki"]

  const forms = [
    createForm("ID Member", "id_member", true, false, false, payload.id_member),
    createForm("Nama Member", "nama_member", false, true, false, payload.nama_member),
    createForm("Alamat", "alamat", false, true, false, payload.alamat),
    createForm("Jenis Kelamin", "jenis_kelamin", false, true, true, payload.jenis_kelamin,
      (
        gender.map((item) => {
          return (
            <MenuItem key={item} value={item} >
              {item}
            </MenuItem>
          )
        }
        )
      )),
    createForm("No. Telpon", "telp", false, true, false, payload.telp)
  ]


  return (
    <>
      <Box component={Paper} elevation={5} sx={{
        display: 'flex', flexDirection: 'row',
        width: '100%', borderRadius: 1.5, padding: 2, my: 2
      }}>
        <Box component={Paper} elevation={0} sx={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'center', width: '100%', borderRadius: 1.5, padding: 2, backgroundColor: '#fffde7', border: 'solid #ffd967 1px'
        }}>
          <Typography noWrap sx={{ textAlign: 'center', color: '#ffa735' }} variant='h5' component='h5'>
            <b>DAFTAR MEMBER</b>
          </Typography>
        </Box>
      </Box>
      <Box component={Paper} elevation={5} sx={{ borderRadius: 3, padding: 2, width: '100%' }}>
        <TableContainer component={Paper} elevation={0}
          sx={{
            maxHeight: "54vh",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#C1C1C1",
            },
            borderRadius: 3,
          }}
        >
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
      </Box>
      <Box elevation={5} sx={{
        borderRadius: 3, width: '100%', display: 'flex', justifyContent: 'end', flexDirection: 'row',
        width: '100%', my: 2
      }}>
        <Button
          elevation={5}
          sx={{ borderRadius: 4, width: 15, height: 40 }}
          onClick={() => handleAdd()}
          color="secondary"
          variant="contained"
        >
          <AddBoxIcon sx={{ fontSize: 30 }} />
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
              <b>MEMBER MODAL</b>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {forms.map((form, i) => (
                <TextField
                  onChange={(e) => setPayload({ ...payload, [form.id]: e.target.value })}
                  disabled={form.disabled}
                  required={form.required}
                  value={form.value}
                  select={form.select}
                  margin="normal"
                  fullWidth
                  id={form.id}
                  label={form.label}
                  name={form.id}
                  size='small'
                  InputLabelProps={{ shrink: true }}
                  sx={{ textAlign: "left" }}
                >
                  {form.nested}
                </TextField>
              ))}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 4 }}
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