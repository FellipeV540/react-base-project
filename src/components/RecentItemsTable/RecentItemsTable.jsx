import React from "react";
import styled from "styled-components";
import {
  RiHospitalLine,
  RiBookOpenLine,
  RiComputerLine,
  RiScissors2Line,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { IconButton } from "../Buttons/Buttons";


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black;
  table {
    width: 100%;
    border: 4px solid green;
    border-radius: 10px;
    overflow: hidden;
    /* background-color: lightgray; */
  }
  th,
  td {
    padding: 10px !important;
    outline: none !important;
  }

  tr{
    border-radius: 0px !important;

    &:hover{
       outline: 2px solid lightblue;
    }
  }
  th {
    display: table-cell;
    font-weight: 600 !important;
    background-color: var(--leve);
    color: white;
    
  }
  tr:nth-child(even) {
    background-color: #f2f2f2; /* Cor de fundo para linhas pares */
  }

  tr:nth-child(odd) {
    background-color: #ffffff; /* Cor de fundo para linhas impares */
  }

  .dots{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 800;
    color: var(--leve);
  }
  .info{
    color: gray;
    padding: 10px;
    font-size: 14px;
  }
`;

const RecentItemsTable = (props) => {
  const modules ={
    "Dosimetria Clinica": {
      icone: <RiHospitalLine />,
      rota: "/clinica"
    },
    "Dosimetria Pré-Clinica": {
      icone: <RiHospitalLine />,
      rota: "/dosimetriapreclinica"
    },
    "Modelagem Computacional": {
      icone: <RiComputerLine />,
      rota: "/modelagem"
    },
    "Radiosinoviortese": {
      icone: <RiBookOpenLine />,
      rota: "/radiosinoviortese"
    },
    "Segmentação e Quantificação": {
      icone: <RiScissors2Line />,
      rota: "/SegmentacaoeQuantificacao"
    }
  }

  const getMostRecentItems = () => {
    const recentItems = [];

    props.exames.forEach((item) => {
      const { type, itens } = item;
      const mostRecentItem = itens.reduce((prev, current) => {
        return new Date(prev.data) > new Date(current.data) ? prev : current;
      });

      recentItems.push({ ...mostRecentItem, type: type });
    });

    return recentItems.filter((item) => item.status === "Pendente").slice(0, 5);
  };

  const recentItems = getMostRecentItems();

  return (
  
      <StyledTable>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
                <th>Document</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.values(recentItems).map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.data}</td>
                  <td>{item.doc}</td>
                  <td>
                    <IconButton>
                      <RiArrowRightUpLine />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <p className="dots">
                . . .
            </p>
            <p className="info">para ver mais, acesse algum modulo acima</p>
        </div>
      </StyledTable>
  );
};

export default RecentItemsTable;
