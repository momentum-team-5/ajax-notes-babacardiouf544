/* globals fetch, moment */
const url = 'http://localhost:3000/notes'
const noteList = document.querySelector('#note-list')

document.addEventListener('submit', function (event) {
  event.preventDefault()
  createNote()
})

noteList.addEventListener('click', function (e) {
  if (e.target.matches('.delete')) {
    deleteNote(e.target.parentElement.dataset.id)
  }
})

function renderNoteList () {
  fetch(url)
    .then(res => res.json())
    .then(noteData => {
      for (const note of noteData) {
        renderTodoItem(note)
      }
    })
}

function renderNoteItem (note) {
  const noteList = document.querySelector('#note-list')
  const noteItemEl = document.createElement('li')
  noteItemEl.dataset.id = note.id
  noteItemEl.id = `item-${note.id}`
  noteItemEl.innerText = note.noteItem
  // create the delete icom (minus circle) and put on created note 
  const deleteIcon = document.createElement('span')
  deleteIcon.classList.add('fas', 'fa-minus-circle', 'mar-l-xs', 'delete')
  noteItemEl.appendChild(deleteIcon)
  noteList.appendChild(noteItemEl)
}

function createNote () {
  const noteInputField = document.querySelector('#note-input')

  const requestData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      noteItem: noteInputField.value,
      created_at: moment().format()
    })
  }

  fetch(url, requestData)
    .then(res => res.json())
    .then(data => {
      noteInputField.value = ''
      renderNoteItem(data)
    })
}

function deleteNote (noteId) {
  fetch(url + '/' + noteId, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      const itemToRemove = document.querySelector(`#item-${noteId}`)
      itemToRemove.remove()
    })
}


    


    