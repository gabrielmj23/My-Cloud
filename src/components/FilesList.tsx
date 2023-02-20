import { useEffect, useState } from "react";
import './FilesList.css';
import FileElem from "./FileElem";

export default function FilesList() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  // Fetch files in this directory on first render
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { files }: { files: FileInfo[] } = await fetch(`${import.meta.env.VITE_SERVER_URL}/files/`, {
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
  }, []);

  // Respond with list of FileElems
  return (
    <div className="files-list">
      <h2>Files</h2>
      { files.length === 0 ? (
        <p>No files were found</p>
      ) : (
        <table>
          <thead>
            <tr className="files-row">
              <th>Type</th>
              <th>File name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            { files.map((file, index) => <FileElem fileData={file} key={index} />) }
          </tbody>
        </table>
      )}
    </div>
  );
}
