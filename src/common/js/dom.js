export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(|\\s$)');
  return reg.test(el.className);
}
export function addClass(el, className) {
  if(hasClass(el, className)) {
      return;
  }
  const newClassName = el.className.split('');
  newClassName.push(className);
  el.className = newClassName.join(' ');
}
