import React from 'react'
import NavBar from '../NavBar/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Home from '../Home/Home'



function HomePage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={12}>
          <h3 style={{textAlign:'center',color:'white'}}>Welcome To Library World</h3>
        
            <div> <Home /> </div>
            </Col>
        </Row>  
    </div>
  )
}

export default HomePage