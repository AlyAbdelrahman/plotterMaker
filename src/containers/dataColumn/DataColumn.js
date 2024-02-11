import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; 
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


DataColumn.propTypes = {
    title: PropTypes.string.isRequired,
    draggableId: PropTypes.string.isRequired,
    droppableId: PropTypes.string.isRequired,
    columnData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            function: PropTypes.string.isRequired
        })
    ).isRequired,
    axisDroppableId: PropTypes.string.isRequired,
    axesLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    handleClearAxis: PropTypes.func.isRequired
};

export default DataColumn;
