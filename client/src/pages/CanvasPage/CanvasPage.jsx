import { observer } from "mobx-react-lite";
import Canvas from "../../components/Canvas/Canvas";
import CanvasState from "../../store/CanvasState";
import { useEffect, React } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import style from "./CanvasPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import UserState from "../../store/UserState";
import { getImages } from "../../fetch/fetchImages";
import AreaInfo from "../../components/AreaInfo/AreaInfo";
import ImageBox from "../../components/ImageBox/ImageBox";
import MySlider from "../../components/MySlider/MySlider";
const CanvasPage = observer((props) => {
    const { id } = useParams();
    const image = UserState.getImageById(id);
    const dataset = UserState.datasets.find((dataset) =>
        dataset.images.includes(id)
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (!image && dataset) {
            getImages(dataset._id);
        }
    }, [dataset]);

    if (!image) return null;

    return (
        <div className={style.container}>
            <Toolbar />
            <div className={style.content}>
                <Canvas
                    width={image.image.width}
                    height={image.image.height}
                    image={image}
                    areas={image.areas}
                />
                <MySlider images={UserState.images} />
            </div>
            <AreaInfo image={image} />
        </div>
    );
});

export default CanvasPage;
