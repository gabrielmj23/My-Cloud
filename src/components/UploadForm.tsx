import './UploadForm.css';
import { useState } from 'react';

type SuccessOptions = 'success' | 'failed' | 'notSubmitted'

export default function UploadForm({ path }: { path: string }) {
  const [success, setSuccess] = useState<SuccessOptions>('notSubmitted');
  const [file, setFile] = useState<File | null>(null);
  const [newFolder, setNewFolder] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');

  // Upload handler
  const uploadForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file === null) {
      setSuccess('notSubmitted');
      return;
    }
    const data = new FormData();
    data.append('file', file, file.name);
    const status = await fetch(`${import.meta.env.VITE_SERVER_URL}/uploads${path}/${newFolderName.trim()}`, {
      method: 'POST',
      body: data
    }).then((res) => res.ok);
    if (status) {
      setSuccess('success');
    }
    else {
      setSuccess('failed');
    }
  };

  return (
    <div className='upload-form'>
      <p style={{textAlign: 'left', marginLeft: '10px'}}>Upload path will be: {path === '' ? '/' : path}</p>
      <form
        encType='multipart/form-data'
        onSubmit={(e) => { uploadForm(e); }}
      >
        <fieldset>
          <label htmlFor="file">File</label><br></br>
          <input name="file" type='file' required onChange={(e) => { setFile(e.target.files ? e.target.files[0] : null); }}></input>
        </fieldset>
        <fieldset>
          <label htmlFor='new-folder'>Create a new folder</label>
          <input name='new-folder' type='checkbox' onChange={() => { setNewFolder(!newFolder); setNewFolderName(''); }}></input>
          { newFolder ? (
              <input
                type='text'
                placeholder='Folder name'
                onChange={(e) => { setNewFolderName(e.target.value); }}
                style={{padding: '5px', borderRadius: '5px'}}
              ></input>
            ) : null
          }
        </fieldset>
        <button type="submit" className='upload-btn'>Upload</button>
      </form>
      { success === 'success' ? (
          <p><small>Success! Go back to see your file</small></p>
        ) : success === 'failed' ? (
          <p><small>Upload failed, this was down to a repeated file name or a server error</small></p>
        ) : null
      }
    </div>
  );
}