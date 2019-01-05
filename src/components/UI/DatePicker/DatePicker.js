import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import classes from '../Inputs/style.css';
import TextField from '@material-ui/core/TextField';
import CalendarToday from '@material-ui/icons/CalendarToday';
import moment from 'moment';




class DatePicker extends React.Component {

  state = {
    value: moment().format("YYYY-MM-DD")
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
      const theme = createMuiTheme({
        palette: {
            primary: {
            main: this.props.categoriesColor,
            },
        },
    
      })

      
      let month = 1 + moment(this.state.value, 'YYYY-MM-DD').month(); 
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
            value={this.state.value}
            onChange={this.handleChange('value')}
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

export default DatePicker;