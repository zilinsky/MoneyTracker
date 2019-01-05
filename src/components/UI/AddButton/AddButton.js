import React from 'react';
import classes from './AddButton.css';


import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const addButton = (props) => {
    return (
        <Button onClick={props.clicked} variant="fab" aria-label="Add" className={classes.button} >
            <AddIcon />
        </Button>
    );
};

export default addButton;