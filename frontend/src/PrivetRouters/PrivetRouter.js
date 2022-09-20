import React,{useContext} from 'react'
import {Navigate,Outlet}  from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'

function PrivetRouter() {
    // only authenticate people can access these page
    
    let {authToken}=useContext(AuthContext) 
    return authToken ? <Outlet /> : <Navigate to="/login"/> 
    }
  

export default PrivetRouter