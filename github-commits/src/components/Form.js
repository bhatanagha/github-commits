import { useState, useEffect } from 'react';
import '../App.css';
import {useNavigate, Navigate} from 'react-router-dom';

function Form(props) {
    const navigate = useNavigate();
    const navigateToCommits = () => {
        navigate('/commits')
      };
    const [token, setToken] = useState('')
    const submitViaState = (e) => {
        e.preventDefault()
        if (e.target.token.value === process.env.REACT_APP_AUTHENTICATION_TOKEN) {
          setToken(e.target.token.value)
            props.getToken(token)
            localStorage.setItem('token', e.target.token.value);
            navigateToCommits()
        } else {
          const validationMsg = e.target.querySelector('div[name="validation"]')
          validationMsg.classList.remove('d-none')
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
        Fetch Github Commits
        <form onSubmit={submitViaState}>
          <div className="mb-3">
            <label className="form-label">Enter Access Token Key</label>
            <input type="text" className="form-control mb-3" name="token" defaultValue={cachedToken}></input>
            <div name="validation" id="validation-message" class="form-text d-none">Sorry, this is the wrong key</div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
}


export default Form;
