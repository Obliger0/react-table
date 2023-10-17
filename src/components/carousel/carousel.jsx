import { useState } from "react";
import "./carousel.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { uploadToCloudinary } from "../../utill/cloudinary";

export function Carousel({ image, setImage, disable, setDisable }) {
  const [index, setIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  async function onSave(file) {
    try{
        await uploadToCloudinary(file[index].data);
        alert("image Uploaded successfully")
      } catch(err){
        console.log(err);
        alert("unable to upload")
      }
  }
  // console.log({ image, index });
  return (
    <div className="carousel">
      <button
        id={index}
        disabled={disable}
        className={`${!isPreview && "close-btn nav-btn"}`}
        onClick={() => {
          if (image.length - 1 === 0) setDisable(true);
          if (index >= image.length - 1) {
            setIndex(image.length - 1);
          }
          const newImage = [...image];
          newImage.splice(index, 1);
          setImage(newImage);
        }}
      >
        X
      </button>
      {index !== 0 && (
        <button
          className={`${!isPreview && "nav-btn"}`}
          disabled={disable}
          onClick={() => {
            if (index === 0) setIndex(image.length - 1);
            else setIndex(index - 1);
          }}
        >
          {"<"}
        </button>
      )}
      <div className="img-gallery">
        {image.length > 0 ? (
          <img
            src={image[index].url}
            key={index}
            alt="img"
            className={`image ${isPreview && "image-preview"}`}
            onClick={() => {
              if (isPreview) setIsPreview(false);
              else setIsPreview(true);
            }}
          />
        ) : (
          <h2>Your Images will be shown here</h2>
        )}
      </div>
      {index !== image.length && (
        <button
          className={`${!isPreview && "nav-btn"}`}
          disabled={disable}
          onClick={() => {
            if (index >= image.length - 1) setIndex(0);
            else setIndex(index + 1);
          }}
        >
          {">"}
        </button>
      )}
      <button
        className={`${!isPreview && "nav-btn save-btn"}`}
        disabled={disable}
        onClick={() => {
          onSave(image);
        }}
      >
        ☁
      </button>
    </div>
  );
}
