import { set } from "mobx";
import style from "./ImageBox.module.css";
import classnames from "classnames";

const ImageBox = (props) => {
    const { images, setSelectedImage, selectedImage } = props;
    if (!images) return null;
    return (
        <div className={style.container} >
            <div className={style.imgbox} >
                {images.map((image) => {
                    return (
                        <div
                            key={image?._id}
                            className={classnames(style.img, {
                                [style.selected]:
                                    image?._id === selectedImage?._id,
                            })}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image?.url} alt={image?.name} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageBox;
