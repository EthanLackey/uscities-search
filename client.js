

// UI DOM Refernces

var searchBtnElm = document.getElementById('search-button');
if (!searchBtnElm) {
    console.log("Error in getting search button");
}

searchBtnElm.addEventListener('click', () => {
    search();
    searchInput.value = '';
});

var searchInput = document.getElementById('search-input');
if (!searchInput) {
    console.log("Error in getting search input");
}

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        search();
        searchInput.value = '';
    } 
});

const BASE_URL = "https://lackeyej-uscities-microservices-hndse0ajf4cufpav.canadacentral-01.azurewebsites.net"
async function search () {
    var query = searchInput.value.trim();
    if (!query || query.length === 0) return;
    console.log(`Debug>query: ${query}`);

    try {
        const response = await fetch(`${BASE_URL}/uscities-search/${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`Unexpected status ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Malformed Response');
        }
        displaySearch(data);
    }
    catch (err) {
        console.log(`Debug>search error: ${err.message}`);
        responsesElm.textContent = 'Error: could not load results';
        }
}

var responsesElm = document.getElementById('responses');

function displaySearch(data) { 
    if (!responsesElm) {
        console.log('Error in getting response element')
        return;
    }
    responsesElm.innerHTML = json2htmltable(data);
}

function data_sanitize(v) {
    return DOMPurify.sanitize(typeof v == 'string' ? v : '');
}

function json2htmltable(data) {
    if (!Array.isArray(data) || data.length === 0) return "No cities found";
        var rows = data.map(function (c) {
        return "<tr><td>" + data_sanitize(c.city) + "</td><td>" + data_sanitize(c.state) + "</td><td>" + data_sanitize(c.zips) + "</td></tr>";
    }).join('');
    return "<table><tr><th>City</th><th>State</th><th>Zip Codes</th></tr>" + rows + "</table>";   
}

searchInput.addEventListener('keyup', function(event) {
    search();
    if (event.key === 'Enter') {
        searchInput.value = '';
    }
});