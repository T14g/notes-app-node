const fs    = require('fs')
const chalk = require('chalk')

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

    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        }); 

        saveNotes(notes);
        console.log(chalk.green.inverse('Note added!'));
    }else{
        console.log(chalk.red.inverse('Trying to add a copy!'));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = title => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.red.inverse('No note to remove!'));
    }
    
}

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(n => n.title === title);

    if(note){
        console.log(chalk.green.inverse(`Title: ${note.title}`));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes();

    notes.map(note => {
        console.log(chalk.green.inverse(`The nothe title is ${note.title}\n`))
    })
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}