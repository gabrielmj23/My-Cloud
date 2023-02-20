import { useEffect, useState } from "react";
import './FilesList.css';
import FileElem from "./FileElem";
import { FiArrowUp } from "react-icons/fi";

export default function FilesList({ path, setPath }: { path: string, setPath: React.Dispatch<React.SetStateAction<string>> }) {
  const [files, setFiles] = useState<FileInfo[]>([]);

  // Fetch files in this directory on first render
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { files }: { files: FileInfo[] } = await fetch(`${import.meta.env.VITE_SERVER_URL}/files${path}`, {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json());

        setFiles(files);
      } catch (err) {
        console.error(err);
        setFiles([]);
      }
    };

    fetchFiles();
  }, [path]);

  // Function to go up one folder
  const exitFolder = () => {
    if (path === '') return;
    setPath(path.slice(0, path.lastIndexOf('/')));
  };

  // Respond with list of FileElems
  return (
    <div className="files-list">
      <h2 style={{marginBottom: '0px'}}>Files</h2>
      <div className="path-display">
        <p>Current path: {path === '' ? '/' : path}</p>
        <div className="exit-folder-div" onClick={(e) => { exitFolder(); e.preventDefault(); }}>
          <FiArrowUp />
          <small>  Up one folder</small>
        </div>
      </div>
      <hr></hr>
      { files.length === 0 ? (
        <p>No files were found</p>
      ) : (
        <table>
          <thead>
            <tr className="files-row">
              <th>Type</th>
              <th>File name</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { files.map((file, index) => <FileElem fileData={file} path={path} setPath={setPath} key={index} />) }
          </tbody>
        </table>
      )}
    </div>
  );
}
