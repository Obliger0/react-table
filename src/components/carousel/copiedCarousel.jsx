import React, { useRef, useState } from "react";
import "./copiedCarousel.css";
import { uploadToCloudinary } from "../../utill/cloudinary";

export const CopiedCarousel = ({
    image = [],
    setImage,
    defaultImage = "",
    circleCount = 5,
}) => {
    const [page, setPage] = useState(0);
    const carouselRef = useRef();
    const scrollToRight = () => {
        const nextPage = page + 1;
        if (image.length > nextPage) {
            carouselRef.current.children[nextPage].scrollIntoView({
                behavior: "smooth",
            });
            setPage(nextPage);
        }
    };
    const scrollToLeft = () => {
        const prevPage = page - 1;
        if (prevPage >= 0) {
            carouselRef.current.children[prevPage].scrollIntoView({
                behavior: "smooth",
            });
            setPage(prevPage);
        }
    };
    async function onSave(file) {
      try {
        await uploadToCloudinary(file[page].data);
        alert("image Uploaded successfully");
      } catch (err) {
        console.log(err);
        alert("unable to upload");
      }
    }
    return (
        <div className="carousel-box">
            <div className="carousel-container">
                {
                    <>
                        <div ref={carouselRef} className="image-container">
                            {image.length > 0 ? (
                                image.map((image, index) => {
                                    return (
                                        <img
                                            className="carousel-image"
                                            src={image.url}
                                            key={index}
                                            alt="img"
                                        />
                                    );
                                })
                            ) : (
                                <img src={defaultImage} alt="No images" />
                            )}
                        </div>
                        {image.length > 0 && (
                            <>
                                {page > 0 && (
                                    <div
                                        className="carousel-arrow carousel-left-arrow"
                                        onClick={scrollToLeft}
                                    >
                                        {" "}
                                        &lt;{" "}
                                    </div>
                                )}
                                {page < image.length - 1 && (
                                    <div
                                        className="carousel-arrow carousel-right-arrow"
                                        onClick={scrollToRight}
                                    >
                                        {" "}
                                        &gt;{" "}
                                    </div>
                                )}
                                <div
                                    className="carousel-arrow carousel-cross-btn"
                                    onClick={()=>{
                                        const newImage = [...image];
                                        newImage.splice(page, 1);
                                        setImage(newImage);
                                    }}
                                >
                                    {" "}
                                    X{" "}
                                </div>

                                <div className="carousel-circle-container">
                                    {image.slice(0, circleCount).map((img, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`carousel-circle ${page === index && "carousel-circle-active"
                                                    }`}
                                            ></div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </>
                }
            </div>
            <button onClick={()=>{onSave(image)}} className="carousel-save-btn">
                Save
            </button>
        </div>
    );
};
