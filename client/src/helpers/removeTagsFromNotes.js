function removeChar(note, char = "@") {
  return {
    ...note,
    content: note.content.replaceAll(char, ""),
  };
}

function removeTagsFromNotes(notes = [], char = "@") {
  const newNotes = notes.map((note) => removeChar(note, char));
  return newNotes;
}

export default removeTagsFromNotes;
