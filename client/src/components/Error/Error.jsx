import style from "./Error.module.css";

const Error = (props) => {
    if(props.message){
        return (
            <div className={style.error}>
                <h3>{props.message}</h3>
            </div>
        )
    }else{
        return null;
    }
}

export default Error;