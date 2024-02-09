import React, { useEffect, useState } from 'react'
import plotDataService from '../../services/mainDataColumn-service';

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
            {orginalColumnData.length > 0 && (
                <ul>
                    {orginalColumnData.map((item, index) => {
                        return <li key={index}>{item.name}</li>;
                    })}
                </ul>
            )}
        </div>
    );
    
}
