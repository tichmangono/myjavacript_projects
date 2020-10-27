

var fetch = require('node-fetch');

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    while (resultCount > 0 ){
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json(); 
        allJobs.push(...jobs);
        //console.log(jobs);
        resultCount = jobs.length;
        console.log("got :", resultCount); 
        onPage++;
        

    }
    console.log("got", allJobs.length, "jobs");
    const success = await setAsync('github', JSON.stringify(allJobs));

    console.log({success});
}

//fetchGithub();

module.exports = fetchGithub;