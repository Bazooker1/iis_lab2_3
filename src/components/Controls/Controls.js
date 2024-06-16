import React from 'react';

const Controls = ({
                      selectedCountry,
                      setSelectedCountry,
                      selectedWeatherStation,
                      setSelectedWeatherStation,
                      unitTemperatureOrder,
                      setUnitTemperatureOrder,
                      totalRHOrder,
                      setTotalRHOrder,
                      toggleTable,
                      showTable,
                      countries,
                      weatherStations,
                      setPaginationEnabled,
                      paginationEnabled
                  }) => {

    const handleCheckboxChange = () => {
        setPaginationEnabled(!paginationEnabled);
    };

    return (
        <div className="controls">
            <label>
                Выбор страны
                <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                    <option value="Все страны">Все страны</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </label>
            <br /><br />
            <label>
                Выбор метеорологической станции
                <select value={selectedWeatherStation} onChange={e => setSelectedWeatherStation(e.target.value)}>
                    <option value="Все метеорологические станции">Все метеорологические станции</option>
                    {weatherStations.map(station => (
                        <option key={station} value={station}>{station}</option>
                    ))}
                </select>
            </label>
            <br /><br />
            <label>
                Сортировка по температуре
                <select value={unitTemperatureOrder} onChange={e => setUnitTemperatureOrder(e.target.value)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <br /><br />
            <label>
                Сортировка по относительной влажности
                <select value={totalRHOrder} onChange={e => setTotalRHOrder(e.target.value)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <br /><br />
            <label>
                Пагинация
                <input
                    type="checkbox"
                    checked={paginationEnabled}
                    onChange={handleCheckboxChange}
                />
            </label>
            <br /><br />
            <input type="button" value={showTable ? "Скрыть таблицу" : "Показать таблицу"} onClick={toggleTable} />
        </div>
    );
};

export default Controls;
