// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
import { useEffect, useState } from 'react';
import { VscRefresh } from "react-icons/vsc"

function Timer(props) {
    return (
      <><p>Refreshing in {props.secs} secs</p></>
    )
}

export default Timer;