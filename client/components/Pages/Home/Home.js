import React,{useState,useEffect} from 'react'
import './Home.css'
import FeatureInfo from '../../FeatureInfo/FeatureInfo'
import Charts from '../../Charts/Charts'
import WidgetL from '../../Widgetsleft/WidgetL'
import WidgetR from '../../WidgetRight/WidgetR'
import {data} from './../../dummydata'
import auth from '../../../api/auth/auth-api'
import { recentProduct } from '../../../api/auth/productsApi'

function Home() {
    const [image, setimage] = useState([])
    useEffect(() => {
        const abortController =new AbortController()
        const signal=abortController.signal
        const jwt=auth.isAuthenticated()
        recentProduct({t:jwt.token},signal).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                setimage(data)
            }
        })
        return function cleanup(){
            abortController.abort()
          }
    }, [])
    return (
        <div className="home">
            <FeatureInfo/>
            <Charts  data={data} title="Sale Analytics" grid dataKey="Sale"/>
            <div className="homewidgets">
                <WidgetL/>
                <WidgetR productimage={image}/>
            </div>
        </div>
    )
}

export default Home
