import React from 'react'
import './WidgetR.css'
import { Link } from "react-router-dom";

function WidgetR({productimage}) {

    return (
        <div className="widgetr">
            <h3 className="widgetrtitle">Best Selling</h3>
            <hr/>
            <div className="widgetrgrid">
                {productimage.map((image)=>{
                    return(
                        <div className="col-4 pt-2 widgetrgriditem" key={image.product_id}>
                            <Link to={"/product/"+image.product_id} className="gridlink">
                                <img src={"http://localhost:3001/dist/uploads/"+image.image1} alt="" className="widgetrimg"></img>
                                <span className="widgetrgridname">{image.name}</span>
                            </Link>
                            
                        </div>
                    )
                })}
            </div>
        </div>)
}

export default WidgetR
