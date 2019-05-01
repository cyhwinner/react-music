import assign from 'lodash/assign';
import originJsonp from 'jsonp';

export function parseQueyParams(data) {
  let queryStr = '';
  if (data) {
    queryStr += '?';
    for(let key in data) {
      let value = data[key];
      if (value !== null) {
        queryStr += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return queryStr.slice(0, queryStr.length -1);
  }
}

export function jsonp(url, data, option) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + parseQueyParams(data);
  return new Promise((res, rej) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        res(data);
      } else {
        rej(err);
      }
    })
  })
}

