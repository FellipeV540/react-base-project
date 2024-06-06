import React, { useState, useRef } from 'react';
import { RiDownloadLine, RiUploadLine, RiDeleteBinLine, RiFolderDownloadLine } from 'react-icons/ri';
import Base from './Base';
import styled from 'styled-components';
import exames from '../data/exames.json';

const Container = styled.article`
  .logo {
    width: 200px;
    height: auto;
    margin-bottom: 20px;
  }

  .module-cards-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1300px;
    margin-inline: auto;
    gap: 40px;
  }
  th {
    display: table-cell;
    font-weight: normal;
  }
  tr {
    background-color: white;
    padding: 5px;
    border: none;
    border-radius: 10px;
  }
  .table-area {
    padding: 10px;
    background-color: #bfbfbf;
    border-radius: 20px;
    color: black;
  }
  .table-rodape {
    display: flex;
    justify-content: space-between;
  }
  .table-area div {
    background-color: white;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
    font-size: 20px;
  }
  .welcome-message {
    text-align: center;
    font-size: 24px;
    color: black;
    margin-bottom: 40px;
  }
  .search-bar {
    text-align: center;
    margin-bottom: 20px;
  }
  .filter-buttons {
    text-align: center;
    margin-bottom: 20px;
  }
  .filter-buttons button {
    margin: 0 10px;
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleActionClick = (action, id) => {
    if (action === 'upload') {
      fileInputRef.current.click();
      fileInputRef.current.dataset.id = id;
    } else if (action === 'calibracao' || action === 'download') {
      setDados((prevDados) =>
        prevDados.map((item) =>
          item.id === id ? { ...item, status: 'Em Andamento' } : item
        )
      );
    } else if (action === 'arquivar') {
      const item = dados.find(item => item.id === id);
      if (item.status === 'Concluído') {
        setDados((prevDados) =>
          prevDados.map((item) =>
            item.id === id ? { ...item, status: 'Arquivado' } : item
          )
        );
      } else {
        alert('Não é possível arquivar processos não concluídos.');
      }
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
                      <button
                        className="action-button"
                        onClick={() => handleActionClick('calibracao', item.id)}
                      >
                        <RiDownloadLine size={24} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="action-button"
                        onClick={() => handleActionClick('download', item.id)}
                      >
                        <RiDownloadLine size={24} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="action-button"
                        onClick={() => handleActionClick('upload', item.id)}
                      >
                        <RiUploadLine size={24} />
                      </button>
                    </td>
                    <td>{item.status}</td>
                    <td>
                      {filter === 'Arquivados' ? (
                        <button
                          className="action-button"
                          onClick={() => handleActionClick('desarquivar', item.id)}
                        >
                          <RiFolderDownloadLine size={24} />
                        </button>
                      ) : (
                        <button
                          className="action-button"
                          onClick={() => handleActionClick('arquivar', item.id)}
                        >
                          <RiDeleteBinLine size={24} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-rodape">
              <h4>Serviços Pendentes {filteredDados.filter(item => item.status === 'Pendente').length}</h4>
              <h4>Serviços Concluídos {filteredDados.filter(item => item.status === 'Concluído').length}</h4>
            </div>
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
