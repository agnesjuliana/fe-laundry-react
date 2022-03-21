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
import { MenuItem } from '@mui/material';

import user from './UserAPI';
import getRole from '../../../utils/access';

// icon
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

const createPayload = (id_user, nama_user, username, password, role) => {
  return { id_user, nama_user, username, password, role }
}

export default function UserPage() {
  React.useEffect(() => {
    const User = getRole()
    if (User !== 'admin') {
      window.location = '/denied'
    }

    const fetch = async () => {
      const result = await user.show()
      setRows(result)
    }

    fetch()
    setPayload(createPayload(0, "", "", "", ""))
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
    const result = await user.destroy(item)
    if (!result.success) {
      window.alert("failed delete user")
    } else {
      window.alert("success delete user")

      // fetching new data
      const newFetch = await user.show()
      setRows(newFetch)
    }
  }

  const handleUpdate = async (item) => {
    handleOpen()
    setPayload(item)
    setAction("update")
  }

  const handleAdd = async () => {
    setPayload(createPayload(0, "", "", "", ""))
    handleOpen()
    setAction("add")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === "update") {
      const result = await user.update(payload)
      if (!result.success) {
        window.alert("failed update user")
      } else {
        window.alert("success update user")
        handleClose() //close modal

        // fetching new data
        const newFetch = await user.show()
        setRows(newFetch)
      }
    } else {
      const result = await user.add(payload)
      if (!result.success) {
        window.alert("failed add user")
      } else {
        window.alert("success add user")
        handleClose() //close modal

        // fetching new data
        const newFetch = await user.show()
        setRows(newFetch)
      }
    }
  };


  const roles = [
    "admin", "kasir", "owner"
  ]

  const forms = [
    createForm("ID User", "id_user", true, false, false, payload.id_user),
    createForm("Nama User", "nama_user", false, true, false, payload.nama_user),
    createForm("Username", "username", false, true, false, payload.username),
    createForm("Password", "password", false, false, false, payload.password),
    createForm("Role", "role", false, true, true, payload.role, (
      roles.map((role) => {
        return (
          <MenuItem key={role} value={role} >
            {role}
          </MenuItem>
        )
      }
      )
    ))
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
            <b>DAFTAR USER</b>
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
            <TableHead >
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nama User</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Password</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow key={row.id_user}>
                  <StyledTableCell>{i + 1}</StyledTableCell>
                  <StyledTableCell>{row.id_user}</StyledTableCell>
                  <StyledTableCell>{row.nama_user}</StyledTableCell>
                  <StyledTableCell>{row.username}</StyledTableCell>
                  <StyledTableCell>{row.password}</StyledTableCell>
                  <StyledTableCell>{row.role}</StyledTableCell>
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
              <b>MODAL USER</b>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {forms.map((form, i) => (
                <TextField
                  onChange={(e) => setPayload({ ...payload, [form.id]: e.target.value })}
                  disabled={form.disabled}
                  required={form.required}
                  select={form.select}
                  value={form.value}
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
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
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