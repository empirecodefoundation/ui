import React, { useState, FC } from 'react';
import { useDropzone } from 'react-dropzone';

const SummarizerUI: FC = () => {
  const [fileText, setFileText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    try {
      const text = await file.text();
      setFileText(text);
      setSummary('');
      setError('');
    } catch {
      setError('⚠️ Failed to read the file.');
    }
  };

  const summarizeText = async () => {
    if (!fileText.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: fileText }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || 'Failed to fetch summary.');
      }

      const data = await response.json();
      setSummary(data.summary || '⚠️ No summary returned.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '⚠️ Server error.');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': [] },
    multiple: false,
  });

  return (
    <div style={{
      maxWidth: 600,
      margin: 'auto',
      padding: 24,
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #6b7280',
          padding: 30,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#e0e7ff' : '#f9fafb',
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <input {...getInputProps()} />
        <p>
          {fileText
            ? '📄 File loaded. Ready to summarize!'
            : '📂 Drag and drop a .txt file here, or click to browse'}
        </p>
        <small style={{ color: '#6b7280' }}>Supported format: .txt</small>
      </div>

      <button
        onClick={summarizeText}
        disabled={!fileText || loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#a5b4fc' : '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: 20,
        }}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && (
        <p style={{ color: '#dc2626', fontWeight: 600, textAlign: 'center' }}>
          {error}
        </p>
      )}

      {summary && (
        <div style={{
          backgroundColor: '#eef2ff',
          padding: 20,
          borderRadius: 10,
          lineHeight: 1.6,
          color: '#1e293b',
          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
        }}>
          <h3 style={{ color: '#4338ca', marginBottom: 10 }}>📌 Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizerUI;
