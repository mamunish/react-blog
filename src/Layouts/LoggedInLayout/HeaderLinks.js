import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

 /* ---------------------- @material-ui/core components ---------------------- */
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

/* ---------------------------- redux components ---------------------------- */
import { useSelector, useDispatch } from "react-redux";


 /* ----------------------------- core components ---------------------------- */
import styles from "../../Assets/js/components/headerLinksStyle.js";
import { userActions } from '../../Actions';

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                           Header links components                          */
/* -------------------------------------------------------------------------- */
export default function HeaderLinks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.logout());
    navigate("/", { replace: true });
  };
  const user = useSelector((state) => state.authentication.user);

  console.log(user);

  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="third" component={RouterLink} to="/">
          Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="third" component={RouterLink} to="/blogs">
          Blogs
        </Button>
      </ListItem>
      
      <ListItem className={classes.listItem}>
        <Button color="third" component={RouterLink} to="/add-blog">
          Add Blogs
        </Button>
      </ListItem>
      {user && (
        <ListItem className={classes.listItem}>
          <Button color="third" onClick={logout}>
            Logout
          </Button>
        </ListItem>
      )}
      {!user && (
        <ListItem className={classes.listItem}>
          <Button color="third" component={RouterLink} to="/login">
            Login
          </Button>
        </ListItem>
      )}
      {!user && (
        <ListItem className={classes.listItem}>
          <Button color="third" component={RouterLink} to="/register">
            Register
          </Button>
        </ListItem>
      )}
    </List>
  );
}
