import React from 'react';
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

const Home = () => {
  const dados = [
    {
      icon: 'imagens/icones/icon-1.png',
      status: 'Pendente',
      id: '#131',
    },
    {
      icon: 'imagens/icones/icon-2.png',
      status: 'Concluído',
      id: '#132',
    },
    {
      icon: 'imagens/icones/icon-3.png',
      status: 'Pendente',
      id: '#133',
    },
    {
      icon: 'imagens/icones/icon-4.png',
      status: 'Pendente',
      id: '#134',
    },
    {
      icon: 'imagens/icones/icon-2.png',
      status: 'Concluído',
      id: '#135',
    },
    {
      icon: 'imagens/icones/icon-1.png',
      status: 'Pendente',
      id: '#136',
    },
    {
      icon: 'imagens/icones/icon-1.png',
      status: 'Em Processo',
      id: '#137',
    },


  ]
  const dados_notificacoes = [
    {
      nome: 'Cliníca Albert',
      servico: 'Dosimetria Clínica',
      id: '#16723',
    },
    {
      nome: 'Cliníca Robert',
      servico: 'Modelagem Computacional',
      id: '#123',
    },
  ]
  const calculatePendingProcesses = (type) => {
    return exames
      .filter(item => item.type === type)
      .reduce((acc, curr) => acc + curr.itens.filter(item => item.status === 'Pendente').length, 0);
  };

  return (
    <Base>
      <Container>
        <img className="logo" src={process.env.PUBLIC_URL + 'imagens/DosimagemLOGO.png'} alt="Logo" />

        <h2 className="welcome-message">Bem-vindo ao Portal de Dosimetria</h2>
        <p className="welcome-message">
          Sua central de acesso a ferramentas e informações relevantes para o seu dia a dia na área de dosimetria.
        </p>

        <div className="module-cards-container">
          <div className='table-area'>
            {dados_notificacoes.map((item) => (
              <div>{item.nome} Contratou Serviço de {item.servico} - id {item.id}</div>
            ))}
          </div>
          <div className='table-area'>
            <table>
              <tr>
                <th>Serviços</th>
                <th>ID</th>
                <th>Para Calibração</th>
                <th>Imagem Paciente</th>
                <th>Enviar Relatório</th>
                <th>Status</th>
                <th>Arquivar</th>
              </tr>
              {dados.map((item) => (
                <tr>
                  <td> <img src={process.env.PUBLIC_URL + item.icon} alt="Imagem não Carregou" /></td>
                  <td>{item.id}</td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-5.png'} alt="Imagem não Carregou" /></td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-5.png'} alt="Imagem não Carregou" /></td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-6.png'} alt="Imagem não Carregou" /></td>
                  <td>{item.status}</td>
                  <td><img src={process.env.PUBLIC_URL + 'imagens/icones/icon-7.png'} alt="Imagem não Carregou" /></td>
                </tr>
              ))}
            </table>
           <div className='table-rodape'> <h4>Serviços Pendentes 8</h4>
           <h4>Serviços Concluídos 32</h4>
           </div>

          </div>
        </div>
      </Container>
    </Base>
  );
};

export default Home;
