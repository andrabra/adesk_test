// editableCell.js
class EditableCell {
  constructor(value, onSave) {
    this.value = value;
    this.onSave = onSave;
    this.isEditing = false;

    this.cell = document.createElement('td');
    this.cell.addEventListener('click', () => this.startEditing());

    this.render();
  }

  startEditing() {
    this.isEditing = true;
    this.render();
  }

  save() {
    const newValue = parseFloat(this.input.value);
    if (!isNaN(newValue)) {
      this.value = newValue;
      this.onSave(newValue);
    }
    this.isEditing = false;
    this.render();
  }

  render() {
    this.cell.innerHTML = '';
    if (this.isEditing) {
      this.input = document.createElement('input');
      this.input.type = 'number';
      this.input.value = this.value;
      this.input.addEventListener('blur', () => this.save());
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.save();
        }
      });
      this.cell.appendChild(this.input);
      this.input.focus();
    } else {
      this.cell.textContent = this.value;
    }
  }

  getElement() {
    return this.cell;
  }
}

export default EditableCell;
