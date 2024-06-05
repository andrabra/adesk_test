// index.js
import BudgetTable from './components/budgetTable/budgetTable';
import budgetData from './services/budgetService';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  const app = document.getElementById('app');
  if (!app) {
    console.error('No element with id "app" found.');
    return;
  }
  const budgetTable = new BudgetTable(budgetData);
  budgetTable.render();
  app.appendChild(budgetTable.getElement());
});
