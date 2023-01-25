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
  }
 
  return nestedObj;
}
