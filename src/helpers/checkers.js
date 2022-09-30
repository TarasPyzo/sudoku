let valuesToCheck = [];
for (let i = 1; i <= 9; i++) {
  valuesToCheck.push(new RegExp(i, 'g'));
}

export const checkRows = (data) => {
  let isRepetition = false;

  data.some(row => {
    const rowStr = row.map(cell => cell.value).join('');

    valuesToCheck.some(regex => {
      const result = rowStr.match(regex);
      if (result?.length > 1) {
        isRepetition = true;
      }
      return isRepetition;
    });

    return isRepetition;
  });

  return isRepetition;
};

export const checkColumns = (data) => {
  let isRepetition = false;

  for (let columnIdx = 0; columnIdx < 9; columnIdx++) {
    const column = [];
    for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
      column.push(data[rowIdx][columnIdx]);
    }
    const columnStr = column.map(cell => cell.value).join('');

    valuesToCheck.some(regex => {
      const result = columnStr.match(regex);
      if (result?.length > 1) {
        isRepetition = true;
      }
      return isRepetition;
    });

    if (isRepetition) break;
  }

  return isRepetition;
};

export const checkSubgrids = (data) => {
  let isRepetition = false;

  const startSubgridsIdxs = [9*0, 9*0+3, 9*0+6, 9*3, 9*3+3, 9*3+6, 9*6, 9*6+3, 9*6+6];
  const subgridsIdxs = [];
  startSubgridsIdxs.forEach(startSubgridIdx => {
    const temp = [];
    const startRowsIdxs = [startSubgridIdx, startSubgridIdx + 9, startSubgridIdx + 9 * 2];
    for (let i = 0; i < 3; i++) {
      temp.push(startRowsIdxs[i], startRowsIdxs[i] + 1, startRowsIdxs[i] + 2);
    }

    subgridsIdxs.push(temp);
  });

  subgridsIdxs.some(subgridIdxs => {
    const subgrid = [];
    subgridIdxs.forEach(i => {
      const rowIdx = Math.floor(i / 9);
      const columnIdx = i - rowIdx * 9;
      subgrid.push(data[rowIdx][columnIdx]);
    });
    const subgridStr = subgrid.map(cell => cell.value).join('');

    valuesToCheck.some(regex => {
      const result = subgridStr.match(regex);
      if (result?.length > 1) {
        isRepetition = true;
      }
      return isRepetition;
    });

    return isRepetition;
  });

  return isRepetition;
};
