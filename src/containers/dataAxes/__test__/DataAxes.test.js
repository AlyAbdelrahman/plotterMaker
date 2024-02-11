import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import DataAxes from '../DataAxes'; // adjust the import path as needed
import { DragDropContext } from 'react-beautiful-dnd';

describe('DataAxes', () => {
    test('renders component with empty droppable area', () => {
        const droppableId = 'test-droppable';
        const axesLabel = '';
        const header = 'Header';

        render(
            <DragDropContext>

            <DataAxes
                droppableId={droppableId}
                axesLabel={axesLabel}
                handleClearAxis={jest.fn()}
                header={header}
            />
            </DragDropContext>

        );

        expect(screen.getByText(`Drop ${header} here`)).toBeInTheDocument();
    });

    test('renders component with filled droppable area', () => {
        const droppableId = 'test-droppable';
        const axesLabel = 'Test Axes';
        const header = 'Header';

        render(
            <DragDropContext>
                <DataAxes
                    droppableId={droppableId}
                    axesLabel={axesLabel}
                    handleClearAxis={jest.fn()}
                    header={header}
                />
            </DragDropContext>
        );

        expect(screen.getByText(axesLabel)).toBeInTheDocument();
        expect(screen.getByText('Clear')).toBeInTheDocument();
        expect(screen.queryByText(`Drop ${header} here`)).not.toBeInTheDocument();
    });

    test('calls handleClearAxis function when clear button is clicked', () => {
        const droppableId = 'test-droppable';
        const axesLabel = 'Test Axes';
        const header = 'Header';
        const handleClearAxis = jest.fn(); 

        render(
            <DragDropContext>
                <DataAxes
                    droppableId={droppableId}
                    axesLabel={axesLabel}
                    handleClearAxis={handleClearAxis}
                    header={header}
                />
            </DragDropContext>
        );

        const clearButton = screen.getByText('Clear');
        fireEvent.click(clearButton);

        expect(handleClearAxis).toHaveBeenCalledTimes(1);
        expect(handleClearAxis).toHaveBeenCalledWith(droppableId, axesLabel);
    });
});
