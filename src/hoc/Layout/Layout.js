import React, { Component } from 'react';

import Auxx from '../Auxx/Auxx';
import classes from './Layout.css';
import Header from '../../components/Navigation/Header/Header';



class Layout extends Component {
    

    render () {
        return (
            <Auxx>
                <Header/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxx>
        )
    }
}

export default Layout;