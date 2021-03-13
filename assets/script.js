var teamA = document.querySelector("teamA");
var teamB = document.querySelector("teamB");
var gameTime = document.querySelector("");
var gameLocation = document.querySelector("");


// function to call next game time and location
    //find time of next game
    //compare time to current time
    //append time to html
    //find location of game
    // append location
    // save location for map api




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
    
    function displayTeamData(data) {
        var teamAName = data.response[14].teams.away.name;
        var teamBName = data.response[14].teams.home.name;
    
        var teamATitle = document.createElement('span');
        teamATitle.textContent = teamAName;
    
        var teamBTitle = document.createElement('span');
        teamBTitle.textContent = teamBName;
    
        teamAEl.appendChild(teamATitle);
        teamBEl.appendChild(teamBTitle);
    
        console.log(teamATitle);
        console.log(teamBTitle);
    
    }
    
    getGameData();