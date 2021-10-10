 /* -------------------------------- material -------------------------------- */
import { experimentalStyled as styled } from '@material-ui/core/styles';

/* --------------------------- router components --------------------------- */
import { Outlet } from 'react-router-dom';

/* ----------------------------- core components ----------------------------- */
import Header from './Header';
import HeaderLinks from './HeaderLinks';
import Footer from './Footer';


const RootStyle = styled('div')({
});

const MainStyle = styled('div')(({ theme }) => ({
  padding: 33,
  backgroundColor: "#e0e8f3",
  minHeight: '605px'
}));

/* -------------------------------------------------------------------------- */
/*                              Logged in layout                              */
/* -------------------------------------------------------------------------- */
export function LoggedInLayout(props) {

  const { ...rest } = props;
  const dashboardRoutes = [];
  
  return (
    <RootStyle>
      <Header 
        routes={dashboardRoutes}
        brand="Blogs"
        rightLinks={<HeaderLinks />}
        fixed
        color ="rose"
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <MainStyle className="main">
        <div sx={{ minHeight: '650px;' }}>
          <Outlet />
        </div>
      </MainStyle>
      <Footer />
    </RootStyle>
  );
}
