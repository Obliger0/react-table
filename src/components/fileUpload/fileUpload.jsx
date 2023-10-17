import React, { useState } from "react";
import { DragAndDrop } from "../DragAndDrop/dragAndDrop";
import "./fileUpload.css"
import { Carousel } from "../carousel/carousel";
import { CopiedCarousel } from "../carousel/copiedCarousel";

export function FileUpload() {
    const [image, setImage] = useState([]);
    const [disable, setDisable] = useState(true);
   function onFileDrop(fileList){
        setImage([...image, ...fileList ]);
        setDisable(false);
    }

    

    return (
      <>
        <DragAndDrop title="Drop a File" onFileDrop={onFileDrop} />
        <CopiedCarousel
          image={image}
          setImage={setImage}
          disable={disable}
          setDisable={setDisable}
        />
      </>
    );
}
