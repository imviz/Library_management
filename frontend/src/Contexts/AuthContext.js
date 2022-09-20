import { createContext,useContext,useState } from "react"
import axios from "../Axios/Axios";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext=createContext()

   
export default AuthContext;
export const AuthProvider=({children})=>{

   
    const navigate=useNavigate()
    let [authToken,setAuthToken]=useState(()=>localStorage.getItem('authToken')? JSON.parse(localStorage.getItem('authToken')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('authToken')? jwt_decode(localStorage.getItem('authToken')):null)


    // for error showing
    const [error,setError]=useState('')

    const [open, setOpen] =useState(false);

        const handleClick = () => {
        setOpen(true);
        };


    const Adminlogin=async(email,password)=>{
        await axios.post('adminside/login/',{email:email,password:password}).then((res)=>{ 
            console.log(res.data)
            if (res.status==200){
                localStorage.setItem('authToken',JSON.stringify(res.data))
                localStorage.setItem('token',JSON.stringify(res.data.access))
                setAuthToken(res.data)
                setUser(res.data.token)   
                navigate('/adminHome')
            }
        }).catch((err)=>{         
            console.log(err.response.data.detail)
            setError(err.response.data.detail)
            handleClick()
        })       
    }


 
 
    let logoutAdmin=()=>{
          console.log('df')
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('token')
        navigate('/login');
    }


    let contextData={
        Adminlogin:Adminlogin,
        authToken:authToken,
        user:user,
        error:error,
        setOpen:setOpen,
        open:open,
        logoutAdmin:logoutAdmin,
        
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}