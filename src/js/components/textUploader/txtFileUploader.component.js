import React from 'react';
import './TxtFileUploader.component.scss';

export function TxtFileUploaderComponent(props) {
   return (
       <div className="text-uploader-component">
           <h3 className="file-uploader-subtitle">training data uploader</h3>
           <form className="file-uploader-form">
               <input type="text" className="file-name-input" />
               <input className="upload-input" type="file"
                      accept="image/x-png,image/jpeg,image/x-svg"
                      style={{display: 'none'}} />
               <div className="btn-wrapper">
                   <button  className="btn-uploader" >load data from file</button>
                   <button className="btn-uploader" >save to database</button>
               </div>
           </form>
       </div>
   )
}