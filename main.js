/* globals fetch, moment */
const url = 'http://localhost:3000/notes'
document.addEventListener("submit", function (event){
    event.preventDefault()
    const noteInput = document.querySelector("#note-input").value
    console.log(noteInput)

    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 
            noteItem: noteInput,  
            created_at: moment().format() 
        
        })
    })
     .then(res => res.json())
     .then(data => {
         const noteList = document.querySelector("#note-list")
         const noteItemEl = document.createElement("li")
         noteItemEl.innerText = data.noteItem
            noteList.appendChild(noteItemEl)

     })   
})

fetch(url)
    .then(res => res.json())
    .then(noteData => {
        const noteList = document.querySelector('#note-list')
        for (const item of noteData) {
            console.log(item)
            const noteItemEl = document.createElement('li')
            noteItemEl.innerText = item.noteItem
            noteList.appendChild(noteItemEl)
        }
    })