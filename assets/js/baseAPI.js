// 每次调用 $.get、$.post、$.ajax 的时候会先调用这里
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
});