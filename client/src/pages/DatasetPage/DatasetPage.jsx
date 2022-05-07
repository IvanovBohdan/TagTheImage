import style from "./DatasetPage.module.css";
import { observer } from "mobx-react-lite";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserState from "../../store/UserState";
import { deleteDataset } from "../../fetch/fetchDatasets";
import MyFileUploader from "../../components/MyFileUploader/MyFileUploader";
import { uploadImages, getImages } from "../../fetch/fetchImages";
import ImageBox from "../../components/ImageBox/ImageBox";
import ImageInfo from "../../components/ImageInfo/ImageInfo";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import CreateDataset from "../../components/Datasets/CreateDataset/CreateDataset";

const DatasetPage = observer((props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dataset = UserState.getDatasetById(id);
    let [selectedImage, setSelectedImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        getImages(id).then((images) => {
            if (images) {
                setSelectedImage(images[0]);
            }
        });
    }, []);

    return (
        <div className={style.container}>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CreateDataset
                    closeModal={() => setIsOpen(false)}
                    update={true}
                    dataset={dataset}
                />
            </Modal>
            <div>
                <div className={style.dataset}>
                    <h1>{dataset?.name}</h1>
                    <div className={style.tags}>
                        {dataset?.tags.map((tag, index) => (
                            <div key={index} className={style.tag}>
                                {tag}
                            </div>
                        ))}
                    </div>
                    <h2>Description</h2>
                    <p>{dataset?.description}</p>
                    <div className={style.buttons}>
                        <button
                            className={style.update_btn}
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            Update
                        </button>
                        <button
                            className={style.delete_btn}
                            onClick={() => {
                                deleteDataset(id);
                                navigate("/account");
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <br />
                <MyFileUploader dataset={id} />
                <ImageBox
                    images={UserState.images}
                    setSelectedImage={setSelectedImage}
                    selectedImage={selectedImage}
                />
            </div>

            <ImageInfo
                image={selectedImage}
                resetSelectedImage={() => setSelectedImage(UserState.images[0])}
            />
        </div>
    );
});

export default DatasetPage;
