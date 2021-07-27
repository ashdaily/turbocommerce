import React, { Component } from 'react';
import {
  Button,
  MenuItem,
  withStyles,
  FormControlLabel,
  Switch,
  IconButton
} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import styles from './style.module.css';
import { serviceCheckCuisine } from '../../services/Cuisine.service';
import {
  renderTextField,
  renderSelectField,
  renderOutlinedTextField,
  renderOutlinedSelectField,
  renderFileField,
  renderOutlinedMultipleSelectField
} from '../../libs/redux-material.utils';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

let requiredFields = [];
const validate = (values) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

let lastValue = '';
const isExists = false;

const asyncValidate = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    if (values.name) {
      const value = values.name;
      if (lastValue == value && isExists && false) {
        reject({ name: 'Category Name already Taken' });
      } else {
        const { data } = props;
        serviceCheckCuisine({ name: value, id: data ? data.id : null }).then((data) => {
          console.log(data);
          lastValue = value;
          if (!data.error) {
            if (data.data.is_exists) {
              reject({ name: 'Category Name already Taken' });
            }
          }
          resolve({});
        });
      }
    } else {
      resolve({});
    }
  });

class CreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'INDIVIDUAL',
      is_active: false,
      show_confirm: false
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleActive = this._handleActive.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleDialogClose = this._handleDialogClose.bind(this);
    this._suspendItem = this._suspendItem.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      requiredFields = ['name'];
      Object.keys(data).forEach((val) => {
        if (['image', 'status'].indexOf(val) == -1) {
          const temp = data[val];
          this.props.change(val, temp);
        }
      });
      this.setState({
        is_active: data.status == 'ACTIVE'
      });
    } else {
      requiredFields = ['name', 'image'];
      // this.props.change('type', 'INDIVIDUAL');
    }
  }

  // _handleTypeChange(e) {
  //     this.setState({
  //         type: e.target.value
  //     });
  // }

  _handleSubmit(tData) {
    console.log(tData);

    const status = this.state.is_active ? 'ACTIVE' : 'INACTIVE';
    const { data } = this.props;
    if (data) {
      this.props.handleDataSave({ ...tData, status, id: data.id }, 'UPDATE');
    } else {
      this.props.handleDataSave({ ...tData }, 'CREATE');
    }
  }

  // _handleReject() {
  //     const {data} = this.props;
  //     this.props.changeStatus(data, 'REJECT');
  // }

  _renderReject() {
    if (this.props.data) {
      return (
        <Button
          variant="contained"
          className={this.props.classes.btnError}
          onClick={this._handleReject}
          type="button"
        >
          Reject
        </Button>
      );
    }
    return null;
  }

  _renderMenuTypes() {
    return this.props.tour_types.map((val) => <MenuItem value={val.id}>{val.name}</MenuItem>);
  }

  _handleActive() {
    this.setState({
      is_active: !this.state.is_active
    });
  }

  _renderStatus() {
    const { data } = this.props;
    if (data) {
      return (
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={this.state.is_active}
              onChange={this._handleActive.bind(this)}
              value="is_active"
            />
          }
          label="Active ?"
        />
      );
    }
    return null;
  }

  _suspendItem() {
    const { data } = this.props;
    this.setState({
      show_confirm: false
    });
    this.props.handleDelete(data.id);
  }

  _handleDialogClose() {
    this.setState({
      show_confirm: false
    });
  }

  _handleDelete() {
    this.setState({
      show_confirm: true
    });
  }

  _renderDialog() {
    const { classes } = this.props;
    if (this.state.show_confirm) {
      return (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={this.state.show_confirm}
          onClose={this._handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="alert-dialog-title">Are You Sure</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this._suspendItem} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div>
        <div className={styles.headerFlex}>
          <h4 className={styles.infoTitle}>
            <div className={styles.heading}>Cuisine</div>
            <Tooltip title="Add Cuisine Details" aria-label="info" placement="right">
              <InfoIcon fontSize="small" />
            </Tooltip>
          </h4>
          {data && (
            <IconButton
              variant="contained"
              className={this.props.classes.iconBtnError}
              onClick={this._handleDelete}
              type="button"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>

        <form onSubmit={handleSubmit(this._handleSubmit)}>
          <div className="formFlex" style={{ alignItems: 'center' }}>
            {/* <div> */}
            {/*    <Field */}
            {/*        max_size={2*1024*1024} */}
            {/*        type={['jpg', 'png', 'pdf', 'jpeg']} */}
            {/*        fullWidth={true} */}
            {/*        name="image" */}
            {/*        component={renderFileField} */}
            {/*        label="Tag Image" */}
            {/*        show_image */}
            {/*    /> */}
            {/* </div> */}
            <div className="formGroup">
              <Field
                fullWidth
                name="name"
                component={renderOutlinedTextField}
                margin="dense"
                label=" Name"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10px' }}>
            <div>{this._renderStatus()}</div>
            <Button className="sub" variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>

          {/* <div style={{textAlign: 'right'}}> */}
          {/* <Button variant={'contained'} className={this.props.classes.btnSuccess} type="submit"> */}
          {/* Approve */}
          {/* </Button> */}
          {/* {this._renderReject()} */}
          {/* </div> */}
        </form>
        {this._renderDialog()}
      </div>
    );
  }
}

const useStyle = (theme) => ({
  btnSuccess: {
    backgroundColor: theme.palette.success.dark,
    color: 'white',
    marginRight: 5,
    marginLeft: 5,
    '&:hover': {
      backgroundColor: theme.palette.success.main
    }
  },
  btnError: {
    backgroundColor: theme.palette.error.dark,
    color: 'white',
    marginLeft: 5,
    marginRight: 5,
    '&:hover': {
      backgroundColor: theme.palette.error.main
    }
  },
  iconBtnError: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    right: '10px'
  }
});

const ReduxForm = reduxForm({
  form: 'createprovider', // a unique identifier for this form
  validate,
  asyncValidate,
  // asyncValidate,
  // asyncBlurField: ['email'],
  enableReinitialize: true
  // onSubmitFail: errors => {
  //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, 'Rejected');
  // }
})(withStyles(useStyle, { withTheme: true })(CreateContainer));

const mapStateToProps = (state) =>
  // console.log(user_profile);
  ({});
export default connect(mapStateToProps, null)(ReduxForm);
