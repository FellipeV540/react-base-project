import React, { useState } from 'react';

const DropdownStatus = ({ currentStatus, onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <select value={status} onChange={handleChange}>
      <option value="Pendente">Pendente</option>
      <option value="Em Andamento">Em Andamento</option>
      <option value="Concluído">Concluído</option>
    </select>
  );
};

export default DropdownStatus;