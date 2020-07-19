import React from "react";

const PreviewPicture = (props) => {
    const {pictureUrl} = props;
    return (
        // eslint-disable-next-line
        <img className='img-fluid mb-2 mt-2' src={pictureUrl}/>
    )
};
export default PreviewPicture;