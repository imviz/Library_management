import React from 'react'
import NavBar from '../NavBar/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import EditBook from '../Componets/EditBook/EditBook'


function EditBookPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>
          <h3 style={{textAlign:'center',color:'white'}}>EDIT BOOKS</h3>
        
            <div> <EditBook /> </div>
            </Col>
        </Row>  
    </div>
  )
}

export default EditBookPage