import { useState } from "react"
import "./dragAndDrop.css"


export function DragAndDrop({ title = "Drop File", onFileDrop }) {
  const [isDrag, setIsDrag] = useState(false);

  function setFiles(files) {
    const fileList = Object.values(files).map((file) => {
      return {
        url: URL.createObjectURL(file),
        data: file,
      };
    });
    onFileDrop(fileList);
  }
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDrag(true);
      }}
      onDragLeave={(e) => {
        setIsDrag(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
        // console.log({files : Object.entries(files)});
        setIsDrag(false);
      }}
      className={`drag-and-drop-container ${isDrag && "onDrag-enter"}`}
    >
      <input className="file-input" id="drag-file-input" type="file" multiple onChange={(e)=>{
        setFiles(e.target.files);
      }}/>
      <label className="file-label" for="drag-file-input">
        {title}
      </label>
    </div>
  );
}
