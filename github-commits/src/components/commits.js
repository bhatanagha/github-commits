// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
import { useEffect, useState } from 'react';
import { VscRefresh } from "react-icons/vsc"
import Timer from './timer'

function Commits(props) {
  const user = 'bhatanagha';
  const repo = 'github-commits';

  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [timer, setTimer] = useState(1)

  const fetchCommits = () => {
    fetch(`https://api.github.com/repos/${user}/${repo}/commits`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'Authorization': props.token }
    }).then(res => res.json())
      .then(setMessage)
      .then(() => setLoading(false))
      .catch(setError) // error
  }

  setTimeout(() => {
    setTimer(timer + 1)
    if (timer === 30) {
      console.log('now')
      setTimer(1)
      setRefresh(true)
    }
  }, 1000)

  useEffect(() => {
    setLoading(true) // loading
    fetchCommits()
    setRefresh(false)
  }, [refresh])

  if (loading) {
    return (
      <pre>Loading...</pre>
    )
  }
  if (error) {
    return (
      <pre>{JSON.stringify(error)}</pre>
    )
  }

  const getDate = (committedOn) => {
    const options = { month: 'short', day: 'numeric' };
    const time = new Date(committedOn).toLocaleTimeString(undefined, {
      hour:   '2-digit',
      minute: '2-digit',
  })
    return new Date(committedOn).toLocaleDateString('en-IN', options) + ', ' + time
  }

  if (message) {
    return (
      <><h2>Commit History <VscRefresh onClick={() => { setRefresh(true); } } /> </h2>
          <Timer secs={31 - timer}></Timer>
      <div style={{"height": "450px"}} className='overflow-auto'>
        <ol className="list-group">
          {message.map(commit => <li key={commit.sha} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto align-items-start fs-5">
              <><p className="fw-bold text-start">{commit.commit.message}</p><p>{getDate(commit.commit.author.date)} <span className='fw-bold'>by {commit.author.login}</span></p></>
            </div>
          </li>
          )}
        </ol>
      </div></>
    )
  }
}

export default Commits;