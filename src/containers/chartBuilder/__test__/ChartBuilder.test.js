import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChartBuilder from '../ChartBuilder'; // adjust the import path as needed
import plotDataService from '../../../services/mainDataColumn-service'; // adjust the import path as needed

jest.mock('../../../services/mainDataColumn-service');

describe('ChartBuilder', () => {
  test('renders chart without error', async () => {
    const xAxesLabel = 'X Axis';
    const yAxesLabel = 'Y Axis';
    const chartRequestedData = {
        measures: ['measureAxesData'], 
        dimension: 'dimensionAxesData' 
    };
    const mockResponse = [
      { values: ['Label 1', 'Label 2', 'Label 3'] },
      { values: [10, 20, 30] }
    ];
    plotDataService.getChartData.mockResolvedValue(mockResponse);

    render(<ChartBuilder xAxesLabel={xAxesLabel} yAxesLabel={yAxesLabel} chartRequestedData={chartRequestedData} />);

 
    expect(plotDataService.getChartData).toHaveBeenCalledWith(chartRequestedData);
    expect(plotDataService.getChartData).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Error fetching data')).not.toBeInTheDocument();
  });

});
