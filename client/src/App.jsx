import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];

    // Verificar la extensión del archivo (por ejemplo, asegurarse de que sea .csv)
    const allowedExtensions = ['.csv'];
    const fileExtension = selectedFile
      ? selectedFile.name.split('.').pop()
      : '';

    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      alert(
        'Formato de archivo no admitido. Por favor, seleccione un archivo CSV.',
      );
      setFile(null); // Establece el archivo en null para deshabilitar el botón y limpiar la selección
    } else {
      setFile(selectedFile);
    }
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
          setFile(null); // Limpia la selección después de cargar con éxito
        } else {
          console.log('Error al cargar el archivo.');
          setFile(null); // Limpia la selección en caso de error
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar el archivo.');
        setFile(null); // Limpia la selección en caso de error
      }
    }
  };

  return (
    <div className="App">
      <h1>Subir Archivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        <span> Cargar </span>
      </button>
    </div>
  );
}

export default App;
