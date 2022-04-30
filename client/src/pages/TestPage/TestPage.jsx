import { useEffect, useState } from "react";
import Error from "../../components/Error/Error";

const TestPage = () => {

    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/user/test')
            .then(async res => {
                if(!res.ok){
                    const error = await res.json();
                    setError(error.message);
                }else{
                    setError(null);
                }
            })
           
    }, []);

    return (
        <div>
        <Error message={error} />
        <h1>TestPage</h1>
        </div>
    );  
}

export default TestPage;