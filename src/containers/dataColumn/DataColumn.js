import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function DataColumn({ orginalColumnDataList }) {

    const [columnDataList, setColumnDataList] = useState(orginalColumnDataList || []);

    useEffect(() => {
        // Update columnDataList state when orginalColumnDataList prop changes
        setColumnDataList(orginalColumnDataList || []);
    }, [orginalColumnDataList]);

    const handleDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside the list
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const newList = Array.from(columnDataList);
        const [removed] = newList.splice(startIndex, 1);
        newList.splice(endIndex, 0, removed);

        setColumnDataList(newList);
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {columnDataList.map((item, index) => (
                                <Draggable key={item.name} draggableId={`draggable-${item.name}`} index={index}>
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
