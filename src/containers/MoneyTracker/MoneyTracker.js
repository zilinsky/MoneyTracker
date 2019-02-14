import React, { Component } from 'react';
import classes from './MoneyTracker.css';
import MonthsCalendar from '../MonthsCalendar/MonthsCalendar';
import Items from '../../components/Items/Items';
import ItemModal from '../../components/UI/ItemModal/ItemModal';
import moment from 'moment';
import * as actionCreators from '../../store/actions/index'
import { connect } from 'react-redux';


//package for unique keys
let uniqid = require('uniqid');


class MoneyTracker extends Component {
    state = {
        currentDate: new Date()
    }

    componentDidMount() {
        this.props.onFetchItems();
    }

    editItem(id, item) {

        this.props.onSetCurrItemAmount(item.amount);
        this.props.onSetCurrItemComment(item.comment);
        this.props.onetCurrItemCategory(item.category);
        this.props.onSetCurrItemDate(item.date);
        this.props.onSetCurrItemID(id);
        this.props.onSetCurrItemCategoryName(item.name);
        this.props.onSetCurrItemCategoryColor(item.color)

        this.props.onSetModalStatus(true, 'edit');
    }

    getCurrentDateFromChild = (value) => {
        this.setState({ currentDate: value });
    }

    render() {
        let currentMonths = this.state.currentDate.getMonth();
        let currentYears = this.state.currentDate.getFullYear();

        const arr = [0,1,2,3];
        let i=1;

        let items = <p>For this Month you don't have any items</p>

        if (this.props.tms !== 'undefined') {
            items = (
                <div>
                    {this.props.tms.map((item, index) => {
                        return <div onClick={() => this.editItem(item.id, item)}
                                    className={classes.Test}
                                    key={uniqid()}
                                >   {(moment(item.date, 'YYYY-MM-DD').month() === currentMonths) && (moment(item.date, 'YYYY-MM-DD').year() === currentYears) ? (
                                    <div>
                                     { (arr.includes(index)) ? <div>{item.date}</div> : null}
                                        
                                        <Items
                                            icon={item.category}
                                            name={item.name}
                                            comment={item.comment}
                                            amount={item.amount.formattedValue}
                                            date={item.date}
                                          color={item.color}

                                        />
                                    </div>) : null}
                            </div>
                    })}
                </div>
            );
            console.log(this.props.tms);
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
        tms: state.items,
        open: state.open
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchItems: () => dispatch(actionCreators.fetchItems()),
        onDeleteItems: (id) => dispatch(actionCreators.deleteItems(id)),
        onEditItems: (id, item) => dispatch(actionCreators.editItems(id, item)),
        onSetModalStatus: (open, type) => dispatch(actionCreators.setModalStatus(open, type)),
        onSetCurrItemComment: (comment) => dispatch(actionCreators.setCurrItemComment(comment)),
        onSetCurrItemAmount: (amount) => dispatch(actionCreators.setCurrItemAmount(amount)),
        onetCurrItemCategory: (category) => dispatch(actionCreators.setCurrItemCategory(category)),
        onSetCurrItemDate: (date) => dispatch(actionCreators.setCurrItemDate(date)),
        onSetCurrItemCategoryName: (name) => dispatch(actionCreators.setCurrItemCategoryName(name)),
        onSetCurrItemCategoryColor: (color) => dispatch(actionCreators.setCurrItemCategoryColor(color)),
        onSetCurrItemID: (id) => dispatch(actionCreators.setCurrItemID(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTracker);
