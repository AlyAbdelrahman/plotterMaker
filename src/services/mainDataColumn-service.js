import authHeader from '../helpers/auth-header';
import { columnsTestData, dimensionMeasureColumnsDataValues } from '../utils/testData';
import utils from './utils'

// Get all Dragable Coulmn Data list
function getCoulmnData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    const url = `https://plotter-task.herokuapp.com/columns`; // temp implmentaion
    return new Promise((resolve, reject) => {
        resolve(columnsTestData);
    });
    // return fetch(url, requestOptions)
    // .then(utils.handleResponse);
}

function getChartData(chartAxesObj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(chartAxesObj)
    }
    const url = `https://plotter-task.herokuapp.com/data`; //temp implmentaion
    return new Promise((resolve, reject) => {
        resolve(dimensionMeasureColumnsDataValues);
    });
    // return fetch(url, requestOptions)
    // .then(utils.handleResponse);
}
const plotDataService = {
    getCoulmnData,
    getChartData
}
export default plotDataService;