const removeDuplicates = entities => {
  return entities.filter((elem, pos, arr) => {
    return pos === arr.findIndex(t => {
      return t.id === elem.id;
    });
  });
};

const prioritise = entities => {
  return entities.reduce((acc, elem) => {
    if (elem.is_recommended === true) {
      return [ elem, ...acc ];
    }
    return [ ...acc, elem ];
  }, []);
};

const sortAlphabetically = entities => {
  return entities.sort((a, b) => {
    if (a.book_name > b.book_name) { return 1 };
    if (a.book_name < b.book_name) { return -1 };
    return 0;
  });
};

const transferSort = entities => {
  const nonDup = removeDuplicates(entities);
  const recommended = nonDup.filter(elem => {
    if (elem.is_recommended === undefined || elem.is_recommended === true) {
      return true;
    }
    return false;
  });
  const unrecommended = nonDup.filter(elem => {
    if (elem.is_recommended === undefined || elem.is_recommended === false) {
      return true;
    }
    return false;
  });
  const sortedUnrecommended = sortAlphabetically(unrecommended);
  const sortedRecommended = sortAlphabetically(recommended);
  return [...sortedRecommended, ...sortedUnrecommended];
}

module.exports = {
  removeDuplicates,
  prioritise,
  sortAlphabetically,
  transferSort
};