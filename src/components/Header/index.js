import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router";
import {
  Button,
  ClickAwayListener,
  Collapse,
  Grow,
  ListSubheader,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import TuneIcon from "@material-ui/icons/Tune";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import logo from "../../assets/images/misterins-logo.png";
import "./style.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "#27272d",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    background: "#27272d",
    color: "#efefef",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header(page) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openList, setOpenList] = useState(false);
  const username = localStorage.getItem("username");
  const courses = localStorage.getItem("courses");
  const userID = localStorage.getItem("userid");
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePush = React.useCallback((params) => {
    history.push({
      pathname: params.pathname,
    });
  }, []);

  const handleClickList = () => {
    setOpenList(!openList);
  };

  /**
   * Menu de navegação de opções de usuário
   */

  const [openMenuUser, setOpenMenuUser] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenMenuUser((prevOpen) => !prevOpen);
  };

  const handleCloseUserMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenuUser(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuUser(false);
    }
  }

  const prevOpen = React.useRef(openMenuUser);

  React.useEffect(() => {
    if (prevOpen.current === true && openMenuUser === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMenuUser;
  }, [openMenuUser]);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="d-flex">
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={"toolbar"}>
          <IconButton
            edge="start"
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {page.title}
          </Typography>
          <div>
            <Button
              ref={anchorRef}
              aria-controls={openMenuUser ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircleIcon
                fontSize={"large"}
                style={{ color: "#fafafa" }}
              />
              <Typography style={{ marginLeft: "5px", fontStyle: "normal" }}>
                {username}
              </Typography>
              <ExpandMore style={{ color: "#fafafa" }} />
            </Button>
            <Popper
              open={openMenuUser}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseUserMenu}>
                      <MenuList
                        autoFocusItem={openMenuUser}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() =>
                            handlePush({
                              pathname: "/admin/usuario/profile/" + userID,
                            })
                          }
                        >
                          <PermIdentityIcon />{" "}
                          <span className={"menu-user-option"}>Perfil</span>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ExitToAppIcon />{" "}
                          <span className={"menu-user-option"}>Sair</span>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>

      {/******** Sidebar ********/}

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        className="theme-dark"
        open={open}
      >
        <div className="row m-0">
          <div className="col-md-4 pb-1 bg-dark"></div>
          <div className="col-md-4 pb-1 bg-primary"></div>
          <div className="col-md-4 pb-1 bg-danger"></div>
        </div>
        <div className={classes.toolbarIcon}>
          <img src={logo} alt="mister-ins" />
          <IconButton color="secondary" onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            style={{ marginBottom: 8 }}
            onClick={() => handlePush({ pathname: "/dashboard" })}
          >
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fafafa" }} />
            </ListItemIcon>
            <ListItemText primary="Bem-vindo" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handlePush({ pathname: "/lives" })}>
            <ListItemIcon>
              <LiveTvIcon style={{ color: "#fafafa" }} />
            </ListItemIcon>
            <ListItemText primary="Live" />
          </ListItem>
          {courses.search("448026") !== -1 && (
            <ListItem button onClick={() => handlePush({ pathname: "/socio" })}>
              <ListItemIcon>
                <RecentActorsIcon style={{ color: "#fafafa" }} />
              </ListItemIcon>
              <ListItemText primary="Sócio" />
            </ListItem>
          )}
        </List>
        <Divider />
        {localStorage.getItem("permission") === "admin" && (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                className={"inset"}
                style={{ color: "#f50057" }}
              >
                Administração
              </ListSubheader>
            }
            className={classes.root}
          >
            <ListItem button onClick={handleClickList}>
              <ListItemIcon>
                <TuneIcon style={{ color: "#fafafa" }} />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className="nested"
                  onClick={() => handlePush({ pathname: "/admin/live" })}
                >
                  <ListItemIcon>
                    <RadioButtonUncheckedIcon
                      style={{ fontSize: 15, color: "#fafafa" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Live" />
                </ListItem>
                <ListItem
                  button
                  className="nested"
                  onClick={() => handlePush({ pathname: "/admin/socio" })}
                >
                  <ListItemIcon>
                    <RadioButtonUncheckedIcon
                      style={{ fontSize: 15, color: "#fafafa" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Sócio" />
                </ListItem>
                <ListItem
                  button
                  className="nested"
                  onClick={() => handlePush({ pathname: "/admin/usuario" })}
                >
                  <ListItemIcon>
                    <RadioButtonUncheckedIcon
                      style={{ fontSize: 15, color: "#fafafa" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Usuários" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        )}
      </Drawer>
    </div>
  );
}
