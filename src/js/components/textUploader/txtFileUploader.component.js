import React from 'react';
import './TxtFileUploader.component.scss';

export function TxtFileUploaderComponent(props) {
   return (
       <div className="text-uploader-component">
           <h3>Upload training data:</h3>
           <form>
               <input  className="btn-uploader" type="button" value="load data"/>
               <input className="upload-input" type="file"
                      accept="image/x-png,image/jpeg,image/x-svg"
                      style={{display: 'none'}} />
               <button className="btn-uploader" >upload and save data</button>
           </form>
       </div>
   )
}