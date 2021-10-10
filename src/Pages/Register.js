import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

/* --------------------------- material components --------------------------- */
import { Link, Stack, Typography } from "@material-ui/core";

/* ---------------------------- redux components ---------------------------- */
import { useDispatch } from "react-redux";

/* ----------------------------- core components ---------------------------- */
import { RegisterForm } from "../Forms";
import { userActions } from "../Actions";

/* -------------------------------------------------------------------------- */
/*                                register page                               */
/* -------------------------------------------------------------------------- */
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function checkRegister(values) {
    await sleep(500);
    dispatch(userActions.register(values, navigate));
  }
  return (
    <>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register in Blogs
        </Typography>
      </Stack>
      <RegisterForm onSubmit={checkRegister} />
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Have an account?&nbsp;
        <Link variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
    </>
  );
};
