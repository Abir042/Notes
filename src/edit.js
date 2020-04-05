import {
    getNotes,
    updateNotes,
    removeNote,
    saveNotes
} from "./notes"
import {
    initializeEditPage,
    generateLastEdited
} from "./view"

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    let note = updateNotes(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes()
})

bodyElement.addEventListener('input', (e) => {
    let note = updateNotes(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes()
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})