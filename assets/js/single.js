var issueContentEl = document.querySelector("#issues-container");

function getRepoIssues(repo) {
    var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
    fetch(apiUrl)
    .then(function(response){
        // request was successful
        if(response.ok) {
            response.json()
            .then(function(data){
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
}

function displayIssues(issues) {

    if(issues.length === 0) {
        issueContentEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        // check if the issue is an actual issue or a pull request
        if(issues[i].pull_request) {
            typeEl.textContent = `(Pull Request)`;
        }
        else {
            typeEl.textContent = `(Issue)`;
        }

        issueEl.appendChild(typeEl);
        issueContentEl.append(issueEl);
    }
}

getRepoIssues("facebook/react");