import React from 'react'
import { withRouter } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import { Route,Switch } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './components/Pages/Home/Home'
import UserList from './components/Pages/UserList/UserList'
import ProductList from "./components/Pages/Product/ProductList"
import ViewProduct from "./components/Pages/Product/ViewProduct/ViewProduct"
import NewProduct from "./components/Pages/Product/NewProduct/NewProduct"
import OrderList from "./components/Pages/Orders/OrderList"
import Banner from "./components/Pages/Banner/Banner"
import Employee from "./components/Pages/Employee/Employee"
import Review from "./components/Pages/Review/Review"
import PrivateRoutes from './PrivateRoutes'
import NewEmployee from './components/Pages/Employee/NewEmployee/NewEmployee'
import ViewEmployee from './components/Pages/Employee/ViewEmployee/ViewEmployee'
import AccountSettings from './components/Pages/AccountSettings/AccountSettings'
import PopupBanner from './components/Pages/Banner/PopUp/PopupBanner'

const MainRouter=withRouter(({location})=>{
return(
    <>
    <Route path="/login" component={Login}/>
    {location.pathname!='/login' && (<TopBar/>)}
    <div className="container">
    {location.pathname!='/login'&&(<Sidebar/>)}
        <Switch>         
         
          <PrivateRoutes exact path="/" component={Home}/>
          <PrivateRoutes path="/users" component={UserList} />
          <PrivateRoutes path="/productList" component={ProductList} />
          <PrivateRoutes path="/product/:id" component={ViewProduct}/>
          <PrivateRoutes path="/newProduct" component={NewProduct} />
          <PrivateRoutes path="/orderList" component={OrderList} />
          <PrivateRoutes path="/banner" component={Banner} />
          <PrivateRoutes path="/employee" component={Employee}/>
          <PrivateRoutes path="/review" component={Review} />
          <PrivateRoutes path="/newEmployee" component={NewEmployee}/>
          <PrivateRoutes path="/editEmployee/:id" component={ViewEmployee}/>
          <PrivateRoutes path="/settings" component={AccountSettings}/>
          <PrivateRoutes path="/addBanner" component={PopupBanner}/>
        </Switch>
        </div>
    </>
)
}) 

export default MainRouter
