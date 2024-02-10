import React from 'react';
import ReactDOM from 'react-dom';
import DragDropColumn from '../../components/dragDropColumn/DragDropColumn';
import DataAxes from '../dataAxes/DataAxes';

 const DataColumn = React.forwardRef(({ title, draggableId, droppableId, columnData, axisDroppableId, axesLabels }, axesContainerRef) => {
    return (
        <div>
            <DragDropColumn
                title={title}
                droppableId={droppableId}
                draggableId={draggableId}
                columnData={columnData}
            />
            {axesContainerRef.current && ReactDOM.createPortal(<DataAxes header={title} axesLabels={axesLabels} droppableId={axisDroppableId}/>, axesContainerRef.current)}

        </div>
    );
});
export default DataColumn;