import React from 'react';
import classes from './AmountInput.css';
import NumberFormat from 'react-number-format';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';



class AmountInput extends React.Component {

    state = {
        amount: '0'
    }
    
    handleTextChange(val) {
        this.props.onSetCurrItemAmount(val);
    }

    render() {
        return (
            <div className={classes.container}>
                <NumberFormat 
                        thousandSeparator={true} 
                        prefix={this.props.currencyType} 
                        className={classes.numberFormatStyle}
                        onValueChange={values => this.handleTextChange(values)}
                        placeholder="HUF 0"
                        //isNumericString={true}
                        value={this.props.currItemAmount.floatValue}
                >
                </NumberFormat>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currItemAmount: state.currItemAmount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCurrItemAmount: (amount) => dispatch(actions.setCurrItemAmount(amount))
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(AmountInput);