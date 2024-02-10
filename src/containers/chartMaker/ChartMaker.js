import React, { useEffect, useRef, useState } from 'react';
import plotDataService from '../../services/mainDataColumn-service';
import DataColumn from '../dataColumn/DataColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import { extractAxesLable, sortList } from '../../utils/utils';
import Axes from '../axes/Axes';
import ChartBuilder from '../chartBuilder/ChartBuilder';

export default function ChartMaker() {
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [dimensionColumns, setDimensionColumns] = useState([]);
    const [measureColumns, setMeasureColumns] = useState([]);
    const measureAxesRef = useRef();
    const dimensionAxesRef = useRef();

    const [measureAxesData, setMeasureAxesData] = useState('');
    const [dimensionAxesData, setDimensionAxesData] = useState('');

    useEffect(() => {
        const dimensionCols = orginalColumnData.filter(item => item.function === 'dimension');
        const measureCols = orginalColumnData.filter(item => item.function === 'measure');
        setDimensionColumns(dimensionCols);
        setMeasureColumns(measureCols);
    }, [orginalColumnData]);

    const fetchChartColumnData = () => {
        return plotDataService.getCoulmnData()
            .then(data => {
                setOrginalColumnData(data);
            })
            .catch((err) => console.error('Error fetching column data:', err));
    };

    useEffect(() => {
        fetchChartColumnData();
    }, []);

    const handleColumnDataOnDragEnd = (result) => {
        const sourceList = result.draggableId.startsWith('draggable-dimension') ? dimensionColumns : measureColumns;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const newSortedList = sortList(sourceList, startIndex, endIndex);

        if (result.draggableId.startsWith('draggable-dimension')) {
            setDimensionColumns(newSortedList);
        } else {
            setMeasureColumns(newSortedList);
        }
    };

    const handleAxesOnDragEnd = (result, axisData, setAxisData, axisType) => {
        const axesLabel = extractAxesLable(result.draggableId);
        let newColumns = axisData.filter(column => column.name !== axesLabel);

        if (axisType === 'measure') {
            if (measureAxesData){
                newColumns = [...newColumns, { name: measureAxesData, function: 'measure' }];
            }
            setMeasureAxesData(axesLabel);
        } else {
            if (dimensionAxesData){
                newColumns = [...newColumns, { name: dimensionAxesData, function: 'dimension' }];
            }
            setDimensionAxesData(axesLabel);
        }

        setAxisData(newColumns);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;

        if ((draggableId.startsWith('draggable-dimension') && destination.droppableId === 'droppable-dimension') ||
            (draggableId.startsWith('draggable-measure') && destination.droppableId === 'droppable-measure')) {
            handleColumnDataOnDragEnd(result);
        }

        if (destination.droppableId.startsWith('doppable-measure-axes')) {
            handleAxesOnDragEnd(result, measureColumns, setMeasureColumns, 'measure');
        }

        if (destination.droppableId.startsWith('doppable-dimension-axes')) {
            handleAxesOnDragEnd(result, dimensionColumns, setDimensionColumns, 'dimension');
        }
    };

    const handleClearAxis = (droppableId) => {
        if (droppableId.startsWith('doppable-measure-axes')) {
            const measureCols = orginalColumnData.filter(item => item.function === 'measure');
            setMeasureAxesData('');
            setMeasureColumns(measureCols);
        } else {
            const dimensionCols = orginalColumnData.filter(item => item.function === 'dimension');
            setDimensionAxesData('');
            setDimensionColumns(dimensionCols);
        }
    };

    return (
        <div className="chartMakerContainer">
            <div className='chartDataColumnContainer'>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <DataColumn
                        title='Measure'
                        droppableId="droppable-measure"
                        draggableId="draggable-measure"
                        columnData={measureColumns}
                        ref={measureAxesRef}
                        axisDroppableId="doppable-measure-axes"
                        axesLabel={measureAxesData}
                        handleClearAxis={() => handleClearAxis('doppable-measure-axes')}
                    />
                    <DataColumn
                        title='Dimension'
                        droppableId="droppable-dimension"
                        draggableId="draggable-dimension"
                        columnData={dimensionColumns}
                        ref={dimensionAxesRef}
                        axisDroppableId="doppable-dimension-axes"
                        axesLabel={dimensionAxesData}
                        handleClearAxis={() => handleClearAxis('doppable-dimension-axes')}
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
                                measures: ["Cost"],
                                dimension: "Product"
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
