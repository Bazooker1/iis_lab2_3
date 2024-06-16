import React, { useState, useEffect } from 'react';
import './TableFilter.css';

const TableFilter = ({ columns, data, onFilterChange }) => {
    const [filters, setFilters] = useState([]);
    const [uniqueValues, setUniqueValues] = useState({});

    const isStringColumn = (column) => {
        if (data.length === 0) return false;
        const firstRowValue = data[0][column];
        return typeof firstRowValue === 'string';
    };

    useEffect(() => {
        const values = {};
        columns.forEach((col) => {
            if (isStringColumn(col)) {
                values[col] = [...new Set(data.map(item => item[col]))];
            }
        });
        setUniqueValues(values);
    }, [columns, data]);

    const handleAddFilter = () => {
        const stringColumns = columns.filter(col => isStringColumn(col));
        if (stringColumns.length > 0) {
            setFilters([...filters, { column: stringColumns[0], value: '' }]);
        }
    };

    const handleRemoveFilter = (index) => {
        const newFilters = [...filters];
        newFilters.splice(index, 1);
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleColumnChange = (index, newColumn) => {
        const newFilters = [...filters];
        newFilters[index].column = newColumn;
        newFilters[index].value = '';
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleValueChange = (index, newValue) => {
        const newFilters = [...filters];
        newFilters[index].value = newValue;
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="filter-container">
            <button className="add-filter-button" onClick={handleAddFilter}>Добавить фильтр</button>
            {filters.map((filter, index) => (
                <div key={index} className="filter-item">
                    <select
                        value={filter.column}
                        onChange={(e) => handleColumnChange(index, e.target.value)}
                    >
                        {columns.filter(col => isStringColumn(col)).map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filter.value}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                    >
                        <option value="">Выберите значение</option>
                        {uniqueValues[filter.column] && uniqueValues[filter.column].map((val) => (
                            <option key={val} value={val}>
                                {val}
                            </option>
                        ))}
                    </select>
                    <button className="remove-filter-button" onClick={() => handleRemoveFilter(index)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default TableFilter;
