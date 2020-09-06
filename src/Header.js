import React, { Component } from 'react';
import { Navbar} from 'react-bootstrap';

import logo from './logo.svg';

class Header extends Component {

    render() {
        return (
            <header>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand>
                    <Navbar.Brand className="mx-auto heading">Sample Form</Navbar.Brand>
                </Navbar>
            </header>
        )
    }
}

export default Header;
