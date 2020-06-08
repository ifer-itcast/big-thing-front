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
});