import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import plotDataService from "../../services/mainDataColumn-service";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const ChartBuilder = ({ xAxesLabel, yAxesLabel, chartRequestedData }) => {
    const [chartBuilderLabels, setChartBuilerLabels] = useState([]);
    const [chartBuilderDatasets, setChartBuilderDatasets] = useState([]);
    useEffect(()=>{
        plotDataService.getChartData(chartRequestedData).then(response => {
            console.log(response)
            setChartBuilerLabels(response[0].values)
            setChartBuilderDatasets(response[1].values)
         })
    },[chartRequestedData])
   
    const data = {
        labels:chartBuilderLabels,
        backgroundColor: ['rgba(255,0,0,1)'],
                lineTension: 1,
        datasets: [
            {
                label: 'Plotter',
                data: chartBuilderDatasets,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: ['rgba(255,0,0,1)'],
                lineTension: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        legend: {
            position: "left",
            labels: {
                boxWidth: 100
            }
        },
        tooltips: {
            enabled: true,
        },
       

        scales: {
            x: {
              display: true,
              title: {
                display: true,
                text:yAxesLabel,
                color: '#911',
                font: {
                  family: 'Comic Sans MS',
                  size: 20,
                  weight: 'bold',
                  lineHeight: 1.2,
                },
                padding: {top: 20, left: 0, right: 0, bottom: 0}
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: xAxesLabel,
                color: '#191',
                font: {
                  family: 'Times',
                  size: 20,
                  style: 'normal',
                  lineHeight: 1.2
                },
                padding: {top: 30, left: 0, right: 0, bottom: 0}
              }
            }
          }
    };

    return (
        <div className="chart-box" style={{display:'flex',justifyContent:'center' ,width:'100%',height:'500px'}}>
            <Line options={options} data={data} />
        </div>
    );
}

export default ChartBuilder;
