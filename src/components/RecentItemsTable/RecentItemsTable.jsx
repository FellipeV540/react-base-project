import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
  RiDownload2Line,
  RiFileUploadLine,
  RiArrowRightUpLine,
  RiArchive2Line,
  RiInboxUnarchiveFill,
} from "react-icons/ri";
import { IconButton } from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { handleDownloadFile } from "../utils";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black;

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
    background-color: #f2f2f2;
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 800;
    color: var(--leve);
  }

  .info {
    color: gray;
    padding: 10px;
    font-size: 14px;
  }
`;

const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    background-color: var(--leve);
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px lightblue;
    }
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const ProcessCountsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AlertMessage = styled.div`
  background-color: #f44336;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const FilterButtons = ({ onFilterChange }) => (
  <FilterButtonsWrapper>
    <button onClick={() => onFilterChange("Todos")}>Todos</button>
    <button onClick={() => onFilterChange("Pendente")}>Pendente</button>
    <button onClick={() => onFilterChange("Concluído")}>Concluído</button>
    <button onClick={() => onFilterChange("Em Andamento")}>Em Andamento</button>
    <button onClick={() => onFilterChange("Arquivado")}>Arquivado</button>
  </FilterButtonsWrapper>
);

const RecentItemsTable = ({ exames }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [localExames, setLocalExames] = useState(exames);
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const countPendingProcesses = () => {
    let count = 0;
    localExames.forEach((item) => {
      count += item.itens.filter((it) => it.status === "Pendente").length;
    });
    return count;
  };

  const countCompletedProcesses = () => {
    let count = 0;
    localExames.forEach((item) => {
      count += item.itens.filter((it) => it.status === "Concluído").length;
    });
    return count;
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleNavigateToProcess = (id) => {
    navigate(`/processo/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleArchiveProcess = (examId, itemId) => {
    const updatedExames = localExames.map((exam) => {
      if (exam.id === examId) {
        return {
          ...exam,
          itens: exam.itens.map((item) => {
            if (item.id === itemId) {
              if (item.status === "Concluído") {
                return { ...item, status: "Arquivado", previousStatus: item.status };
              } else {
                setShowAlert(true);
                setAlertMessage("Só é possível arquivar um processo concluído.");
                return item;
              }
            }
            return item;
          })
        };
      }
      return exam;
    });

    setLocalExames(updatedExames);
  };

  const handleUnarchiveProcess = (examId, itemId) => {
    setLocalExames((prevExames) =>
      prevExames.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              itens: exam.itens.map((item) =>
                item.id === itemId
                  ? { ...item, status: item.previousStatus || "Pendente" }
                  : item
              )
            }
          : exam
      )
    );
  };

  const filteredExames = localExames
    .map((item) => ({
      ...item,
      itens: item.itens.filter(
        (it) =>
          ((filter === "Todos" && it.status !== "Arquivado") ||
            it.status === filter) &&
          (it.nomeClinica.toLowerCase().includes(searchTerm.toLowerCase()) ||
            it.id.toString().includes(searchTerm) ||
            it.data.includes(searchTerm))
      ),
    }))
    .filter((item) => item.itens.length > 0);

  const handleDownloadPacienteImage = (imgPaciente) => {
    handleDownloadFile(imgPaciente);
  };

  const handleDownloadCalibracaoImage = (imgCalibracao) => {
    handleDownloadFile(imgCalibracao);
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  useEffect(() => {
    setLocalExames(exames);
  }, [exames]);

  return (
    <>
      <SearchBarWrapper>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchBarWrapper>
      <FilterButtons onFilterChange={setFilter} />
      <ProcessCountsWrapper>
        <p>Processos Pendentes: {countPendingProcesses()}</p>
        <p>Processos Concluídos: {countCompletedProcesses()}</p>
      </ProcessCountsWrapper>
      {showAlert && (
        <AlertMessage show={showAlert}>
          {alertMessage}
        </AlertMessage>
      )}
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
                {filter === "Arquivado" ? <th>Desarquivar</th> : <th>Arquivar</th>}
              </tr>
            </thead>
            <tbody>
              {filteredExames.map((item, index) =>
                item.itens.map((it, idx) => (
                  <tr key={`${index}-${idx}`}>
                    <td>{item.type}</td>
                    <td>{it.nomeClinica}</td>
                    <td>{it.id}</td>
                    <td>{it.data}</td>
                    <td>
                      <IconButton onClick={() => handleDownloadPacienteImage(it.imgPaciente)}>
                        <RiDownload2Line />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton onClick={() => handleDownloadCalibracaoImage(it.imgCalibracao)}>
                        <RiDownload2Line />
                      </IconButton>
                    </td>
                    <td>{it.status}</td>
                    <td>
                      <IconButton onClick={handleFileUploadClick}>
                        <RiFileUploadLine />
                      </IconButton>
                      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
                    </td>
                    <td>
                      <IconButton onClick={() => handleNavigateToProcess(it.id)}>
                        <RiArrowRightUpLine />
                      </IconButton>
                    </td>
                    <td>
                      {it.status === "Arquivado" ? (
                        <IconButton onClick={() => handleUnarchiveProcess(item.id, it.id)}>
                          <RiInboxUnarchiveFill />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleArchiveProcess(item.id, it.id)}>
                          <RiArchive2Line />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="dots">. . .</p>
          <p className="info">para ver mais, acesse algum módulo acima</p>
        </div>
      </StyledTable>
    </>
  );
};

export default RecentItemsTable;
