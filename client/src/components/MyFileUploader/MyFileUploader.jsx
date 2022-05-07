import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UserState from "../../store/UserState";
import style from "./MyFileUploader.module.css";
import { uploadImages, getImages } from "../../fetch/fetchImages";

const fileTypes = ["JPG", "PNG", "GIF"];

function MyFileUploader(props) {
  const handleChange = async (files) => {
    await uploadImages(Array.from(files), {dataset: props.dataset})
    let images = await getImages(props.dataset)
    UserState.setImages(images)
  };
  return (
    <FileUploader classes={style.uploader} handleChange={handleChange} name="file" types={fileTypes} multiple={true}>

    </FileUploader>
  );
}

export default MyFileUploader;