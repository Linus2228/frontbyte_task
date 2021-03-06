import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Button from '@material-ui/core/Button'
import { UsersTableInt } from '../../utils/int'

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}))

const generateTableCellsDecorator = (initialId, titles) => () =>
  Object.values(titles).reduce((acc, item) => {
    acc.push({ title: item, id: initialId })
    initialId++
    return acc
  }, [])

const TablePaginationActions = props => {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  },
  tableContainer: {
    marginTop: 25
  }
})

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

export const UsersTable = props => {
  const { users, search, lang } = props
  const classes = useStyles2()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const history = useHistory()

  const { tableCells, edit } = UsersTableInt[lang]
  const updatedTableCells = generateTableCellsDecorator(0, tableCells)()

  useEffect(() => {
    setPage(0)
  }, [search])

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const renderTableCells = () => (
    <>
      {updatedTableCells.map(cell => (
        <StyledTableCell key={cell.id}>{cell.title}</StyledTableCell>
      ))}
    </>
  )

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>{renderTableCells()}</TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map(user => (
            <TableRow key={user.Id}>
              <TableCell component="th" scope="row">
                {user.Firstname}
              </TableCell>
              <TableCell>{user.Surname}</TableCell>
              <TableCell>{user.NationalityName}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push(`/users/${user.Id}`)
                  }}
                >
                  {edit}
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter align="left">
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  search: PropTypes.string,
  lang: PropTypes.string.isRequired
}

export default UsersTable
