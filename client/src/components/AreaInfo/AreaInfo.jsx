import React, { useState, useEffect } from "react";
import style from "./AreaInfo.module.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import CanvasState from "../../store/CanvasState";
import UserState from "../../store/UserState";
import { observer } from "mobx-react-lite";
import { createAreas, deleteArea } from "../../fetch/fetchAreas";
import { getImages } from "../../fetch/fetchImages";

const AreaInfo = observer((props) => {
    const [tags, setTags] = useState([]);
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setTags(CanvasState.selectedArea?.tags || []);
        setLabel(CanvasState.selectedArea?.label || "");
        setDescription(CanvasState.selectedArea?.description || "");
    }, [CanvasState.selectedArea]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAreas(CanvasState.exportAreas());
        getImages(CanvasState.currentImage.dataset);
    };

    return (
        <div className={style.container}>
            <div>
                <h3>Label</h3>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => {
                        setLabel(e.target.value);
                        CanvasState.selectedArea.update({
                            label: e.target.value,
                        });
                    }}
                />
            </div>
            <div>
                <h3>Tags</h3>
                <ReactTagInput
                    tags={tags}
                    onChange={(newTags) => {
                        setTags(newTags);
                        CanvasState.selectedArea.update({ tags: newTags });
                    }}
                    maxTags={10}
                />
            </div>
            <div>
                <h3>Description</h3>
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        CanvasState.selectedArea.update({
                            description: e.target.value,
                        });
                    }}
                />
            </div>
            <input
                type="submit"
                value="Save"
                onClick={handleSubmit}
                className={style.save_btn}
            />
            <button
                className={style.delete_btn}
                onClick={async () => {
                    if (CanvasState.selectedArea?._id) {
                        await deleteArea(CanvasState.selectedArea._id);
                    }
                    CanvasState.removeArea(CanvasState.selectedArea);
                }}
            >
                Delete
            </button>
            {CanvasState.selectedArea?.model?.type}
        </div>
    );
});

export default AreaInfo;
