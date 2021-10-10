import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

/* --------------------------- material components -------------------------- */
import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";

/* ---------------------------- redux components ---------------------------- */
import { useDispatch, useSelector } from "react-redux";

/* ----------------------------- core components ---------------------------- */
import { LoginForm } from "../Forms";
import { userActions } from "../Actions";

/* -------------------------------------------------------------------------- */
/*                                 Loing page                                 */
/* -------------------------------------------------------------------------- */
export const Login = () => {
  const navigate = useNavigate();
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function checkLogin(values) {
    await sleep(500); // simulate server latency
    dispatch(userActions.login(values, navigate));
  }
  return (
    <>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign in to Blogs
        </Typography>
      </Stack>
      <Stack sx={{ mb: 5 }}>
        {" "}
        <LoginForm onSubmit={checkLogin}>
          {loggingIn && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
        </LoginForm>
      </Stack>

      <Stack>
        <Button
          component={RouterLink}
          to="/register"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="grey"
        >
          Sign in to Blogs
        </Button>
      </Stack>
    </>
  );
};
