import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DataAxes({ droppableId, axesLabel, handleClearAxis, header }) {
    return (
        <div className='droppableAxesContainer'>
            <div className='droppableAxesBox'>
                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='droppableAxesArea'
                        >
                            {Array.isArray(axesLabel) && axesLabel.length > 0 ? (
                                axesLabel.map((item) => (
                                    <div key={item} className='draggableCategory--toDrop'>
                                        {item}
                                    </div>
                                ))
                            ) : typeof axesLabel === 'string' && axesLabel.length > 0 ? (
                                <div className='draggableCategory--toDrop'>{axesLabel}</div>
                            ) : (
                                <p>Drop {header} here</p>
                            )}
                            <div style={{ display: 'none' }}> {provided.placeholder} </div>
                        </div>
                    )}
                </Droppable>
                {axesLabel.length > 0 && (
                    <button className='clearAxisBtn' onClick={() => handleClearAxis(droppableId, axesLabel)}>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
