import React, { useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import './cms.css';

// folder: 'speakers' | 'sponsors' | 'hero'
const ImageUploader = ({ folder, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const { data } = await axiosClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange({ url: data.url, publicId: data.publicId });
    } catch (err) {
      setError(err.response?.data?.message || "Échec de l'upload.");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="cms-uploader">
      {value?.url && <img src={value.url} alt="Aperçu" className="cms-uploader-preview" />}
      <div>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={uploading} />
        {uploading && <p>Envoi en cours...</p>}
        {error && <p className="cms-alert-error">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUploader;
