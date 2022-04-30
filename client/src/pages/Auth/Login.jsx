import style from "./Auth.module.css";
import {useState} from "react";
import config from "../../config";
import {useNavigate} from "react-router-dom";
import ErrorState from "../../store/ErrorState";
import UserState from "../../store/UserState";

const login = async (username, password, navigate) => {
    let response = await fetch(config.api.url + '/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })

    if (response.ok) {
        ErrorState.setError(null);
        let data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        UserState.setUsername(username);
        navigate("/account");
    }else{
        let data = await response.json();
        console.warn(data);
        ErrorState.setError(data);
    }
    
}

const Login = (props) => {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let navigation = useNavigate();

    return (    
        <div className={style.container}>
            <div className={style.wrapper}>    
                <h1>Login</h1>
                <input 
                    type="text" 
                    className={style.input} 
                    placeholder="Username" 
                    onChange={e => {setUsername(e.target.value)}}
                />
                
                <input 
                    type="password" 
                    className={style.input} 
                    placeholder="Password" 
                    onChange={e => {setPassword(e.target.value)}}
                />

                <button className={style.button} onClick={() => login(username, password, navigation)}>Login</button>
            </div>
        </div>
    )
}

export default Login;