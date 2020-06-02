import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [login, setLogin] = useState(false)
    return (
        <div style={{marginTop: "10%", paddingLeft: "35%"}}>
            <h3>Username : <input type="text" onChange={(event) => setEmail(event.target.value)}/></h3>
            <h3>Password : <input type="password" onChange={(event) => setPassword(event.target.value)}/></h3><br/>
            <Link to={"/home"}>
                <button style={{marginLeft: "20%"}}>Log In</button>
            </Link>

        </div>
    )
}