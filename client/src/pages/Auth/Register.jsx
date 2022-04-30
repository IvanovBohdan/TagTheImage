import style from "./Auth.module.css";
import {useState} from "react";
import Error from "../../components/Error/Error";
import config from "../../config";
import {Redirect, useNavigate} from "react-router-dom";
import ErrorState from "../../store/ErrorState";

const register = async (username, password, navigate) => {
    let response = await fetch(config.api.url + '/user/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })

    if (response.ok) {
        ErrorState.setError(null);
        navigate("/login");
    }else{
        let data = await response.json();
        console.warn(data);
        ErrorState.setError(data);
    }
    
}

const Register = (props) => {
    
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let navigation = useNavigate();

    return (    
        <div className={style.container}>
            <div className={style.wrapper}>  
                <h1>Register</h1>
                <input 
                    type="text" 
                    className={style.input} 
                    placeholder="username" 
                    onChange={e => {setUsername(e.target.value)}}
                />
                
                <input 
                    type="password" 
                    className={style.input} 
                    placeholder="password" 
                    onChange={e => {setPassword(e.target.value)}}
                />

                <button className={style.button} onClick={() => register(username, password, navigation)}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Register;