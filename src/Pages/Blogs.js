import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

/* ---------------- nodejs library that concatenates classes ---------------- */
import classNames from "classnames";

 /* ---------------------- @material-ui/core components ---------------------- */
import { makeStyles } from "@material-ui/styles";

/* ----------------------------- redux component ---------------------------- */
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";


 /* ----------------------------- core components ---------------------------- */
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardBody from "../Components/Card/CardBody.js";
import { blogActions } from "../Actions";
import styles from "../Assets/js/views/Sections/blogStyle.js";
import { endpoint } from "../constant";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                               List the blogs                               */
/* -------------------------------------------------------------------------- */

export function Blogs() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getAll(skip, limit));
  }, []);

  const fetchMoreData = () => {
    if (blogs.items.length >= blogs.count) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const skips = skip + limit;
      setSkip(skips);
      dispatch(blogActions.loadMore(skips, limit));
    }, 1500);
  };

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our Blogs </h2>
      <div>
        {blogs.loading && <em>Loading blogs...</em>}
        {blogs.error && (
          <span className="text-danger">ERROR: {blogs.error}</span>
        )}
        {blogs.count === 0 && (
          <span className="text-danger">NO BLOG FOUND</span>
        )}
        {blogs.items && (
          <InfiniteScroll
            dataLength={blogs.items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <GridContainer>
              {blogs.items.map((blog, index) => {
                const img =
                  blog.image !== "undefined"
                    ? `${endpoint}uploads/${blog.image}`
                    : "noimg.png";
                const d_link = `/blog/${blog._id}`
                return (
                  <GridItem xs={12} sm={12} md={4} key={blog._id} component={RouterLink}
                  to={d_link}>
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
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
