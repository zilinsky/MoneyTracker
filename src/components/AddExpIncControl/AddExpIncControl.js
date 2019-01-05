import React, {Component} from 'react';
import classes from './AddExpIncControl.css';
import Button from '../UI/Button/Button';

class AddExpIncControl extends Component {

    clickHandler = () => {
        console.log('clicked from AddExpIncControl');

    }
    //TODO implement backdrop and modal, after clicking on ADD button Modal should appear
    render() {
        return (
            <div>
                <Button clicked={this.clickHandler}/>
            </div>
        );
    }

}

export default AddExpIncControl;