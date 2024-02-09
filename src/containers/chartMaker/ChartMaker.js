import React, { useEffect, useState } from 'react'
import plotDataService from '../../services/mainDataColumn-service';
import DataColumn from '../dataColumn/DataColumn';

export default function ChartMaker() {
    const [orginalColumnData, setOrginalColumnData] = useState([]);

    const fetchChartColumnData = () => {
        return plotDataService.getCoulmnData().then(data => {
            setOrginalColumnData(data)
            console.log(data)
        }).catch((err) => console.log('error'))
    };

    useEffect(() => {
        fetchChartColumnData();
    },[])

    
    return (
        <div className="chartMakerContainer">
            <DataColumn orginalColumnDataList={orginalColumnData}/>
            
        </div>
    );
    
}
