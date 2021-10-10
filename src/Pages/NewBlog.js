import React from "react";

 /* --------------------------- material components -------------------------- */
import { makeStyles } from "@material-ui/styles";


 /* ----------------------------- core components ---------------------------- */
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import styles from "../Assets/js/views/Sections/addBlogStyle.js";
import { BlogForm } from "../Forms";

const useStyles = makeStyles(styles);

/* -------------------------------------------------------------------------- */
/*                              add new blog page                             */
/* -------------------------------------------------------------------------- */
export function NewBlog() {
    
  const classes = useStyles();
  
  return (
    <div className={classes.section}>
      <div>
      <GridContainer sx={{"justify-content": "center"}} >
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>You're became a Blogger</h2>
          <h4 className={classes.description}>
          This is a place to write, read, and connect
            It's easy and free to post your thinking on any topic and connect with millions of readers.
          </h4>
              <BlogForm  />
        </GridItem>
      </GridContainer>
      </div>
    </div>
  );
}
