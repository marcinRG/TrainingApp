import React, {useState, useRef, useContext, useEffect} from 'react';
import './FileUploader.component.scss';
import img from '../../../images/user1.svg'
import {AuthContext} from '../../appContext/AuthContext';
import {UserDetailContext} from '../../appContext/UserDetailsContext';


export function FileUploaderComponent() {
    const [image, setImage] = useState({src: ''});
    const userAuth = useContext(AuthContext);
    const userDetailsContext = useContext(UserDetailContext);

    const imgRef = useRef();
    const buttonRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        setImage({src: userDetailsContext.userDetails.imageURL});
    }, [userDetailsContext.userDetails.imageURL]);


    const loadImageAction = () => {
        inputRef.current.click();
    }

    const imageInputAction = () => {
        const file = inputRef.current.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            const img = new Image();
            img.src = fileReader.result;
            img.addEventListener('load', () => {
                setImage({
                    width: img.width,
                    height: img.height,
                    name: file.name,
                    src: img.src,
                    file: file
                });
            });
        });
        fileReader.readAsDataURL(file);
    }

    const getImgSrc = () => {
        let src = img;
        if (image && image.src) {
            src = image.src;
        }
        return src;
    }

    const uploadImage = (event) => {
        event.preventDefault();
        if (image && image.file) {
            userDetailsContext.uploadImage(image.file);
        }
    }

    return (
        <React.Fragment>
            {userAuth.isAuthenticated() && <div className="img-uploader-component">
                <h4 className="uploader-title">Image uploader</h4>
                <div className="image-thumbnail">
                    <img src={getImgSrc()} className="upload-image" ref={imgRef}/>
                </div>
                <form className="upload-form">
                    <input ref={buttonRef} className="btn-uploader" type="button" value="load an image"
                           onClick={loadImageAction}
                    />
                    {image && image.name && image.height && image.width && <React.Fragment>
                        <label>Image name</label>
                        <span className="img-props name">{image.name}</span>
                        <label>Image size</label>
                        <span className="img-props size">{image.height + 'x' + image.width}</span>
                    </React.Fragment>}
                    <input ref={inputRef} className="upload-input" type="file"
                           accept="image/x-png,image/jpeg,image/x-svg"
                           style={{display: 'none'}} onChange={imageInputAction}/>
                    <button className="btn-uploader" onClick={uploadImage}>upload and save image</button>
                </form>
            </div>}
        </React.Fragment>);
}


