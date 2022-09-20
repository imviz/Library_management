import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Link ,useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './Register.css'
import axios from '../../Axios/Axios';


function Register() {
    
  const navigate=useNavigate()
  // for storing values
    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    const [email,seetEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')


    // for validation purpose
    const[nameErr, setNameErr] = useState({})
    const [usernameErr,setUsernameErr] = useState({})
    const [emailErr, setEmailErr] = useState({})
    const [passwordErr, setPasswordErr] = useState({})
    const [confirmPasswordErr,setConfirmPasswordErr] = useState({})
   

const formValidation=()=>{ 
  const nameErr={}
  const usernameErr ={}
  const emailErr={}
  const passwordErr={}
  const confirmPasswordErr={}


  let isValid = true

  // for name
  if (!name){
    nameErr.short_fname = '* name is a required field'
      isValid = false
    }
  else if(name.trim().length <3){
    nameErr.short_fname = '* name field contain min 3 charector'
    isValid = false
  }

// for username

  if (!username){
    usernameErr.short_fname = '* username field is required '
  isValid = false
  }
  else if(username.trim().length<3){
    usernameErr.short_fname = '* username field contain min 3 charector'
  isValid = false
  }

  // for email
  if (!email){
    emailErr.short_fname = '* email  is a required field'
    isValid = false
  }
  else{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !re.test(email) ) {    
      emailErr.short_fname = '* it must be valid email '
    isValid = false
    }
  }

  // for password
  if (!password){
    passwordErr.short_fname = '*title name is a required field'
    isValid = false
  }else if(password.trim().length <5){
    passwordErr.short_fname = '* password contain minimum 6 charector '
  isValid = false
  }

  // for confirm password
  if (!confirmPassword){
    confirmPasswordErr.short_fname = '*title name is a required field'
    isValid = false
  }else if(confirmPassword.trim().length <5){
    confirmPasswordErr.short_fname = '* password contain minimum 6 charector '
  isValid = false
  }

  // password matching
  if (password!=confirmPassword){
    confirmPasswordErr.short_fname = '* password missmatched'
    isValid = false
    passwordErr.short_fname = '* password missmatched'    
  }

  setNameErr(nameErr)
  setUsernameErr(usernameErr)
  setEmailErr(emailErr)
  setPasswordErr(passwordErr)
  setConfirmPasswordErr(confirmPasswordErr)

  return isValid
  }


// register calling
    const handler=(e)=>{
      e.preventDefault()
      const isValid = formValidation()
      if (isValid){      
        axios.post('adminside/register/',{
              name:name,
              username:username,
              email:email,
              password:password,
              confirm_password:confirmPassword,
          }).then((res)=>{
              console.log(res.data,'data')
              if (res.status==200){
                navigate('/login')
              }
          })
      }
    }

    
  return (
    <div>
      <Grid>
        <Paper elevation={5} className='paper'>
         
          <Grid align='center' className='grid'>
          <Avatar >          
          </Avatar >
              <Typography variant='h4' className='typo'>Register Here</Typography>
          </Grid>
          <Grid >
            <form onSubmit={handler} className='formss' >   
            <div><TextField style={{marginTop:'55px'}}   InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600,}, 
                                                                        }}        
            variant='standard' name="name"  type='text' label='name' placeholder='Enter name' onChange={(e)=>setName(e.target.value)} value={name} fullWidth></TextField>
              {Object.keys(nameErr).map((key)=>{
                                 return <div style={{color:'red'}} >{nameErr[key]}</div> })}        
            </div>
            <div><TextField  name="username" style={{marginTop:'50px'}} 
                                                                     InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' type='text' label='username' placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)} value={username}  fullWidth ></TextField>
             {Object.keys(usernameErr).map((key)=>{
                                 return <div style={{color:'red'}} >{usernameErr[key]}</div> })}          
            </div>
            <div>
            <TextField style={{marginTop:'50px'}}       InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' name="email" type='text' label='Email' onChange={(e)=>seetEmail(e.target.value)} value={email}  placeholder='Enter Email' fullWidth></TextField>  
             {Object.keys(emailErr).map((key)=>{
                                 return <div style={{color:'red'}} >{emailErr[key]}</div> })}
            </div>      
            <div><TextField  name="password" style={{marginTop:'50px'}} InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' type='password' label='Password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} value={password}  fullWidth></TextField>
             {Object.keys(passwordErr).map((key)=>{
                                 return <div style={{color:'red'}} >{passwordErr[key]}</div> })}
          
            </div>
            <div><TextField  name="confirm password" style={{marginTop:'50px'}} InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' type='password' label='confirm Password' placeholder='Enter confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  fullWidth></TextField>
             {Object.keys(confirmPasswordErr).map((key)=>{
                                 return <div style={{color:'red'}} >{confirmPasswordErr[key]}</div> })}
            </div>   
            <Button style={{marginTop:'20px'}} type='submit' fullWidth={true} className='button1' variant='outlined'>SIGN UP</Button><br /><br />
            </form> 
          </Grid> 
        </Paper>
      </Grid>
    </div>
  )
}

export default Register