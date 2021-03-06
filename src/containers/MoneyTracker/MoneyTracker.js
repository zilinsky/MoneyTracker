import React, { Component } from 'react';
import classes from './MoneyTracker.css';
import MonthsCalendar from '../MonthsCalendar/MonthsCalendar';
import Items from '../../components/Items/Items';
import ItemModal from '../../components/UI/ItemModal/ItemModal';
import ExpensesPanel from '../../components/UI/ExpensesPanel/ExpensesPanel';
import moment from 'moment';
import NumberFormat from 'react-number-format';
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

    editItem = (id, item) => {
        console.log("editItem - clicked");

        this.props.onSetCurrItemAmount(item.amount);
        this.props.onSetCurrItemComment(item.comment);
        this.props.onetCurrItemCategory(item.category);
        this.props.onSetCurrItemDate(item.date);
        this.props.onSetCurrItemID(id);
        this.props.onSetCurrItemCategoryName(item.name);
        this.props.onSetCurrItemCategoryColor(item.color)

        this.props.onSetModalStatus(true, 'edit');
    };

    getCurrentDateFromChild = (value) => {
        this.setState({ currentDate: value });
    }

    render() {
        let currentMonths = this.state.currentDate.getMonth();
        let currentYears = this.state.currentDate.getFullYear();
        const arr = [];
        const arr2 = [];
        let temp;
        let a = 0;
        let currentExpenses = 0;

        let items = <p>For this Month you don't have any items</p>
       
        if (this.props.tms !== 'undefined') {
            //DatePanel logic
            for (let i = 0; i < this.props.tms.length; ++i) {
                if( (moment(this.props.tms[i].date, 'YYYY-MM-DD').month() === currentMonths) 
                    && (moment(this.props.tms[i].date, 'YYYY-MM-DD').year() === currentYears)) {
                        currentExpenses = this.props.tms[i].amount.floatValue + currentExpenses;
                }

                if (temp !== this.props.tms[i].date) {
                    arr.push(i);
                    a=0;
                    arr2[i] = this.props.tms[i].amount.floatValue;
                }
                else {
                    a++;
                    arr2[i-a] = this.props.tms[i].amount.floatValue + arr2[i-a];

                }
                temp = this.props.tms[i].date;
                console.log("switched");
            }
            console.log("arr: " + arr);
            console.log("arr2: " + arr2);
            console.log("current month: " + currentMonths  + " Current expenses this month: " + currentExpenses);

            items = (
                    this.props.tms.map((item, index) => {
                        return <div key={uniqid()}
                                >   {(moment(item.date, 'YYYY-MM-DD').month() === currentMonths) && (moment(item.date, 'YYYY-MM-DD').year() === currentYears) ? (
                                    <div>
                                      { (arr.includes(index)) ? 
                                        <div className={classes.DatePanel}>
                                            <p>{moment(item.date, 'YYYY-MM-DD').format("MMM DD YYYY")}</p>
                                            <NumberFormat className={classes.DatePanelNumberFormat} value={arr2[index]} displayType={'text'} thousandSeparator={true} prefix={'HUF '} />
                                        </div> 
                                        : null}
                                        <div onClick={() => this.editItem(item.id, item)}>
                                            <Items 
                                                /* onClick={() => this.editItem(item.id, item)} */
                                                icon={item.category}
                                                name={item.name}
                                                comment={item.comment}
                                                amount={item.amount.formattedValue}
                                                date={item.date}
                                                color={item.color}
                                            />   
                                        </div>
                                    </div>) : null }
                            </div>
                    })
                
            );
        }
        
        console.log("items: ");
        console.log(items);
        /* console.log("this.props.tms: ");
        console.log(this.props.tms); */


        return (
            <main className={classes.Main}>
                <div className={classes.Content}>
                    <MonthsCalendar getCurrentDate={this.getCurrentDateFromChild} currentDate={this.state.currentDate} />
                    <ExpensesPanel expenses={currentExpenses}/>
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
