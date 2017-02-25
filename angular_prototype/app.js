
var scorekeeper= angular.module('scorekeeper',[]);


scorekeeper.controller("statsController", function($scope){

  //there will only be two teams per game.name
  //using team name as arg for functions seems wrong. what if team name changes midgame? maybe scorekeeper thinks of good way to label them after the fact
  // statPlays could use 0 or 1 for team instead of name.  0 or 1 would be the team passed into the directive via attribute.
  $scope.teams = ["Team 1", "Team 2"];
	$scope.statPlays = []; //the main gameflow data, to be populated with play-by-play happenings
  $scope.needRebound = false;
  $scope.pointValues = {two: 2, three: 3}; //ones and twos or twos and threes? common playground decision
  $scope.gamePoint = 11;
  $scope.winningTeam = false;

	// how many points has a team scored, based on statPlays?
  $scope.teamScore = function(teamIndex){
    var scoringPlays = $scope.statPlays.filter(function(play){
      return play.team == teamIndex && play.playType == "scored";
    });
    return scoringPlays.reduce(function(prev,val){
      return prev + $scope.pointValues[val.points];
    }, 0);
  };

	// what is the shooting percentage of a team, based on statPlays?
  $scope.teamPercent = function(teamIndex){
    var makes = $scope.statPlays.filter(function(play){
      return play.team == teamIndex && play.playType == "scored";
    });
    var misses = $scope.statPlays.filter(function(play){
      return play.team == teamIndex && play.playType == "miss";
    });
    var total_shots = makes.length + misses.length;
    var percent = makes.length/total_shots*100;
    return percent
  };


  $scope.addPlay = function(playObj){
    $scope.statPlays.push(playObj);
    $scope.winningTeam = $scope.winningTeamCheck();
  };

  $scope.addRebound = function(teamIndex){
    $scope.needRebound = false;
    $scope.addPlay({team: teamIndex, playType:"rebound"});
  };

  $scope.addMiss = function(teamIndex){
    $scope.needRebound = true;
    $scope.addPlay({team: teamIndex, playType:"miss"});
  }

	//has a team won yet?
  $scope.winningTeamCheck = function(){
    console.log("winningTeam function called");
    var team1Score = $scope.teamScore(0);
    var team2Score = $scope.teamScore(1);
    var unsorted_scores = [{team:0, score:team1Score}, {team:1, score:team2Score}];
    console.log("unsorted");
    console.log(unsorted_scores);
    var scores = unsorted_scores.sort(function(a,b){
      return  b.score - a.score;
    });
    console.log("sorted");
    console.log(scores);
    if(scores[0].score - scores[1].score >=2){
      if(scores[0].score >= $scope.gamePoint){
        console.log("a team won!");
        console.log($scope.teams[scores[0].team]);
        return scores[0].team;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

});


scorekeeper.directive('teamStats', function() {
  return {
    scope: true,
  	link: function(scope,elem,attrs){
      scope.team = attrs.team;
  		console.log("linking team-stats directive");
  	},
    templateUrl: 'templates/team-stats.html'
  };
});

scorekeeper.directive('playList',function(){
  return {
    templateUrl: "templates/play-list.html"
  }
});


scorekeeper.directive('scorekeeper',function(){
	return {
		templateUrl: "templates/scorekeeper.html"
	}
});




