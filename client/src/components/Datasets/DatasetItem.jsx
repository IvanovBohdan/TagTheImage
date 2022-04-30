import style from "./Datasets.module.css";
import {Link} from "react-router-dom";
import { deleteDataset } from "../../fetch/fetchDatasets";
const DatasetItem = ({ dataset }) => {
    return (
        <div className={style.item}>
            <div className={style.item_title}>
                <h3>
                    <Link to={'/dataset/' + dataset._id} className={style.nolink}>{dataset.name}</Link>
                </h3>
                <p>{dataset.images.length} images</p>
            </div>
            <div className={style.delete}>
                <button className={style.delete_btn} onClick={() => deleteDataset(dataset._id)}>Delete</button>
            </div>
        </div>
    );
}

export default DatasetItem;