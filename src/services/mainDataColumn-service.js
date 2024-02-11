import authHeader from '../helpers/auth-header';
import utils from './utils'

// Get all Dragable Coulmn Data list
function getCoulmnData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    // CORS proxy URL
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://plotter-task-8019e13a60ac.herokuapp.com/columns`; // temp implementation
    
    // Append the CORS proxy URL before your API URL
    const fullUrl = proxyUrl + url;

    // Make a request to the CORS proxy
    return fetch(fullUrl, requestOptions)
        .then(utils.handleResponse);
}

function getChartData(chartAxesObj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(chartAxesObj)
    }
    const url = `https://cors-anywhere.herokuapp.com/https://plotter-task-8019e13a60ac.herokuapp.com/data`; //temp implmentaion
    return fetch(url, requestOptions)
    .then(utils.handleResponse);
}
const plotDataService = {
    getCoulmnData,
    getChartData
}
export default plotDataService;