var searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var teamsDropdownVal = document.querySelector(‘#teams-dropdown’).value;
  if (!teamsDropdownVal) {
    console.error(‘You need a search input value!‘);
    return;
  }
  var queryString = ‘./search-results.html?team=’ + teamsDropdownVal;
  location.assign(queryString);
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);