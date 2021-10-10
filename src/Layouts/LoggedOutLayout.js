/* --------------------------- material components -------------------------- */
import Container from "@material-ui/core/Container";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { Outlet } from "react-router-dom";

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const ContentStyle = styled(Box)(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

/* -------------------------------------------------------------------------- */
/*                          Logged out layout content                         */
/* -------------------------------------------------------------------------- */
export const LoggedOutLayout = () => {
  return (
    <RootStyle title="Login">
      <Container maxWidth="sm">
        <ContentStyle>
          <Outlet />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
