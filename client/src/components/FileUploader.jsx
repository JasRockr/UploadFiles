import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { API_ENDPOINT_UPLOAD, ALLOWED_EXTENSIONS } from '../config';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];

    // Verify file extension
    const fileExtension = selectedFile
      ? selectedFile.name.split('.').pop()
      : '';

    if (!ALLOWED_EXTENSIONS.includes(`.${fileExtension}`)) {
      alert(
        'Formato de archivo no admitido. Por favor, seleccione un archivo CSV.',
      );
      setFile(null); // Set file to null to disable button and clear selection
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    setLoading(true); // Activate loading animation
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(API_ENDPOINT_UPLOAD, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Archivo cargado y procesado exitosamente.');
          setFile(null); // Set state after upload successful
        } else {
          console.log('Error al cargar el archivo.');
          setFile(null); // Set state after upload failed
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar el archivo.');
        setFile(null); // Set state after upload failed
      }
    }
    setLoading(false); // Disabled animation upload after upload finished
  };

  return (
    <div>
      <h1>Subir Archivo CSV</h1>
      {error && <div className="error-message">{error}</div>}
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {file && <p>Archivo seleccionado: {file.name}</p>}
      <button className="button" onClick={handleUpload} disabled={!file}>
        <span> Cargar </span>
      </button>
      {/* Animation Component */}
      {loading && <BeatLoader color="#36d6a1" loading={loading} size={10} />}
    </div>
  );
}

export default FileUploader;
