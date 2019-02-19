import React from 'react';
import classes from './ItemModal.css';
import CommentInput from '../Inputs/CommentInput/CommentInput';
import CategoryInput from '../Inputs/CategoryInput/CategoryInput';
import DatePicker from '../DatePicker/DatePicker';
import AmountInput from '../Inputs/AmountInput/AmountInput';
import Button from '@material-ui/core/Button';
import AddButton from '../AddButton/AddButton';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import * as imports from '../../../imports';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

const defaultColor = imports.defaultColor;


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ItemModal extends React.Component {

  state = {
    loading: true,
    color: '',
    currencyType: "HUF "
  };

  componentDidMount() {
    //console.log("CategoryInput.js componentDidMount");
    this.props.onInitCategories();
  }

  handleClickOpen = () => {
    this.props.onSetModalStatus(true, 'add');
    this.setState({ color: 'default' });
    this.props.onSetCurrItemDate(moment().format("YYYY-MM-DD"));
  };


  handleClose = () => {
    this.props.onSetModalStatus(false, '');
    this.props.onClearCurrVariables();
    console.log("HandleClose");
  };

  handleAdd = () => {
    this.props.onSetModalStatus(false, '');
    const item = {
      category: this.props.currCategory,
      comment: this.props.currItemComment,
      amount: this.props.currItemAmount,
      date: this.props.currItemDate,
      name: this.props.currItemCategoryName,
      color: this.props.currItemCategoryColor,

    }
    console.log("item from handleADD");
    console.log(item);
    this.props.onAddItemDB(item);
    this.props.onClearCurrVariables();
    console.log("HandleAdd");
  };

  handleEdit = () => {
    this.props.onSetModalStatus(false, '');


    const item = {
      category: this.props.currCategory,
      comment: this.props.currItemComment,
      amount: this.props.currItemAmount,
      date: this.props.currItemDate,
      name: this.props.currItemCategoryName,
      color: this.props.currItemCategoryColor,

    }
    this.props.onEditItems(this.props.currItemID, item);
    this.props.onClearCurrVariables();
    console.log("HandleEdit");
  }

  handleDeleteItem = () => {
    this.props.onDeleteItems(this.props.currItemID);
    this.props.onClearCurrVariables();
    this.props.onSetModalStatus(false, '');
  }

  getColorFromChild = (colorValue) => {
    this.setState({ color: colorValue });
  };

  returnColor = (obj, val) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key].id === val) {
          return obj[key].color;
        }

      }
    }
  }

  render() {

    let categoriesVar;
    let returnColorVar = defaultColor;
    let isDisabled = true;
    let button;
    let deleteButton;
    const fetchedCategories = [];

    if (this.props.categories) {
      for (let key in this.props.categories.expenses) {
        fetchedCategories.push({
          ...this.props.categories.expenses[key],
          id: key
        });
      }

      console.log("this.props.categories: ");
      console.log(this.props.categories);

      categoriesVar = (fetchedCategories.map(cat => (
        <MenuItem key={cat.id} value={cat.id}>
          <div className={classes.MenuItemWrapper}>
            <Icon className={classes.MenuItemIcon} style={{ '--category--color': cat.Color }}>{cat.id}}</Icon>
            <span className={classes.MenuItemName}>{cat.Name}</span>
          </div>
        </MenuItem>))
      )
    }


    if ( this.props.currItemCategoryColor ) {
      returnColorVar = this.props.currItemCategoryColor;
    }

    if (typeof returnColorVar === 'undefined') {
      returnColorVar = defaultColor;
    }

    if (this.props.currItemComment && this.props.currItemAmount.floatValue && this.props.currCategory && this.props.currItemDate) {
      isDisabled = false;
    }

    if (this.props.modalType === "edit") {
      button = <Button disabled={isDisabled} color="inherit" onClick={this.handleEdit}>Save</Button>
      deleteButton =
        <IconButton color="inherit" onClick={this.handleDeleteItem} aria-label="Close">
          <DeleteIcon />
        </IconButton>
    }
    if (this.props.modalType === "add") {
      button = <Button disabled={isDisabled} color="inherit" onClick={this.handleAdd}>Add</Button>
    }

    return (
      <div>
        <Tooltip disableFocusListener title="Add">
          <AddButton clicked={this.handleClickOpen}/>
        </Tooltip>
        <Dialog
          style={{ '--category--color': returnColorVar }}
          className={classes.dialog}
          fullScreen
          open={this.props.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <div className={classes.buttonWrapper}>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                {deleteButton}
              </div>
              <div className={classes.amountInpWrapper}>
                <AmountInput
                  currencyType={this.state.currencyType}>
                </AmountInput>
              </div>
            </Toolbar>
          </AppBar>
          <List className={classes.list}>
            <div className={classes.listWrapper}>
              <CategoryInput onSelectcolor={this.getColorFromChild} categoriesVar={categoriesVar} categoriesColor={returnColorVar}></CategoryInput>
              <CommentInput categoriesColor={returnColorVar}></CommentInput>
              <DatePicker categoriesColor={returnColorVar}></DatePicker>
            </div>
          </List>
          <div style={{ '--default--color': defaultColor }} className={classes.ButtonDiv}>
            {button}
          </div>  
          <Divider />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    currItemComment: state.currItemComment,
    currItemAmount: state.currItemAmount,
    currCategory: state.currItemCategory,
    currItemDate: state.currItemDate,
    currItemCategoryName: state.currItemCategoryName,
    currItemCategoryColor: state.currItemCategoryColor,
    open: state.open,
    currItemID: state.currItemID,
    modalType: state.modalType
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //onAddItem: (category, comment, amount, date) => dispatch({type: actionCreators.ADD_ITEM, item: {category: category, comment: comment, amount: amount, date: date}}),
    onAddItem: (category, comment, amount, date) => dispatch(actionCreators.addItem(category, comment, amount, date)),
    onInitCategories: () => dispatch(actionCreators.initCategories()),
    onSetCurrItemComment: (comment) => dispatch(actionCreators.setCurrItemComment(comment)),
    onSetCurrItemAmount: (amount) => dispatch(actionCreators.setCurrItemAmount(amount)),
    onetCurrItemCategory: (category) => dispatch(actionCreators.setCurrItemCategory(category)),
    onSetCurrItemDate: (date) => dispatch(actionCreators.setCurrItemDate(date)),
    onClearCurrVariables: () => dispatch(actionCreators.clearCurrVariables()),
    onAddItemDB: (itemData) => dispatch(actionCreators.addItemDB(itemData)),
    onFetchItems: () => dispatch(actionCreators.fetchItems()),
    onSetModalStatus: (open, type) => dispatch(actionCreators.setModalStatus(open, type)),
    onEditItems: (id, item) => dispatch(actionCreators.editItems(id, item)),
    onDeleteItems: (id) => dispatch(actionCreators.deleteItems(id)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);