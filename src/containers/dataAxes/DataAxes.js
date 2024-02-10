import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DataAxes({droppableId, axesLabel, handleClearAxis}) {
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
                        { axesLabel.length > 0 ? axesLabel :  <p>Drop  items here</p> }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <button onClick={()=>handleClearAxis(droppableId, axesLabel)}>Clear</button>
        </div>
    );
}
