(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,n(r.key),r)}}function n(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var a=t[Symbol.toPrimitive];if(void 0!==a){var r=a.call(t,"string");if("object"!=e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:n+""}const a=function(){return e=function e(t,n){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.value=t,this.onSave=n,this.isEditing=!1,this.cell=document.createElement("td"),this.cell.addEventListener("click",(function(){return a.startEditing()})),this.render()},n=[{key:"startEditing",value:function(){this.isEditing=!0,this.render()}},{key:"save",value:function(){var e=parseFloat(this.input.value);isNaN(e)||(this.value=e,this.onSave(e)),this.isEditing=!1,this.render()}},{key:"render",value:function(){var e=this;this.cell.innerHTML="",this.isEditing?(this.input=document.createElement("input"),this.input.type="number",this.input.value=this.value,this.input.addEventListener("blur",(function(){return e.save()})),this.input.addEventListener("keypress",(function(t){"Enter"===t.key&&e.save()})),this.cell.appendChild(this.input),this.input.focus()):this.cell.textContent=this.value}},{key:"getElement",value:function(){return this.cell}}],n&&t(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n}();function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=Array(t);n<t;n++)a[n]=e[n];return a}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,l(a.key),a)}}function l(e){var t=function(e,t){if("object"!=r(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=r(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==r(t)?t:t+""}const u=function(){return e=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data={income:{name:"Бюджет доходов",type:"group",children:[],values:{January:0,February:0,March:0,April:0,May:0,June:0,July:0,August:0,September:0,October:0,November:0,December:0},total:0},expenses:{name:"Бюджет расходов",type:"group",children:[],values:{January:-0,February:-0,March:-0,April:-0,May:-0,June:-0,July:-0,August:-0,September:-0,October:-0,November:-0,December:-0},total:0}},this.sortConfig={key:"name",direction:"asc"},this.table=document.createElement("table"),this.table.className="table"},t=[{key:"handleCellSave",value:function(e,t,n,a){t.values[n]=a,this.calculateTotals(),this.render()}},{key:"calculateTotals",value:function(){var e=function e(t){var n=0;return t.children.forEach((function(t){"group"===t.type?t.total=e(t):t.total=Object.values(t.values).reduce((function(e,t){return e+t}),0),n+=t.total})),n};this.data.income.total=e(this.data.income),this.data.expenses.total=e(this.data.expenses)}},{key:"toggleCollapse",value:function(e,t){t.isCollapsed=!t.isCollapsed,this.render()}},{key:"handleAddItem",value:function(e,t){var n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=prompt("Введите название");r&&(n=a&&"Бюджет расходов"===a.name?{name:r,type:t?"group":"item",values:{January:-0,February:-0,March:-0,April:-0,May:-0,June:-0,July:-0,August:-0,September:-0,October:-0,November:-0,December:-0},children:t?[]:null,total:0}:{name:r,type:t?"group":"item",values:{January:0,February:0,March:0,April:0,May:0,June:0,July:0,August:0,September:0,October:0,November:0,December:0},children:t?[]:null,total:0},a?a.children.push(n):this.data[e].children.push(n),this.calculateTotals(),this.render())}},{key:"sortData",value:function(e,t,n){return e.sort((function(e,a){return"total"===t?"asc"===n?e.total-a.total:a.total-e.total:"asc"===n?e.name.localeCompare(a.name):a.name.localeCompare(e.name)}))}},{key:"handleSort",value:function(e){var t="asc";this.sortConfig.key===e&&"asc"===this.sortConfig.direction&&(t="desc"),this.sortConfig={key:e,direction:t},this.data.income.children=this.sortData(this.data.income.children,e,t),this.data.expenses.children=this.sortData(this.data.expenses.children,e,t),this.render()}},{key:"aggregateMonthlyValues",value:function(e){var t=this,n={};return["January","February","March","April","May","June","July","August","September","October","November","December"].forEach((function(e){n[e]=0})),e.children.forEach((function(e){if("group"===e.type){var a=t.aggregateMonthlyValues(e);Object.keys(a).forEach((function(e){n[e]+=a[e]})),e.values=a}else e.values&&Object.keys(e.values).forEach((function(t){n[t]+=e.values[t]}))})),n}},{key:"calculateSaldo",value:function(){var e=this,t={name:"Сальдо",values:{},total:this.data.income.total-this.data.expenses.total};return["January","February","March","April","May","June","July","August","September","October","November","December"].forEach((function(n){var a=e.data.income.values[n]||0,r=e.data.expenses.values[n]||0;t.values[n]=a-r})),t}},{key:"renderRow",value:function(e,t){var n=this,r=document.createElement("tr"),o=document.createElement("td");"Бюджет расходов"===e.name?r.classList.add("expenses-group"):"Бюджет доходов"===e.name&&r.classList.add("income-group");var i=document.createElement("span");i.textContent=e.name,i.addEventListener("click",(function(){var t=document.createElement("input");t.type="text",t.value=e.name,t.addEventListener("blur",(function(){e.name=t.value,n.render()})),t.addEventListener("keypress",(function(a){"Enter"===a.key&&(e.name=t.value,n.render())})),o.innerHTML="",o.appendChild(t),t.focus()})),o.appendChild(i),r.appendChild(o);var l="Бюджет расходов"===e.name||"Бюджет доходов"===e.name;if("group"===e.type&&!l){var u=document.createElement("button");u.textContent=e.isCollapsed?"▼":"▲",u.addEventListener("click",(function(){return n.toggleCollapse(t,e)})),o.appendChild(u)}if("group"===e.type||l){var c=document.createElement("button");c.textContent="+",c.addEventListener("click",(function(){return n.handleAddItem(t,!1,e)})),o.appendChild(c);var s=document.createElement("button");s.textContent="#",s.addEventListener("click",(function(){return n.handleAddItem(t,!0,e)})),o.appendChild(s)}var d=document.createElement("td");l&&"number"==typeof e.total?"Бюджет расходов"===e.name?d.textContent="-".concat(Math.abs(e.total).toFixed(2)," руб"):d.textContent="".concat(e.total.toFixed(2)," руб"):"number"==typeof e.total&&(d.textContent="".concat(Math.abs(e.total).toFixed(2)," руб")),r.appendChild(d),e.values&&Object.keys(e.values).forEach((function(o){var i=document.createElement("td");if(i.classList.add("editable-cell"),"item"===e.type){var u=new a(e.values[o],(function(a){return n.handleCellSave(t,e,o,a)}));i.appendChild(u.getElement())}else{var c=parseFloat(e.values[o])||0;l&&"Бюджет расходов"===e.name?i.textContent="-".concat(Math.abs(c).toFixed(2)," руб"):i.textContent="".concat(c.toFixed(2)," руб")}r.appendChild(i)})),this.table.appendChild(r),!e.children||e.isCollapsed&&!l||e.children.forEach((function(a){return n.renderRow(a,t,e)}))}},{key:"render",value:function(){var e=this;console.log("Rendering table"),this.table.innerHTML="";var t=document.createElement("thead"),n=document.createElement("tr");n.classList.add("header-row1");var a=["","Итог","Январь 2024","Февраль 2024","Март 2024","Апрель 2024","Май 2024","Июнь 2024","Июль 2024","Август 2024","Сентябрь 2024","Октябрь 2024","Ноябрь 2024","Декабрь 2024"];a.forEach((function(e,t){var a=document.createElement("th");a.textContent=e,n.appendChild(a)})),t.appendChild(n);var r=document.createElement("tr");r.classList.add("accent-color"),["БЮДЖЕТ","План"].concat(function(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(a.slice(2).map((function(){return"План"})))).forEach((function(t,n){var a=document.createElement("th");0===n?(a.innerHTML="".concat(t," <button>⇅</button>"),a.classList.add("budget-header"),a.addEventListener("click",(function(){return e.handleSort("name")}))):(a.textContent=t,1===n&&a.addEventListener("click",(function(){return e.handleSort("total")}))),r.appendChild(a)})),t.appendChild(r),this.table.appendChild(t);var i=document.createElement("tbody");[this.data.income,this.data.expenses].forEach((function(t){t.values=e.aggregateMonthlyValues(t),e.renderRow(t,t.type)}));var l=document.createElement("tr"),u=document.createElement("td");u.textContent="Сальдо",l.appendChild(u);for(var c=2;c<a.length;c++){var s=a[c],d=(this.data.income.values[s]||0)-(this.data.expenses.values[s]||0),p=document.createElement("td");p.textContent="".concat(d.toFixed(2)," руб"),l.appendChild(p)}i.appendChild(l),this.table.appendChild(i)}},{key:"getElement",value:function(){return this.table}}],t&&i(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}(),c={income:{name:"Бюджет доходов",type:"group",children:[],totals:{}},expenses:{name:"Бюджет расходов",type:"group",children:[],totals:{}}};document.addEventListener("DOMContentLoaded",(function(){console.log("DOM fully loaded and parsed");var e=document.getElementById("app");if(e){var t=new u(c);t.render(),e.appendChild(t.getElement())}else console.error('No element with id "app" found.')}))})();