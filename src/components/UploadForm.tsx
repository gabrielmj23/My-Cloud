import './UploadForm.css';

export default function UploadForm({ path }: { path: string }) {
  return (
    <div className='upload-form'>
      <p style={{textAlign: 'left', marginLeft: '10px'}}>Upload path will be: {path === '' ? '/' : path}</p>
      <form encType='multipart/form-data' method="post" action={`${import.meta.env.VITE_SERVER_URL}/uploads${path}`}>
        <fieldset>
          <label htmlFor="file">File</label>
          <input name="file" type='file'></input>
        </fieldset>
        <button type="submit" className='upload-btn'>Upload</button>
      </form>
    </div>
  );
}