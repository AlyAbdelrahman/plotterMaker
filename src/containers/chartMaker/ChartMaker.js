import React, { useEffect, useRef, useState } from 'react';
import plotDataService from '../../services/mainDataColumn-service';
import DataColumn from '../dataColumn/DataColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import { extractAxesLable, sortList } from '../../utils/utils';
import Axes from '../axes/Axes';
import ChartBuilder from '../chartBuilder/ChartBuilder';
import CHART from '../../utils/constants';
import Snackbar from '../../components/snackbar/Snackbar';

export default function ChartMaker() {
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [dimensionColumns, setDimensionColumns] = useState([]);
    const [measureColumns, setMeasureColumns] = useState([]);
    const measureAxesRef = useRef();
    const dimensionAxesRef = useRef();

    const [measureAxesData, setMeasureAxesData] = useState([]);
    const [dimensionAxesData, setDimensionAxesData] = useState('');
    const [error, setError] = useState(false);
    const [retryClicked, setRetryClicked] = useState(false);

    useEffect(() => {
        const dimensionCols = orginalColumnData.filter(item => item.function === 'dimension');
        const measureCols = orginalColumnData.filter(item => item.function === 'measure');
        setDimensionColumns(dimensionCols);
        setMeasureColumns(measureCols);
    }, [orginalColumnData]);

    const fetchChartColumnData = () => {
        return plotDataService.getCoulmnData()
            .then(data => {
                setOrginalColumnData(data.columns);
                setRetryClicked(false);
                setError(false);
            })
            .catch((err) => {
                console.error('Error fetching column data:', err);
                setError(true);
            });
    };

    useEffect(() => {
        fetchChartColumnData();
    }, [retryClicked]);

    const handleColumnDataOnDragEnd = (result) => {
        const sourceList = result.draggableId.startsWith(CHART.DIMENSION_DRAGGABLE_ID) ? dimensionColumns : measureColumns;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const newSortedList = sortList(sourceList, startIndex, endIndex);

        if (result.draggableId.startsWith(CHART.DIMENSION_DRAGGABLE_ID)) {
            setDimensionColumns(newSortedList);
        } else {
            setMeasureColumns(newSortedList);
        }
    };

    const handleAxesOnDragEnd = (result, axisData, setAxisData, axisType) => {
        const axesLabel = extractAxesLable(result.draggableId);
        let newColumns = axisData.filter(column => column.name !== axesLabel);

        if (axisType === 'measure') {
            const newMeasureAxesData = measureAxesData;
                newMeasureAxesData.push(axesLabel);
                setMeasureAxesData(newMeasureAxesData)
        } else {
            if (dimensionAxesData) {
                newColumns = [...newColumns, { name: dimensionAxesData, function: 'dimension' }];
            }
            setDimensionAxesData(axesLabel);
        }

        setAxisData(newColumns);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;

        if ((draggableId.startsWith(CHART.DIMENSION_DRAGGABLE_ID) && destination.droppableId === CHART.DIMENSION_DROPPABLE_ID) ||
            (draggableId.startsWith(CHART.MEASURE_DRAGGABLE_ID) && destination.droppableId === CHART.MEASURE_DROPPABLE_ID)) {
            handleColumnDataOnDragEnd(result);
        }

        if (destination.droppableId.startsWith(CHART.MEASURE_AXES_DROPPABLE_ID)) {
            handleAxesOnDragEnd(result, measureColumns, setMeasureColumns, 'measure');
        }

        if (destination.droppableId.startsWith(CHART.DIMENSION_AXES_DROPPABLE_ID)) {
            handleAxesOnDragEnd(result, dimensionColumns, setDimensionColumns, 'dimension');
        }
    };

    const handleClearAxis = (droppableId) => {
        if (droppableId.startsWith(CHART.MEASURE_AXES_DROPPABLE_ID)) {
            const measureCols = orginalColumnData.filter(item => item.function === 'measure');
            setMeasureAxesData([]);
            setMeasureColumns(measureCols);
        } else {
            const dimensionCols = orginalColumnData.filter(item => item.function === 'dimension');
            setDimensionAxesData('');
            setDimensionColumns(dimensionCols);
        }
    };

    const handleRetry = () => {
        setRetryClicked(true);
    };

    return (
        <div className="chartMakerContainer">
            <div className='chartDataColumnContainer'>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <DataColumn
                        title={CHART.MEASURE_COLUMN_TITLE}
                        droppableId={CHART.MEASURE_DROPPABLE_ID}
                        draggableId={CHART.MEASURE_DRAGGABLE_ID}
                        columnData={measureColumns}
                        ref={measureAxesRef}
                        axisDroppableId={CHART.MEASURE_AXES_DROPPABLE_ID}
                        axesLabel={measureAxesData}
                        handleClearAxis={() => handleClearAxis(CHART.MEASURE_AXES_DROPPABLE_ID)}
                    />
                    <DataColumn
                        title={CHART.DIMENSION_COLUMN_TITLE}
                        droppableId={CHART.DIMENSION_DROPPABLE_ID}
                        draggableId={CHART.DIMENSION_DRAGGABLE_ID}
                        columnData={dimensionColumns}
                        ref={dimensionAxesRef}
                        axisDroppableId={CHART.DIMENSION_AXES_DROPPABLE_ID}
                        axesLabel={dimensionAxesData}
                        handleClearAxis={() => handleClearAxis(CHART.DIMENSION_AXES_DROPPABLE_ID)}
                    />
                </DragDropContext>
            </div>
            <div className='chartBoxMakerContainer'>
                <div className="axesContainer">
                    <Axes ref={measureAxesRef} />
                    <Axes ref={dimensionAxesRef} />
                </div>
                <div style={{ width: '100%' }}>
                    {(measureAxesData && dimensionAxesData) && (
                        <ChartBuilder
                            xAxesLabel={measureAxesData}
                            yAxesLabel={dimensionAxesData}
                            chartRequestedData={{
                                measures: measureAxesData, 
                                dimension: dimensionAxesData 
                            }}
                        />
                    )} 
                </div>
            </div>
            {error && (
                <Snackbar
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
            )}
        </div>
    );
}
