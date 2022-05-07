import style from "./Account.module.css";
import { observer } from "mobx-react-lite";
import DatasetList from "../../components/Datasets/DatasetList";

const Account = observer(() => {
    return (
        <div className={style.container}>
            <h1>Account</h1>
            <DatasetList />
        </div>
    );
});

export default Account;
