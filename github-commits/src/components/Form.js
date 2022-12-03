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
        if (token === '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') {
            props.getToken(token)
            if ('caches' in window) {
                const data = new Response(JSON.stringify(token));
              
                // Opening given cache and putting our data into it
                caches.open('token').then((cache) => {
                  cache.put('/', data);
                });
              }
            navigateToCommits()
        }
    }

    const [cachedToken, setCachedToken] = useState()
    useEffect(() => {
      const getCacheData = async () => {
        const cacheStorage = await caches.open('token');
        const cachedResponse = await cacheStorage.match('/');
        const t = await cachedResponse.json()
        setCachedToken(t)
      }
      getCacheData()
    }, [cachedToken])

    return (
        <div className="Header">
            <form onSubmit={submitViaState}>
       Enter Access Token Key:
        <input type="text" name="token" defaultValue={cachedToken} onChange={(e) => setToken(e.target.value)}></input>
        <button>Submit</button>
        </form>
        </div>
    );
}


export default Form;
