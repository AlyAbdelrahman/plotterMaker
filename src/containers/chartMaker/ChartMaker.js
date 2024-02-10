import React, { useEffect, useRef, useState } from 'react'
import plotDataService from '../../services/mainDataColumn-service';
import DataColumn from '../dataColumn/DataColumn';
import DataAxes from '../dataAxes/DataAxes';
import { DragDropContext } from 'react-beautiful-dnd';
import { extractAxesLable, sortList } from '../../utils/utils';
import DragDropColumn from '../../components/dragDropColumn/DragDropColumn';
import Axes from '../axes/Axes';

export default function ChartMaker() {
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [dimensionColumns, setDimensionColumns] = useState([]);
    const [measureColumns, setMeasureColumns] = useState([]);
    const dimensionAxesRef = useRef();
    const measureAxesRef = useRef();

    const [measueAxesData, setMeasureAxesData] = useState([]);
    const [dimensionAxesData, setDimensionAxesData] = useState([]);


    useEffect(() => {
        // Filter dimension and measure columns when orginalColumnData changes
        const dimensionCols = orginalColumnData.filter(item => item.function === 'dimension');
        const measureCols = orginalColumnData.filter(item => item.function === 'measure');
        setDimensionColumns(dimensionCols);
        setMeasureColumns(measureCols);
    }, [orginalColumnData]);



    const fetchChartColumnData = () => {
        return plotDataService.getCoulmnData().then(data => {
            setOrginalColumnData(data)
            console.log(data)
        }).catch((err) => console.log('error'))
    };

    useEffect(() => {
        fetchChartColumnData();
    }, [])

    const handleColumnDataOnDragEnd = (result) => {
        let sourceList = result.draggableId.startsWith('draggable-dimension') ? dimensionColumns : measureColumns;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const newSortedList = sortList(sourceList, startIndex, endIndex);
        // Update the state based on the type of column
        if (result.draggableId.startsWith('draggable-dimension')) {
            setDimensionColumns(newSortedList);
        } else {
            setMeasureColumns(newSortedList);
        }
    }
    const handleMeasureAxesOnDragEnd = (result) => {
        const axesLabel = extractAxesLable(result.draggableId);
        const filteredDimensionColumns = measureColumns.filter(column => column.name !== axesLabel);
        // Update the state with the axes label and filtered dimension columns
        setMeasureAxesData(axesLabel);
        setMeasureColumns(filteredDimensionColumns);

        console.log('>>>>>handleMeasureAxesOnDragEnd')
    }

    const handleDimensionAxesOnDragEnd = (result) => {
        const axesLabel = extractAxesLable(result.draggableId);
        // Filter out the dimension column with the extracted label
        const filteredDimensionColumns = dimensionColumns.filter(column => column.name !== axesLabel);
        // Update the state with the axes label and filtered dimension columns
        setDimensionAxesData(axesLabel);
        setDimensionColumns(filteredDimensionColumns);
    };
    
    
    
    const handleDragEnd = (result) => {

        if (!result.destination) return; // If dropped outside the list
        // debugger

        const { draggableId, destination, source } = result;
        debugger
        // Handle dragging within Dimension or Measure columns
        if ((draggableId.startsWith('draggable-dimension') && destination.droppableId === 'droppable-dimension') ||
            (draggableId.startsWith('draggable-measure') && destination.droppableId === 'droppable-measure')) {
            handleColumnDataOnDragEnd(result);
            return;
        }


        // Handle dragging to Measure Axes
        if (destination.droppableId.startsWith('doppable-measure-axes')) {
            handleMeasureAxesOnDragEnd(result);
            return;
        }

        // Handle dragging to Dimension Axes
        if (destination.droppableId.startsWith('doppable-dimension-axes')) {
            handleDimensionAxesOnDragEnd(result);
            return;
        }
    };


    return (
        <div className="chartMakerContainer" style={{ display: 'flex' }}>
            <div className='chartDataColumnContainer'>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <DataColumn
                        title='Measure'
                        droppableId="droppable-measure"
                        draggableId="draggable-measure"
                        columnData={measureColumns}
                        ref={measureAxesRef}
                        axisDroppableId="doppable-measure-axes"
                        axesLabels={measueAxesData}

                    />
                </DragDropContext>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <DataColumn
                        title='Dimension'
                        droppableId="droppable-dimension"
                        draggableId="draggable-dimension"
                        columnData={dimensionColumns}
                        ref={dimensionAxesRef}
                        axisDroppableId="doppable-dimension-axes"
                        axesLabels={dimensionAxesData}
                    />
                </DragDropContext>
            </div>
            <div className="axesContainer">
                <Axes ref={measureAxesRef} />
                <Axes ref={dimensionAxesRef} />
            </div>
        </div>
    );

}
