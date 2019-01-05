import React from 'react';
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import classes from './AmountInput.css';
import NumberFormat from 'react-number-format';



class AmountInput extends React.Component {

    state = {
        amount: '0'
    }

    /* NumberFormat value={this.state.profit} thousandSeparator={true} prefix={'$'} onValueChange={(values) => {
        const {formattedValue, value} = values;
        // formattedValue = $2,223
        // value ie, 2223
        this.setState({profit: formattedValue})
      }}/> */

    render() {
        console.log("amount " + this.state.amount);
        return (
            <div className={classes.container}>
                <NumberFormat 
                        thousandSeparator={true} 
                        prefix={this.props.currencyType} 
                        className={classes.numberFormatStyle}
                        onValueChange={(values) => {
                            const {formattedValue, value} = values;
                            this.setState({amount: formattedValue})
                        }}
                        placeholder="HUF 0"
                >
                </NumberFormat>
            </div>
        );
    }
}

  
export default AmountInput;