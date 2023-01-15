function group(groupLen, array) {
  const result = [];
  const groupCount = Math.ceil(array.length / groupLen);

  for (let i = 0; i < groupCount; i++) {
    result.push(
      array.slice(i*groupLen, i*groupLen + groupLen)
    );
  }

  return result;
}

export default {
  init({ cols, tables, padFill }) {
    this._cols = cols;
    this._tables = group(cols, tables);

    const lastElem = this._tables[this._tables.length - 1];
    if (lastElem.length < cols) {
      const pads = new Array(cols - lastElem.length).fill(padFill || 0);
      lastElem.push(...pads);
    }
  },

  standard() {
    return this._tables.flat(1);
  },

  snakeX() {
    return this._tables.map((group, index) => {
      if (index % 2 !== 0) {
        return group.reverse();
      }
      return group;
    }).flat(1);
  },

  snakeXReverse() {
    return this._tables.map((group, index) => {
      if (index % 2 === 0) {
        return group.reverse();
      }
      return group;
    }).flat(1);
  },

  standardReverse() {
    return this._tables
      .map((group) => group.reverse())
      .flat(1);
  },
};
