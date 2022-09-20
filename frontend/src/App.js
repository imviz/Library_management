import {BrowserRouter,Routes,Route,} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { AuthProvider } from "./Contexts/AuthContext";
import AddBookPage from "./Pages/AddBookPage";
import HomePage from "./Pages/HomePage";
import EditBookPage from "./Pages/EditBookPage";
import AdminHomePage from "./Pages/AdminHomePage";
import PrivetRouter from "./PrivetRouters/PrivetRouter";
import CaseOfReverse from "./PrivetRouters/LoginPrevent";

function App() {
  return (
   <>
   <BrowserRouter>
      <AuthProvider>   
          <Routes>
            <Route element={<CaseOfReverse />}>

                <Route path="/register" element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/' element={< HomePage />} />
            </Route>
              <Route element={<PrivetRouter />} >
                <Route path='/adminHome' element={<AdminHomePage />}/>
                <Route path='/addbook' element={<AddBookPage />}/>
                <Route path='adminHome/editbook/:id' element={<EditBookPage />} />
              </Route>
          </Routes>     
      </AuthProvider>
   </BrowserRouter>
   </>
  );
}

export default App;
