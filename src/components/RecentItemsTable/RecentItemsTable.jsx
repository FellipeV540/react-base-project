import React from "react";
import styled from "styled-components";
import {
  RiDownload2Line,
  RiFileUploadLine,
  RiArchive2Line,
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
  }
  th,
  td {
    padding: 10px !important;
    outline: none !important;
  }

  tr {
    border-radius: 0px !important;

    &:hover {
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

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 800;
    color: var(--leve);
  }
<<<<<<< HEAD
  .info {
    color: gray;
=======
  .info{
    color: black;
>>>>>>> e0b1d2819ac6cab8620cff4eee6805d6b58fae6f
    padding: 10px;
    font-size: 14px;
  }
`;

const RecentItemsTable = (props) => {
  return (
    <StyledTable>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Nome da Clínica</th>
              <th>ID</th>
              <th>Data</th>
              <th>Imagem Paciente</th>
              <th>Imagem Calibração</th>
              <th>Status</th>
              <th>Enviar Relatório</th>
              <th>Acessar</th>
              <th>Arquivar</th>
            </tr>
          </thead>
          <tbody>
            {props.exames.map((item, index) => (
              item.itens.map((it, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td>{item.type}</td>
                  <td>{it.nomeClinica}</td>
                  <td>{it.id}</td>
                  <td>{it.data}</td>
                  <td>
                    <IconButton>
                      <RiDownload2Line />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton>
                      <RiDownload2Line />
                    </IconButton>
                  </td>
                  <td>{it.status}</td>
                  <td>
                    <IconButton>
                      <RiFileUploadLine />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton>
                      <RiArrowRightUpLine />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton>
                      <RiArchive2Line />
                    </IconButton>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
        <p className="dots">. . .</p>
        <p className="info">para ver mais, acesse algum modulo acima</p>
      </div>
    </StyledTable>
  );
};

export default RecentItemsTable;
