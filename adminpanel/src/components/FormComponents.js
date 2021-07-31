import React from 'react';
import SelectField from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText, TextField } from '@material-ui/core';

const CustomSelectField = ({ onChange, isError, label, errorText, children }) => (
  <FormControl fullWidth variant="outlined" size="small" error={isError}>
    <InputLabel>{label}</InputLabel>
    <SelectField
      onChange={() => {
        // eslint-disable-next-line no-unused-expressions
        onChange && onChange();
      }}
    >
      {children}
    </SelectField>
    <FormHelperText>{errorText}</FormHelperText>
  </FormControl>
);

const CustomTextField = ({ isError, label, errroText, multiline, rows }) => (
  <TextField
    multiline={multiline}
    rows={rows}
    size="small"
    fullWidth
    error={isError}
    helperText={isError ? errroText : ''}
    label={label}
    variant="outlined"
  />
);

CustomTextField.defaultProps = {
  multiline: false,
  rows: 1
};

export { CustomTextField, CustomSelectField };
