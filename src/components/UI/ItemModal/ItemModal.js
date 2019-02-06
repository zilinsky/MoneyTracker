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
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ItemModal extends React.Component {
  
  state = {
      open: false,
      loading: true,
      color: '',
      currencyType:"HUF "
  };



  componentDidMount() {
    //console.log("CategoryInput.js componentDidMount");
    this.props.onInitCategories();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({color: 'default'});
    this.props.onSetCurrItemDate(moment().format("YYYY-MM-DD"));
  };


  handleClose = () => {
    this.setState({ open: false });
    this.props.onClearCurrVariables();
    console.log("HandleClose");
  };

  handleAdd = () => {
    this.setState({ open: false });
    const item = {
        category: this.props.currCategory,
        comment: this.props.currItemComment,
        amount: this.props.currItemAmount.formattedValue,
        date: this.props.currItemDate

    }

    this.props.onAddItemDB(item);

    //this.props.onFetchItems();
    this.props.onClearCurrVariables();
    console.log("HandleAdd");
  };

  getColorFromChild = (colorValue) => {
    this.setState({color: colorValue});
  };

  returnColor = (obj, val) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(obj[key].id === val) {
                    return obj[key].color;
                }
                
            }
        }
  }
 
  render() {

    let categoriesVar;
    let returnColorObj;
    let returnColorVar;
    let isDisabled = true;

    if ( this.props.categories ) {
        categoriesVar =  (this.props.categories.map(cat => (
                   <MenuItem  key={cat.id} value={cat.id}>
                       <div className={classes.MenuItemWrapper}>
                           <Icon className={classes.MenuItemIcon} style={{'--category--color':  cat.Color}}>{cat.id}}</Icon>
                           <span className={classes.MenuItemName}>{cat.Name}</span>
                       </div>
                   </MenuItem>))
        )
        returnColorObj = this.props.categories.map((val, i) => {
            return {
                id: val.id,
                color: val.Color
            };
        });
    }

    returnColorVar = this.returnColor(returnColorObj,this.state.color);

    if(typeof returnColorVar === 'undefined') {
      returnColorVar = '#3f51b5'
    }

    if(this.props.currItemComment && this.props.currItemAmount.floatValue && this.props.currCategory && this.props.currItemDate) {
      isDisabled = false;
    }

    return (
      <div>
        <AddButton clicked={this.handleClickOpen}></AddButton>
        <Dialog
          style={{'--category--color': returnColorVar}}
          className={classes.dialog}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar className={classes.toolBar}>
                <div className={classes.buttonWrapper}>
                  <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                    <CloseIcon />
                  </IconButton>
                  <Button disabled={isDisabled} color="inherit" onClick={this.handleAdd}>Add</Button>
                </div>
                <div className={classes.amountInpWrapper}>
                  <AmountInput 
                                currencyType ={this.state.currencyType}>
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
    currItemDate: state.currItemDate
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //onAddItem: (category, comment, amount, date) => dispatch({type: actionCreators.ADD_ITEM, item: {category: category, comment: comment, amount: amount, date: date}}),
    onAddItem: ( category, comment, amount, date ) => dispatch(actionCreators.addItem(category, comment, amount, date)),
    onInitCategories: () => dispatch(actionCreators.initCategories()),
    onSetCurrItemComment: (comment) => dispatch(actionCreators.setCurrItemComment(comment)),
    onSetCurrItemAmount: (amount) => dispatch(actionCreators.setCurrItemAmount(amount)),
    onetCurrItemCategory: (category) => dispatch(actionCreators.setCurrItemCategory(category)),
    onSetCurrItemDate: (date) => dispatch(actionCreators.setCurrItemDate(date)),
    onClearCurrVariables: () => dispatch(actionCreators.clearCurrVariables()),
    onAddItemDB: (itemData) => dispatch(actionCreators.addItemDB(itemData)),
    onFetchItems: () => dispatch( actionCreators.fetchItems())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ItemModal);