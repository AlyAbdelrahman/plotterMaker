import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function DragDropColumn({ droppableId, columnData, draggableId }) {
    return (
        <Droppable droppableId={droppableId} key={droppableId} data-test='droppable-item'>
            {(provided) => (
                <div>
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {columnData.map((item, index) => (
                            <div data-test="dragable-item" key={item.name}>
                                <Draggable key={item.name} draggableId={item.name} index={index} >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.name}
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
