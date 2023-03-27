export function searchData(query, data, searchablePath) {
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

export function deleteData(matcher, data) {
  const targetIndex = getIndex(matcher, data);
  const updatedData = [...data];
  updatedData.splice(targetIndex, 1);

  return updatedData;
}

export function filterDistinct(array) {
  const distinct = [];
  array.forEach((item) => {
    if (distinct.indexOf(item) < 0) {
      distinct.push(item);
    }
  });

  return distinct;
}

export function group(groupLen, array) {
  const result = [];
  const groupCount = Math.ceil(array.length / groupLen);

  for (let i = 0; i < groupCount; i++) {
    result.push(
      array.slice(i*groupLen, i*groupLen + groupLen)
    );
  }

  return result;
}

export function getObjectValue(obj, path) {
  const properties = path.split(/\./g);
  let nestedObj = obj;
 
  for (const property of properties) {
    nestedObj = nestedObj[property];
    if (!nestedObj) break;
  }
 
  return nestedObj;
}

export function formatAndSplitDate(date) {
  const splittedDate = 
    date.toLocaleString('id-ID', { dateStyle: 'full' })
      .replace(/,/, '')
      .split(' ');

  return {
    dayName: splittedDate[0],
    dayNumber: splittedDate[1],
    month: splittedDate[2],
    year: splittedDate[3]
  };
}

export function filterData(source, filters) {
    if (!source) return;
    let filtered = [...source];
    filters.forEach((matcher) => {
      if (!matcher) return;
      const [key, value] = matcher;
      filtered = filtered.filter((datum) => getObjectValue(datum, key) == value);
    });

    return filtered;
  }
