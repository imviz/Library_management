import React from 'react'
import AdminHome from '../Componets/AdminHome/AdminHome'
import NavBar from '../NavBar/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import EditBook from '../Componets/EditBook/EditBook'
import { Button, Container } from '@mui/material';
import {useNavigate} from 'react-router-dom'

function AdminHomePage() {
    const navigate=useNavigate()
  return (
    <div>
          <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={12}>
          <h3 style={{textAlign:'center',color:'white'}}>ADMIN HOME</h3>
          <Button  style={{marginLeft:'50px'}} onClick={()=>navigate('/addbook')}  color="success" variant="contained">Add Books</Button>
        
            <div> <AdminHome /> </div>
            </Col>
        </Row>  
    </div>
  )
}

export default AdminHomePage