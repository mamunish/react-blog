import React, { useEffect } from "react";

/* ---------------- nodejs library that concatenates classes ---------------- */
import classNames from "classnames";

/* ---------------------- @material-ui/core components ---------------------- */
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";

/* ------------------------- react redux components ------------------------- */
import { useDispatch, useSelector } from "react-redux";

/* ----------------------------- core components ---------------------------- */
import { blogActions } from "../Actions";
import { endpoint } from "../constant";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardBody from "../Components/Card/CardBody.js";
import styles from "../Assets/js/views/Sections/blogStyle.js";

const useStyles = makeStyles(styles);

export default function RecentBlogs() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogActions.getAll(0, 3));
  }, [dispatch]);
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our recent Blogs</h2>
      <div>
        {blogs.loading && <em>Loading blogs...</em>}
        {blogs.error && (
          <span className="text-danger">ERROR: {blogs.error}</span>
        )}
        {blogs.count === 0 && (
          <span className="text-danger">NO BLOG FOUND</span>
        )}
        {blogs.items && (
          <GridContainer>
            {blogs.items.map((blog, index) => {
              const img =
                blog.image !== "undefined"
                  ? `${endpoint}uploads/${blog.image}`
                  : "noimg.png";
              const d_link = `/blog/${blog._id}`;
              return (
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  key={blog._id}
                  component={RouterLink}
                  to={d_link}
                >
                  <Card plain>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      className={classes.itemGrid}
                    >
                      <img src={img} alt="..." className={imageClasses} />
                    </GridItem>
                    <h4 className={classes.cardTitle}>
                      {blog.title}
                      <br />
                      <small className={classes.smallTitle}>
                        {blog.username}
                      </small>
                    </h4>
                    <CardBody>
                      <p className={classes.description}>
                        `${blog.description.substring(0, 200)}...`
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
        )}
      </div>
    </div>
  );
}
