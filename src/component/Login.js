import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

export default function Login(props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [login, setLogin] = useState(false)

    console.log(email + " " + password)
    const getToken = () => {
        axios.post("http://localhost:8080/authenticate", {"username": email, "password": password}).then(
            (response) => {
                props.setToken(response.data.jwt);
                console.log(response)
            }
        )
    }

    return (
        <div style={{marginTop: "10%", paddingLeft: "35%"}}>
            <h3>Username : <input type="text" onChange={(event) => setEmail(event.target.value)}/></h3>
            <h3>Password : <input type="password" onChange={(event) => setPassword(event.target.value)}/></h3><br/>
            <Link to={"/home"}>
                <button style={{marginLeft: "20%"}} onClick={getToken}>Log In</button>
            </Link>
        </div>
    )
}