import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export default function DragDropColumn({droppableId, columnData, draggableId}) {
  return (
    <Droppable droppableId={droppableId}>
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {columnData.map((item, index) => (
                                <Draggable key={item.name} draggableId={`${draggableId}-${item.name}`} index={index}>
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
  )
}
