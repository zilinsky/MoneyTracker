import React, { Component } from 'react';
import classes from './MonthsCalendar.css';
import LeftButton from '../../components/UI/LeftButton/LeftButton';
import RightButton from '../../components/UI/RightButton/RigthButton';


class MonthsCalendar extends Component {
    state = {
        months: ["January", "February", "March", "April", "May", "June", "July",
                "August","September", "October", "November", "December" ],
        currentDate: new Date()
    }

    leftClickHandler = () => {
        let pickedMonth = new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth() -1));
        this.setState( { currentDate: pickedMonth } );
        this.props.getCurrentDate(this.state.currentDate);
        
    }

    rightClickHandler = () => {
        let pickedMonth = new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth() +1));
        this.setState( { currentDate: pickedMonth } );
        this.props.getCurrentDate(this.state.currentDate);
       


    }
     
    render() {
        console.log("From [MonthsCalendar]" + this.state.currentDate);
        return(
            <main className={classes.Main}>
                    <LeftButton clicked={this.leftClickHandler}/>
                    <p className={classes.CurrentDate}>
                        {this.state.months[this.state.currentDate.getMonth()]}
                        &nbsp;
                        {this.state.currentDate.getFullYear()} 
                    </p>
                    {/* <Button>&#x3E;</Button> */}
                    <RightButton clicked={this.rightClickHandler}/>
            </main>
        )
    }
}

export default MonthsCalendar;
