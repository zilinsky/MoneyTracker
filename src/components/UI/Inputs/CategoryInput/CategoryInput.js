import React from 'react';
import classes from '../style.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import HelpOutline from '@material-ui/icons/HelpOutline';


class CategoryInput extends React.Component {
    
    state = {
         value: 'default',
         categories: [],
         loading: true
     }; 

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
      name = event.target.value;
      this.props.onSelectcolor(name);
    };

    /* returnColor = (obj, val) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(obj[key].id === val) {
                    return obj[key].color;
                }
                
            }
        }
    } */

    

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
                <HelpOutline className={classes.icon} style={{'--category--color': this.props.categoriesColor}}/>
                <MuiThemeProvider theme={theme}>
                <TextField 
                    id="outlined-select-value"
                    select
                    label="Please select a category"
                    className={classes.textField}
                    value={this.state.value}
                    onChange={this.handleChange('value')}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={this.submitHandler}
                >
                {this.props.categoriesVar} 
                </TextField>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default CategoryInput;