import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';

// icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MemberIcon from '@mui/icons-material/Group';
import OutletIcon from '@mui/icons-material/Store';
import PaketIcon from '@mui/icons-material/LocalGroceryStore';
import UserIcon from '@mui/icons-material/AccountBox';
import TransaksiIcon from '@mui/icons-material/ReceiptLong';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MainRoute } from './main/MainRoute';
import getRole from '../../utils/access'
import mdTheme from '../../utils/Style'


const base_url = "http://localhost:8000/api"

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: theme.palette.primary.light,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const useStyles = makeStyles({
  leftContainer: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    background: 'linear-gradient(#9c27b0, #ffc4ff)',
    // backgroundColor: 'red',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})



const createNavList = (name, to, icon, presence) => {
  return { name, to, icon, presence }
}


export default function FrontPage() {
  React.useEffect(() => {
    const user = getRole()
    if (user !== undefined) {
      handleNav(user)
    } else {
      console.log('denied')
    }
  }, [])

  const [navPresence, setNavPresence] = React.useState('none');
  const [loginPresence, setLoginPresence] = React.useState('block');
  const [navlistPresence, setnavlistPresence] = React.useState({
    dashboard: 'block',
    member: 'block',
    outlet: 'block',
    paket: 'block',
    user: 'block',
    transaksi: 'block'
  });

  const navList = [
    createNavList('Dashboard', '/dashboard', <DashboardIcon sx={{color:'white'}}/>, navlistPresence.dashboard),
    createNavList('User', '/user', <UserIcon sx={{ color: 'white' }} />, navlistPresence.user),
    createNavList('Paket', '/paket', <PaketIcon sx={{ color: 'white' }} />, navlistPresence.paket),
    createNavList('Outlet', '/outlet', <OutletIcon sx={{color:'white'}}/>, navlistPresence.outlet),
    createNavList('Member', '/member', <MemberIcon sx={{ color: 'white' }} />, navlistPresence.member),
    createNavList('Kasir', '/transaksi', <TransaksiIcon sx={{color:'white'}}/>, navlistPresence.transaksi),
  ]


  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNav = (user) => {
    const newList = {
      dashboard: 'block',
      member: 'block',
      outlet: 'block',
      paket: 'block',
      user: 'block',
      transaksi: 'block'
    }

    if (user === 'kasir') {
      newList.outlet = 'none'
      newList.paket = 'none'
      newList.user = 'none'
    }

    if (user === 'owner') {
      newList.member = 'none'
      newList.outlet = 'none'
      newList.paket = 'none'
      newList.user = 'none'
      newList.transaksi = 'none'
    }

    setnavlistPresence(newList)
    setNavPresence('block')
    setLoginPresence('none')
  }

  // import styles
  const classes = useStyles();
  let history = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get('username'),
      password: data.get('password'),
    }

    const url = base_url + '/user/login'

    try {
      let result = await axios.post(url, payload)
      if (result.status === 200) {
        window.location = '/dashboard'
        localStorage.setItem("role", result.data.data.role)
        localStorage.setItem("token", result.data.data.token)

        // set path
        history.push("/dashboard")

        handleNav(result.data.data.role)
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handleLogout = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    window.location = '/'
  }

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: loginPresence }}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              className={classes.leftContainer}
            >
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component={Paper}
                  sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '30vw',
                    borderRadius: 4,
                  }}
                >

                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, justifyContent: 'center' }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2, width: '30%', left: '35%'}}
                      color='secondary'
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Page with sidebar route */}
        <Box sx={{ display: navPresence }}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} >
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  <b>Cling Laundry</b>
                </Typography>
                <IconButton color="inherit" onClick={()=>handleLogout()}>
                    <LogoutIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1]
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider/>
              <List component="nav" >
                {
                  navList.map(item => (
                    <Link to={item.to} style={{ textDecoration: 'none', color: 'white', display: item.presence }}>
                      <ListItemButton>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </Link>
                  ))
                }
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.primary.soft
                    : theme.palette.primary.soft[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                  <MainRoute />
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

