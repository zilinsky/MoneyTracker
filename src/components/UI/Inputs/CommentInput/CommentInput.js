import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import classes from '../style.css';

const commentInput = (props) => {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: props.categoriesColor,
            },
        },
    })

    return (
        <div className={classes.container}>
            <CreateOutlined className={classes.icon} style={{'--category--color': props.categoriesColor}}/>
            <MuiThemeProvider theme={theme}>
                <TextField 
                    id="outlined-dense"
                    label="Write a note here..."
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                />
            </MuiThemeProvider>
        </div>
    );
};

  
export default commentInput;