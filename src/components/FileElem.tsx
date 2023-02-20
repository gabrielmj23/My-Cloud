import './FileElem.css';
import './FilesList.css';
import { FiFile, FiVideo, FiImage, FiFolder } from "react-icons/fi";
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

export default function FileElem({ fileData }: { fileData: FileInfo }) {
  console.log(fileData);
  return (
    <tr className="file-elem files-row">
      <td>{iconFromExt(fileData.extension)({})}</td>
      <td>{fileData.filename}</td>
      { fileData.size > 0 ? (
        <td>{readableSize(fileData.size)}</td>
      ) : <td></td> }
    </tr>
  );
}
