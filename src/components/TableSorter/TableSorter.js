import React, { useState } from 'react';
import './TableSorter.css';

const TableSorter = ({ columns, onSortChange }) => {
    const [sortCriteria, setSortCriteria] = useState([]);

    const handleAddCriteria = () => {
        setSortCriteria([...sortCriteria, { column: columns[0], order: 'asc' }]);
    };

    const handleRemoveCriteria = (index) => {
        const newCriteria = [...sortCriteria];
        newCriteria.splice(index, 1);
        setSortCriteria(newCriteria);
        onSortChange(newCriteria);
    };

    const handleColumnChange = (index, newColumn) => {
        const newCriteria = [...sortCriteria];
        newCriteria[index].column = newColumn;
        setSortCriteria(newCriteria);
        onSortChange(newCriteria);
    };

    const handleOrderChange = (index, newOrder) => {
        const newCriteria = [...sortCriteria];
        newCriteria[index].order = newOrder;
        setSortCriteria(newCriteria);
        onSortChange(newCriteria);
    };

    return (
        <div className="sort-container">
            <button className="add-criteria-button" onClick={handleAddCriteria}>Добавить критерий сортировки</button>
            {sortCriteria.map((criteria, index) => (
                <div key={index} className="sort-item">
                    <select
                        value={criteria.column}
                        onChange={(e) => handleColumnChange(index, e.target.value)}
                    >
                        {columns.map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                    <select
                        value={criteria.order}
                        onChange={(e) => handleOrderChange(index, e.target.value)}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                    <button className="remove-criteria-button" onClick={() => handleRemoveCriteria(index)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default TableSorter;
