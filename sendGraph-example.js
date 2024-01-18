function removeObjectsById(array1, array2) {
    return array1.filter(obj => !array2.includes(obj.id));
  }
  
  // Пример использования
  const array1 = [
    { id: 1, from: 'd' },
    { id: 2, from: 'f' },
    { id: 3, from: 's' },
    { id: 4, from: 'g' }
  ];
  
  const array2 = [1, 3];
  
  const newArray = removeObjectsById(array1, array2);
  
  console.log(newArray);