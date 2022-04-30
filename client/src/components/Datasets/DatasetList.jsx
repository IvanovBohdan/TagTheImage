import style from "./Datasets.module.css";
import DatasetItem from "./DatasetItem";
import {observer} from "mobx-react-lite";
import UserState from "../../store/UserState";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import CreateDataset from "./CreateDataset/CreateDataset";

const DatasetList = observer((props) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={style.container}>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CreateDataset closeModal={() => setIsOpen(false)} />
            </Modal>
            <h2>Datasets</h2>
            {
                UserState.datasets.map(dataset => 
                    <DatasetItem key={dataset._id} dataset={dataset} />
                )
            }
        </div>
    );
});

export default DatasetList;