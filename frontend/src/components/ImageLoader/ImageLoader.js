import React, {useState} from 'react';


const ImageLoader = ({url}) => {
    const [loading, setLoading] = useState(true);

    const imageLoaded = () => {
        setLoading(false);
    }

    return (
        <>
            <div style={{display: loading ? "block" : "none"}}>
                Loading images,
            </div>
            <div style={{display: loading ? "none" : "block"}}>
                    <img
                        src={url}
                        onLoad={imageLoaded}/>)
            </div>
        </>
    );
};

export default ImageLoader;
