// DOM variables
var searchFormEl = document.querySelector("#search-form");
var teamEl = document.querySelector("#team-dropdown");

// Function to set localStorage
document.getElementById("team-dropdown").onchange = function() {
    localStorage["userChoice"] = document.getElementById("team-dropdown").value;
}
window.onload= function(){
    if(localStorage["userChoice"])
    document.getElementById("team-dropdown").value = localStorage["userChoice"];
}

// Function to handle submit button
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var teamsDropdownVal = teamEl.value;

  if (!teamsDropdownVal) {
    console.error("You need a search input value!");
    return;
  }

  var queryString = "./results.html?team=" + teamsDropdownVal;
  location.assign(queryString);
  setLocalStorage();
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

// Fetch that gets 2020-2021 season team information
fetch("https://api-basketball.p.rapidapi.com/teams?league=12&season=2020-2021", {
  "method": "GET",
	"headers": {
		"x-rapidapi-key": "a02badb577msh53c62c24f7e4112p157b9bjsne248c865880a",
		"x-rapidapi-host": "api-basketball.p.rapidapi.com"
	}
})
.then(response => {
	if (response.ok) {
    response.json().then(function(data) {
      displayTeamData(data);
    });
  }
})
.catch(err => {
	console.error(err);
});

// Function to populate team names in drop down menu
function displayTeamData(data) {
  for (var i = 0; i < data.response.length-2; i++) {
    var teamName = data.response[i].name;
    var teamTitle = document.createElement("option");
    teamTitle.textContent = teamName;
    teamTitle.value = teamName.toLowerCase();
    teamEl.appendChild(teamTitle);  
  }   
}