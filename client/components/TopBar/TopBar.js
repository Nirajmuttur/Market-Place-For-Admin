import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import { Link } from 'react-router-dom'
import './TopBar.css'
import {NotificationsNone,Language,Settings} from '@material-ui/icons';
import avatar from './../../assets/3.png'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { signout } from '../../api/auth/authLogin-api';
import auth from '../../api/auth/auth-api';

function TopBar() {
    const [log,setLog]=useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose= () => {
    setAnchorEl(null);
  };

  const handlelogout = values => signout().then((data)=>{
      if(data.message){
          auth.clearJWT()
          setLog(true)
      }
  })
  if(log){
    return(
        <>
            <Redirect to="/login" />
        </>
    )
  }else{
    return (
        <div className="topbar">
            <div className="topbarwrapper">
                <div className="topleft">
                    <span className="logo sub0">LaxmiSaree<br/>
                        <span className="sub2">Stores<br/></span>
                    </span>
                </div>
                <div className="topright">
                    <div className="topbariconcontainer">
                        <NotificationsNone/>
                        <span className="topiconbadge">2</span>
                    </div>
                    <div className="topbariconcontainer">
                        <Language/>
                    </div>
                    <div className="topbariconcontainer">
                        <Settings onClick={handleClick}/>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            >
                                
                                <MenuItem><Link to="/settings" className="link2">Account Settings</Link></MenuItem>
                                
                                
                                <MenuItem onClick={handlelogout}>Logout</MenuItem>
                        </Menu>
                    </div>  
                    <img src={avatar} className="topavatar"></img>
                </div>
                          
            </div>
        </div>
    )}
}

export default TopBar
