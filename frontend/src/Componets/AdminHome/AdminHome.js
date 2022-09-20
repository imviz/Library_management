import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from '../../Axios/Axios';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';


function AdminHome() {
  
    useEffect(() => {
        gettingAllBooks()
            }, [])
    
    // storing data
    const [book,setBook]=useState([])

    const navigate=useNavigate()

    const gettingAllBooks=()=>{      
        let request=(JSON.parse(localStorage.getItem('token')))     
        axios.get('adminside/books/',{
            headers: {
            Authorization:'Bearer  '+ request
        }
        }).then((res)=>{
            console.log(res.data,'data')
            setBook(res.data)  
        })
        }
    
        const [show, setShow] = useState(false);
        // for which item 
        const [value,setValue]=useState('')
        // for delete value
        const [del,setDel]=useState('')

        const handleClose = () => setShow(false);
        const handleShow = (item,did) =>{
            setShow(true);
            setValue(item)
           setDel(did)
        } 

        // for deletion
        const deletBook=(e)=>{
            e.preventDefault()
            let request=(JSON.parse(localStorage.getItem('token')))     
            axios.delete(`adminside/books/${del}/`,{
                headers: {
                Authorization:'Bearer  '+ request
            }
            }).then((res)=>{
                console.log(res.data,'data')
                handleClose()
                gettingAllBooks()
            })
            }
        
  return (
    <div>

        {/* modal for showing pop up confirmation of delete books */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this book , {value}</Modal.Body>
        <Modal.Footer>
        <Button variant="contained" onClick={handleClose} style={{width:'50px',marginLeft:'10px'}}>Back</Button>           
          <Button variant="contained"  onClick={deletBook} style={{width:'50px',marginLeft:'10px'}}>DELETE</Button> 
        </Modal.Footer>
      </Modal>


        {book && 
        book.map((obj,key)=>
        <div style={{float:'left' ,margin:'3%'}}>
        <Card sx={{ display: 'flex' ,width:'500px' ,height:'400px',minHeight:'200px'}}>
    `  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>     
          <Typography component="div" variant="h5" style={{fontWeight:800}}>
         <DoubleArrowIcon  fontSize='small'/> {obj.name}
          </Typography>
          <Typography variant="p" color="r">
           {obj.type }
          </Typography>
          <Typography variant="subtitle1" color="red" component="div">
           <PersonPinIcon fontSize='small'/> {obj.author}
          </Typography>
          <Typography className='mt-2' variant="body2" color="gray">
            {obj.discriptions}
          </Typography>        
        </CardContent>
        <Box sx={{width:'200px'}} >    
            <p>{String(obj.create_at).slice(0,10).split("-").reverse().join("-")}<br /><Button variant="contained" onClick={()=>navigate(`editbook/${obj.id}/`)} style={{width:'50px',marginLeft:'10px'}}><EditIcon /></Button>   <Button variant="contained" color='error' onClick={()=>handleShow(obj.name,obj.id)} style={{width:'30px',marginLeft:'30px'}}><DeleteIcon  /></Button>
            </p>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 251,height:251,margin:'20px' }}
        image={obj.image}
        alt="Live from space album cover"
        />
    </Card> 
        </div> )}       
    </div>
  )
}

export default AdminHome