import { useParams } from "react-router";

/* --------------------------- material components -------------------------- */
import { TextField, Button } from "@material-ui/core";

/* -------------------------- redux form components ------------------------- */
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";

/* ----------------------------- core components ---------------------------- */
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import { commentActions } from "../Actions";

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
  const requiredFields = [ "description" ];
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
export function CommentForm(props) {

  const { handleSubmit, pristine, reset, submitting } = props;

  const { id }  = useParams();

  const dispatch = useDispatch();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function addComment(values) {
    await sleep(500); // simulate server latency
    values.blog = id;
    dispatch(commentActions.add(values));
    reset();
  }

  return (
    <div style={{ padding: "34px" }}>
      <form onSubmit={handleSubmit(addComment)}>
        <GridContainer>
          
          <GridItem xs={12} sm={12} md={12}>
            <Field
              name="description"
              component={renderTextField}
              label="Comment"
              multiline
              margin="normal"
              fullWidth
              rows="5"
            />
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

CommentForm = reduxForm({
  form: "CommentForm", // a unique identifier for this form
  validate,
})(CommentForm);
