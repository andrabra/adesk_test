//budgetService.js
const budgetData = {
  income: {
    name: "Бюджет доходов",
    type: "group",
    children: [],
    totals: {
      // Месячные итоги
    },
  },
  expenses: {
    name: "Бюджет расходов",
    type: "group",
    children: [],
    totals: {
      // Месячные итоги
    },
  },
};

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export { months };
export default budgetData; // Экспорт основного объекта по умолчанию
