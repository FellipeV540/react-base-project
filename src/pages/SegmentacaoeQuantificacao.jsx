import React, { useState, useRef } from 'react';
import { RiDownloadLine, RiUploadLine, RiDeleteBinLine, RiFolderDownloadLine, RiArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri';
import Base from './Base';
import styled from 'styled-components';
import DropdownStatus from '../components/status/DropdownStatus';

const Container = styled.article`
  .logo {
    width: 200px;
    height: auto;
    margin-bottom: 20px;
  }

  .module-cards-container {
    display: flex;
    justify-content: center;
    max-width: 1300px;
    margin-inline: auto;
    gap: 40px;
  }
  th {
    display: table-cell;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  tr {
    background-color: #fff;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .table-area {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: black;
  }
  .welcome-message, .search-bar, .filter-buttons, .table-rodape {
    text-align: center;
    margin-bottom: 20px;
  }
  .filter-buttons button {
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: hsl(209, 23%, 51%);
    color: #fff;
    cursor: pointer;
  }
  .filter-buttons button:hover {
    background-color: #0056b3;
  }
  .action-button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 5px;
  }
  .action-button:focus {
    outline: none;
  }
`;

const ActionButton = ({ action, onClick, icon }) => (
  <button className="action-button" onClick={onClick}>
    {icon}
  </button>
);

const SegmentacaoeQuantificacao = () => {
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [dados, setDados] = useState([
    { nome: 'Clinica Albert', status: 'Pendente', id: '#134' },
    { nome: 'Clinica Albert', status: 'Concluído', id: '#138' },
    { nome: 'Clinica Robert', status: 'Pendente', id: '#142' },
    { nome: 'Clinica Roberto', status: 'Concluído', id: '#145' },
    { nome: 'Clinica André', status: 'Concluído', id: '#150' },
  ]);

  const fileInputRef = useRef(null);

  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleStatusChange = (id, newStatus) => {
    setDados((prevDados) =>
      prevDados.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleActionClick = (action, id) => {
    if (action === 'upload') {
      fileInputRef.current.click();
      fileInputRef.current.dataset.id = id;
    } else if (action === 'arquivar') {
      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === id ? { ...item, status: 'Arquivado' } : item
        )
      );
    } else if (action === 'desarquivar') {
      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === id ? { ...item, status: 'Pendente' } : item
        )
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const id = event.target.dataset.id;
      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === id ? { ...item, status: 'Concluído' } : item
        )
      );
    }
  };

  const filteredDados = dados.filter((item) => {
    const matchesFilter =
      filter === 'Todos'
        ? item.status !== 'Arquivado'
        : filter === 'Arquivados'
        ? item.status === 'Arquivado'
        : item.status === filter;
    const matchesSearchTerm =
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.includes(searchTerm);
    return matchesFilter && matchesSearchTerm;
  });

  return (
    <Base>
      <Container>
        <h2 className="welcome-message">Segmentação e Quantificação</h2>
        <p className="welcome-message">
          Aqui você acessa todos os serviços de Segmentação e Quantificação.
        </p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-buttons">
          <button onClick={() => handleFilterChange('Todos')}>Todos</button>
          <button onClick={() => handleFilterChange('Pendente')}>Pendente</button>
          <button onClick={() => handleFilterChange('Concluído')}>Concluído</button>
          <button onClick={() => handleFilterChange('Em Andamento')}>Em Andamento</button>
          <button onClick={() => handleFilterChange('Arquivados')}>Arquivados</button>
        </div>
        <div className="module-cards-container">
          <div className="table-area">
          <div className="table-rodape">
              <h4>Serviços Pendentes {filteredDados.filter(item => item.status === 'Pendente').length}</h4>
              <h4>Serviços Concluídos {filteredDados.filter(item => item.status === 'Concluído').length}</h4>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nome da Clínica</th>
                  <th>ID</th>
                  <th>Para Calibração</th>
                  <th>Imagem Paciente</th>
                  <th>Enviar Relatório</th>
                  <th>Status</th>
                  {filter === 'Arquivados' ? <th>Desarquivar</th> : <th>Arquivar</th>}
                </tr>
              </thead>
              <tbody>
                {filteredDados.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.id}</td>
                    <td>
                      <ActionButton
                        action="calibracao"
                        onClick={() => handleActionClick('calibracao', item.id)}
                        icon={<RiDownloadLine size={24} />}
                      />
                    </td>
                    <td>
                      <ActionButton
                        action="download"
                        onClick={() => handleActionClick('download', item.id)}
                        icon={<RiDownloadLine size={24} />}
                      />
                    </td>
                    <td>
                      <ActionButton
                        action="upload"
                        onClick={() => handleActionClick('upload', item.id)}
                        icon={<RiUploadLine size={24} />}
                      />
                    </td>
                    <td>
                      <DropdownStatus
                        currentStatus={item.status}
                        onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                      />
                    </td>
                    <td>
                      {filter === 'Arquivados' ? (
                        <ActionButton
                          action="desarquivar"
                          onClick={() => handleActionClick('desarquivar', item.id)}
                          icon={<RiInboxUnarchiveLine size={24} />}
                        />
                      ) : (
                        <ActionButton
                          action="arquivar"
                          onClick={() => handleActionClick('arquivar', item.id)}
                          icon={<RiArchiveLine size={24} />}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Container>
    </Base>
  );
};

export default SegmentacaoeQuantificacao;
