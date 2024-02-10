import React from 'react';
import DragDropColumn from '../../components/dragDropColumn/DragDropColumn';
import DataAxes from '../dataAxes/DataAxes';

export default function DataColumn({ title, draggableId, droppableId, columnData }) {
    return (
        <div>
            <DragDropColumn
                title={title}
                droppableId={droppableId}
                draggableId={draggableId}
                columnData={columnData}
            />
            {/* {axesContainerRef && ReactDOM.createPortal(<DataAxes header={listName} axesData={getMatchedAxesData(listName)} handleDeleteMeasure={handleDeleteMeasure} />, axesContainerRef.current)} */}

        </div>
    );
}
