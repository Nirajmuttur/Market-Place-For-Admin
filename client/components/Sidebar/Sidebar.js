import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import {CardGiftcard,RateReview,Settings,Home,ShoppingCart,Dehaze,Person,Flag,Bookmark,FilterHdr,StarOutline,People} from '@material-ui/icons'
import {InputLabel,MenuItem,Select} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

function Sidebar() {
    const [menu, setmenu] = useState(false)
    const handleMenu=(event)=>{
        event.preventDefault();
        setmenu(!menu)
    }
    return (
        <div className="sidebar">
            <div className="sidebarwrapper">
            <div className="sidebarmenu">
                    <ul className="sidebarlist">
                        <Link to="/" className="link">
                            <li className="sidebarlistitem active">
                                <Home className="sidebaricon"/>
                                Dashboard 
                            </li>
                        </Link>
                        
                        
                    </ul>
                </div>
                <div className="sidebarmenu">
                    <h3 className="sidebartitle">Order Management</h3>
                    <ul className="sidebarlist">
                        <Link to="/orderList" className="link">
                            <li className="sidebarlistitem ">
                                <ShoppingCart className="sidebaricon"/>
                                Orders 
                            </li>
                        </Link>
                        
                    </ul>
                </div>
                <div className="sidebarmenu">
                    <h3 className="sidebartitle">Product Management</h3>
                    <ul className="sidebarlist">
                        <Link to="/banner" className="link">
                            <li className="sidebarlistitem">
                                <FilterHdr className="sidebaricon"/>
                                Banner 
                            </li>
                        </Link>
                        
                        <li className="sidebarlistitem">
                            <StarOutline className="sidebaricon"/>
                            Category 
                        </li>
                        <Link to="/productList" className="link">
                            <li className="sidebarlistitem">
                                <Bookmark className="sidebaricon"/>
                                Products 
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarmenu">
                    <h3 className="sidebartitle">Employee Handler</h3>
                    <ul className="sidebarlist">
                        <Link to="/employee" className="link">
                            <li className="sidebarlistitem ">
                                <Person className="sidebaricon"/>
                                Employee 
                            </li>
                        </Link>
                        
                    </ul>
                </div>
                <div className="sidebarmenu">
                    <h3 className="sidebartitle">Deal Management</h3>
                    <ul className="sidebarlist">
                        <li className="sidebarlistitem ">
                            <button onClick={handleMenu} className="menubtn"><Dehaze className="sidebaricon"/>
                            All Deals 
                            {menu?<ArrowDropUpIcon className="dropdownicon"/>:<ArrowDropDownIcon className="dropdownicon"/>}
                            </button>
                        </li>
                        {
                            menu?(<div className="menu">
                            <button className="menuitembtn sidebarlistitem"> Flash Deal </button>
                            <button className="menuitembtn sidebarlistitem"> Deal of the Day </button>
                            <button className="menuitembtn sidebarlistitem"> Feature Deal </button>
                          </div>):(null)
                        }
                    </ul>
                </div>
                <div className="sidebarmenu">
                    <h3 className="sidebartitle">Business Management</h3>
                    <ul className="sidebarlist">
                        <Link to="/users" className="link">
                            <li className="sidebarlistitem ">
                                <People className="sidebaricon"/>
                                Customer List 
                            </li>
                        </Link>
                        <Link to="/review" className="link">
                            <li className="sidebarlistitem ">
                                <RateReview className="sidebaricon"/>
                                Product Reviews
                            </li>
                        </Link>
                        
                        <li className="sidebarlistitem ">
                            <CardGiftcard className="sidebaricon"/>
                            Coupon 
                        </li>
                        <li className="sidebarlistitem ">
                            <Settings className="sidebaricon"/>
                            Business Settings
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
