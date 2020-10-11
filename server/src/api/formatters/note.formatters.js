module.exports = {
  mergeNotes: (notes, globalNotes) => {
    const mergedArray = [...notes, ...globalNotes];
    return [...new Map(mergedArray.map((item) => [item.id, item])).values()];
  },
};
