import React, { useState } from 'react';
import Base from "./Base";

const SegmentacaoeQuantificacao =() => {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const dados = [
        {
            clinica: 'Clínica Giuseppe',
            status: 'Pendente',
            itens: [
                'Imagem do Cliente :20240-04-19-19:39:54.jpeg',
                'Imagem para Calibrar: 20240-04-19-19:39:54.jpeg',
            ],
            botoes: [
                'Enviar'
            ],
            processo: '0013',
        },
        {
            clinica: 'Clínica José',
            status: 'Concluído',
            itens: [
                'Imagem do Cliente :20240-04-19-19:39:54.jpeg',
                'Imagem para Calibrar: 20240-04-19-19:39:54.jpeg',
            ],
            botoes: [
                'Enviar',
                'Arquivar'
            ],
            processo: '0014',
        },
        {
            clinica: 'Clínica Maurilio',
            status: 'Concluído',
            itens: [
                'Imagem do Cliente :20240-04-19-19:39:54.jpeg',
                'Imagem para Calibrar: 20240-04-19-19:39:54.jpeg',
            ],
            botoes: [
                'Enviar',
                'Arquivar'
            ],
            processo: '0015',
        },
    ];

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDados = dados.filter((item) => {
        const matchesFilter = filter === 'Todos' || item.status === filter;
        const matchesSearchTerm = item.clinica.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.processo.includes(searchTerm) ||
            item.itens.some(it => it.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearchTerm;
    });

    return (
        <Base>
            <h1>Segmentação e Quantificação</h1>
            <div className="dosimetria-sub">
                <h3>Clientes</h3>
                <h3>{filteredDados.length} {filter}</h3>
            </div>
            <div className="search-bar">
            <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="filter-buttons">
                <button onClick={() => handleFilterChange('Todos')}>Todos</button>
                <button onClick={() => handleFilterChange('Pendente')}>Pendente</button>
                <button onClick={() => handleFilterChange('Concluído')}>Concluído</button>
            </div>
            {filteredDados.map((tipo) => {
                return (
                    <div className="dosimetria-area">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <span>
                                            {tipo.clinica}
                                        </span>
                                        <span className="processo">
                                            Processo: {tipo.processo}
                                        </span>
                                        <span className={`item-status ${tipo.status === 'Pendente' ? 'status-pendente' : 'status-concluido'}`}>
                                            Status: {tipo.status}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tipo.itens.map((item) => {
                                    return (
                                        <tr>
                                            <td className="item-img"><span>{item}</span><a href="">Download</a> </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="btn-area">
                            {tipo.botoes.map((item) => {
                                return (
                                    <button>{item}</button>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </Base>
    );
}

export default SegmentacaoeQuantificacao;
