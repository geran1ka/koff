export const createTableRow = (array) => {
  const list = array.map(item => {
    const tr = document.createElement('tr');
    tr.classList.add('table__row');
  
    const field = createTableCell('table__field', item.valueTdOne);
    const value = createTableCell('table__value', item.valueTdTwo);
    tr.append(field, value);
    return tr
  })

  return list;
}

const createTableCell = (className, value) => {
  const cell = document.createElement('td');
  cell.classList.add(className);
  cell.textContent = value;
  return cell;
};