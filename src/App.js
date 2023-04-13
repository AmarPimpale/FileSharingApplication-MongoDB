
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        console.log(data);
        data.append("name", file.name);
        data.append("file", file);

        const response =await uploadFile(data);
      console.log(response)

        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    console.log("onUploadClick",fileInputRef.current);
    
    fileInputRef.current.click();
  }
  console.log("file",file)

  return (
    <div className='container'>
      <img src={url} className='img' />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className='link-container' style={{border:"1px solid black"}}>
        <a href={result} target='_blank'>{result}</a> 

        </div>
      </div>
    </div>
  );
}

export default App;