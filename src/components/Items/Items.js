import React from 'react';
import classes from './Items.css'
import Icon from '@material-ui/core/Icon';



const Items = (props) => { 
    /* console.log(props); */
    return (
       <div className={classes.Box}>
            <Icon>{props.icon}</Icon>
            <p>{props.category}</p>
            <p>{props.comment}</p>
            <p>{props.amount}</p>
            <p>{props.date}</p>
       </div>
    );
};

 export default Items;