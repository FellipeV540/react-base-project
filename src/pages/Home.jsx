import React from "react";
import {
  RiHospitalLine,
  RiBookOpenLine,
  RiComputerLine,
  RiScissors2Line,
} from "react-icons/ri";
import Base from "./Base";
import styled from "styled-components";
import ModuleCard from "../components/ModuleCard/ModuleCard";
import exames from "../data/exames.json";
import Modules from "../components/Modules/Modules";
import RecentItemsTable from "../components/RecentItemsTable/RecentItemsTable";
import { IconButton } from "../components/Buttons/Buttons";

const Container = styled.article`
  .content {
    padding-inline: 200px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
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
    gap: 30px;
  }

  .message {
    text-align: center;
    font-size: 20px;
    color: black;
    margin: 0px;
  }
`;

const Home = () => {
  const modules = {
    "Dosimetria Clínica": <RiHospitalLine />,
    "Dosimetria Pré-Clínica": <RiHospitalLine />,
    "Modelagem Computacional": <RiComputerLine />,
    Radiosinoviortese: <RiBookOpenLine />,
    "Segmentação e Quantificação": <RiScissors2Line />,
  };

  const dados_notificacoes = [
    {
      nome: "Cliníca Albert",
      servico: "Dosimetria Clínica",
      id: "#16723",
    },
    {
      nome: "Cliníca Robert",
      servico: "Modelagem Computacional",
      id: "#123",
    },
  ];

  return (
    <Base>
      <Container>
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "imagens/DosimagemLOGO.png"}
          alt="Logo"
        />
        <div className="content">
          <h2 className="message">Bem-vindo ao Portal de Dosimetria</h2>
          <p className="message">
            Sua central de acesso a ferramentas e informações relevantes para o
            seu dia a dia na área de dosimetria.
          </p>

          <Modules />
          <div className="module-cards-container">
            {/* <div className='table-area'>
            {dados_notificacoes.map((item) => (
              <div>{item.nome} Contratou Serviço de {item.servico} - id {item.id}</div>
            ))}
          </div> */}
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
           <div className='table-rodape'> <h4>Serviços Pendentes 15</h4>
           <h4>Serviços Concluídos 32</h4>
           </div>
          
          </div>
        </div>
      </Container>
    </Base>
  );
};

export default Home;
