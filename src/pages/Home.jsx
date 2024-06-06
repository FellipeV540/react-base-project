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

        <div className="content">
          <h2 className="message">Bem-vindo ao Portal de Dosimetria</h2>
          <p className="message">
            Sua central de acesso a ferramentas e informações relevantes para o
            seu dia a dia na área de dosimetria.
          </p>
          <p className="message">
            Novos Procedimentos Pendentes
          </p>
          <RecentItemsTable exames={exames}/>
        </div>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Modules></Modules>
    </Base>
  );
};

export default Home;
