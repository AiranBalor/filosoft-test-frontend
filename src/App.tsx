import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/generate-pdf', { url }, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, 'document.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Сайт-парсер PDF Генератор</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Введите URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Генерация...' : 'Сгенерировать PDF'}
        </button>
      </form>
    </div>
  );
};

export default App;