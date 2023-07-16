import React from 'react'
import './FeatureInfo.css'
import {ArrowDownward,ArrowUpward} from '@material-ui/icons'

function FeatureInfo() {
    return (
        <div className="featureinfo">
            <div className="featureitem">
                <span className="featuretitle">Revenue</span>
                <div className="featuremoneycontainer">
                    <span className="featuremoney">2,415</span>
                    <span className="featuremoneyrate">-3.15 <ArrowDownward className="featuredicon negative"/></span>
                </div>
                <span className="featuredsub">Compare to last month</span>
            </div>
            <div className="featureitem">
                <span className="featuretitle">Sales</span>
                <div className="featuremoneycontainer">
                    <span className="featuremoney">2,415</span>
                    <span className="featuremoneyrate">-1.15 <ArrowDownward className="featuredicon negative"/></span>
                </div>
                <span className="featuredsub">Compare to last month</span>
            </div>
            <div className="featureitem">
                <span className="featuretitle">Cost</span>
                <div className="featuremoneycontainer">
                    <span className="featuremoney">2,415</span>
                    <span className="featuremoneyrate">5.15 <ArrowUpward className="featuredicon "/></span>
                </div>
                <span className="featuredsub">Compare to last month</span>
            </div>
        </div>
    )
}

export default FeatureInfo
