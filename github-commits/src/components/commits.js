// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
import { useEffect, useState } from 'react';

function Commits(props) {
const user = 'bhatanagha';
const repo = 'github-commits';
const commitMessages = [];

const [loading, setLoading] = useState(null)
const [error, setError] = useState(false)
const [message, setMessage] = useState(null)

useEffect(() => {
  setLoading(true) // loading
  fetch(`https://api.github.com/repos/${user}/${repo}/commits`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': props.tokenValue }
  }).then(res => res.json())
  .then(setMessage)
  .then(() => setLoading(false))
  .catch(setError) // error
}, []) // called on mount, componentDidMount
  
if (loading) {
  return(
    <pre>Loading...</pre>
  )
}
if (error) {
  return(
    <pre>{JSON.stringify(error)}</pre>
  )
}

if (message) {
  if ('caches' in window) {
    const data = new Response(JSON.stringify(props.tokenValue));
  
    // Opening given cache and putting our data into it
    caches.open('token').then((cache) => {
      cache.put('http://localhost:3000/commits', data);
    });
  }
  return(

    <> <h2>Commit History </h2>
    <ol class="list-group list-group-numbered">
        {message.map(commit =>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto align-items-start">
            <><div class="fw-bold">{commit.commit.message}</div><p>{commit.commit.author.date}{commit.commit.author.name}</p></>
        </div>
      </li>
          )}
    </ol>
</>
  )
}
}

  export default Commits;