// DOM variables
var team = document.location.search.replace("?team=", "");
var gameCardsEl = document.querySelector("#futuregames");
var teamEl = document.querySelector("#selectedTeam");
var gameTimeEl = document.querySelector("#gametime");
var countdownEl = document.querySelector("#countdown");
var statsEl = document.querySelector("#stats");
var teamWinsEl = document.querySelector("#teamWins");
var teamLossesEl = document.querySelector("#teamLosses");
var teamPointsForEl = document.querySelector("#teamPointsFor");
var teamPointsAgainstEl = document.querySelector("#teamPointsAgainst");

// If no team is selected accidentally, page sends user back to index.html
if (!team) {
    location.replace("./index.html");
}

// Object with all teams and their API ids
var teamIds = {
    atlantahawks: 132,
    bostonceltics: 133,
    brooklynnets: 134,
    charlottehornets: 135,
    chicagobulls: 136,
    clevelandcavaliers: 137,
    dallasmavericks: 138,
    denvernuggets: 139,
    detroitpistons: 140,
    goldenstatewarriors: 141,
    houstonrockets: 142,
    indianapacers: 143,
    losangelesclippers: 144,
    losangeleslakers: 145,
    memphisgrizzlies: 146,
    miamiheat: 147,
    milwaukeebucks: 148,
    minnesotatimberwolves: 149,
    neworleanspelicans: 150,
    newyorkknicks: 151,
    oklahomacitythunder: 152,
    orlandomagic: 153,
    philadelphia76ers: 154,
    phoenixsuns: 155,
    portlandtrailblazers: 156,
    sacramentokings: 157,
    sanantoniospurs: 158,
    torontoraptors: 159,
    utahjazz: 160,
    washingtonwizards: 161
}

// Function to pull locally saved team logos
function getLogo(team) {
    return  "./assets/teamlogos/" + team + ".svg";
}

function getStats(teamID) {
    fetch("https://api-basketball.p.rapidapi.com/statistics?league=12&season=2020-2021&team=" + teamID, {
	    "method": "GET",
	    "headers": {
            "x-rapidapi-key": "a02badb577msh53c62c24f7e4112p157b9bjsne248c865880a",
            "x-rapidapi-host": "api-basketball.p.rapidapi.com"
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(function (data) {
                displayTeamData(data);
            });
        }
    })
    .catch(err => {
        console.error(err);
    });
}

    // Function displays team data - name, logo, etc
    function displayTeamData(data) {

        // TEAM NAMES
        var teamName = data.response.team.name;

        // Creates span for titles with team names, the appends to HTML El
        var teamTitle = document.createElement('h2');
        teamTitle.textContent = teamName;
        teamTitle.setAttribute("style", "background-color: #000; font-family: 'Anton', sans-serif; font-size: var(--title-font);");
        teamEl.appendChild(teamTitle);

        // TEAM LOGOS
        var teamLogo = getLogo( teamName.toLowerCase().replaceAll(' ', '') );
        var logo = document.createElement("img");
        logo.setAttribute("src", teamLogo);
        logo.setAttribute("height", "100%");
        logo.setAttribute("width", "450px");
        logo.setAttribute("alt", "Team Logo");
        document.getElementById("selectedTeam").appendChild(logo);

        // TEAM STATS TABLE

        // Team wins
        var teamWins = data.response.games.wins.all.total;
        teamWinsEl.textContent = teamWins;

        // Team losses
        var teamLosses = data.response.games.loses.all.total;
        teamLossesEl.textContent = teamLosses;

        // Team points for
        var teamPointsFor = data.response.points.for.average.all;
        teamPointsForEl.textContent = teamPointsFor;

        // Team points against
        var teamPointsAgainst = data.response.points.against.average.all;
        teamPointsAgainstEl.textContent = teamPointsAgainst;
    }
  
    // GAME TIME
    function gameCountdown(data) {

        // Countdown from now till game
        var countDownDate = new Date(data[0].dates.start.localDate).getTime();

        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
        }, 1000);
    };
    
    function getTeamInfo() {
        var teamCode = team.toLowerCase().replaceAll('%20', '');
        var logo = getLogo(teamCode);
        var teamId = teamIds[teamCode];
        var winLoss = getStats(teamId);
    }

getTeamInfo();

// Ticketmaster API
$.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + team + "&apikey=wkeUKU7nGwu8KaAr6CW0pqhy3LP5gh4f",
    async: true,
    dataType: "json",
    success: function (res) {
        const eventData = res._embedded.events;

        gameCountdown(eventData);

        //For loop to creata future game cards
        for (var i = 0; i < eventData.length; i++) {
            var teams = eventData[i].name.split(' vs. ');
            for (var j = 0; j < teams.length; j++ ) {
                teams[j] = teams[j].toLowerCase().replaceAll(' ', '');
            };
            var team1Logo = getLogo(teams[0]);
            var team2Logo = getLogo(teams[1]);
            gameCardsEl.innerHTML += `
                <div class="card row nba-card">
                    <h3 class="nba-title">${eventData[i].name}</h3>
                    <h5>Next Game:</h5>
                    <div id="countdown"></div>
                    <div class="nba-date-container">${eventData[i].dates.start.localDate} ${eventData[i].dates.start.localTime}</div>
                    <div class="nba-img-container">
                        <img class="nba-img" id="team-1-Logo" src="${team1Logo}"/>
                        <span>VS.</span>
                        <img class="nba-img" id="team-2-logo" src="${team2Logo}"/>
                    </div>
                    <img id="logo2"/>
                    <p class="nba-info">${eventData[i].info}</p>
                    <a class="button alert" href="${eventData[i].url}" target="_blank">Click here to visit Ticket Master</a>
                </div>
            `;
        };
    },
    error: function (xhr, status, err) {
    }
});