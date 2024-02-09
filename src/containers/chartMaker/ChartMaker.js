import React, { useEffect, useState } from 'react'
import plotDataService from '../../services/mainDataColumn-service';
import DataColumn from '../dataColumn/DataColumn';
import DataAxes from '../dataAxes/DataAxes';

export default function ChartMaker() {
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [dimensionData, setDimensionData] = useState([]);
    const [measureData, setMeasureData] = useState([]);

    useEffect(() => {
        // Separate columnsTestData based on the function property
        const dimensionColumns = orginalColumnData.filter(item => item.function === 'dimension');
        const measureColumns = orginalColumnData.filter(item => item.function === 'measure');
        
        setDimensionData(dimensionColumns);
        setMeasureData(measureColumns);
    }, [orginalColumnData]);

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
            <DataColumn orginalColumnDataList={orginalColumnData}  />
        </div>
    );
    
}
