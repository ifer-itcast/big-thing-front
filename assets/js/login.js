$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 自定义表单校验规则
    const form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码为6到12位，不能有空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
});