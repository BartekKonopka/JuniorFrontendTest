var request = new XMLHttpRequest();

document.getElementById("search").onclick=function(){getUserInfo(document.getElementById("name").value);};

function getUserInfo(name) {
	reset();
	request.onreadystatechange = function() {
	    if (request.readyState == 4 && request.status == 200) {
	      var gitUser = JSON.parse(request.responseText);
	      printUserInfo(gitUser);
	      getUserRepositories(name);
	    }
	    if (request.status == 404) {
	      gitUserError();
	    }
	};
	request.open('get', 'https://api.github.com/users/'+name, true)
	request.send();
}
function getUserRepositories(name) {
	request.onreadystatechange = function() {
	    if (request.readyState == 4 && request.status == 200) {
	      var gitUser = JSON.parse(request.responseText);
	      printUserRepos(gitUser);
	    }
	};
	request.open('get', 'https://api.github.com/users/'+name+'/repos', true)
	request.send();
}

 
function printUserInfo(responseObj) {
  	var avatar = document.createElement("img");
  	avatar.setAttribute('src', responseObj.avatar_url);
  	document.getElementById("info").appendChild(avatar);

  	var login = document.createElement("i");
  	login.innerHTML = '@';
  	login.innerHTML += responseObj.login;
  	document.getElementById("info").appendChild(login);

  	var name = document.createElement("h1");
  	name.innerHTML = responseObj.name;
  	document.getElementById("info").appendChild(name);

  	var bio = document.createElement("p");
  	bio.innerHTML = responseObj.bio;
  	document.getElementById("info").appendChild(bio);
}

function printUserRepos(responseObj) {
	var list = document.createElement("ul");
  	for( var i in responseObj) {
        var repo = '<li>'+responseObj[i].name+'<span>'+responseObj[i].forks+'</span><span>'+responseObj[i].stargazers_count+'</span></li>';
        list.innerHTML += repo;
    }
    document.getElementById("info").appendChild(list); 
}

function gitUserError() {
	var error = document.getElementById("error");
	error.innerHTML = "Does not exist";
	error.setAttribute('style', 'display: block');
}

function reset() {
	var error = document.getElementById("error");
	error.innerHTML = "";
	error.setAttribute('style', 'display: none');
	document.getElementById("info").innerHTML = "";
}