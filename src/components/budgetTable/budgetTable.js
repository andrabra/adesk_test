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
    if (item.type === 'group') {
      const button = document.createElement('button');
      button.textContent = item.isCollapsed ? '▼' : '▲';
      button.addEventListener('click', () => this.toggleCollapse(groupKey, item));
      cellName.appendChild(button);
    }
    cellName.appendChild(document.createTextNode(item.name));
    row.appendChild(cellName);

    const cellTotal = document.createElement('td');
    cellTotal.textContent = item.total;
    row.appendChild(cellTotal);

    if (item.values) {
      Object.keys(item.values).forEach((month) => {
        const cell = new EditableCell(item.values[month], (newValue) => this.handleCellSave(groupKey, item, month, newValue));
        row.appendChild(cell.getElement());
      });
    }

    this.table.appendChild(row);

    if (item.children && !item.isCollapsed) {
      item.children.forEach((child) => this.renderRow(child, groupKey, item));
    }

    // Adding buttons for adding new items/groups to the current group
    if (item.type === 'group') {
      const buttonRow = document.createElement('tr');
      const buttonCell = document.createElement('td');
      buttonCell.colSpan = 14;
      buttonCell.innerHTML = `
        <button class="add-item">+</button>
        <button class="add-group">#</button>
      `;
      buttonRow.appendChild(buttonCell);
      this.table.appendChild(buttonRow);

      buttonCell.querySelector('.add-item').addEventListener('click', () => this.handleAddItem(groupKey, false, item));
      buttonCell.querySelector('.add-group').addEventListener('click', () => this.handleAddItem(groupKey, true, item));
    }
  }

  render() {
    console.log('Rendering table');
    this.table.innerHTML = '';

    const thead = document.createElement('thead');

    // Первая строка заголовка
    const headerRow1 = document.createElement('tr');
    const headerRow1Titles = ['БЮДЖЕТ', 'Итог', 'Январь 2024', 'Февраль 2024', 'Март 2024', 'Апрель 2024', 'Май 2024', 'Июнь 2024', 'Июль 2024', 'Август 2024', 'Сентябрь 2024', 'Октябрь 2024', 'Ноябрь 2024', 'Декабрь 2024'];

    headerRow1Titles.forEach((header, index) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow1.appendChild(th);
    });
    thead.appendChild(headerRow1);

    // Вторая строка заголовка
    const headerRow2 = document.createElement('tr');
    const headerRow2Titles = ['', 'План', ...headerRow1Titles.slice(2).map(() => 'План')];

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
      this.renderRow(group, group.type);
    });

    this.table.appendChild(tbody);
  }

  getElement() {
    return this.table;
  }
}

export default BudgetTable;
