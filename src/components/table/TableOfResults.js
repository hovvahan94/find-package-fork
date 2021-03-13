import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { selectForksData, selectForksError } from '../../reducers/forks/forksSlice';
import { useSelector } from 'react-redux';
import TablePaginationActions from '../../features/pagination/TablePaginationActions';
import TableHead from '@material-ui/core/TableHead';
import { Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';


const columns = [
  { id: 'full_name', label: 'Repo fullname' },
  { id: 'owner', label: 'Owner', align: 'center' },
  {
    id: 'stargazers_count',
    label: 'Stars count',
    align: 'center',
    size: 'small'
  },
  {
    id: 'clone_url',
    label: 'Fork repo link',
    align: 'right'
  },
  {
    id: 'favourite',
    label: 'Favourite',
    align: 'right',
    size: 'small'
  },
];

function TableOfResults() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('fpfFavourites')) || [])
  const rows = useSelector(selectForksData);
  const error = useSelector(selectForksError);
  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const favouriteHandler = (repoId) => {
    if (favourites.indexOf(repoId) === -1)
    {
      setFavourites([...favourites, repoId]);
      localStorage.setItem("fpfFavourites", JSON.stringify([...favourites, repoId]));
    }
    else {
      setFavourites(favourites.filter(e => e !== repoId))
      localStorage.setItem("fpfFavourites", JSON.stringify(favourites.filter(e => e !== repoId)));
    }
  }

  console.log(rows)

  return (
    <>
      {rows.length !== 0 && <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead >
            <TableRow className={classes.theadrow}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  size={column.size}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.full_name}
                </TableCell>
                <TableCell align="center">
                  {row.owner.login}
                </TableCell>
                <TableCell size='small' align="center">
                  {row.stargazers_count}
                </TableCell>
                <TableCell align="right">
                  <a href={row.clone_url} target="_blank">{row.clone_url}</a>
                </TableCell>
                <TableCell size='small' align="right">
                  <StarIcon color={favourites.indexOf(row.id) !== -1 ? 'action' : 'disabled'} onClick={e => favouriteHandler(row.id)}/>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>}
      {error && <Typography align='center' color='primary' variant='h3'>{error}</Typography>}
    </>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
  theadrow: {
    borderTop: '1px solid rgba(224, 224, 224, 1)'
  }
});

export default TableOfResults;