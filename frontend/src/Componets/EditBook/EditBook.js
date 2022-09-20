import React, { useState,useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

//dropdown imports
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios  from '../../Axios/Axios';
import Button from '@mui/material/Button';  
import { useParams,useNavigate} from 'react-router-dom'

function EditBook() {

    const [nameOfBook,setNameOfBook]=useState('')
    const [author,setAuthor]=useState('')
    const [discription,setDiscription]=useState('')
    const [type,setType]=useState('')
    const [image,setImage]=useState()
  
  
    // parms calling
    const parms=useParams()
    const id=parms.id
     
    const lightTheme = createTheme({ palette: { mode: 'light' } });
  
    const navigate=useNavigate()

    // useeffect
    useEffect(() => {

        getiingInstance()

    }, [])
    
    const getiingInstance=()=>{
        let request=(JSON.parse(localStorage.getItem('token')))     
        axios.get(`adminside/books/${id}/`,{
            headers: {
            Authorization:'Bearer  '+ request
        }
        }).then((res)=>{
            setNameOfBook(res.data.name)
            setAuthor(res.data.author)            
            setDiscription(res.data.discriptions)
            setType(res.data.type)    
        })
    }

// handling the image
    const imageHandler=(e)=>{    
      setImage(e.target.files[0]) 
    }
  
    // api calling

  const submitHandler=(e)=>{
    e.preventDefault()
    let request=(JSON.parse(localStorage.getItem('token'))) 

      const bookData = new FormData();
      bookData.append('name',nameOfBook)
    //   if image changes
    if (image){
        bookData.append('image',image)
    }
      bookData.append('type',type)
      bookData.append('discriptions',discription)
      bookData.append('author',author)

    //   give the partial updation of book /or full updation
      axios.patch(`adminside/books/${id}/`,bookData,{
        headers: {
          Authorization:'Bearer  '+ request
      }
    }).then((res)=>{
        console.log(res.data,'data')
        navigate('/adminHome')
    })
  }

  return (
    <div>
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
                  gridTemplateColumns: { md: '5fr ' },
                  gap: 3,
                }}
              >
                <h5 style={{backgroundColor:'rgba(15, 15, 121, 0.363)',paddingLeft:'4px',lineHeight:'60px'}}>Edit Book</h5>
                  <TextField id="outlined-basic" label="Name of book" onChange={(e)=>setNameOfBook(e.target.value)} value={nameOfBook} variant="standard" />
                 
  
                  <TextField id="outlined-basic" onChange={(e)=>setAuthor(e.target.value)} value={author} label="Author of book"  variant="standard"/>
                 
                  
                  <TextField id="outlined-basic" onChange={(e)=>setDiscription(e.target.value)} value={discription} label="Discription About Book"   inputProps={{
                                          style: {
                                            // height:'3px',
                                            // padding: ' 8px', 
                                          },
                                      }} style={{paddingTop:'50px'}} variant="standard" />
                   
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
            {/* <p>{image}</p> */}
           
        </FormControl>  
        
              </Box><br/>
              <div align='center'>
 
          <Button   style={{alignItems:'center' ,width:'100px'}} onClick={()=>navigate('/adminHome')}  color="error" variant="outlined">Back</Button>
          <Button   style={{alignItems:'center' ,width:'150px',marginLeft:'30px'}} onClick={submitHandler} variant="contained">EDIT </Button>
        </div>   
            </ThemeProvider>
          </Grid>
        ))}
         </React.Fragment>
      
      </Grid>
      </div>
    </div>
  )
}

export default EditBook