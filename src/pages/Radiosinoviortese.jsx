import React, { useState } from 'react';
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

const Radiosinoviortese = () => {
    // Filtrar exames do tipo "Radiosinoviortese"
    const radiosinoviorteseExames = exames.filter(exame => exame.type === "Radiosinoviortese");

    return (
        <Base>
            <Container>
                <div className="content">
                    <h2 className="message">PROCESSOS DE RADIOSINOVIORTESE</h2>
                    <p className="message">
                        Aqui você pode acessar todos os procedimentos de radiosinoviortese.
                    </p>
                    <p className="message">
                        Todos os Procedimentos
                    </p>
                    <RecentItemsTable exames={radiosinoviorteseExames} />
                </div>
            </Container>
        </Base>
    );
};

export default Radiosinoviortese;