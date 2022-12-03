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
        console.log(process.env.REACT_APP_AUTHENTICATION_TOKEN)
        if (e.target.token.value === process.env.REACT_APP_AUTHENTICATION_TOKEN) {
          setToken(e.target.token.value)
            props.getToken(token)
            localStorage.setItem('token', e.target.token.value);
            navigateToCommits()
        }
    }

    const [cachedToken, setCachedToken] = useState()
    useEffect(() => {
      const getCacheData = async () => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          setCachedToken(storedToken)
          setToken(storedToken)
        }
      }
      getCacheData()
    }, [cachedToken])

    return (
      <div className="Header">

        <form onSubmit={submitViaState}>
          <div className="mb-3">
            <label className="form-label">Enter Access Token Key</label>
            <input type="text" className="form-control" name="token" defaultValue={cachedToken}></input>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
}


export default Form;
