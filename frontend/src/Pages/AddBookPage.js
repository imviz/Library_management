import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AddBook from '../Componets/AddBook/AddBook'
import NavBar from '../NavBar/NavBar'

function AddBookPage() {
  return (
    <div>
          <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>
          {/* <h3 style={{textAlign:'center'}}>ADD BOOK  </h3> */}
        
            <div><AddBook /></div>
            </Col>
        </Row>  

    </div>
  )
}

export default AddBookPage