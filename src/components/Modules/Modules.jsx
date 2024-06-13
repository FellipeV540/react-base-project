
import React from 'react';
import { RiHospitalLine, RiBookOpenLine, RiComputerLine, RiScissors2Line } from 'react-icons/ri';
import styled from 'styled-components';
import ModuleCard from '../ModuleCard/ModuleCard';
import exames from '../../data/exames.json'

const Container = styled.article`
  
  .module-cards-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1300px;
    margin-inline: auto;
    gap: 40px;
  }

  .welcome-message {
    text-align: center;
    font-size: 24px;
    color: black;
    margin-bottom: 40px;
  }
`;

const Modules = () => {
  const calculatePendingProcesses = (type) => {
    return exames
      .filter(item => item.type === type)
      .reduce((acc, curr) => acc + curr.itens.filter(item => item.status === 'Pendente').length, 0);
  };

  return (
    <Container>
        <div className="module-cards-container">
          <ModuleCard 
            moduleName="Dosimetria Clínica" 
            icon={<RiHospitalLine />} 
            route="/clinica" 
            processosEmAberto={calculatePendingProcesses("Dosimetria Clinica")} 
          />
          <ModuleCard 
            moduleName="Dosimetria Pré-Clínica" 
            icon={<RiHospitalLine />} 
            route="/dosimetriapreclinica" 
            processosEmAberto={calculatePendingProcesses("Dosimetria Pré-Clinica")} 
          />
          <ModuleCard 
            moduleName="Modelagem Computacional" 
            icon={<RiComputerLine />} 
            route="/modelagem" 
            processosEmAberto={calculatePendingProcesses("Modelagem Computacional")} 
          />
          <ModuleCard 
            moduleName="Radiosinoviortese" 
            icon={<RiBookOpenLine />} 
            route="/radiosinoviortese" 
            processosEmAberto={calculatePendingProcesses("Radiosinoviorte")} 
          />
          <ModuleCard 
            moduleName="Segmentação e Quantificação" 
            icon={<RiScissors2Line />} 
            route="/SegmentacaoeQuantificacao" 
            processosEmAberto={calculatePendingProcesses("Segmentação e Quantificação")} 
          />
        </div>
      </Container>
  )
}
  
export default Modules
