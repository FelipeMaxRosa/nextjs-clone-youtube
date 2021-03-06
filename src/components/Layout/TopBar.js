import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCall from '@material-ui/icons/VideoCall';
import Apps from '@material-ui/icons/Apps';
import MoreVert from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Hidden from '@material-ui/core/Hidden';
import { Button, IconButton, InputBase, Paper, Avatar } from '@material-ui/core';
import { signIn, signOut, useSession } from "next-auth/client";
import useSettings from '../../hooks/useSettings';
import { THEMES } from '../../utils/constants';
import { Brightness4, Brightness7 } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    cursor: 'pointer',
    height: 18,
    marginLeft: theme.spacing(3),
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1
  }
}));

function TopBar() {
  const classes = useStyles();
  const [session] = useSession();
  const  {settings, saveSettings} = useSettings();

  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <MenuIcon />
          <img
            src={
              settings.theme === THEMES.DARK
                ? '/branco.png'
                : '/new-youtube-logo.svg'
            }
            alt="logo"
            className={classes.logo}
          ></img>
        </Box>

        <Hidden mdDown>
          <Box>
            <Paper component="form" className={classes.search}>
              <InputBase
                className={classes.input}
                placeholder="Pesquisar"
                inputProps={{ 'arial-label': 'search google maps' }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Hidden>

        <Box display="flex" alignItems="center">
          <IconButton className={classes.icon}>
            {settings.theme === THEMES.DARK ? (
              <Brightness7
                onClick={() => saveSettings({ theme: THEMES.LIGHT })}
              />
            ) : (
              <Brightness4
                onClick={() => saveSettings({ theme: THEMES.DARK })}
              />
            )}
          </IconButton>
          <IconButton>
            <VideoCall />
          </IconButton>
          <IconButton>
            <Apps />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>

          {!session ? (
            <Button
              onClick={() => signIn('google')}
              color="secondary"
              component="a"
              variant="outlined"
              startIcon={<AccountCircle />}
            >
              Fazer Login
            </Button>
          ) : (
            <Box display="flex" alignItems="center">
              <Avatar
                onClick={() => signOut()}
                alt="User"
                className={classes.avatar}
                src={session?.user?.image}
              />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
