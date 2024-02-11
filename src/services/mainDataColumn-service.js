import authHeader from '../helpers/auth-header';
import utils from './utils';

const API_URL = process.env.REACT_APP_API_URL;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

// Get all Dragable Coulmn Data list
function getCoulmnData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    
    const fullUrl = `${PROXY_URL}${API_URL}columns`; // Construct full URL
    
    return fetch(fullUrl, requestOptions)
        .then(utils.handleResponse);
}

function getChartData(chartAxesObj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(chartAxesObj)
    };

    const url = `${PROXY_URL}${API_URL}data`; // Construct URL
    
    return fetch(url, requestOptions)
        .then(utils.handleResponse);
}

const plotDataService = {
    getCoulmnData,
    getChartData
};

export default plotDataService;
