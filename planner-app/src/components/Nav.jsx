import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class Navigation extends Component {
    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">GO!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                {/* <Nav.Link href="#link">Profile?</Nav.Link> */}
                <NavDropdown title="Problem Set" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/problem/add">Add Problems</NavDropdown.Item>
                    <NavDropdown.Item href="/problem/all">View Problem Sets</NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
            </Navbar>
         );
    }
}
 
export default Navigation;