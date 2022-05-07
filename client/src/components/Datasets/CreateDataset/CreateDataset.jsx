import style from "./CreateDataset.module.css";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import React, { useEffect } from "react";
import { createDataset, updateDataset } from "../../../fetch/fetchDatasets";

const CreateDataset = (props) => {
    const [tags, setTags] = React.useState([]);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    useEffect(() => {
        if (props.update){
            setTags(props.dataset.tags);
            setName(props.dataset.name);
            setDescription(props.dataset.description);
        }
    }, []);

    return (
        <div className={style.container}>
            <h1>Create Dataset</h1>
            <form
                className={style.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    const data = {
                        name: name,
                        description: description,
                        tags: tags,
                    };
                    if (props.update) {
                        updateDataset(props.dataset._id, data);
                    } else {
                        createDataset(data);
                    }

                    props.closeModal();
                }}
            >
                <label className={style.label}>Name</label>
                <input
                    type="text"
                    name="name"
                    className={style.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className={style.label}>Description</label>
                <textarea
                    name="description"
                    className={style.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className={style.label}>Tags</label>
                <ReactTagInput
                    tags={tags}
                    onChange={(newTags) => setTags(newTags)}
                    maxTags={10}
                />
                <button className={style.submit} type="submit">
                    {props.update ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
};

export default CreateDataset;
