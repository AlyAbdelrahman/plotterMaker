import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DataAxes({droppableId, axesLabels}) {
    return (
        <div>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 100
                        }}
                    >
                        { axesLabels ||  <p>Drop dimension items here</p> }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
