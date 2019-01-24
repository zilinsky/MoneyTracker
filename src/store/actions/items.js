import * as actionTypes from './actionTypes';
import axios from '../../axios-categories';


export const addItem = ( category, comment, amount, date) => {
    return {
        type: actionTypes.ADD_ITEM,
        category: category,
        comment: comment,
        amount: amount,
        date: date

    };
};

//synch
export const setCategories = ( categories ) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    };
};

//synch - DOESN'T WORK
export const fetchCategoriesFailed = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAILED
    };
};

export const setCurrItemComment = ( currItemComment ) => {
    return {
        type: actionTypes.SET_CURR_ITEM_COMMENT,
        currItemComment: currItemComment
    };
};

export const setCurrItemAmount= ( currItemAmount ) => {
    return {
        type: actionTypes.SET_CURR_ITEM_AMOUNT,
        currItemAmount: currItemAmount
    };
};

export const setCurrItemCategory= ( currItemCategory ) => {
    return {
        type: actionTypes.SET_CURR_ITEM_CATEGORY,
        currItemCategory: currItemCategory
    };
};

export const setCurrItemDate= ( currItemDate ) => {
    return {
        type: actionTypes.SET_CURR_ITEM_DATE,
        currItemDate: currItemDate
    };
};

export const clearCurrVariables= (  ) => {
    return {
        type: actionTypes.CLEAR_CURR_ITEM_VARS
    };
};

//asynch because of dispatch
export const initCategories = () => {
    return dispatch => {
        axios.get( 'https://SmartSpendingTracker.firebaseio.com/categories.json' )
        .then(res => {
            //console.log(res.data);
            const fetchedCategories = [];
            for (let key in res.data) {
              fetchedCategories.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(setCategories(fetchedCategories));
        })
            .catch( error => {
                dispatch(fetchCategoriesFailed());
            } );
    };
};



export const addSuccess = ( id, itemData ) => {
    return {
        type: actionTypes.ADD_SUCCESS,
        orderId: id,
        itemData: itemData
    };
};


export const addFail = ( error ) => {
    return {
        type: actionTypes.ADD_FAIL,
        error: error
    };
}

export const addStart = () => {
    return {
        type: actionTypes.ADD_START
    };
};

export const addItemTEMP = ( itemData ) => {
    return dispatch => {
        dispatch( addStart() );
        axios.post( '/items.json', itemData )
            .then( response => {
                console.log( response.data );
                dispatch( addSuccess( response.data.name, itemData ) );
            } )
            .catch( error => {
                dispatch( addFail( error ) );
            } );
    };
};