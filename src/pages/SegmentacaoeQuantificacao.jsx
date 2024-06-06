import React, { useState } from 'react';
import { RiHospitalLine, RiBookOpenLine, RiComputerLine, RiScissors2Line } from 'react-icons/ri';
import Base from './Base';
import styled from 'styled-components';
import ModuleCard from '../components/ModuleCard/ModuleCard';
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
  th{
    display:table-cell;
    font-weight:normal;

  }
  tr{
    background-color:white;
    padding:5px;
    border:none;
    border-radius:10px;
  }
.table-area{
  padding:10px;
  background-color:#bfbfbf;
  border-radius:20px;
  color:black;
}
.table-rodape{
  display:flex;
  justify-content:space-between;
}
.table-area div{
  background-color:white;
  padding:5px;
  border-radius:10px;
  margin-bottom:5px;
  font-size:20px;
}
  .welcome-message {
    text-align: center;
    font-size: 24px;
    color: black;
    margin-bottom: 40px;
  }
`;

const SegmentacaoeQuantificacao =() => {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const dados = [
        {
          nome: 'Clinica Albert',
          status: 'Pendente',
          id: '#134',
        },
        {
          nome: 'Clinica Albert',
          status: 'Concluído',
          id: '#138',
        },
        {
          nome: 'Clinica Robert',
          status: 'Pendente',
          id: '#142',
        },
        {
            nome: 'Clinica Roberto',
            status: 'Concluído',
            id: '#145',
          },
          {
            nome: 'Clinica André',
            status: 'Concluído',
            id: '#150',
          },


      ]

    const calculatePendingProcesses = (type) => {
        return exames
          .filter(item => item.type === type)
          .reduce((acc, curr) => acc + curr.itens.filter(item => item.status === 'Pendente').length, 0);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDados = dados.filter((item) => {
        const matchesFilter = filter === 'Todos' || item.status === filter;
        const matchesSearchTerm = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.includes(searchTerm) ||
            item.itens.some(it => it.toLowerCase().includes(searchTerm.toLowerCase()));
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
            </div>
        <div className="module-cards-container">
          <div className='table-area'>
            <table>
              <tr>
                <th>Nome da Clínica</th>
                <th>ID</th>
                <th>Para Calibração</th>
                <th>Imagem Paciente</th>
                <th>Enviar Relatório</th>
                <th>Status</th>
                <th>Arquivar</th>
              </tr>
              {dados.map((item) => (
                <tr>
                  <td>{item.nome}</td>
                  <td>{item.id}</td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-5.png'} alt="Imagem não Carregou" /></td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-5.png'} alt="Imagem não Carregou" /></td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-6.png'} alt="Imagem não Carregou" /></td>
                  <td>{item.status}</td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-7.png'} alt="Imagem não Carregou" /></td>
                </tr>
              ))}
            </table>
           <div className='table-rodape'> <h4>Serviços Pendentes 2</h4>
           <h4>Serviços Concluídos 3</h4>
           </div>

          </div>
        </div>
      </Container>
    </Base>
    );
}

export default SegmentacaoeQuantificacao;
