import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { COLOR_PRIMARY } from '../constants'

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    color: COLOR_PRIMARY
  }
}))(TableCell)

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#343944'
    },
    '&:hover': {
      backgroundColor: '#414855'
    }
  }
}))(TableRow)
