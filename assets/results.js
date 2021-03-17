var teamEl = document.querySelector("#teamA");
var gameTimeEl = document.querySelector("#gametime");
var countdownEl = document.querySelector("#countdown");
var statsEl = document.querySelector("#stats")

// Object with all teams and their ids
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
    washingtonwizzards: 161
  }

function getLogo(team) {
// return our relative path
return  './assets/team-logos/' + team + '.svg';
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
                console.log(data);
                displayTeamData(data);
                // gameCountdown(data);
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

        // Creates span for titles with team names, the append to HTML EL
        var teamTitle = document.createElement('h2');
        teamTitle.textContent = teamName;
        teamEl.appendChild(teamTitle);

        // TEAM LOGOS
        var teamLogo = data.response.team.logo;
        var logo = document.createElement("img");
        logo.setAttribute("src", teamLogo);
        logo.setAttribute("height", "120px");
        logo.setAttribute("width", "200px");
        logo.setAttribute("alt", "Team Logo");
        document.getElementById("teamA").appendChild(logo);

        // TEAM STATS

        // Team wins
        var teamWins = data.response.games.wins.all.total;
        var teamWinsEl = document.createElement('p');
        teamWinsEl.textContent = "Wins: " + teamWins;
        statsEl.appendChild(teamWinsEl);

        // Team loses
        var teamLoses = data.response.games.loses.all.total;
        var teamLosesEl = document.createElement('p');
        teamLosesEl.textContent = "Loses: " + teamLoses;
        statsEl.appendChild(teamLosesEl);

        // Team points for
        var teamPointsFor = data.response.goals.for.average.all;
        var teamPointsForEl = document.createElement('p');
        teamPointsForEl.textContent = "Average Points (For): " + teamPointsFor;
        statsEl.appendChild(teamPointsForEl);

        // Team points against
        var teamPointsAgainst = data.response.goals.against.average.all;
        var teamPointsAgainstEl = document.createElement('p');
        teamPointsAgainstEl.textContent = "Average Points (Againts): " + teamPointsAgainst;
        statsEl.appendChild(teamPointsAgainstEl);
    }
  
    // GAME TIME
    function gameCountdown(data) {

        // Displays when the game will take place
        var time = moment(data.response.date).format("dddd, MMMM Do h:mm a");
        gameTimeEl.textContent = time;

        // Countdown from now till game
        var countDownDate = new Date(data.response[14].date).getTime();

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

    var team = document.location.search.replace("?team=", "");

    function getTeamInfo() {
            var teamCode = team.toLowerCase().replace('%20', '');
            var logo = getLogo(teamCode);
            var teamId = teamIds[teamCode];
            var winLoss = getStats(teamId);
            console.log(teamId);

        // build and append HTML for team card
    }

    getTeamInfo();

    /* Ticketmaster API*/
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + team + "&apikey=wkeUKU7nGwu8KaAr6CW0pqhy3LP5gh4f",
        async: true,
        dataType: "json",
        success: function (res) {
            console.log("**********",res);
            const eventData = res._embedded.events;

            //initialize mark up string
            let nbaCardMarkUp = "";

            //concat markup stringthrough a loop
            for (let i = 0; i < eventData.length; i++) {
                if(i === 0) {
                    // code to handle timer
                }
                nbaCardMarkUp += `
                    <div class="nba-card">
                        <h3 class="nba-title">${eventData[i].name}</h3>
                        <div class="nba-date-container">${eventData[i].dates.start.localDate} ${eventData[i].dates.start.localTime}</div>
                        <img class="nba-img" src="${eventData[i].images[0].url}"/>
                        <p class="nba-info">${eventData[i].info}</p>
                        <a href="${eventData[i].url}">Click Here to Visit Ticket Master</a>
                    </div>
                `;
            };

            //nba card add the page
            $("#maps").html(nbaCardMarkUp);
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });