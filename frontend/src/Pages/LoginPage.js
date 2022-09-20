import React from 'react'
import NavBar from '../NavBar/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Login from '../Componets/Login/Login'

function LoginPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>
          <h3 style={{textAlign:'center'}}>LOGIN</h3>
        
            <div> <Login /> </div>
            </Col>
        </Row>  

    </div>
  )
}

export default LoginPage