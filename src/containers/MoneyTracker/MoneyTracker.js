import React, { Component } from 'react';
import classes from './MoneyTracker.css';
import MonthsCalendar from '../MonthsCalendar/MonthsCalendar';
import Items from '../../components/Items/Items';
import ItemModal from '../../components/UI/ItemModal/ItemModal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import * as actionCreators from '../../store/actions/index'
import { connect } from 'react-redux';


//package for unique keys
let uniqid = require('uniqid');


class MoneyTracker extends Component {
    state = {
        currentDate: new Date()
    }

    componentDidMount () {
        this.props.onFetchItems();
    }

    getCurrentDateFromChild = (value) => {
        this.setState({ currentDate: value });
    }

    render() {
        let currentMonths = this.state.currentDate.getMonth();
        let currentYears = this.state.currentDate.getFullYear();

        let items = <p>For this Month you don't have any items</p>

        console.log("this.props.tms");
        console.log(this.props.tms);

        if (this.props.tms) {
            items = (
                <div>
                    {this.props.tms.map((item, index) => {
                        return <div key={uniqid()}>{(moment(item.date, 'YYYY-MM-DD').month() === currentMonths) && (moment(item.date, 'YYYY-MM-DD').year() === currentYears) ? (
                            <div><Items
                                icon={item.category}
                                comment={item.comment}
                                amount={item.amount}
                                date={item.date}
                                
                            />
                                <IconButton color="inherit" onClick={() => this.props.onDeleteItems(item.id)} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                            </div>) : null}
                        </div>
                    })}
                </div>
            );
        }

        return (
            <main className={classes.Main}>
                <div className={classes.Content}>
                    <MonthsCalendar getCurrentDate={this.getCurrentDateFromChild} currentDate={this.state.currentDate} />
                    {items}
                    <ItemModal></ItemModal>
                    {/* <Button onClick={() => this.getID(testvar)} variant="contained" className={classes.button}>
                        Default
                    </Button> */}
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        tms: state.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchItems: () => dispatch( actionCreators.fetchItems() ),
        onDeleteItems: (id) => dispatch( actionCreators.deleteItems(id) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTracker);
