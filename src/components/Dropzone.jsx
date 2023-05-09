import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from "xlsx"

export default function Dropzone({setData}) {

  const onDrop = useCallback(acceptedFiles => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(acceptedFiles[0]);

    reader.onload = function () {
      let workbook = XLSX.read(reader.result, { type: "array" });

      let data = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[workbook.SheetNames[0]]
      );

      setData(data)

    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {
          isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop a excel file here, or click to select files</p>
        }
      </div>
  )
}