import React, { Component } from 'react';
import classes from './MoneyTracker.css';
import MonthsCalendar from '../MonthsCalendar/MonthsCalendar';
import Items from '../../components/Items/Items';
import ItemModal from '../../components/UI/ItemModal/ItemModal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

import * as actionTypes from '../../store/actions/actionTypes';
import { connect } from 'react-redux';

class MoneyTracker extends Component {
    state = {
        currentDate: new Date()
    }

    getCurrentDateFromChild = (value) => {
        this.setState({ currentDate: value });
    }

    render() {
        let currentMonths = this.state.currentDate.getMonth();
        let currentYears = this.state.currentDate.getFullYear();

        let items = <p>For this Month you don't have any items</p>
        if (this.props.tms) {
            items = (
                <div>
                    {this.props.tms.map((item) => {
                        return <div>{(moment(item.date, 'YYYY-MM-DD').month() === currentMonths) && (moment(item.date, 'YYYY-MM-DD').year() === currentYears) ? (
                            <div><Items
                                key={item.id}
                                icon={item.icon}
                                categoryName={item.categoryName}
                                comment={item.comment}
                                amount={item.amount}
                                date={item.date}
                            />
                                <IconButton color="inherit" onClick={() => this.props.onRemovedItem(item.id)} aria-label="Close">
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
        onRemovedItem: (id) => dispatch({ type: actionTypes.DELETE_ITEM, itemId: id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTracker);
