import React from "react";
import "./row.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: "inherit",
    padding: 0,
    backgroundColor: "inherit",
    width: 30,
  },
  content: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#E5E5E5",
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
  },
  toolBar: {
    display: "flex",
    justifyContent: "flex-end",
    minHeight: 50,
  },
}));

const Row = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className={classes.menuButton}
              >
                <AccountCircle fontSize={"large"} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem disabled>{user?.email}</MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(signOut());
                  }}
                >
                  Выйти
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default Row;
