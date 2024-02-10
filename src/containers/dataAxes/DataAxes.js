import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DataAxes() {
    return (
        <div>
            <Droppable droppableId='droppable-dimension'>
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
                        <p>Drop dimension items here</p>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId='droppable-measure'>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 100,
                            marginTop: 20
                        }}
                    >
                        <p>Drop measure items here</p>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
