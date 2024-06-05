// budgetTable.js
import EditableCell from '../editableCell/editableCell';
import './budgetTable.css';

class BudgetTable {
  constructor(data) {
    this.data = data;
    this.sortConfig = { key: 'name', direction: 'asc' };

    this.table = document.createElement('table');
    // this.render();
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

    Object.keys(item.values).forEach((month) => {
      const cell = new EditableCell(item.values[month], (newValue) => this.handleCellSave(groupKey, item, month, newValue));
      row.appendChild(cell.getElement());
    });

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
    const headerRow = document.createElement('tr');
    ['Статья', 'Итог', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      .forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        if (index === 0) {
          th.addEventListener('click', () => this.handleSort('name'));
        } else if (index === 1) {
          th.addEventListener('click', () => this.handleSort('total'));
        }
        headerRow.appendChild(th);
      });
    thead.appendChild(headerRow);

    // Adding "План" row
    const planRow = document.createElement('tr');
    const planNameCell = document.createElement('td');
    planNameCell.textContent = 'План';
    planRow.appendChild(planNameCell);

    const planTotalCell = document.createElement('td');
    planTotalCell.textContent = ''; // Empty for "Итог"
    planRow.appendChild(planTotalCell);

    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      .forEach((month) => {
        const planCell = new EditableCell(0, () => {}); // Plan values, no specific handling needed
        planRow.appendChild(planCell.getElement());
      });

    this.table.appendChild(planRow);
    this.table.appendChild(thead);

    const incomeGroup = document.createElement('tr');
    const incomeGroupCell = document.createElement('td');
    incomeGroupCell.colSpan = 14;
    incomeGroupCell.innerHTML = `
      Бюджет доходов
      <button class="add-income-item">+</button>
      <button class="add-income-group">#</button>
    `;
    incomeGroup.appendChild(incomeGroupCell);
    this.table.appendChild(incomeGroup);

    // Adding event listeners after elements are added to DOM
    incomeGroupCell.querySelector('.add-income-item').addEventListener('click', () => this.handleAddItem('income', false));
    incomeGroupCell.querySelector('.add-income-group').addEventListener('click', () => this.handleAddItem('income', true));

    this.data.income.children.forEach((item) => this.renderRow(item, 'income'));

    const expensesGroup = document.createElement('tr');
    const expensesGroupCell = document.createElement('td');
    expensesGroupCell.colSpan = 14;
    expensesGroupCell.innerHTML = `
      Бюджет расходов
      <button class="add-expenses-item">+</button>
      <button class="add-expenses-group">#</button>
    `;
    expensesGroup.appendChild(expensesGroupCell);
    this.table.appendChild(expensesGroup);

    // Adding event listeners after elements are added to DOM
    expensesGroupCell.querySelector('.add-expenses-item').addEventListener('click', () => this.handleAddItem('expenses', false));
    expensesGroupCell.querySelector('.add-expenses-group').addEventListener('click', () => this.handleAddItem('expenses', true));

    this.data.expenses.children.forEach((item) => this.renderRow(item, 'expenses'));
  }

  getElement() {
    return this.table;
  }
}

export default BudgetTable;
