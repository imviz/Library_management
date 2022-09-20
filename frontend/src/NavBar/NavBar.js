import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';

function NavBar() {

  const {logoutAdmin,user}=useContext(AuthContext)
  const value=localStorage.getItem('token')
  
  return (
    
<div>
<Navbar style={{height:'100px',backgroundColor:'white'}}  expand="lg">
      <Container fluid>
        <Navbar.Brand style={{fontWeight:800}} href="#">LIBRARY</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/'><Button className='ms-5' variant="outline-dark" >HOME</Button></Link>
            {value ? '' :<Link to='/login'><Button className='ms-5' variant="outline-dark" >LOGIN</Button></Link>}   
          </Nav>       
         {value && <Button  variant="outline-dark" onClick={logoutAdmin}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  )
}

export default NavBar