import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5001/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Archivo cargado y procesado exitosamente.');
        } else {
          console.log('Error al cargar el archivo.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Subir Archivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        <span> Cargar </span>
      </button>
    </div>
  );
}

export default App;
