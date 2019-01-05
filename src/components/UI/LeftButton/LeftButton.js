import React from 'react';
import classes from './LeftButton.css';

const leftbutton = ( props ) => (
    <div className={classes.LeftButton}>
        <i  style={{marginBottom: 'auto',marginTop: 'auto'}} 
            className="material-icons"
            onClick={props.clicked}>
            keyboard_arrow_left
        </i>
    </div>    
        
);

export default leftbutton;