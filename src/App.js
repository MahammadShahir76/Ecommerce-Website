
import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import Addproduct from './Components/AddProduct';
import Productlist from './Components/Productlist';
import Upadteproduct from './Components/UpdateProduct';
function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
      <Nav/>
      <Routes className="content">

      <Route element={<PrivateComponent/>}> {/**use of private component to these file only */}
      <Route path="/" element={<Productlist/>} ></Route>
      <Route path="/add" element={<Addproduct/>} ></Route>
      <Route path="/update/:id" element={<Upadteproduct/>} ></Route>
      <Route path="/logout" element={<h1>logout component</h1>} ></Route>
      </Route>

      <Route path="/signup" element={<SignUp/>} ></Route>
      <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
