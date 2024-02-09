import React, { useEffect, useState } from 'react'
import plotDataService from '../../services/mainDataColumn-service';
import DataColumn from '../dataColumn/DataColumn';
import DataAxes from '../dataAxes/DataAxes';
import { DragDropContext } from 'react-beautiful-dnd';
import { sortList } from '../../utils/utils';

export default function ChartMaker() {
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [dimensionColumns, setDimensionColumns] = useState([]);
    const [measureColumns, setMeasureColumns] = useState([]);


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
    const handleDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside the list
        if (result.draggableId.startsWith('draggable-dimension') || result.draggableId.startsWith('draggable-measure')) return handleColumnDataOnDragEnd(result);

    };

    return (
        <div className="chartMakerContainer">
            <DragDropContext onDragEnd={handleDragEnd}>
                <DataColumn orginalColumnDataList={orginalColumnData} dimensionColumns={dimensionColumns} measureColumns={measureColumns} />
            </DragDropContext>
        </div>
    );

}
