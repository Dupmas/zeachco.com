import React from 'react'
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {SessionDropdown, Logo} from '.'

export const TopNav = (props) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><Logo/></Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/users">
        <NavItem>Utilisateurs</NavItem>
      </LinkContainer>
      <LinkContainer to="/categories">
        <NavItem>Categories</NavItem>
      </LinkContainer>
      <LinkContainer to="/inventory">
        <NavItem>Inventaire</NavItem>
      </LinkContainer>
    </Nav>
    <SessionDropdown/>
  </Navbar>
)