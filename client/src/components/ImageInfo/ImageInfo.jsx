import style from "./ImageInfo.module.css";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import React, { useState, useEffect } from "react";
import { updateImage, getImages, deleteImage } from "../../fetch/fetchImages";
import UserState from "../../store/UserState";
import { Link } from "react-router-dom";
import config from "../../config";
const ImageInfo = (props) => {
    const { image, resetSelectedImage } = props;

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (image) {
            setTags(image.tags || []);
            setTitle(image.title || "");
            setDescription(image.description || "");
        }
    }, [image]);

    if (!image)
        return (
            <div style={{ textAlign: "center" }}>
                <h3>No image selected!</h3>
            </div>
        );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title,
            tags,
            description,
        };
        await updateImage(image._id, data);
        await getImages(image.dataset);
    };

    return (
        <div className={style.container}>
            <div>
                <h4>Title</h4>
                <input
                    placeholder="Enter the title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <h4>Description</h4>
                <textarea
                    placeholder="Enter the image description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <h4>Tags</h4>
                <ReactTagInput
                    tags={tags}
                    onChange={(newTags) => setTags(newTags)}
                    maxTags={10}
                />
            </div>
            {/* <img src={image.url} alt="" /> */}
            <p>
                Size: {image.image.width}x{image.image.height}
            </p>
            <input type="submit" onClick={handleSubmit} value="Save" />
            <button
                onClick={async () => {
                    await deleteImage(image._id);
                    await getImages(image.dataset);
                    resetSelectedImage();
                }}
            >
                Delete
            </button>
            <Link to={"/tagging/" + image._id}>TagTheImage</Link>
        </div>
    );
};

export default ImageInfo;
