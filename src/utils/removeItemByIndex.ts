const removeItemByIndex = (arr: [any], index: number) => {
  // Create a shallow copy of the original array
  const newArray = arr.slice();

  // Check if the index is valid
  if (index >= 0 && index < newArray.length) {
    // Remove the object at the specified index
    newArray.splice(index, 1);
  }

  return newArray;
};

export default removeItemByIndex;
