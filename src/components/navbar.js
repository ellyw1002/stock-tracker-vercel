import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/ShowChart';
import { logoBase64 } from '../../public/logo';
import Image from 'next/image'

export function NavComponent() {
  return (
    <AppBar position='static' sx={{ bgcolor: 'primary.light' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Image src={`data:image/png;base64, ${logoBase64}`} width="240" height="50" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flex: 1
            }}
          >
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={{ "&:hover": { borderColor: "action.hover" }, }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>

  );
}