/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var patten = new RegExp("[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{ }【】‘；：”“’。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(patten, '');
  }
  return rs
}
/**
 * 验证邮箱用户名
 */
export function validateEmail(value) {
  let reg = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
//   return !reg.test(value) ? true : false;  三元运算
  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}
/**
 * 验证密码 6-20位的数字+字母
 */
export function validatePassw(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? false : true;  //三元运算
}
/**
 * 验证验证码
 */
export function validateVcode(value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? false : true;  //三元运算
    // return reg.test(value);
}


