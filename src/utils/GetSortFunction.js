export const getSortFunction = (column, order, compareFunction) => {
    if (order === 'none') return null;
    return (a, b) => {
        const result = compareFunction(a[column], b[column]);
        return order === 'asc' ? result : -result;
    };
};
