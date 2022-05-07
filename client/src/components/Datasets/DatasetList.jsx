import style from "./Datasets.module.css";
import DatasetItem from "./DatasetItem";
import {observer} from "mobx-react-lite";
import UserState from "../../store/UserState";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import CreateDataset from "./CreateDataset/CreateDataset";
import {BiBookAdd} from "react-icons/bi";

const DatasetList = observer((props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={style.container}>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CreateDataset closeModal={() => setIsOpen(false)} />
            </Modal>
            <div className={style.title}>
                <h2>My datasets</h2>
                <BiBookAdd className={style.add} title="Create new dataset" onClick={() => setIsOpen(true)} />
            </div>
            {
                UserState.datasets.map(dataset => 
                    <DatasetItem key={dataset._id} dataset={dataset} />
                )
            }
        </div>
    );
});

export default DatasetList;