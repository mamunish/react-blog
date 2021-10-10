import React, { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/* ------------------------------- material ui ------------------------------ */
import { makeStyles } from "@material-ui/styles";

/* ----------------------------- project imports ---------------------------- */
import { blogActions } from "../Actions";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardBody from "../Components/Card/CardBody.js";
import styles from "../Assets/js/views/Sections/blogStyle.js";
import { endpoint } from "../constant";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                              Blog Details page                             */
/* -------------------------------------------------------------------------- */
export function BlogDetail() {
  const { id } = useParams();
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const blog = useSelector((state) => state.blog);

  const img = blog.items
    ? blog.items.image !== "undefined"
      ? `${endpoint}uploads/${blog.items.image}`
      : "noimg.png"
    : {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogActions.getSingle(id));
  }, [id, dispatch]);

  return (
    <div className={classes.section}>
      {blog.items && <h2 className={classes.title}>{blog.items.title} </h2>}
      <div>
        {blog.loading && <em>Loading blogs...</em>}
        {blog.error && <span className="text-danger">ERROR: {blog.error}</span>}
        {blog.items && (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} key={blog.items._id}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={img} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Created By
                  <br />
                  <small className={classes.smallTitle}>
                    {blog.items.username}
                  </small>
                </h4>
                <CardBody>
                  <h2 className={classes.description}>
                    {blog.items.description}
                  </h2>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </div>
    </div>
  );
}
