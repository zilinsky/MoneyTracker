import React from 'react';
import classes from '../style.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import HelpOutline from '@material-ui/icons/HelpOutline';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

class CategoryInput extends React.Component {

    state = {
        value: 'default',
        categories: [],
        loading: true
    };

    handleChange = name => event => {
        this.props.onSetCurrItemCategory(event.target.value);
        name = event.target.value;
        this.props.onSelectcolor(name);
        this.props.onSetCurrItemCategoryName(this.props.categories.expenses[name].Name);
        this.props.onSetCurrItemCategoryColor(this.props.categories.expenses[name].Color)
    };


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: this.props.categoriesColor,
                },
            },
        })

        return (
            <div className={classes.container}>
                <HelpOutline className={classes.icon} style={{ '--category--color': this.props.categoriesColor }} />
                <MuiThemeProvider theme={theme}>
                    <TextField
                        id="outlined-select-value"
                        select
                        label="Please select a category"
                        className={classes.textField}
                        value={this.props.currItemCategory}
                        onChange={this.handleChange('currItemCategory')}
                        margin="normal"
                        variant="outlined"
                    >
                        {this.props.categoriesVar}
                    </TextField>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currItemCategory: state.currItemCategory,
        categories: state.categories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCurrItemCategory: (category) => dispatch(actions.setCurrItemCategory(category)),
        onSetCurrItemCategoryName: (name) => dispatch(actions.setCurrItemCategoryName(name)),
        onSetCurrItemCategoryColor: (color) => dispatch(actions.setCurrItemCategoryColor(color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInput);