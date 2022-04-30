import style from './DatasetPage.module.css';
import {observer} from 'mobx-react-lite';
import {Link, useParams} from 'react-router-dom';
import UserState from '../../store/UserState';
import { deleteDataset } from '../../fetch/fetchDatasets';

const DatasetPage = observer((props) => {

    const {id} = useParams();
    const dataset = UserState.getDatasetById(id);
    return (
        <div className={style.container}>
            <h1>Dataset Page</h1>
            <h2>{dataset?.name}</h2>
            <p>{dataset?.description}</p>
            <button><Link to={`/datasets/${id}/edit`}>Edit</Link></button>
            <button onClick={() => deleteDataset(id)} >Delete</button>
        </div>
    )
})

export default DatasetPage;