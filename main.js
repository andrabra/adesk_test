(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,n(a.key),a)}}function n(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var a=r.call(t,"string");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:n+""}const r=function(){return e=function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.value=t,this.onSave=n,this.isEditing=!1,this.cell=document.createElement("td"),this.cell.addEventListener("click",(function(){return r.startEditing()})),this.render()},n=[{key:"startEditing",value:function(){this.isEditing=!0,this.render()}},{key:"save",value:function(){var e=parseFloat(this.input.value);isNaN(e)||(this.value=e,this.onSave(e)),this.isEditing=!1,this.render()}},{key:"render",value:function(){var e=this;this.cell.innerHTML="",this.isEditing?(this.input=document.createElement("input"),this.input.type="number",this.input.value=this.value,this.input.addEventListener("blur",(function(){return e.save()})),this.input.addEventListener("keypress",(function(t){"Enter"===t.key&&e.save()})),this.cell.appendChild(this.input),this.input.focus()):this.cell.textContent=this.value}},{key:"getElement",value:function(){return this.cell}}],n&&t(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}function l(e){var t=function(e,t){if("object"!=a(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==a(t)?t:t+""}const u=function(){return e=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data={income:{name:"Бюджет доходов",type:"group",children:[],values:{January:0,February:0,March:0,April:0,May:0,June:0,July:0,August:0,September:0,October:0,November:0,December:0},total:0},expenses:{name:"Бюджет расходов",type:"group",children:[],values:{January:-0,February:-0,March:-0,April:-0,May:-0,June:-0,July:-0,August:-0,September:-0,October:-0,November:-0,December:-0},total:0}},this.sortConfig={key:"name",direction:"asc"},this.table=document.createElement("table"),this.table.className="table"},t=[{key:"handleCellSave",value:function(e,t,n,r){t.values[n]=r,this.calculateTotals(),this.render()}},{key:"calculateTotals",value:function(){var e=function e(t){var n=0;return t.children.forEach((function(t){"group"===t.type?t.total=e(t):t.total=Object.values(t.values).reduce((function(e,t){return e+t}),0),n+=t.total})),n};this.data.income.total=e(this.data.income),this.data.expenses.total=e(this.data.expenses)}},{key:"toggleCollapse",value:function(e,t){t.isCollapsed=!t.isCollapsed,this.render()}},{key:"handleAddItem",value:function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=prompt("Введите название");a&&(n=r&&"Бюджет расходов"===r.name?{name:a,type:t?"group":"item",values:{January:-0,February:-0,March:-0,April:-0,May:-0,June:-0,July:-0,August:-0,September:-0,October:-0,November:-0,December:-0},children:t?[]:null,total:0}:{name:a,type:t?"group":"item",values:{January:0,February:0,March:0,April:0,May:0,June:0,July:0,August:0,September:0,October:0,November:0,December:0},children:t?[]:null,total:0},r?r.children.push(n):this.data[e].children.push(n),this.calculateTotals(),this.render())}},{key:"sortData",value:function(e,t,n){return e.sort((function(e,r){return"total"===t?"asc"===n?e.total-r.total:r.total-e.total:"asc"===n?e.name.localeCompare(r.name):r.name.localeCompare(e.name)}))}},{key:"handleSort",value:function(e){var t="asc";this.sortConfig.key===e&&"asc"===this.sortConfig.direction&&(t="desc"),this.sortConfig={key:e,direction:t},this.data.income.children=this.sortData(this.data.income.children,e,t),this.data.expenses.children=this.sortData(this.data.expenses.children,e,t),this.render()}},{key:"aggregateMonthlyValues",value:function(e){var t=this,n={};return["January","February","March","April","May","June","July","August","September","October","November","December"].forEach((function(e){n[e]=0})),e.children.forEach((function(e){if("group"===e.type){var r=t.aggregateMonthlyValues(e);Object.keys(r).forEach((function(e){n[e]+=r[e]})),e.values=r}else e.values&&Object.keys(e.values).forEach((function(t){n[t]+=e.values[t]}))})),n}},{key:"renderRow",value:function(e,t){var n=this,a=document.createElement("tr"),o=document.createElement("td");"Бюджет расходов"===e.name?a.classList.add("expenses-group"):"Бюджет доходов"===e.name&&a.classList.add("income-group");var i="Бюджет расходов"===e.name||"Бюджет доходов"===e.name;if("group"===e.type&&!i){var l=document.createElement("button");l.textContent=e.isCollapsed?"▼":"▲",l.addEventListener("click",(function(){return n.toggleCollapse(t,e)})),o.appendChild(l)}if("group"===e.type||i){var u=document.createElement("button");u.textContent="+",u.addEventListener("click",(function(){return n.handleAddItem(t,!1,e)})),o.appendChild(u);var c=document.createElement("button");c.textContent="#",c.addEventListener("click",(function(){return n.handleAddItem(t,!0,e)})),o.appendChild(c)}var s=document.createElement("span");s.textContent=e.name,s.addEventListener("click",(function(){var t=document.createElement("input");t.type="text",t.value=e.name,t.addEventListener("blur",(function(){e.name=t.value,n.render()})),t.addEventListener("keypress",(function(r){"Enter"===r.key&&(e.name=t.value,n.render())})),o.innerHTML="",o.appendChild(t),t.focus()})),o.appendChild(s),a.appendChild(o);var d=document.createElement("td");i&&"number"==typeof e.total?"Бюджет расходов"===e.name?d.textContent="-".concat(Math.abs(e.total).toFixed(2)," руб"):d.textContent="".concat(e.total.toFixed(2)," руб"):"number"==typeof e.total&&(d.textContent="".concat(Math.abs(e.total).toFixed(2)," руб")),a.appendChild(d),e.values&&Object.keys(e.values).forEach((function(o){var l=document.createElement("td");if(l.classList.add("editable-cell"),"item"===e.type){var u=new r(e.values[o],(function(r){return n.handleCellSave(t,e,o,r)}));l.appendChild(u.getElement())}else{var c=parseFloat(e.values[o])||0;i&&"Бюджет расходов"===e.name?l.textContent="-".concat(Math.abs(c).toFixed(2)," руб"):l.textContent="".concat(c.toFixed(2)," руб")}a.appendChild(l)})),this.table.appendChild(a),!e.children||e.isCollapsed&&!i||e.children.forEach((function(r){return n.renderRow(r,t,e)}))}},{key:"render",value:function(){var e=this;console.log("Rendering table"),this.table.innerHTML="";var t=document.createElement("thead"),n=document.createElement("tr");n.classList.add("header-row1");var r=["","Итог","Январь 2024","Февраль 2024","Март 2024","Апрель 2024","Май 2024","Июнь 2024","Июль 2024","Август 2024","Сентябрь 2024","Октябрь 2024","Ноябрь 2024","Декабрь 2024"];r.forEach((function(e,t){var r=document.createElement("th");r.textContent=e,n.appendChild(r)})),t.appendChild(n);var a=document.createElement("tr");a.classList.add("header-row2"),["БЮДЖЕТ","План"].concat(function(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(r.slice(2).map((function(){return"План"})))).forEach((function(t,n){var r=document.createElement("th");0===n?(r.innerHTML="".concat(t," <button>⇅</button>"),r.classList.add("budget-header"),r.addEventListener("click",(function(){return e.handleSort("name")}))):(r.textContent=t,1===n&&r.addEventListener("click",(function(){return e.handleSort("total")}))),a.appendChild(r)})),t.appendChild(a),this.table.appendChild(t);var i=document.createElement("tbody");[this.data.income,this.data.expenses].forEach((function(t){t.values=e.aggregateMonthlyValues(t),e.renderRow(t,t.type)})),this.table.appendChild(i)}},{key:"getElement",value:function(){return this.table}}],t&&i(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}(),c={income:{name:"Бюджет доходов",type:"group",children:[],totals:{}},expenses:{name:"Бюджет расходов",type:"group",children:[],totals:{}}};document.addEventListener("DOMContentLoaded",(function(){console.log("DOM fully loaded and parsed");var e=document.getElementById("app");if(e){var t=new u(c);t.render(),e.appendChild(t.getElement())}else console.error('No element with id "app" found.')}))})();