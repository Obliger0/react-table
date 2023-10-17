import { createPortal } from "react-dom";
import "./modal.css";
import { FileUpload} from "../fileUpload/fileUpload"

export function ModalComp({ setOpenModal }) {
  return createPortal(
    <div className="modal-div">
      <div className="closeBtn">
        <button
          autoFocus
          type="button"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          ✖
        </button>
      </div>
      <FileUpload/>
    </div>,
    document.body
  );
}