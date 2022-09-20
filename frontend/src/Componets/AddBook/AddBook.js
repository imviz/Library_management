import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

//dropdown imports
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios  from '../../Axios/Axios';
import Button from '@mui/material/Button';  
import { useNavigate} from 'react-router-dom'


function AddBook() {

  const [nameOfBook,setNameOfBook]=useState('')
  const [author,setAuthor]=useState('')
  const [discription,setDiscription]=useState('')
  const [type,setType]=useState('')
  const [image,setImage]=useState()


  const navigate=useNavigate()

   //material ui for paper
   const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));      
  const lightTheme = createTheme({ palette: { mode: 'light' } });

// carring the image 
  const imageHandler=(e)=>{   
    setImage(e.target.files[0]) 
  }

  // validation error
  const [nameErr,setNameErr]=useState('')
  const [discriptionErr,setDiscriptionErr]=useState('')
  const [authorErr,setAuthorErr]=useState('')
  const [imageErr,setImageErr]=useState('')
  const [typeErr,serTypeErr]=useState('')


const formValidation=()=>{ 
  const nameErr={}
  const discriptionErr={}
  const authorErr={}
  const imageErr={}
  const typeErr={}  

  let isValid = true

// for name
if (!nameOfBook){
  nameErr.short_fname = '* name  is a required field'
  isValid = false
}

// for author
if (!author){
  authorErr.short_fname = '* author is a required field'
   isValid = false
}

// for discriptiopn
if (!discription){
  discriptionErr.short_fname = '* discription is a required field'
   isValid = false
}
if(discription.trim().length>250){
  discriptionErr.short_fname = '* discription field contail only 250 charector'
  isValid = false
}

// for image
if (!image){
  imageErr.short_fname = '* image is a required field'
   isValid = false
}

// for type
if (!type){
  typeErr.short_fname = '* type is a required field'
   isValid = false
}

setNameErr(nameErr)
setDiscriptionErr(discriptionErr)
setAuthorErr(authorErr)
setImageErr(imageErr)
serTypeErr(typeErr)

return isValid
}


// api calling

  const submitHandler=(e)=>{
    e.preventDefault()
    console.log(nameOfBook,discription,author,type,'lkl')
    const isValid = formValidation()

    // we can take the token in authtoken and localstorage its self i choose localstorage
    let request=(JSON.parse(localStorage.getItem('token'))) 

    if (isValid){
      const bookData = new FormData();
      bookData.append('name',nameOfBook)
      bookData.append('image',image)
      bookData.append('type',type)
      bookData.append('discriptions',discription)
      bookData.append('author',author)

      axios.post('adminside/books/',bookData,{
        headers: {
          Authorization:'Bearer  '+ request
      }
    }).then((res)=>{
        console.log(res.data,'data')
        navigate('/adminHome')       
    })
    }
  }

  return (

    <div>
      <Grid  spacing={2}><React.Fragment> 
      {[lightTheme].map((theme, index) => (
        <Grid  style={{margin:'auto',marginTop:'50px'}} item xs={7} key={index}>
          <ThemeProvider theme={theme}>    
            <Box            
              sx={{
                p: 1,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '5fr'},
                gap: 3,
              }}
            >
              <h5 style={{backgroundColor:'rgba(15, 15, 121, 0.363)',paddingLeft:'4px',lineHeight:'60px'}}>Add Book</h5>
                <TextField id="outlined-basic" label="Name of book" onChange={(e)=>setNameOfBook(e.target.value)} value={nameOfBook} variant="standard" />
                {/* for error throwing */}
                {Object.keys(nameErr).map((key)=>{
                  return <div style={{color:'red'}} >{nameErr[key]}</div>
                })}
                
                <TextField id="outlined-basic" onChange={(e)=>setAuthor(e.target.value)} value={author} label="Author of book"  variant="standard"/>
                {Object.keys(authorErr).map((key)=>{
                  return <div style={{color:'red'}} >{authorErr[key]}</div>
                })}
                
                <TextField id="outlined-basic" onChange={(e)=>setDiscription(e.target.value)} value={discription} label="Short Discription About Book" style={{paddingTop:'50px'}} variant="standard" />
                {Object.keys(discriptionErr).map((key)=>{
                  return <div style={{color:'red'}} >{discriptionErr[key]}</div>
                })}

            </Box>
            <Box
              sx={{
                p: 1,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '5fr 5fr' },
                gap: 3,
              }}
            >
             
         <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Type of book</InputLabel>
        <Select 
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-label"
          onChange={(e)=>setType(e.target.value)} value={type}
        >
          <MenuItem value="">            
          </MenuItem>               
            <MenuItem value='story' >story</MenuItem>
            <MenuItem value='poety' >poety</MenuItem>
            <MenuItem value='noval' >noval</MenuItem>
            <MenuItem value='autobiographies' >autobiographies</MenuItem>
        </Select>        
        {Object.keys(typeErr).map((key)=>{
                  return <div style={{color:'red'}} >{typeErr[key]}</div>
                })}
      </FormControl>
      <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>     
        <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={imageHandler} 
            />
          </Button>
          {Object.keys(imageErr).map((key)=>{
                  return <div style={{color:'red'}} >{imageErr[key]}</div>
                })}
      </FormControl>
            </Box><br/>
            <div align='center'>
        <Button   style={{alignItems:'center' ,width:'100px'}} onClick={submitHandler} variant="contained">Add</Button>
      </div>            
          </ThemeProvider>
        </Grid>  
      ))}
       </React.Fragment>
    </Grid>
    </div>
  )
}

export default AddBook