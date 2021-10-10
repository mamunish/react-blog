import { useState } from "react";

/* --------------------------- iconify components --------------------------- */
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

/* --------------------------- material components -------------------------- */
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@material-ui/core";

/* ---------------------------- redux components ---------------------------- */
import { Field, reduxForm } from "redux-form";

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
  const requiredFields = ["password", "email"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

/* -------------------------------------------------------------------------- */
/*                               login form page                              */
/* -------------------------------------------------------------------------- */

export function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, pristine, submitting } = props;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Field
          name="email"
          component={renderTextField}
          label="Email"
          type="email"
        />

        <Field
          name="password"
          component={renderTextField}
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <br />
      <Stack spacing={5}>
        <Button
          type="submit"
          disabled={pristine || submitting}
          fullWidth
          size="large"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}

LoginForm = reduxForm({
  form: "LoginForm", // a unique identifier for this form
  validate,
})(LoginForm);
