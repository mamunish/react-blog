import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* --------------------------- material components -------------------------- */
import { TextField, Button } from "@material-ui/core";

/* -------------------------- redux form components ------------------------- */
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";

/* ----------------------------- core components ---------------------------- */
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import { blogActions } from "../Actions";

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const validate = (values) => {
  const errors = {};
  const requiredFields = ["title", "description"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

/* -------------------------------------------------------------------------- */
/*                              add new blog form                             */
/* -------------------------------------------------------------------------- */
export function BlogForm(props) {
  const navigate = useNavigate();

  const [imageFile, setFieldValue] = useState({});
  const { handleSubmit, pristine, submitting } = props;

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleOnDrop = (newImageFile) => {
    newImageFile = newImageFile.target;
    console.log(newImageFile.files[0]);
    const imageFile = {
      file: newImageFile.files[0],
      name: newImageFile.files[0].name,
      preview: URL.createObjectURL(newImageFile.files[0]),
      size: newImageFile.files[0].size,
    };
    setFieldValue(imageFile);
  };
  const dispatch = useDispatch();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function addBlog(values) {
    await sleep(500); // simulate server latency
    console.log(imageFile);

    const data = new FormData();
    data.append("title", values.title);
    data.append("description", values.description);
    if (imageFile !== "") data.append("image", imageFile.file);
    console.log(data);
    dispatch(blogActions.add(data, navigate));
  }

  return (
    <div style={{ padding: "34px" }}>
      <form onSubmit={handleSubmit(addBlog)}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Field
              name="title"
              component={renderTextField}
              label="Title"
              type="text"
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Field
              name="description"
              component={renderTextField}
              label="Description"
              multiline
              margin="normal"
              fullWidth
              rows="5"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Button
              onClick={handleClick}
              size="large"
              style={{ float: "right" }}
              variant="outlined"
            >
              Image
            </Button>
            <input
              id="image"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              type="file"
              imagefile={imageFile}
              onChange={(event) => handleOnDrop(event)}
              className="form-control"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {imageFile.preview && (
              <img
                alt="preview"
                style={{ width: "100px", height: "100px", marginTop: "23px" }}
                src={imageFile.preview}
              ></img>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} style={{ padding: "34px" }}>
            <Button
              style={{ float: "left" }}
              type="submit"
              disabled={pristine || submitting}
              size="large"
              variant="contained"
            >
              Save
            </Button>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}

BlogForm = reduxForm({
  form: "BlogForm", // a unique identifier for this form
  validate,
})(BlogForm);
