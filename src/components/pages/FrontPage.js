import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';

// icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import MemberIcon from '@mui/icons-material/Dashboard';
import OutletIcon from '@mui/icons-material/Dashboard';
import PaketIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/Dashboard';
import TransaksiIcon from '@mui/icons-material/Dashboard';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MainRoute } from './main/MainRoute';
import getRole from '../../utils/access'

const base_url = "http://localhost:8000/api"

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const mdTheme = createTheme();

const useStyles = makeStyles({
  leftContainer: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
    createNavList('Dashboard', '/dashboard', <DashboardIcon />, navlistPresence.dashboard),
    createNavList('Member', '/member', <MemberIcon />, navlistPresence.member),
    createNavList('Outlet', '/outlet', <OutletIcon />, navlistPresence.outlet),
    createNavList('Paket', '/paket', <PaketIcon />, navlistPresence.paket),
    createNavList('User', '/user', <UserIcon />, navlistPresence.user),
    createNavList('Transaksi', '/transaksi', <TransaksiIcon />, navlistPresence.transaksi),
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

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: loginPresence }}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              className={classes.leftContainer}
            >
            </Grid>
          </Grid>
        </Box>

        {/* Page with sidebar route */}
        <Box sx={{ display: navPresence }}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
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
                  MY LAUNDRY
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                {
                  navList.map(item => (
                    <Link to={item.to} style={{ textDecoration: 'none', color: 'black', display: item.presence }}>
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
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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

