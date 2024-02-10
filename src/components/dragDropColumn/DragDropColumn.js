import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function DragDropColumn({ droppableId, columnData, draggableId, title }) {
    return (
        <div>
            <h4 className='categoryHeader'>{title}</h4>
        <Droppable droppableId={droppableId} key={droppableId} data-test='droppable-item'>
            {(provided) => (
                <div>
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {columnData.map((item, index) => (
                            <div className='draggableCategory' data-test="dragable-item" key={item.name}>
                                <Draggable key={item.name} draggableId={`${draggableId}-${item.name}`} index={index} >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                userSelect: "none",
                                                padding: 16,
                                                margin: "0 0 8px 0",
                                                height: "2.9rem",
                                                backgroundColor: snapshot.isDragging
                                                    ? "#263B4A"
                                                    : "#456C86",
                                                color: "white",
                                                borderRadius: snapshot.isDragging ? '1rem' : '0rem',
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            {item.name}
                                            {provided.placeholder}
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
        </div>
    );
}
