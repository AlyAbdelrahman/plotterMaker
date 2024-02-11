import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
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
import Snackbar from "../../components/snackbar/Snackbar";

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
    const [chartData, setChartData] = useState([]);


    const [error, setError] = useState(false);
    const [retryClicked, setRetryClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (chartRequestedData.dimension.length === 0 || chartRequestedData.measures.length === 0 ) return
        debugger
        setIsLoading(true)
        plotDataService.getChartData(chartRequestedData)
            .then(response => {
                const colors = ['rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,0,255,1)'];
                const datasets = response.data.slice(1).map((item,index) => ({
                    label: item.name,
                    data: item.values,
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length],
                    lineTension: 1
                }));
                const data = {
                    labels: response.data[0].values,
                    datasets
                };
                setChartData(data)
                setError(false);
                setRetryClicked(false);
            })
            .catch((err) => {
                console.error('Error fetching column data:', err);
                setError(true);
            }).finally(() => setIsLoading(false));
    }, [chartRequestedData, retryClicked]);



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
                    text: yAxesLabel,
                    color: '#911',
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                    padding: { top: 20, left: 0, right: 0, bottom: 0 }
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
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
                }
            }
        }
    };

    const handleRetry = () => {
        setRetryClicked(true);
    };
    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center' }}><h1>loading Chart</h1></div>
    if (error) return <Snackbar
        open={true}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        message="Error fetching data"
        action={
            <button color="secondary" size="small" onClick={handleRetry}>
                Retry
            </button>
        }
    />
    return (
        <>
            <div className="chart-box" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '500px' }}>
                {chartData.labels && <Line options={options} data={chartData} />}
            </div>
        </>
    );
}

ChartBuilder.propTypes = {
    xAxesLabel: PropTypes.string.isRequired,
    yAxesLabel: PropTypes.string.isRequired,
    chartRequestedData: PropTypes.shape({
        measures: PropTypes.arrayOf(PropTypes.string.isRequired),
        dimension: PropTypes.string.isRequired
    }).isRequired,
};

export default ChartBuilder;
