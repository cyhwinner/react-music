function getRandomInt(min, max) {
  return Math.floor(Math.random * (max - min + 1) + min);
}

export function shuffle(arr) {
  let newArr = arr.slice();
  for(let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i);
    [newArr[j], newArr[i]] = [newArr[i], newArr[j]];
  }
  return newArr;
}

export function reactDebounce(func, wait=500) {
  let timer;
  return function(event) {
    clearTimeout(timer);
    event && event.persist();
    timer = setTimeout(() => {
      func(event);
    }, wait);
  }
}