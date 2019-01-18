import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import classes from '../Inputs/style.css';
import TextField from '@material-ui/core/TextField';
import CalendarToday from '@material-ui/icons/CalendarToday';
import moment from 'moment';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class DatePicker extends React.Component {

  handleTextChange(event) {
    this.props.onSetCurrItemDate(event.target.value);
  }

  render() {
      const theme = createMuiTheme({
        palette: {
            primary: {
            main: this.props.categoriesColor,
            },
        },
    
      })

      
      let month = 1 + moment(this.props.currItemDate, 'YYYY-MM-DD').month(); 
      //let day   = this.state.value.format('D');
      //let year  = this.state.value.format('YYYY');
      console.log("month:" + month);
      //console.log("day:" + day);
      //console.log("year:" + year);

    return (
      <form className={classes.container} noValidate>
        <CalendarToday className={classes.icon} style={{'--category--color': this.props.categoriesColor}}/>
        <MuiThemeProvider theme={theme}>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={this.props.currItemDate}
            onChange={event => this.handleTextChange(event)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </MuiThemeProvider>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currItemDate: state.currItemDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onSetCurrItemDate: (date) => dispatch(actions.setCurrItemDate(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);