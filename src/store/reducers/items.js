/* eslint-disable default-case */
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
//package for unique keys
let uniqid = require('uniqid');

const initialState = {
    // items: [
           
    //     {id: 1, icon: 'add_circle', category: 'Circle', comment: 'TestComment1', amount: 91, date: '2018-12-31'},
    //     {id: 2, icon: 'face', category: 'Faceeee', comment: 'TestComment2', amount: 92, date: '2018-11-20'},
    //     {id: 3, icon: 'alarm', category: 'Alarm', comment: 'TestComment3', amount: 93, date: '2018-11-20'},
    //     {id: 4, icon: 'commute', category: 'Alarm', comment: 'TestComment3', amount: 93, date: '2019-01-01'},
    //     {id: 5, icon: 'done', category: 'Alarm', comment: 'TestComment3', amount: 93, date: '2018-12-01'},
    //     {id: 6, icon: 'launch', category: 'Alarm', comment: 'TestComment3', amount: 93, date: '2018-10-20'}
    
    // ],
    items: [],
    /* currentItem: {id: null, icon: null, categoryName: null, comment: null, amount: null, date: null}, */
    currItemCategory: '',
    currItemComment: '',
    currItemAmount: '',
    currItemDate: moment().format("YYYY-MM-DD"),
    categories: null,
    error: false,
    loading: false
};

const fetchItemsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchItemsSuccess = ( state, action ) => {
    return updateObject( state, {
        items: action.items,
        loading: false
    } );
};

const fetchItemsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ITEM:
            const newItem = {
                key: uniqid(),
                category: action.category,
                comment: action.comment,
                amount: action.amount,
                date: action.date
            };
            return {
                ...state,
                items: state.items.concat( newItem )
            };
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.key !== action.itemId)
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
        case actionTypes.FETCH_ITEMS_START: return fetchItemsStart( state, action );
        case actionTypes.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess( state, action );
        case actionTypes.FETCH_ITEMS_FAIL: return fetchItemsFail( state, action );
    }
    return state;
};

export default reducer;