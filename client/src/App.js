import {Routes,Route} from 'react-router-dom'
import HomePage from './components/Layout/pages/HomePage';
import About from './components/Layout/pages/About';
import Policy from  './components/Layout/pages/Policy';
import NotFound from './components/Layout/pages/NotFound';
import Connect from './components/Layout/pages/Connect';
import Register from './components/Layout/pages/Authorization/Register';
import Login from './components/Layout/pages/Authorization/Login';
import DashBoard from './components/Layout/pages/forUsers/DashBoard';

import PrivateRoute from './components/Routes/FirstCheck';
import ForgotPassword from './components/Layout/pages/Authorization/ForgotPassword';
import AdminRoute from './components/Routes/AdminCheck';
import AdminDashboard from './components/Layout/pages/Admin/AdminDashboard';
import CreateCategory from './components/Layout/pages/Admin/CreateCategory';
import CreateProduct from './components/Layout/pages/Admin/CreateProduct';
import DisplayUsers from './components/Layout/pages/Admin/DisplayUsers';
import Orders from './components/Layout/pages/forUsers/Orders';
import Profile from './components/Layout/pages/forUsers/Profile';
import Content from './components/Layout/pages/Admin/Content';
import UpdateContent from './components/Layout/pages/Admin/UpdateContent';
import SearchPage from './components/Layout/pages/SearchPage';
import ContentData from './components/Layout/pages/ContentData';
import AddToCardPage from './components/Layout/pages/AddToCardPage';
     

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/cart' element={<AddToCardPage/>}/>

      <Route path='/content/:slug' element={<ContentData/>}/>

      <Route  path='/dashboard'  element={<PrivateRoute/>}>
      <Route path='user' element={<DashBoard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>


      </Route>
      <Route  path='/dashboard'  element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/createCategory' element={<CreateCategory/>}/>
      <Route path='admin/createProduct' element={<CreateProduct/>}/>
      <Route path='admin/products/:slug' element={<UpdateContent/>}/>

      <Route path='admin/products' element={<Content/>}/>

      <Route path='admin/users' element={<DisplayUsers/>}/>

      </Route>
    
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>

      <Route path='/about' element={<About/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/connect' element={<Connect/>}/>

      <Route path='*' element={<NotFound/>}/>

    </Routes>
    

   
  );
}

export default App;
