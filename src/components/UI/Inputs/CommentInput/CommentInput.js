import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import classes from '../style.css';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

class CommentInput extends React.Component {

    state = {
        name: '',

    };

    handleTextChange(event) {
        this.props.onSetCurrItemComment(event.target.value);
    }

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
                <CreateOutlined className={classes.icon} style={{ '--category--color': this.props.categoriesColor }} />
                <MuiThemeProvider theme={theme}>
                    <TextField
                        id="outlined-dense"
                        label="Write a note here..."
                        margin="dense"
                        variant="outlined"
                        className={classes.textField}
                        value={this.props.currItemComment}
                        onChange={event => this.handleTextChange(event)}
                    />
                </MuiThemeProvider>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        currItemComment: state.currItemComment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCurrItemComment: (comment) => dispatch(actions.setCurrItemComment(comment))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);