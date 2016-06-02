var app=angular.module('contact');
app.constant("url", "http://localhost:3000/")
app.service('contactFactory',function($resource,url)
{
	this.getusers=function()
	{
		return $resource(url+"users",null,{'get':{method:'GET'}});
	};	
	this.saveusers=function()
	{
		return $resource(url+"users",null,{'save':{method:'POST'}});
	};
});
app.controller('formcontroller', function($scope,contactFactory)
{
	$scope.user={userid:"",name:""};
	contactFactory.getusers().query(
		function(response)
		{
			$scope.users=response;
		},
		function(response)
		{
			$scope.users="Error" + response.status + " " + response.statusText;
		});
	$scope.formcheck=function()
	{
		$scope.users.push($scope.user);
		contactFactory.saveusers().save($scope.user);	
		console.log($scope.user);
		$scope.user={userid:"",name:""};
		$scope.userform.$setPristine();
	}
});