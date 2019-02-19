import React from 'react';
import classes from './Header.css';
import * as imports from '../../../imports';


const defaultColor = imports.defaultColor;

const header = ( props ) => (
    <header style={{ '--default--color': defaultColor }} className={classes.Header}>
    </header>    
        
);

export default header;