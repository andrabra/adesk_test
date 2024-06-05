(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,n(i.key),i)}}function n(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var i=r.call(t,"string");if("object"!=e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:n+""}const r=function(){return e=function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.value=t,this.onSave=n,this.isEditing=!1,this.cell=document.createElement("td"),this.cell.addEventListener("click",(function(){return r.startEditing()})),this.render()},n=[{key:"startEditing",value:function(){this.isEditing=!0,this.render()}},{key:"save",value:function(){var e=parseFloat(this.input.value);isNaN(e)||(this.value=e,this.onSave(e)),this.isEditing=!1,this.render()}},{key:"render",value:function(){var e=this;this.cell.innerHTML="",this.isEditing?(this.input=document.createElement("input"),this.input.type="number",this.input.value=this.value,this.input.addEventListener("blur",(function(){return e.save()})),this.input.addEventListener("keypress",(function(t){"Enter"===t.key&&e.save()})),this.cell.appendChild(this.input),this.input.focus()):this.cell.textContent=this.value}},{key:"getElement",value:function(){return this.cell}}],n&&t(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n}();function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}function l(e){var t=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==i(t)?t:t+""}const u=function(){return e=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this.sortConfig={key:"name",direction:"asc"},this.table=document.createElement("table")},t=[{key:"handleCellSave",value:function(e,t,n,r){t.values[n]=r,this.calculateTotals(),this.render()}},{key:"calculateTotals",value:function(){var e=function e(t){var n=0;return t.children.forEach((function(t){"group"===t.type?t.total=e(t):t.total=Object.values(t.values).reduce((function(e,t){return e+t}),0),n+=t.total})),n};this.data.income.total=e(this.data.income),this.data.expenses.total=e(this.data.expenses)}},{key:"toggleCollapse",value:function(e,t){t.isCollapsed=!t.isCollapsed,this.render()}},{key:"handleAddItem",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=prompt("Введите название");if(r){var i={name:r,type:t?"group":"item",values:{January:0,February:0,March:0,April:0,May:0,June:0,July:0,August:0,September:0,October:0,November:0,December:0},children:t?[]:null,total:0};n?n.children.push(i):this.data[e].children.push(i),this.calculateTotals(),this.render()}}},{key:"sortData",value:function(e,t,n){return e.sort((function(e,r){return"total"===t?"asc"===n?e.total-r.total:r.total-e.total:"asc"===n?e.name.localeCompare(r.name):r.name.localeCompare(e.name)}))}},{key:"handleSort",value:function(e){var t="asc";this.sortConfig.key===e&&"asc"===this.sortConfig.direction&&(t="desc"),this.sortConfig={key:e,direction:t},this.data.income.children=this.sortData(this.data.income.children,e,t),this.data.expenses.children=this.sortData(this.data.expenses.children,e,t),this.render()}},{key:"renderRow",value:function(e,t){var n=this,i=document.createElement("tr"),a=document.createElement("td");if("group"===e.type){var o=document.createElement("button");o.textContent=e.isCollapsed?"▼":"▲",o.addEventListener("click",(function(){return n.toggleCollapse(t,e)})),a.appendChild(o)}var l=document.createElement("span");l.textContent=e.name,l.addEventListener("click",(function(){var t=document.createElement("input");t.type="text",t.value=e.name,t.addEventListener("blur",(function(){e.name=t.value,n.render()})),t.addEventListener("keypress",(function(r){"Enter"===r.key&&(e.name=t.value,n.render())})),a.innerHTML="",a.appendChild(t),t.focus()})),a.appendChild(l),i.appendChild(a);var u=document.createElement("td");if(u.textContent=e.total,i.appendChild(u),e.values&&Object.keys(e.values).forEach((function(a){var o=new r(e.values[a],(function(r){return n.handleCellSave(t,e,a,r)}));i.appendChild(o.getElement())})),this.table.appendChild(i),e.children&&!e.isCollapsed&&e.children.forEach((function(r){return n.renderRow(r,t,e)})),"group"===e.type){var c=document.createElement("tr"),s=document.createElement("td");s.colSpan=14,s.innerHTML='\n        <button class="add-item">+</button>\n        <button class="add-group">#</button>\n      ',c.appendChild(s),this.table.appendChild(c),s.querySelector(".add-item").addEventListener("click",(function(){return n.handleAddItem(t,!1,e)})),s.querySelector(".add-group").addEventListener("click",(function(){return n.handleAddItem(t,!0,e)}))}}},{key:"render",value:function(){var e=this;console.log("Rendering table"),this.table.innerHTML="";var t=document.createElement("thead"),n=document.createElement("tr"),r=["БЮДЖЕТ","Итог","Январь 2024","Февраль 2024","Март 2024","Апрель 2024","Май 2024","Июнь 2024","Июль 2024","Август 2024","Сентябрь 2024","Октябрь 2024","Ноябрь 2024","Декабрь 2024"];r.forEach((function(e,t){var r=document.createElement("th");r.textContent=e,n.appendChild(r)})),t.appendChild(n);var i=document.createElement("tr");["","План"].concat(function(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(r.slice(2).map((function(){return"План"})))).forEach((function(t,n){var r=document.createElement("th");0===n?(r.innerHTML="".concat(t," <button>⇅</button>"),r.addEventListener("click",(function(){return e.handleSort("name")}))):(r.textContent=t,1===n&&r.addEventListener("click",(function(){return e.handleSort("total")}))),i.appendChild(r)})),t.appendChild(i),this.table.appendChild(t);var o=document.createElement("tbody");[this.data.income,this.data.expenses].forEach((function(t){e.renderRow(t,t.type)})),this.table.appendChild(o)}},{key:"getElement",value:function(){return this.table}}],t&&o(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}(),c={income:{name:"Бюджет доходов",type:"group",children:[],totals:{}},expenses:{name:"Бюджет расходов",type:"group",children:[],totals:{}}};document.addEventListener("DOMContentLoaded",(function(){console.log("DOM fully loaded and parsed");var e=document.getElementById("app");if(e){var t=new u(c);t.render(),e.appendChild(t.getElement())}else console.error('No element with id "app" found.')}))})();