var teamAEl = document.querySelector("#teamA");
var teamBEl = document.querySelector("#teamB");
// var gameTime = document.querySelector("");
// var gameLocation = document.querySelector("");



// Function fetches from basketball api, console logs data, then calls displayTeamData function
function getGameData() {
    fetch("https://api-basketball.p.rapidapi.com/games?h2h=134-145", {
        "method": "GET",
        "headers": {
        "x-rapidapi-key": "a02badb577msh53c62c24f7e4112p157b9bjsne248c865880a",
            "x-rapidapi-host": "api-basketball.p.rapidapi.com"
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayTeamData(data);
            });
        }
    })
    .catch(err => {
        console.error(err);
    });
}

// Function displays all team data - name, logo, etc
function displayTeamData(data) {

    // TEAM NAMES
    var teamAName = data.response[14].teams.away.name;
    var teamBName = data.response[14].teams.home.name;

    // Creates span for titles with team names, the append to HTML EL
    var teamATitle = document.createElement('span');
    teamATitle.textContent = teamAName;
    
    var teamBTitle = document.createElement('span');
    teamBTitle.textContent = teamBName;
    
    teamAEl.appendChild(teamATitle);
    teamBEl.appendChild(teamBTitle);
    
    console.log(teamATitle);
    console.log(teamBTitle);

    // TEAM LOGOS
    var teamALogo = data.response[14].teams.away.logo;
    var teamBLogo = data.response[14].teams.home.logo;

    var logoA = document.createElement("img");
    logoA.setAttribute("src", teamALogo);
    logoA.setAttribute("height", "120px");
    logoA.setAttribute("width", "200px");
    logoA.setAttribute("padding-top", "135px");
    logoA.setAttribute("alt", "Team Logo");
    document.getElementById("teamA").appendChild(logoA);

    var logoB = document.createElement("img");
    logoB.setAttribute("src", teamBLogo);
    logoB.setAttribute("height", "120");
    logoB.setAttribute("width", "120");
    logoB.setAttribute("alt", "Team Logo");
    document.getElementById("teamB").appendChild(logoB);
    
    }
    
    getGameData();