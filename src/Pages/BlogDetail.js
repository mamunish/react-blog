import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/* ------------------------------- material ui ------------------------------ */
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

/* ----------------------------- material icons ----------------------------- */
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDown";
import CommentIcon from "@material-ui/icons/Comment";

/* ----------------------------- project imports ---------------------------- */
import { blogActions, commentActions } from "../Actions";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import Card from "../Components/Card/Card.js";
import CardBody from "../Components/Card/CardBody.js";
import styles from "../Assets/js/views/Sections/blogStyle.js";

import Quote from "../Components/Typography/Quote.js";

import styles1 from "../Assets/js/views/Sections/typographyStyle.js";

import { endpoint } from "../constant";
import { CommentForm } from "../Forms/CommentForm";

const useStyles = makeStyles(styles, styles1);

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
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.authentication.user);
  let isLiked= false; let isUnLiked = false;
  if (user) {
    isLiked =
      blog.items && blog.items.like
        ? blog.items.like.find((element) => element == user._id)
        : false;

    isUnLiked =
      blog.items && blog.items.unlike
        ? blog.items.unlike.find((element) => element == user._id)
        : false;
  }

  const img = blog.items
    ? blog.items.image !== "undefined"
      ? `${endpoint}uploads/${blog.items.image}`
      : "noimg.png"
    : {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogActions.getSingle(id));
    dispatch(commentActions.getAll(id));
  }, [id, dispatch]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function addLike() {
    await sleep(500); // simulate server latency
    dispatch(blogActions.update(id, 'like'));
  }

  async function addUnLike() {
    await sleep(500); // simulate server latency
    dispatch(blogActions.update(id, 'unlike'));
  }

  return (
    <div className={classes.section}>
      {blog.items && <h2 className={classes.title}>{blog.items.title} </h2>}
      <div>
        {blog.loading && <em>Loading blogs...</em>}
        {/* {blog.error && <span className="text-danger">ERROR: {blog.error}</span>} */}
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
            <GridItem xs={12} sm={12} md={12}>
              <Button size="large" variant="contained" disabled={isLiked} color={isLiked ? 'primary' : 'grey'} onClick={addLike} >
                <ThumbUpAlt className={classes.icons} />
                &nbsp; {blog.likes}
              </Button>
              &nbsp;
              <Button size="large" variant="contained" disabled={isUnLiked} color="grey" color={isUnLiked ? 'primary' : 'grey'} onClick={addUnLike}>
                <ThumbDownAltIcon className={classes.icons} /> &nbsp;{" "}
                {blog.unlikes}
              </Button>
              &nbsp;
              <Button size="large" variant="contained" color="grey">
                <CommentIcon className={classes.icons} />
                &nbsp; {comments.count}
              </Button>
            </GridItem>
          </GridContainer>
        )}
      </div>
      <div className={classes.section}>
        <h2 className={classes.title}>Comments </h2>
        {comments.loading && <em>Loading comments...</em>}
        {comments.count === 0 && (
          <span className="text-danger">NO COMMENTS FOUND</span>
        )}
        {comments.items && (
          <div>
            {comments.items.map((comment, index) => (
              <div
                className={classes.typo}
                key={comment._id}
                style={{ width: "75%", marginLeft: "15%" }}
              >
                <Quote text={comment.description} author={comment.username} />
                {comments.loading && <em>Loading comments...</em>}
              </div>
            ))}
          </div>
        )}
        <CommentForm />
      </div>
    </div>
  );
}
