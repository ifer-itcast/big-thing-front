// 每次调用 $.get、$.post、$.ajax 的时候会先调用这里
$.ajaxPrefilter(function (options) {
    // 拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 设置 headers 请求头
    if (options.url.includes('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1. 强制清空 token（如果有虚假或者过期的token）
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = "/login.html";
        }
    };
});