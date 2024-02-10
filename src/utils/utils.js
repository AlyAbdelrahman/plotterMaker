export const sortList = (sourceList, startIndex, endIndex) => {
    // Create a new array to hold the sorted items
    let newList = Array.from(sourceList);
    
    // Remove the dragged item from its original position
    const [removed] = newList.splice(startIndex, 1);

    // Insert the dragged item into the new position
    newList.splice(endIndex, 0, removed);

    // Sort the list based on the index
    newList = newList.map((item, index) => ({ ...item, index })).sort((a, b) => a.index - b.index);
    return newList
}

export function extractAxesLable(text) {
    const words = text.split('-');
    // Get the last word from the array
    const axesLabel = words[words.length - 1];
    return axesLabel;
}
