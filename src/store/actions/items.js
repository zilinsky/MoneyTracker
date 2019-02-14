import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const addItem = (category, comment, amount, date) => {
    return {
        type: actionTypes.ADD_ITEM,
        category: category,
        comment: comment,
        amount: amount,
        date: date

    };
};

//synch
export const setCategories = (categories) => {
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

export const setCurrItemID = (currItemID) => {
    return {
        type: actionTypes.SET_CURR_ITEM_ID,
        currItemID: currItemID
    };
};

export const setCurrItemComment = (currItemComment) => {
    return {
        type: actionTypes.SET_CURR_ITEM_COMMENT,
        currItemComment: currItemComment
    };
};

export const setCurrItemCategoryName = (currItemCategoryName) => {
    return {
        type: actionTypes.SET_CURR_ITEM_NAME_CATEGORY,
        currItemCategoryName: currItemCategoryName
    };
};

export const setCurrItemCategoryColor = (currItemCategoryColor) => {
    return {
        type: actionTypes.SET_CURR_ITEM_NAME_COLOR,
        currItemCategoryColor: currItemCategoryColor
    };
};


export const setModalStatus= (open, modalType) => {
    return {
        type: actionTypes.SET_MODAL_STATUS,
        open: open,
        modalType: modalType
    };
}; 

export const setCurrItemAmount = (currItemAmount) => {
    return {
        type: actionTypes.SET_CURR_ITEM_AMOUNT,
        currItemAmount: currItemAmount
    };
};

export const setCurrItemCategory = (currItemCategory) => {
    return {
        type: actionTypes.SET_CURR_ITEM_CATEGORY,
        currItemCategory: currItemCategory
    };
};

export const setCurrItemDate = (currItemDate) => {
    return {
        type: actionTypes.SET_CURR_ITEM_DATE,
        currItemDate: currItemDate
    };
};

export const clearCurrVariables = () => {
    return {
        type: actionTypes.CLEAR_CURR_ITEM_VARS
    };
};

//asynch because of dispatch
export const initCategories = () => {
    return dispatch => {
        axios.get('/categories.json')
            .then(res => {
                //console.log(res.data);
                const fetchedCategories = [];
                for (let key in res.data) {
                    fetchedCategories.push({
                        ...res.data[key],
                        id: key
                    });
                }
                //console.log("res.data");
                //console.log(res.data);
                dispatch(setCategories(res.data));
            })
            .catch(error => {
                dispatch(fetchCategoriesFailed());
            });
    };
};


//aka purchaseBurgerSuccess
export const addItemDBSuccess = (id, itemData) => {
    return {
        type: actionTypes.ADD_SUCCESS,
        itemId: id,
        itemData: itemData
    };
};

//aka purchaseBurgerFail
export const addItemDBFail = (error) => {
    return {
        type: actionTypes.ADD_FAIL,
        error: error
    };
}

//aka purchaseBurgerStart
export const addItemDBStart = () => {
    return {
        type: actionTypes.ADD_START
    };
};

//aka purchaseBurger
export const addItemDB = (itemData) => {
    return dispatch => {
        dispatch(addItemDBStart());
        //POST NEW ITEM
        axios.post('/items.json', itemData)
            .then(response => {
                //dispatch(addItemDBSuccess(response.data.name, itemData));
                dispatch(fetchItems());
            })
            .catch(error => {
                dispatch(addItemDBFail(error));
            });

    };
};

//aka fetchOrdersSuccess
export const fetchItemsSuccess = (items) => {
    return {
        type: actionTypes.FETCH_ITEMS_SUCCESS,
        items: items
    };
};

//aka fetchOrdersFail
export const fetchItemsFail = (error) => {
    return {
        type: actionTypes.FETCH_ITEMS_FAIL,
        error: error
    };
};

//aka fetchOrdersStart
export const fetchItemsStart = () => {
    return {
        type: actionTypes.FETCH_ITEMS_START
    };
};

//aka fetchOrders
export const fetchItems = () => {
    return dispatch => {
        dispatch(fetchItemsStart());
        axios.get('/items.json')
            .then(res => {
                const fetchedItems = [];
                for (let key in res.data) {
                    fetchedItems.push({
                        ...res.data[key],
                        id: key
                    });
                }
                fetchedItems.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.date) - new Date(a.date);
                });
                dispatch(fetchItemsSuccess(fetchedItems));
            })
            .catch(err => {
                dispatch(fetchItemsFail(err));
            });
    };

};

export const deleteItems = (id) => {
    return dispatch => {
        axios.delete('items/' + id + '.json')
            .then(function (response) {
                // handle success
                console.log("Item with " + id + "removed. ");
                console.log(response);
                dispatch(fetchItems());
            })
            .catch(err => {
                //handle error
                console.log("Error");
            });

    };
};

export const editItemDBStart = () => {
    return {
        type: actionTypes.EDIT_START
    };
};

export const editItems = (id, itemData) => {
    return dispatch => {
        dispatch(editItemDBStart());
        axios.put('items/' + id + '.json', itemData)
            .then(function (response) {
                // handle success
                console.log("Item with " + id + " edited. ");
                console.log(itemData);
                //dispatch(addItemDBSuccess(response.data.name, itemData));
                dispatch(fetchItems());
            })
            .catch(err => {
                //handle error
                console.log("Error");
                console.log(err);
            });

    };
};


