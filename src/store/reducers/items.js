/* eslint-disable default-case */
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
//package for unique keys
let uniqid = require('uniqid');

const initialState = {
    items: [],
    currItemID: '',
    currItemCategory: '',
    currItemComment: '',
    currItemAmount: '',
    currItemCategoryName: '',
    currItemCategoryColor: '',
    currItemDate: moment().format("YYYY-MM-DD"),
    categories: null,
    error: false,
    loading: false,
    open: false,
    modalType: ''
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
        case actionTypes.SET_CURR_ITEM_ID:
            return {
                ...state,
                currItemID: action.currItemID
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
        case actionTypes.SET_CURR_ITEM_NAME_CATEGORY:
        return {
            ...state,
            currItemCategoryName: action.currItemCategoryName
        };
        case actionTypes.SET_CURR_ITEM_NAME_COLOR:
        return {
            ...state,
            currItemCategoryColor: action.currItemCategoryColor
        };
        case actionTypes.SET_CURR_ITEM_DATE:
        return {
            ...state,
            currItemDate: action.currItemDate
        };
        case actionTypes.SET_MODAL_STATUS:
        return {
            ...state,
            open: action.open,
            modalType: action.modalType

        };
        case actionTypes.CLEAR_CURR_ITEM_VARS:
        return {
            ...state,
            currItemComment: '',
            currItemAmount: '',
            currItemCategory: '',
            currItemDate: '',
            currItemCategoryName: '',
            currItemCategoryColor: ''
        };
        case actionTypes.FETCH_ITEMS_START: return fetchItemsStart( state, action );
        case actionTypes.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess( state, action );
        case actionTypes.FETCH_ITEMS_FAIL: return fetchItemsFail( state, action );
    }
    return state;
};

export default reducer;