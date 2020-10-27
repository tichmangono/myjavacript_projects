

var fetch = require('node-fetch');

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    
    console.log('fetching Github');

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    // fetch all pages
    while (resultCount > 0 ){
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json(); 
        allJobs.push(...jobs);
        //console.log(jobs);
        resultCount = jobs.length;
        console.log("got :", resultCount); 
        onPage++;
        
    }

    console.log("got", allJobs.length, "jobs total");

    // filter algo
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        //let isJunior = true;

        // algo logc here
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('architect')
            ){
                return false;
            }
            return true;
    })

    console.log("filtered down to junior jobs ", jrJobs.length);

    // set in redis
    const success = await setAsync('github', JSON.stringify(jrJobs));
 
    console.log({success});
}

//fetchGithub();

module.exports = fetchGithub;