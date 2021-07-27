import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { lighten } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns
  } = props;
  const createSortHandler = (property) => (event) => {
    console.log('createSortHandler', event, property);
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox"> */}
        {/*    <Checkbox */}
        {/*        indeterminate={numSelected > 0 && numSelected < rowCount} */}
        {/*        checked={numSelected === rowCount} */}
        {/*        onChange={onSelectAllClick} */}
        {/*        inputProps={{'aria-label': 'select all desserts'}} */}
        {/*    /> */}
        {/* </TableCell> */}
        {columns.map((headCell) => (
          <TableCell
            key={headCell.key}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.key ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.key}
                direction={order}
                onClick={createSortHandler(headCell.key)}
              >
                {headCell.label}
                {orderBy === headCell.key ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      // [classes.highlight]: numSelected > 0,
      className={classNames(classes.root)}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = {
  root: {
    width: '100%'
  },
  centerText: {
    textAlign: 'center'
  },
  paper: {
    width: '100%'
    // marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 750,
    fontSize: '10px'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
};

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5
    };
    this._handleChangeDense = this._handleChangeDense.bind(this);
    this._handleChangePage = this._handleChangePage.bind(this);
    this._handleChangeRowsPerPage = this._handleChangeRowsPerPage.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleRequestSort = this._handleRequestSort.bind(this);
    this._handleSelectAllClick = this._handleSelectAllClick.bind(this);
  }

  _handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState(
      {
        order: isDesc ? 'asc' : 'desc',
        orderBy: property
      },
      () => {
        this.props.onSortOrderChange(this.state.orderBy, this.state.order);
      }
    );

    // setOrder(isDesc ? 'asc/*' : 'desc');
    // setOrderBy(property);*/
  };

  _handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      // setSelected(newSelecteds);
      this.setState({
        selected: newSelecteds
      });
      return;
    }
    // setSelected([]);
    this.setState({
      selected: []
    });
  };

  _handleClick = (event, name) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    // setSelected(newSelected);
    this.setState({
      selected: newSelected
    });
  };

  _handleChangePage = (event, newPage) => {
    this.props.onPageChange(newPage);
    // setPage(newPage);
    // this.setState({
    //     page: newPage,
    // })
  };

  _handleChangeRowsPerPage = (event) => {
    // this.setState({
    //     rowsPerPage: event.target.value,
    //     page: 0,
    // });
    this.props.onRowSizeChange(event.target.value);
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };

  _handleChangeDense = (event) => {
    // setDense(event.target.checked);
  };

  _renderTableCells(row) {
    const { columns } = this.props;
    return columns.map((val, index) => (
      <TableCell style={'style' in val ? val.style : {}}>{val.render(row[val.key], row)}</TableCell>
    ));
  }

  _renderTableBody() {
    const { data, classes } = this.props;
    const { rowsPerPage, page, order, orderBy, selected, dense } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    if (data.length > 0) {
      return data.map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => {
              console.log('tablerowclick', event.target.innerHTML);
            }}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={`${row.id}${Math.random()}`}
            selected={isItemSelected}
          >
            {this._renderTableCells(row)}
          </TableRow>
        );
      });
    }
    return (
      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
        <TableCell colSpan={this.props.columns.length} classes={{ root: classes.centerText }}>
          <strong>No Data Available</strong>
        </TableCell>
      </TableRow>
    );
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, dense } = this.state;
    const { page, rowsPerPageOptions, rowsPerPage, count } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          {/* <EnhancedTableToolbar numSelected={selected.length}/> */}
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this._handleSelectAllClick}
                onRequestSort={this._handleRequestSort}
                rowCount={rows.length}
                columns={this.props.columns}
              />
              <TableBody>{this._renderTableBody()}</TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this._handleChangePage}
            onChangeRowsPerPage={this._handleChangeRowsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(EnhancedTable);
