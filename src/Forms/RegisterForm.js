import { useState } from "react";

/* --------------------------- iconfiy components --------------------------- */
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

/* --------------------------- material components -------------------------- */
import {
  Stack,
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

/* -------------------------- redux form components ------------------------- */
import { Field, reduxForm } from "redux-form";

/* ----------------------------- core components ---------------------------- */
import { strengthColor, strengthIndicator } from "../Utils/password-strength";

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
  const requiredFields = ["name", "password", "email", "confirm_password"];
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
  if (values.confirm_password !== values.password) {
    errors.confirm_password = "Passwords don't match!";
  }
  return errors;
};

/* -------------------------------------------------------------------------- */
/*                                Register form                               */
/* -------------------------------------------------------------------------- */

export function RegisterForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState("");

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const { handleSubmit, pristine, submitting } = props;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Field
          name="name"
          component={renderTextField}
          label="Name"
          type="text"
        />
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
          onChange={(e) => {
            changePassword(e.target.value);
          }}
        />
        {strength !== 0 && (
          <FormControl fullWidth>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    backgroundColor={level.color}
                    sx={{
                      width: 85,
                      height: 8,
                      borderRadius: "7px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        )}
        <Field
          name="confirm_password"
          component={renderTextField}
          label="Confirm Password"
          type="password"
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
          Register
        </Button>
      </Stack>
    </form>
  );
}

RegisterForm = reduxForm({
  form: "RegisterForm", // a unique identifier for this form
  validate,
})(RegisterForm);
