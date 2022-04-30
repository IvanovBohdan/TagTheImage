import { useEffect, useState } from "react";
import Error from "../../components/Error/Error";
import style from "./Account.module.css";
import config from "../../config";
import {observer} from "mobx-react-lite";
import UserState from "../../store/UserState";
import ErrorState from "../../store/ErrorState";
import DatasetList from '../../components/Datasets/DatasetList';
import {getDatasets} from "../../fetch/fetchDatasets";
import Modal from "../../components/Modal/Modal";
import CreateDataset from "../../components/Datasets/CreateDataset/CreateDataset";

const Account = observer(() => {

    return (
        <div className={style.container} >
            <h1>Account</h1>
            <DatasetList/>
        </div>
    );  
})

export default Account;