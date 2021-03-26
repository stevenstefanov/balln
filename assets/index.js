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
		"x-rapidapi-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
		"x-rapidapi-host": "api-basketball.p.rapidapi.com"
	}
})
.then(response => {
	if (response.ok) {
    response.json().then(function(data) {
      console.log(data);
      displayTeamData(data);
    });
  }
})
.catch(err => {
	console.error(err);
});

// Function with for loop which populates team names in drop down menu
function displayTeamData(data) {
  for (var i = 0; i < data.response.length-2; i++) {
    var teamName = data.response[i].name;
    console.log(teamName);
    console.log(data.response[i].id);
    var teamTitle = document.createElement("option");
    teamTitle.textContent = teamName;
    teamTitle.value = teamName.toLowerCase();
    teamEl.appendChild(teamTitle);  
  }   
}