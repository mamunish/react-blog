import React, { useEffect } from "react";

/* --------------------------- material components -------------------------- */
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  Chip,
  Card,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

/* ----------------------------- redux component ---------------------------- */
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

/* ----------------------------- core components ---------------------------- */
import { userActions } from "../Actions";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";

import styles from "../Assets/js/views/Sections/blogStyle.js";

const columns = [
  { id: "name", label: "Name" },

  {
    id: "email",
    label: "Email",
    align: "right",
  },
  { id: "status", label: "STATUS" },
  { id: "action", label: "ACTIONS" },
];

const useStyles = makeStyles({
  ...styles,
  success: {
    backgroundColor: "green",
    color: "#fff",
  },
  pending: {
    backgroundColor: "gray",
    color: "#fff",
  },
  canceled: {
    backgroundColor: "red",
    color: "#fff",
  },
});

/* -------------------------------------------------------------------------- */
/*                               Users contents                               */
/* -------------------------------------------------------------------------- */

export function Users() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);

  const theme = useTheme();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const users = useSelector((state) => state.users.items) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function handleChange(event, id) {
      console.log(event, id)
    await sleep(500); // simulate server latency
    const status ={ status : event.target.value}
    dispatch(userActions.update(status, id));
  }

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our Users </h2>
      <div>
        <GridContainer style={{ padding: "21px 52px" }}>
          <GridItem xs={12} sm={12} md={12}>
            <TableContainer component={Card}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{
                          backgroundColor: "#f5b5b2",
                          color: "#fff",
                        }}
                        key={column.id}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          <TableCell>{row.name}</TableCell>

                          <TableCell>{row.email} </TableCell>

                          <TableCell>
                            {(row.status === true && (
                              <Chip
                                label="ACTIVE"
                                className={classes.success}
                              />
                            )) ||
                              (row.status === false && (
                                <Chip
                                  label="BANNED"
                                  className={classes.canceled}
                                />
                              ))}
                          </TableCell>
                          <TableCell>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <Select
                                onChange={(event) => handleChange(event, row._id)}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Banned</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {users.length === 0 && (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>No Transaction found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
