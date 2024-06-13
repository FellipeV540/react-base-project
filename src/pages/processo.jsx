import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Base from './Base';
import exames from "../data/exames.json";
import { handleDownloadFile } from "../components/utils.js";

const statusOptions = ['Pendente', 'Em Andamento', 'Concluído'];

function Processos() {
  const { id } = useParams();
  const processo = exames.flatMap(exame => exame.itens).find(item => item.id.toString() === id);

  const [draggedFile, setDraggedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [status, setStatus] = useState(processo.status);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDraggedFile(file);
    setFileSelected(true);
    console.log('Arquivo selecionado:', file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setDraggedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSelectFile = () => {
    document.getElementById('fileInput').click();
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDownloadPacienteImage = () => {
    handleDownloadFile(processo.imgPaciente);
  };

  const handleDownloadCalibracaoImage = () => {
    handleDownloadFile(processo.imgCalibração);
  };

  if (!processo) {
    return (
      <Base>
        <h1 style={{ color: '#000' }}>Processo não encontrado</h1>
      </Base>
    );
  }

  return (
    <Base>
      <h1 className="informacoes" style={{ color: '#000' }}>Informações do Processo</h1>
      <p className="informacoes" style={{ color: '#000' }}><strong>ID:</strong> {processo.id}</p>
      <p className="informacoes" style={{ color: '#000' }}><strong>Nome da Clínica:</strong> {processo.nomeClinica}</p>
      <p className="informacoes" style={{ color: '#000' }}><strong>Descrição:</strong> {processo.description}</p>
      <p className="informacoes" style={{ color: '#000' }}><strong>Data:</strong> {processo.data}</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '1' }}>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center'}}>
            <h2 style={{ color: '#000' }}>Download de Imagens</h2>
            <div>
              <p style={{ color: '#000' }}>Download Imagem Paciente</p>
              <button className="custom-button" style={{ backgroundColor: '#65839F' }} onClick={handleDownloadPacienteImage}>
                <span style={{ color: '#fff', textDecoration: 'none' }}>Download</span>
              </button>
            </div>
            <div>
              <p style={{ color: '#000' }}>Download Imagem Calibração</p>
              <button className="custom-button" style={{ backgroundColor: '#65839F' }} onClick={handleDownloadCalibracaoImage}>
                <span style={{ color: '#fff', textDecoration: 'none' }}>Download</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2 style={{textAlign: 'center', color: '#000' }}>Status do Processo</h2>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#000' }}><strong>Status:</strong>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  style={{
                    padding: '8px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '100%',
                    maxWidth: '200px',
                    backgroundColor: '#f9f9f9',
                    color: '#000', // cor do texto
                  }}
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </p>
            </div>
          </div>
        </div>

        <div style={{ flex: '1', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}
             onDragOver={handleDragOver}
             onDrop={handleDrop}>
          <h2 style={{ color: '#000' }}>Upload de Arquivos</h2>
          <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: '5px' }}>
            <div>
              <input type="file" id="fileInput" onChange={handleFileUpload} style={{ display: 'none' }} />
              <p style={{ color: '#000' }}>Arraste um arquivo aqui ou</p>
              <button className="custom-button" onClick={handleSelectFile} style={{ backgroundColor: '#65839F', color: '#fff', marginBottom: '10px' }}>Selecionar Arquivo</button>
            </div>
          </div>
          <p style={{ color: '#000' }}>Arquivos Selecionados:</p>
          {draggedFile ? (
            <div>
              <p style={{ color: '#000' }}>{draggedFile.name}</p>
              {fileSelected && (
                <button className="custom-button" onClick={() => setFileSelected(false)} style={{ backgroundColor: '#65839F', color: '#fff' }}>Enviar</button>
              )}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/" className="custom-button" style={{ backgroundColor: '#65839F', color: '#fff' }}>Voltar para Home</Link>
      </div>
    </Base>
  );
}

export default Processos;
