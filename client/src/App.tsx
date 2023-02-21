import { useState } from 'react';
import './App.css';
import FilesList from './components/FilesList';
import UploadForm from './components/UploadForm';

type AppMode = 'viewFiles' | 'upload';

function App() {
  const [mode, setMode] = useState<AppMode>('viewFiles');
  const [path, setPath] = useState<string>('');
  return (
    <main>
      <h1>My-Cloud</h1>
      { mode === 'viewFiles' ? (
          <>
            <button className='main-btn' onClick={(e) => { setMode('upload'); e.preventDefault(); }}>Upload file</button>
            <FilesList path={path} setPath={setPath}/>
          </>
        ) : (
          <>
            <button className='main-btn' onClick={(e) => { setMode('viewFiles'); e.preventDefault(); }}>Go back</button>
            <UploadForm path={path} />
          </>
        )
      }
    </main>
  );
}

export default App;
