import React from 'react';
import classes from './Items.css'
import Icon from '@material-ui/core/Icon';



const Items = (props) => { 
    return (
       <div className={classes.Item}>
                <div className={classes.OuterBox}>
                <div className={classes.Circle} style={{ 'backgroundColor': props.color }}>
                    <Icon className={classes.Icon} >{props.icon}</Icon>
                </div>
            </div>
            <div className={classes.NameBox}>
                <p className={classes.Name}>{props.name}</p>
                <p className={classes.Comment}>{props.comment}</p>
            </div>
{/*             <p className={classes.Date}>{props.date}</p>
 */}            <p className={classes.Amount}>{props.amount}</p>
       </div>
    );
};

 export default Items;