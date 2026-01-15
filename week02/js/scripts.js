const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function () {
  if (input.value.trim() !== '') {

    // Crear elementos
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    // Asignar contenido
    li.textContent = input.value;
    deleteButton.textContent = '❌';

    // Agregar botón al li
    li.append(deleteButton);

    // Agregar li a la lista
    list.append(li);

    // Evento para eliminar
    deleteButton.addEventListener('click', function () {
      list.removeChild(li);
      input.focus();
    });

    // Limpiar input
    input.value = '';
    input.focus();
  }
});


