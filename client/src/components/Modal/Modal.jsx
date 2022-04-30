import style from "./Modal.module.css";
const Modal = (props) => {
    const {isOpen, children, onClose} = props;
    if(!isOpen) return null;
    return (
        <div className={style.modal} onClick={onClose}>
            <button className={style.close}>&times;</button>
            <div className={style.content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal;