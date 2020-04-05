import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

//Read existing notes from localStorage 
const laodNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const getNotes = () => notes

const createNotes = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })

    return id
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            const A = a.title.toLowerCase()
            const B = b.title.toLowerCase()

            if (A < B) {
                return -1
            } else if (A > B) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const updateNotes = (id, update) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof update.title === 'string') {
        note.title === update.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof update.body === 'string') {
        note.body === update.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = laodNotes()

export {
    getNotes,
    createNotes,
    saveNotes,
    removeNote,
    sortNotes,
    updateNotes
}