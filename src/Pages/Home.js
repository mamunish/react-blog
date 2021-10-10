import React, { useEffect, useState } from "react";

/* ---------------- nodejs library that concatenates classes ---------------- */
import classNames from "classnames";

/* ------------- nodejs library to set properties for components ------------ */
import PropTypes from "prop-types";

/* ------------------------- react redux components ------------------------- */
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

/* ----------------------------- core components ---------------------------- */
import { Button, Stack } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import styles from "../Assets/js/components/parallaxStyle.js";
import RecentBlogs from "./RecentBlogs.js";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                              Home page content                             */
/* -------------------------------------------------------------------------- */

export function Home(props) {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  const { filter, className, children, style, small } = props;
  const image = "home.png";
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined,
  });

  const user = useSelector((state) => state.authentication.user);

  return (
    <div>
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: "url(" + image + ")",
          transform: transform,
        }}
      >
        {children}
        <Stack>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                  This is a place to write, read, and connect It's easy and free
                  to post your thinking on any topic and connect with millions
                  of readers.
                </h4>
                <br />
                {!user && (
                  <Button
                    component={RouterLink}
                    to="/register"
                    size="medium"
                    type="submit"
                    variant="outlined"
                  >
                    Sign in to Blogs
                  </Button>
                )}
                {user && (
                  <Button
                    component={RouterLink}
                    to="/add-blog"
                    size="medium"
                    type="submit"
                    variant="outlined"
                  >
                    Start Writing
                  </Button>
                )}
              </GridItem>
            </GridContainer>
          </div>
        </Stack>
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <RecentBlogs />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
};
