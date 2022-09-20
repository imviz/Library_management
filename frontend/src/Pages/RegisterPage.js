import React from 'react'
import Register from '../Componets/Register/Register'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../NavBar/NavBar'



function RegisterPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>
          <h3 style={{textAlign:'center'}}>REGISTER</h3>
        
            <div><Register /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default RegisterPage