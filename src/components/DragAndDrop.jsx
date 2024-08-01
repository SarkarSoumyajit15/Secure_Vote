import React, { useState } from 'react';
// import './DragAndDrop.css'; // Import the CSS file for styling

const DragAndDrop = ({file,setFile}) => {
    // const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    };
  
    const handleFile = (newFile) => {
      setFile(newFile);
    };
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      console.log(selectedFile);
      handleFile(selectedFile);

    };
  
    const handleFileClick = () => {
      if (file) {
          setPreview(URL.createObjectURL(file));
    } else {
          setPreview(null);
      }
    };
  
    const closeModal = () => {
      setPreview(null);
    };
  
    return (
      <div className="file-upload">
        <div
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Drag and drop a file here, or click to select a file</p>
          <input type="file"  onChange={handleFileChange} />
        </div>
        {file && (
          <div className="file-item" onClick={handleFileClick}>
            {file.name}
          </div>
        )}
        {preview && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content">
              <img src={preview} alt="preview" />
            </div>
          </div>
        )}
      </div>
    );
};

export default DragAndDrop;








// const [files, setFiles] = useState([]);
// const [previews, setPreviews] = useState([]);
// const [selectedPreview, setSelectedPreview] = useState(null);

// const handleDragOver = (e) => {
//   e.preventDefault();
//   e.stopPropagation();
// };

// const handleDrop = (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   const droppedFiles = Array.from(e.dataTransfer.files);
//   handleFiles(droppedFiles);
// };

// const handleFiles = (newFiles) => {
//   setFiles(prevFiles => [...prevFiles, ...newFiles]);

//   const newPreviews = newFiles.map(file =>
//     file.type.startsWith('image/')
//       ? URL.createObjectURL(file)
//       : null
//   );

//   setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
// };

// const handleFileChange = (e) => {
//   const selectedFiles = Array.from(e.target.files);
//   handleFiles(selectedFiles);
// };

// const handleFileClick = (index) => {
//   setSelectedPreview(previews[index] || URL.createObjectURL(files[index]));
// };

// const closeModal = () => {
//   setSelectedPreview(null);
// };

// return (
//   <div className="file-upload">
//     <div
//       className="drop-zone"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <p>Drag and drop files here, or click to select files</p>
//       <input type="file" multiple onChange={handleFileChange} />
//     </div>
//     <div className="file-list">
//       {files.map((file, index) => (
//         <div
//           key={index}
//           className="file-item"
//           onClick={() => handleFileClick(index)}
//         >
//           {file.name}
//         </div>
//       ))}
//     </div>
//     {selectedPreview && (
//       <div className="modal" onClick={closeModal}>
//         <div className="modal-content">
//           {selectedPreview.startsWith('blob:') ? (
//             <img src={selectedPreview} alt="preview" />
//           ) : (
//             <p>{selectedPreview}</p>
//           )}
//         </div>
//       </div>
//     )}
//   </div>
// );









//   const [dragging, setDragging] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState(null);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles(droppedFiles);
//   };

//   const handleClick = () => {
//     document.getElementById('file-input').click();
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };



//   const handleFileSelection = (event) => {

//     const filePreviews = files.map(file => {
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         return new Promise((resolve) => {
//           reader.onload = (event) => {
//             resolve({ file, preview: event.target.result });
//           };
//           reader.readAsDataURL(file);
//         });
//       } else {
//         // For non-image files, just return the file object
//         return Promise.resolve({ file, preview: null });
//       }
//     });

//     Promise.all(filePreviews).then(results => {
//       setPreviews(results);
//     });
//   };


//   return (
//     <>
//     <div
//       className={`drop-zone ${dragging ? 'dragover' : ''}`}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//       onClick={handleClick}
//     >
//       <input
//         type="file"
//         ref = {inputRef3}
//         id="file-input"
//         multiple
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//       <p>Drag & Drop files here or click to select files</p>
//     </div>
//       <div className="file-list" >
//         {!previews ?(files.map((file, index) => (
//           <div value={file} onClick={handleFileSelection} key={index} className="file-item">
//             {file.name}
//           </div>
//         )))
//         :(
//         <div className="preview">
//         {previews.map((src, index) => (
//           src ? <img key={index} src={src} alt={`preview ${index}`} /> : <p key={index}>{files[index].name}</p>
//         ))}
//       </div>
//         )
//         }
//       </div>
//       </>
//   );