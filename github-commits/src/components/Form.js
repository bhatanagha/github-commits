import { useState } from 'react';
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
        // console.log(token)
        if (token === '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') {
            navigateToCommits()
        }
    }
    return (
        <div className="Header">
            <form onSubmit={submitViaState}>
       Enter Access Token Key:
        <input type="text" name="token" value={token} onChange={(e) => setToken(e.target.value)}></input>
        <button>Submit</button>
        </form>
        </div>
    );
}


export default Form;
