import React from 'react';
import DragDropColumn from '../../components/dragDropColumn/DragDropColumn';

export default function DataColumn({ dimensionColumns, measureColumns }) {  
    return (
        <div>
                {/* Dimension Droppable */}
                <DragDropColumn
                    title='Dimension'
                    droppableId='droppable-dimension'
                    draggableId="draggable-dimension"
                    columnData={dimensionColumns}
                  />
                {/* Measure Droppable */}
                <DragDropColumn
                    title='Measure'
                    droppableId="droppable-measure"
                    draggableId="draggable-measure"
                    columnData={measureColumns}
                  />
        </div>
    );
}
