import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/core/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { createBrowserHistory } from "history";


/* ------------------ using routes handle in routes floder ------------------ */

import Route from "./Routes";

/* ------------------- using alert action for notification ------------------ */

import { alertActions } from './Actions';

/* --------------------------- using theme config --------------------------- */
import ThemeConfig from "./Theme";


export default function App() {
  const history = createBrowserHistory({ forceRefresh: true });

  const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    
  return (
    <ThemeConfig>
      {alert.message &&
        <>
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => dispatch(alertActions.clear())}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert  severity={alert.type} onClose={() => dispatch(alertActions.clear())}>
              {alert.message}
            </Alert>
          </Snackbar>
        </>
      }
      
      <Route history={history} />
    </ThemeConfig>
  );
}
