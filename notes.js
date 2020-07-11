const fs    = require('fs')

const getNotes = () => {
    return 'Your notes...'
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON   = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch (e){
        return [];
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(note => {
        return note.title === title
    });

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        }); 

        saveNotes(notes);
        console.log("A new note has been added!");
    }else{
        console.log("Trying to add a copy!");
    }
}

const saveNotes = notes =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}