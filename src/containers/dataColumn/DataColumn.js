import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function DataColumn({ orginalColumnDataList }) {
    const [dimensionColumns, setDimensionColumns] = useState([]);
    const [measureColumns, setMeasureColumns] = useState([]);

    useEffect(() => {
        // Filter dimension and measure columns when orginalColumnDataList changes
        const dimensionCols = orginalColumnDataList.filter(item => item.function === 'dimension');
        const measureCols = orginalColumnDataList.filter(item => item.function === 'measure');
        setDimensionColumns(dimensionCols);
        setMeasureColumns(measureCols);
    }, [orginalColumnDataList]);

    const handleDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside the list
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const draggableId = result.draggableId;
        let sourceList = draggableId.startsWith('draggable-dimension') ? dimensionColumns : measureColumns;
    
        // Create a new array to hold the sorted items
        let newList = Array.from(sourceList);
    
        // Remove the dragged item from its original position
        const [removed] = newList.splice(startIndex, 1);
    
        // Insert the dragged item into the new position
        newList.splice(endIndex, 0, removed);
    
        // Sort the list based on the index
        newList = newList.map((item, index) => ({ ...item, index })).sort((a, b) => a.index - b.index);
    
        // Update the state based on the type of column
        if (draggableId.startsWith('draggable-dimension')) {
            setDimensionColumns(newList);
        } else {
            setMeasureColumns(newList);
        }
    };
    
    

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                {/* Dimension Droppable */}
                <Droppable droppableId='droppable-dimension'>
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {dimensionColumns.map((item, index) => (
                                <Draggable key={item.name} draggableId={`draggable-dimension-${item.name}`} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.name}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                {/* Measure Droppable */}
                <Droppable droppableId='droppable-measure'>
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {measureColumns.map((item, index) => (
                                <Draggable key={item.name} draggableId={`draggable-measure-${item.name}`} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.name}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
