

/*Variables */
var teamA = document.querySelector("teamA");
var teamB = document.querySelector("teamB");














/* Ticketmaster API*/
$.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=wkeUKU7nGwu8KaAr6CW0pqhy3LP5gh4f",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                var futureGames = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });
 