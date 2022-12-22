export function searchData(query, data) {
  const filtered = data.filter((datum) => {
    const combinedData = Object.values(datum)
      .join(' ')
      .toLowerCase();

    return combinedData.includes(query.toLowerCase());
  });

  return filtered;
}

export function findData(matcher, data) {
  const [key, value] = matcher;

  return data.find((datum) => datum[key] === value);
}

export function getIndex(matcher, data) {
  const [key, value] = matcher;

  for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    if (datum[key] === value) {
      return i;
    }
  }
}

export function updateData(matcher, data, newDatum) {
  const targetIndex = getIndex(matcher, data);
  const updatedData = [...data];
  updatedData[targetIndex] = newDatum;

  return updatedData;
}
