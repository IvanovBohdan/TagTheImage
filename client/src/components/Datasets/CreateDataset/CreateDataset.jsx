import style from "./CreateDataset.module.css";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import React from "react";
import { createDataset } from "../../../fetch/fetchDatasets";

const CreateDataset = (props) => {
    const [tags, setTags] = React.useState([])
    return (
        <div className={style.container}>
            <h1>Create Dataset</h1>
            <form 
                className={style.form}
                onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const data = {
                    name: form.name.value,
                    description: form.description.value,
                    tags: tags
                }
                
                createDataset(data)
                props.closeModal();
            }}>
                <label className={style.label}>Name</label>
                <input type="text" name="name" className={style.name}/>
                <label className={style.label}>Description</label>
                <textarea name="description" className={style.description}/>
                <label className={style.label}>Tags</label>
                <ReactTagInput 
                    tags={tags} 
                    onChange={(newTags) => setTags(newTags)}
                    maxTags={10}
                />
                <button className={style.submit} type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateDataset;