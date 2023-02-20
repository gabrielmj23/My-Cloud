import './FileElem.css';
import { FiFile, FiVideo, FiImage, FiFolder, FiDownload, FiArrowDown } from "react-icons/fi";
import { IconType } from 'react-icons/lib/esm/iconBase';

// Get react-icons component from file extension
const iconFromExt = (extension: string): IconType => {
  if (extension === '') {
    return FiFolder;
  }
  else if (['.jpg', '.png', '.jpeg'].indexOf(extension) > -1) {
    return FiImage;
  }
  else if (['.mp4', '.avi', '.mkv', '.webm'].indexOf(extension) > -1) {
    return FiVideo;
  }
  return FiFile;
};

// Convert bytes to GB, MB or KB, when appropiate
const readableSize = (size: number): string => {
  if (size >= 1e9) {
    return `${(size / 1e9).toFixed(2)} GB`;
  }
  else if (size >= 1e6) {
    return `${(size / 1e6).toFixed(2)} MB`;
  }
  else if (size >= 1e3) {
    return `${(size / 1e3).toFixed(2)} KB`;
  }
  return `${size} B`;
};

export default function FileElem({ fileData, path, setPath }: { fileData: FileInfo, path: string, setPath: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <tr className="file-elem">
      <td>{iconFromExt(fileData.extension)({})}</td>
      <td>{fileData.extension === '' ? '/' : null}{fileData.filename}</td>
      { fileData.size > 0 ? (
            <td>{readableSize(fileData.size)}</td>
        ) : <td></td>
      }
      <td>
      { fileData.extension !== '' ? (
              <a
                href={`${import.meta.env.VITE_SERVER_URL}/downloads/${path}/${fileData.filename}`}
                download={fileData.filename}
                target='_blank'
              >
                <FiDownload />
              </a>
        ) :   <div onClick={(e) => { setPath(`${path}/${fileData.filename}`); e.preventDefault(); }}>
                <FiArrowDown />
              </div>
      }
      </td>
    </tr>
  );
}
