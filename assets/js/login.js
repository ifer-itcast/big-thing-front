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
    const layer = layui.layer;
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

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认行为
        e.preventDefault();
        // 2. 发起 AJAX 请求
        const data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser', data, function (res) {
            // 3. 响应成功后处理
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        });
    });

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        // username=ifer&password=iferifer
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token); // token 存储到 localStorage 中
                location.href = '/index.html';
            }
        });
    });
});