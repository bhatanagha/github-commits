import { useRef, useState, useEffect } from 'react';
import '../App.css';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Commits from './commits';

function Form(props) {
    const navigate = useNavigate();
    const navigateToCommits = () => {
        navigate('/commits')
      };
    const [token, setToken] = useState('')
    const submitViaState = (e) => {
        e.preventDefault()
        setToken(e.target.token.value)
        if (token === process.env.REACT_APP_AUTHENTICATION_TOKEN) {
            props.getToken(token)
            // commenting this out as caching doens't seem to work on 'surge' when deployed. Have used localstorage.
            // if ('caches' in window) {
            //     const data = new Response(JSON.stringify(token));
              
            //     // Opening given cache and putting our data into it
            //     caches.open('token').then((cache) => {
            //       cache.put('/', data);
            //     });
            //   }
            localStorage.setItem('token', token);
            navigateToCommits()
        }
    }

    const [cachedToken, setCachedToken] = useState()
    useEffect(() => {
      const getCacheData = async () => {
        // const cacheStorage = await caches.open('token');
        // const cachedResponse = await cacheStorage.match('/');
        // const t = await cachedResponse.json()
        setCachedToken(localStorage.getItem('token'))
      }
      getCacheData()
    }, [cachedToken])

    return (
      <div className="Header">

        <form onSubmit={submitViaState}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Enter Access Token Key</label>
            <input type="text" class="form-control" name="token" defaultValue={cachedToken} onChange={(e) => setToken(e.target.value)}></input>
            <button type="submit">Submit</button>
          </div>
        </form>

      </div>
    );
}


export default Form;
