module.exports = {
  mergeNotes: (notes, globalNotes, championNotes) => {
    const mergedArray = [...notes, ...globalNotes, ...championNotes];
    return [...new Map(mergedArray.map((item) => [item.id, item])).values()];
  },
};
