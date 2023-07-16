import React from 'react'
import './WidgetL.css'
import {Visibility} from '@material-ui/icons'
function WidgetL() {
    return (
        <div className="widgetl">
            <h3 className="widgetltitle">New Users</h3>
            <hr/>
            <ul className="widgetllist">
                <li className="widgetllistitem">
                    <img src="https://image.freepik.com/free-icon/important-person_318-10744.jpg" alt="" className="widgetlimg"></img>
                    <div className="widgetluser">
                        <span className="widgetlusername">User1</span>
                        <span className="widgetlusermail">user@gmail.com</span>
                    </div>
                    <button className="widgetlbtn"><Visibility className="widgetlicon"/>View</button>
                </li>
                <li className="widgetllistitem">
                    <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="widgetlimg"></img>
                    <div className="widgetluser">
                        <span className="widgetlusername">User2</span>
                        <span className="widgetlusermail">user2@gmail.com</span>
                    </div>
                    <button className="widgetlbtn"><Visibility className="widgetlicon"/>View</button>
                </li>
                <li className="widgetllistitem">
                    <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="widgetlimg"></img>
                    <div className="widgetluser">
                        <span className="widgetlusername">User3</span>
                        <span className="widgetlusermail">user3@gmail.com</span>
                    </div>
                    <button className="widgetlbtn"><Visibility className="widgetlicon"/>View</button>
                </li>
                <li className="widgetllistitem">
                    <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="widgetlimg"></img>
                    <div className="widgetluser">
                        <span className="widgetlusername">User3</span>
                        <span className="widgetlusermail">user3@gmail.com</span>
                    </div>
                    <button className="widgetlbtn"><Visibility className="widgetlicon"/>View</button>
                </li>
                <li className="widgetllistitem">
                    <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="widgetlimg"></img>
                    <div className="widgetluser">
                        <span className="widgetlusername">User3</span>
                        <span className="widgetlusermail">user3@gmail.com</span>
                    </div>
                    <button className="widgetlbtn"><Visibility className="widgetlicon"/>View</button>
                </li>
            </ul>
        </div>
    )
}

export default WidgetL
