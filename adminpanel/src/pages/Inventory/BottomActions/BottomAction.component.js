import React, { Component } from 'react';
import { Button, MenuItem } from '@material-ui/core';
import { Bookmark, BookmarkBorder, Check, AddCircle as AddIcon } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from './Style.module.css';
import {
  renderOutlinedSelectField,
  renderOutlinedTextField
} from '../../../libs/redux-material.utils';
import EventEmitter from '../../../libs/Events.utils';
import BatchDialog from './BatchDialog.component';

const validate = (values) => {
  const requiredFields = ['quantity'];
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field] && values[field] != 0) {
      errors[field] = 'Required';
    } else if (values[field] && typeof values[field] === 'string' && !values[field].trim()) {
      errors[field] = 'Required';
    } else if (values[field] && Array.isArray(values[field]) && values[field].length == 0) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

class BottomAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog_open: false
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDialog = this._handleDialog.bind(this);
  }

  componentDidMount() {
    // this.props.actionFetchBatch();
  }

  _handleSubmit(tData) {
    this.props.handleAssign(tData);
  }

  _handleDialog() {
    this.setState({
      dialog_open: !this.state.dialog_open
    });
  }

  render() {
    const { dialog_open } = this.state;
    const { selected, batches, handleSubmit } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.bottomSide}>
          <label htmlFor="">{selected} Selected</label>
        </div>
        <div className={styles.bottomCenter}>
          <form onSubmit={handleSubmit(this._handleSubmit)}>
            <div className={styles.formFlex}>
              <div className={styles.fieldCont}>
                <Field
                  fullWidth
                  name="quantity"
                  component={renderOutlinedTextField}
                  type="number"
                  margin="dense"
                  label="Quantity"
                />
              </div>
              <div className={styles.buttonCont}>
                <Button type="submit" startIcon={<Check />}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.bottomSide}>
          <div className={styles.buttonCont}>
            {/* <Button */}
            {/* onClick={this._handleDialog} */}
            {/* startIcon={<AddIcon/>} */}
            {/* >Add Batch</Button> */}
          </div>
        </div>
        {/* <BatchDialog open={dialog_open} handleClose={this._handleDialog}></BatchDialog> */}
      </div>
    );
  }
}

const ReduxForm = reduxForm({
  form: 'quantity_form', // a unique identifier for this form
  validate,
  enableReinitialize: false,
  onSubmitFail: (errors) => {
    console.log(errors);
    // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
  }
})(BottomAction);
export default ReduxForm;
