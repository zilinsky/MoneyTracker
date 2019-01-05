import React from 'react';
import classes from './RightButton.css';

const rightbutton = ( props ) => (
    <div className={classes.RightButton}>
        <i  style={{marginBottom: 'auto',marginTop: 'auto'}} 
            className="material-icons"
            onClick={props.clicked}>
            keyboard_arrow_right
        </i>
    </div>    
        
);

export default rightbutton;