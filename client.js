

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

function search () {
    var query = searchInput.value.trim();
    if (!query || query.length === 0) return;
    console.log(`Debug>query: ${query}`);
}

function displaySearch(data) { 
    //TODO
}