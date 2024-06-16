import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ModuleCardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  transition: all 0.3s ease;
  width: 180px;
  height: 125px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    outline: 2px solid var(--primaria);
    outline-offset: 4px;
  }

  .icon {
    font-size: 40px;
    margin-bottom: 15px;
    color: #333;
  }

  .moduleName {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-bottom: 5px;
  }

  .processosEmAberto {
    font-size: 14px;
    color: #424242;
  }
`;

const ModuleCard = ({ moduleName, icon, route, processosEmAberto, className }) => {
  return (
    <Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ModuleCardContainer className={className}>
        <div className="icon">{icon}</div>
        <div>
          <div className="moduleName">{moduleName}</div>
          <span className="processosEmAberto">Processos Pendentes: <span>{processosEmAberto}</span></span>
        </div>
      </ModuleCardContainer>
    </Link>
  );
};

export default ModuleCard;
