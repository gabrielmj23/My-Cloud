import './UploadForm.css';
import { useState } from 'react';

export default function UploadForm({ path }: { path: string }) {
  const [success, setSuccess] = useState<boolean>(false);
  return (
    <div className='upload-form'>
      <p style={{textAlign: 'left', marginLeft: '10px'}}>Upload path will be: {path === '' ? '/' : path}</p>
      <iframe id='invisible' name='invisible' style={{display: 'none'}}></iframe>
      <form
        encType='multipart/form-data'
        method="post"
        action={`${import.meta.env.VITE_SERVER_URL}/uploads${path}`}
        target='invisible'
        onSubmit={() => setSuccess(true)}
      >
        <fieldset>
          <label htmlFor="file">File</label>
          <input name="file" type='file'></input>
        </fieldset>
        <button type="submit" className='upload-btn'>Upload</button>
      </form>
      { success ? (
          <p><small>Success! Go back to see your file</small></p>
        ) : null
      }
    </div>
  );
}