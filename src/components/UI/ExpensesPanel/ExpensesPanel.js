import React from 'react';
import classes from './ExpensesPanel.css';


const expensesPanel = ( props ) => (
    <div>
        <p>Expenses: {props.expenses}</p>
    </div>    
        
);

export default expensesPanel;