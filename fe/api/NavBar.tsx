import * as React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";

// internal components
import PlayerPage from '../player/PlayerPage';
import LeaguePage from '../league/LeaguePage';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SnowflakeIcon from '@mui/icons-material/AcUnit';

// constants
import Color from "../constants/colors";
import GH_REF from "../constants/github_href";

interface PageObject {
  label: string,
  page_to_show: JSX.Element,
  path: string
}

const pages: PageObject[] = [
  {
    label: "Home",
    path: '/',
    page_to_show: <h1>Welcome Home</h1>
  },
  {
    label: "View Leagues",
    path: '/league',
    page_to_show: <LeaguePage />
    },
  {
    label: "Active Players",
    path: '/players',
    page_to_show: <PlayerPage />
  },
]
var route_object = pages.map((page) => {
  return {
    'path': page.path,
    'element': page.page_to_show
  }
})
const router = createBrowserRouter(route_object)

function GlobalNav() {
  return (
    <AppBar position="static" sx={{backgroundColor: Color.darkBlue, width: "100%" }}>
      <Container sx={{minWidth: "100%"}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Button href={GH_REF} target="_blank">
            <SnowflakeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </Button>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                href={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export {
  router,
  GlobalNav
}