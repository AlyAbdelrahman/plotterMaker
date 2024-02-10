import React from 'react';
import ReactDOM from 'react-dom';
import DragDropColumn from '../../components/dragDropColumn/DragDropColumn';
import DataAxes from '../dataAxes/DataAxes';

 const DataColumn = React.forwardRef(({ title, draggableId, droppableId, columnData, axisDroppableId, axesLabel, handleClearAxis }, axesContainerRef) => {
    return (
        <div>
            <DragDropColumn
                title={title}
                droppableId={droppableId}
                draggableId={draggableId}
                columnData={columnData}
            />
            {axesContainerRef.current && ReactDOM.createPortal(<DataAxes header={title} axesLabel={axesLabel} droppableId={axisDroppableId} handleClearAxis={handleClearAxis}/>, axesContainerRef.current)}

        </div>
    );
});
export default DataColumn;