import React, { useState} from 'react';
import styles from './Style.module.scss';
import csx from 'classnames';

const ImageLoader = ({src, className}) => {
    const [loading, setLoading] = useState(true);

    const imageLoaded = () => {
        setLoading(false);
    };

    return (
        <>
            <div style={{display: loading ? "block" : "none"}} className={csx(styles.skeleton, className)}>
            </div>
                    <img
                        alt={'Product Image'}
                        className={className}
                        src={src}
                        onLoad={imageLoaded}
                        style={{display: loading ? "none" : "block"}}
                    />
        </>
    );
};

export default ImageLoader;
