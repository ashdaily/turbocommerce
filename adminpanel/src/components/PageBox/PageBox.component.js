import React from 'react';
import classnames from 'classnames';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const Widget = ({
  classes,
  children,
  title,
  noBodyPadding,
  bodyClass,
  className,
  disableWidgetMenu,
  ...props
}) => (
  <div className={classes.widgetWrapper}>
    <Paper elevation={5} className={classes.paper} classes={{ root: classes.widgetRoot }}>
      <div
        className={classnames(classes.widgetBody, {
          [classes.noPadding]: noBodyPadding,
          [bodyClass]: bodyClass
        })}
      >
        {children}
      </div>
    </Paper>
  </div>
);

const styles = (theme) => ({
  widgetWrapper: {
    display: 'flex',
    minHeight: '100%'
  },
  widgetHeader: {
    padding: theme.spacing(10),
    paddingBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget
  },
  widgetBody: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  noPadding: {
    padding: 0
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden'
  },
  moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'rgba(255, 255, 255, 0.35)'
    }
  }
});

export default withStyles(styles, { withTheme: true })(Widget);
