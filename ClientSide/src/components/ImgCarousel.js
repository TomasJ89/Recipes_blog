import React, {useState} from 'react';

const ImgCarousel = ({images}) => {

    const [photoIndex, setPhotoIndex] = useState(0)

    function changePhoto(right) {
        if(right) {
            if(photoIndex === images.length - 1) {
                setPhotoIndex(0)
            } else {
                setPhotoIndex(old => old + 1)
            }
        } else {
            if(photoIndex === 0) {
                setPhotoIndex(images.length - 1)
            } else {
                setPhotoIndex(old => old - 1)
            }
        }
    }
    return (
        <div className=" border p-2">
            <div className="d-flex">
                <div className="d-flex align-items-center icons" onClick={() => changePhoto(false)}>
                    ⬅️
                </div>
                <div className="grow1 imgContainer" style={{backgroundImage: `url("${images[photoIndex]}")`}}>

                </div>
                <div className="d-flex align-items-center icons" onClick={() => changePhoto(true)}>
                    ➡️
                </div>
            </div>

            <div className="mt-3 d-flex gap-1">
                {images.map((x, i) => <img className={`smallImage ${i === photoIndex ? "selected" : ""}`} key={i} src={x}
                                           alt=""/>)}
            </div>
        </div>
    );
};

export default ImgCarousel;