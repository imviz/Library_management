import React from 'react'
import {Navigate,Outlet,}  from 'react-router-dom'

function CaseOfReverse() {

        // ther have a token then not go to login or signup pages 
         
   const val= localStorage.getItem('token')
    return val ? <Navigate to='/adminHome'></Navigate>:<Outlet/>
    }
    


export default CaseOfReverse
