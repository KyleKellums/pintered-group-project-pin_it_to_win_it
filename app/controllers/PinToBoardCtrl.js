"use strict";

app.controller('PinToBoardCtrl', ["$scope", "$routeParams", "DataFactory", "$location", "AuthFactory",
	function($scope, $routeParams, DataFactory, $location, AuthFactory){

		$scope.pinObj = {
			boardID: "",
			pinID: "",
			title: "",
			uid: "",
			url: ""
		};
		$scope.pinID = $routeParams.pinID;
		$scope.userBoards = "";

		let user = AuthFactory.getUser();
		console.log("user as seen by HomeCtrl", user);

		//get User Boards and pass them to the partial
		DataFactory.getBoardList(user)
		.then( (boards) => {
			$scope.userBoards = boards;
			console.log("userBoards", $scope.userBoards);
		});


		//get pin from FB, pass to partial, clone and addPin to FB with new boardID
		DataFactory.getPin($routeParams.pinID)
		.then(function(singlePin){
			$scope.pinObj = singlePin.data;
			console.log("$scope.pinObj", $scope.pinObj);
		});

		$scope.addPin = function(){
			$scope.pinObj.uid = user;
			DataFactory.addPin($scope.pinObj)
				.then(function(data){
					// console.log("cloned pin", data);
					//add a path to home
					$location.path('/home');

			});
		};



}]);

