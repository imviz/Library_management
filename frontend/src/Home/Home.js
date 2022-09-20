import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from '../Axios/Axios';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


function Home() {

    // mounting component render
    useEffect(() => {

        gettingAllBooks()

        }, [])
    
    // storing data
    const [book,setBook]=useState([])

    // get all records of book that can seen student on home page 
    const gettingAllBooks=()=>{    
        axios.get('adminside/studentpage/').then((res)=>{
            console.log(res.data,'data')
            setBook(res.data)
        })
        }

  return (
    <div>
        {book && 
        book.map((obj,key)=>
        <div style={{float:'left' ,margin:'3%'}}>

            {/* for showing the books like a card structure */}

        <Card sx={{ display: 'flex' ,width:'500px' ,height:'400px',minHeight:'200px'}}>
    `       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                <Box >    
                <p>{String(obj.create_at).slice(0,10).split("-").reverse().join("-")}</p>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 251,height:251,margin:'20px' }}
                image={obj.image}
                alt="Live from space album cover"
                />
        </Card> 
        </div>  )}
    </div>
  )
}

export default Home