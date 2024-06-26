import React from 'react';
import Base from "./Base";
import styled from "styled-components";
import exames from "../data/exames.json";
import RecentItemsTable from "../components/RecentItemsTable/RecentItemsTable";

const Container = styled.article`
  .content {
    padding-inline: 200px;
    display: flex;
    flex-direction: column;
    gap: 15px;
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

const Modelagem = () => {
    // Filtrar exames do tipo "Modelagem Computacional"
    const modelagemExames = exames.filter(exame => exame.type === "Modelagem Computacional");

    return (
        <Base>
            <Container>
                <div className="content">
                    <h2 className="message">PROCESSOS DE MODELAGEM COMPUTACIONAL</h2>
                    <p className="message">
                        Aqui você pode acessar todos os procedimentos de Modelagem Computacional.
                    </p>
                    <p className="message">
                        Todos os Procedimentos
                    </p>
                    <RecentItemsTable exames={modelagemExames} />
                </div>
            </Container>
        </Base>
    );
};

export default Modelagem;