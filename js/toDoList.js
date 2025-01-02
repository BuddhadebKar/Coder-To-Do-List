
const openFormEl = document.querySelector('#openForm');
const modalEl = document.querySelector('#modal')

const form_exitEl = document.querySelector('#form-exit');
const add_buttonEl = document.querySelector('#add-button');
const table_bodyEl = document.querySelector('#table-body')
const test_nameEl = document.querySelector('#tesk-name');
const tesk_dateEl = document.querySelector('#tesk-date');
const tesk_timeEl = document.querySelector('#tesk-time');
const errorEl = document.querySelector('#error');

const table_Card = document.querySelector('#table-Card');

const have_tasksEl = document.querySelector('#have-tasks');
const main_divEl = document.querySelector('#main-div');

let textList = JSON.parse(localStorage.getItem('textList')) || [];

function checkingArray() {
  if (textList.length > 0) {
    have_tasksEl.classList.add('hidden');
  }
}


function saveToLocalStorage() {
  localStorage.setItem('textList', JSON.stringify(textList));
}

openFormEl.addEventListener('click', () => {
  modalEl.classList.replace('hidden', 'flex');
});

form_exitEl.addEventListener('click', () => {
  modalEl.classList.replace('flex', 'hidden');
})

add_buttonEl.addEventListener('click', (event) => {
  event.preventDefault(); // Pre vent the default form submission behavior
  takeTeskValue();
});




function takeTeskValue() {

  const taskData = {
    teskNo: '',
    name: test_nameEl.value.trim(),
    date: tesk_dateEl.value,
    time: tesk_timeEl.value,
  }
  handleText(taskData);
}




// checking the object is empty or not
function isEmpty(obj) {
  if (obj.name === '' || obj.date === '' || obj.time === '') {
    return false;
  }
  else {
    return true;
  }
}


function isExists(obj) {
  console.log(obj, "isExists",);
  for (let i = 0; i < textList.length; i++) {
    if (obj.name === textList[i].name && (obj.date === textList[i].date) && (obj.time === textList[i].time)) {
      return true;
    }
  }
  return false;
}

function handleText(taskData) {
  if (isEmpty(taskData) === false) {
    errorEl.innerText = 'Before adding, please enter your text/date/time!';
  }
  else if (isExists(taskData) === true) {
    errorEl.innerText = 'Your text is already added. Please enter different text!';
  }
  else {
    taskData.teskNo = textList.length + 1;
    textList.push(taskData);
    saveToLocalStorage(); // Save updated list to localStorage
    errorEl.innerText = '';
    renderText(textList); // Render only the newly added text
  }
}



function renderText(textList) {
  table_bodyEl.innerHTML = '';
  checkingArray();
  table_Card.classList.add('overflow-y-auto','max-h-[31rem]');
  for (let i = 0; i < textList.length; i++) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('bg-[#71C9CE]', 'text-center', 'border-b', 'rounded-lg');

    Object.values(textList[i]).forEach((value) => {
      const tableData = document.createElement('td');
      tableData.classList.add('py-3', 'font-medium', 'text-lg', 'text-white')
      tableData.textContent = value;
      tableRow.appendChild(tableData);
    });

    const buttonCell = document.createElement('td');
    const doneButton = document.createElement('button');
    doneButton.innerText = 'Done';
    doneButton.classList.add('bg-[#4F6F52]', 'mx-3', 'text-white', 'px-4', 'py-1', 'rounded-lg')
    buttonCell.appendChild(doneButton);
    doneButton.addEventListener('click', () => {
      handleDoneButton(textList[i]);
    })


    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('bg-[#E84545]', 'text-white', 'px-4', 'py-1', 'rounded-lg')
    buttonCell.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      handleDeleteButton(textList[i]);
      renderText(textList); // Re-render the updated list after deletion
    });


    tableRow.appendChild(buttonCell);
    table_bodyEl.appendChild(tableRow);
  }
  modalEl.classList.replace('flex', 'hidden');
}

renderText(textList);

function handleDoneButton(obj) {
  const rows = table_bodyEl.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    if (cells[1] && cells[1].textContent === obj.name) {
      cells[1].style.color = "green";
      break;
    }
  }
}

function handleDeleteButton(obj) {
  for (let i = 0; i < textList.length; i++) {
    if (obj.name === textList[i].name && obj.date === textList[i].date && obj.time === textList[i].time) {
      textList.splice(i, 1); // Use splice() to remove the element
      break; // Exit the loop after deleting the element
    }
  }
}

