import service from '@/utils/request';
/**
 * 获取验证码
 */
export function GetSms(data){
    // 创建请求
    service.request( {
      // `url` 是用于请求的服务器 URL
      url: '/getSms/',
      // `method` 是创建请求时使用的方法
      method: 'post', // default
      data: data // z左边的data是变量名（key）后台接收的，右边的data事接收的参数，如果两者同名的情况下，可以写成单个data即可（ES6写法）
    })

}
