import EditableCell from '../editableCell/editableCell';
import './budgetTable.css';

class BudgetTable {
  constructor(data) {
    this.data = data;
    this.sortConfig = { key: 'name', direction: 'asc' };

    this.table = document.createElement('table');
  }

  handleCellSave(group, item, month, newValue) {
    item.values[month] = newValue;
    this.calculateTotals();
    this.render();
  }

  calculateTotals() {
    const calculateGroupTotal = (group) => {
      let groupTotal = 0;
      group.children.forEach((item) => {
        if (item.type === 'group') {
          item.total = calculateGroupTotal(item);
        } else {
          item.total = Object.values(item.values).reduce((sum, value) => sum + value, 0);
        }
        groupTotal += item.total;
      });
      return groupTotal;
    };
  
    this.data.income.total = calculateGroupTotal(this.data.income);
    this.data.expenses.total = calculateGroupTotal(this.data.expenses);
  }

  toggleCollapse(groupKey, item) {
    item.isCollapsed = !item.isCollapsed;
    this.render();
  }

  handleAddItem(groupKey, isGroup, parentGroup = null) {
    const name = prompt('Введите название');
    if (name) {
      const newItem = {
        name,
        type: isGroup ? 'group' : 'item',
        values: {
          January: 0, February: 0, March: 0, April: 0, May: 0, June: 0,
          July: 0, August: 0, September: 0, October: 0, November: 0, December: 0
        },
        children: isGroup ? [] : null,
        total: 0
      };
      if (parentGroup) {
        parentGroup.children.push(newItem);
      } else {
        this.data[groupKey].children.push(newItem);
      }
      this.calculateTotals();
      this.render();
    }
  }

  sortData(data, key, direction) {
    return data.sort((a, b) => {
      if (key === 'total') {
        return direction === 'asc' ? a.total - b.total : b.total - a.total;
      } else {
        return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
    });
  }

  handleSort(key) {
    let direction = 'asc';
    if (this.sortConfig.key === key && this.sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    this.sortConfig = { key, direction };
    this.data.income.children = this.sortData(this.data.income.children, key, direction);
    this.data.expenses.children = this.sortData(this.data.expenses.children, key, direction);
    this.render();
  }

  renderRow(item, groupKey, parentGroup = null) {
    const row = document.createElement('tr');
    const cellName = document.createElement('td');

    const isRootGroup = (item.name === 'Бюджет расходов' || item.name === 'Бюджет доходов');

    if (item.type === 'group' && !isRootGroup) {
      const button = document.createElement('button');
      button.textContent = item.isCollapsed ? '▼' : '▲';
      button.addEventListener('click', () => this.toggleCollapse(groupKey, item));
      cellName.appendChild(button);
    }

    if (item.type === 'group' || isRootGroup) {
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.addEventListener('click', () => this.handleAddItem(groupKey, false, item));
      cellName.appendChild(addButton);

      const addGroupButton = document.createElement('button');
      addGroupButton.textContent = '#';
      addGroupButton.addEventListener('click', () => this.handleAddItem(groupKey, true, item));
      cellName.appendChild(addGroupButton);
    }

    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;
    nameSpan.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.name;
      input.addEventListener('blur', () => {
        item.name = input.value;
        this.render();
      });
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          item.name = input.value;
          this.render();
        }
      });
      cellName.innerHTML = '';
      cellName.appendChild(input);
      input.focus();
    });
    cellName.appendChild(nameSpan);
    row.appendChild(cellName);

    const cellTotal = document.createElement('td');
    cellTotal.textContent = `${(item.total || 0).toFixed(2)} руб`;
    row.appendChild(cellTotal);

    if (item.values) {
      Object.keys(item.values).forEach((month) => {
        const cell = document.createElement('td');
        if (item.type === 'item') {  // Редактируемые ячейки только для элементов 'item'
          const editableCell = new EditableCell(item.values[month], (newValue) => this.handleCellSave(groupKey, item, month, newValue));
          cell.appendChild(editableCell.getElement());
        } else {
          cell.textContent = `${(item.values[month] || 0).toFixed(2)} руб`;  // Отображение сумм для групп
        }
        row.appendChild(cell);
      });
    }

    this.table.appendChild(row);

    if (item.children && (!item.isCollapsed || isRootGroup)) {
      item.children.forEach((child) => this.renderRow(child, groupKey, item));
    }
  }
  aggregateMonthlyValues(group) {
    const monthlySums = {};

    // Инициализация всех месяцев с нулевыми значениями
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].forEach(month => {
        monthlySums[month] = 0;
    });

    const calculateMonthlySums = (items) => {
        items.forEach(item => {
            if (item.type === 'group') {
                const childSums = this.aggregateMonthlyValues(item);  // Рекурсивно обновляем и получаем суммы для подгрупп
                Object.keys(childSums).forEach(month => {
                    monthlySums[month] += childSums[month];  // Накопление сумм от дочерних элементов
                });
                item.values = childSums;  // Обновляем значения для текущей подгруппы
            } else if (item.values) {
                Object.keys(item.values).forEach(month => {
                    monthlySums[month] += item.values[month];  // Суммирование значений для конечных элементов
                });
            }
        });
    };

    calculateMonthlySums(group.children);
    return monthlySums;
}


//   aggregateMonthlyValues(group) {
//     const monthlySums = {};

//     // Сначала проверяем, есть ли дети и корректные значения у первого ребенка
//     if (group.children && group.children.length > 0 && group.children[0].values) {
//         Object.keys(group.children[0].values).forEach(month => {
//             monthlySums[month] = 0;
//         });
//     } else {
//         // Если нет, инициализируем пустыми значениями для всех месяцев
//         ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].forEach(month => {
//             monthlySums[month] = 0;
//         });
//     }

//     const calculateMonthlySums = (items) => {
//         items.forEach(item => {
//             if (item.type === 'group') {
//                 calculateMonthlySums(item.children);
//             } else if (item.values) {
//                 Object.keys(item.values).forEach(month => {
//                     monthlySums[month] += item.values[month];
//                 });
//             }
//         });
//     };

//     if (group.children) {
//         calculateMonthlySums(group.children);
//     }
//     return monthlySums;
// }




  render() {
    console.log('Rendering table');
    this.table.innerHTML = '';

    const thead = document.createElement('thead');

    // Первая строка заголовка
    const headerRow1 = document.createElement('tr');
    const headerRow1Titles = ['', 'Итог', 'Январь 2024', 'Февраль 2024', 'Март 2024', 'Апрель 2024', 'Май 2024', 'Июнь 2024', 'Июль 2024', 'Август 2024', 'Сентябрь 2024', 'Октябрь 2024', 'Ноябрь 2024', 'Декабрь 2024'];

    headerRow1Titles.forEach((header, index) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow1.appendChild(th);
    });
    thead.appendChild(headerRow1);

    // Вторая строка заголовка
    const headerRow2 = document.createElement('tr');
    const headerRow2Titles = ['БЮДЖЕТ', 'План', ...headerRow1Titles.slice(2).map(() => 'План')];

    headerRow2Titles.forEach((header, index) => {
      const th = document.createElement('th');
      if (index === 0) {
        th.innerHTML = `${header} <button>⇅</button>`; // Кнопка сортировки
        th.addEventListener('click', () => this.handleSort('name'));
      } else {
        th.textContent = header;
        if (index === 1) {
          th.addEventListener('click', () => this.handleSort('total'));
        }
      }
      headerRow2.appendChild(th);
    });
    thead.appendChild(headerRow2);

    this.table.appendChild(thead);

    const tbody = document.createElement('tbody');
    [this.data.income, this.data.expenses].forEach((group) => {
      group.values = this.aggregateMonthlyValues(group);
      this.renderRow(group, group.type);
    });

    this.table.appendChild(tbody);
  }

  getElement() {
    return this.table;
  }
}

export default BudgetTable;