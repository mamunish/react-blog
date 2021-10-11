import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

/* ------------- nodejs library to set properties for components ------------ */
import PropTypes from "prop-types";

/* ---------------- nodejs library that concatenates classes ---------------- */
import classNames from "classnames";

/* ----------------------- material-ui core components ---------------------- */
import { List, ListItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

/* --------------------------- @material-ui/icons --------------------------- */
import styles from "../../Assets/js/components/footerStyle.js";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                               Footer content                               */
/* -------------------------------------------------------------------------- */

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  const user = useSelector((state) => state.authentication.user);

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Button color="third" component={RouterLink} to="/">
                Home
              </Button>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Button color="third" component={RouterLink} to="/blogs">
                Blogs
              </Button>
            </ListItem>

            {user && user.roles == "user" && (
              <ListItem className={classes.inlineBlock}>
                <Button color="third" component={RouterLink} to="/add-blog">
                  Add Blogs
                </Button>
              </ListItem>
            )}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} by{" "}
          <a
            href="www.linkedin.com/in/munishwaran-m"
            className={aClasses}
            target="_blank"
          >
            Munish
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
