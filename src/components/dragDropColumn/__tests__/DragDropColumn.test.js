import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import DragDropColumn from '../DragDropColumn'; // adjust the import path as needed
import { DragDropContext } from 'react-beautiful-dnd';

describe('DragDropColumn', () => {
    test('renders title correctly', () => {
        const title = 'Test Title';
        const columnData= [
            {
                name: "Product",
                function: "dimension"
            },
            {
                name: "Year",
                function: "dimension"
            },
            {
                name: "Country",
                function: "dimension"
            }
        ];
        render(<DragDropContext><DragDropColumn title={title} droppableId="droppableId"
        draggableId="draggableId"
        columnData={columnData} /></DragDropContext>);
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    test('renders column data correctly', () => {
        const columnDatad = [
            {
                name: "Product",
                function: "dimension"
            },
            {
                name: "Year",
                function: "dimension"
            },
            {
                name: "Country",
                function: "dimension"
            }
        ];
        render(<DragDropContext>
            <DragDropColumn title="title"
                droppableId="droppableId"
                draggableId="draggableId"
                columnData={columnDatad} 
            />
        </DragDropContext>);
        columnDatad.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });
});
