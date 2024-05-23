import fetch from 'node-fetch';

const data = {
    contact_email: "bijansamie262@gmail.com",
    github_url: "https://gist.github.com/ComradeB/6dc669a3eb99b81bef629135038e979e",
    solution_framework: "react"
};

fetch("https://api.challenge.hennge.com/challenges/003",{
    method: "POST",
    headers: {
        "Authorization":  'Basic YmlqYW5zYW1pZTI2MkBnbWFpbC5jb206SEVOTkdFQ0hBTExFTkdF',
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Content-Length': '153'
    },
    body: JSON.stringify(data)

})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));