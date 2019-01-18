/* eslint-disable default-case */
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [
           
        {id: 1, icon: 'add_circle', categoryName: 'Circle', comment: 'TestComment1', amount: 91, date: '2018-12-31'},
        {id: 2, icon: 'face', categoryName: 'Faceeee', comment: 'TestComment2', amount: 92, date: '2018-11-20'},
        {id: 3, icon: 'alarm', categoryName: 'Alarm', comment: 'TestComment3', amount: 93, date: '2018-11-20'},
        {id: 4, icon: 'commute', categoryName: 'Alarm', comment: 'TestComment3', amount: 93, date: '2019-01-01'},
        {id: 5, icon: 'done', categoryName: 'Alarm', comment: 'TestComment3', amount: 93, date: '2018-12-01'},
        {id: 6, icon: 'launch', categoryName: 'Alarm', comment: 'TestComment3', amount: 93, date: '2018-10-20'}
    
    ],
    /* currentItem: {id: null, icon: null, categoryName: null, comment: null, amount: null, date: null}, */
    currItemComment: '',
    currItemAmount: '',
    currItemCategory: '',
    currItemDate: moment().format("YYYY-MM-DD"),
    categories: null,
    error: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ITEM:
            const newItem = {
                id: Math.random(), // not really unique but good enough here!
                icon: action.itemsData.icon,
                categoryName: action.itemsData.categoryName,
                comment: action.itemsData.comment,
                amount: action.itemsData.amount,
                date: action.itemsData.date
            };
            return {
                ...state,
                items: state.items.concat( newItem )
            };
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.itemId)
            };
        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case actionTypes.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.SET_CURR_ITEM_COMMENT:
        return {
            ...state,
            currItemComment: action.currItemComment
        };
        case actionTypes.SET_CURR_ITEM_AMOUNT:
        return {
            ...state,
            currItemAmount: action.currItemAmount
        };
        case actionTypes.SET_CURR_ITEM_CATEGORY:
        return {
            ...state,
            currItemCategory: action.currItemCategory
        };
        case actionTypes.SET_CURR_ITEM_DATE:
        return {
            ...state,
            currItemDate: action.currItemDate
        };
        case actionTypes.CLEAR_CURR_ITEM_VARS:
        return {
            ...state,
            currItemComment: '',
            currItemAmount: '',
            currItemCategory: '',
            currItemDate: ''
        };
    }
    return state;
};

export default reducer;