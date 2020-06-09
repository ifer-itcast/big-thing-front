$(function () {
    // 用户昵称的校验
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须小于6个字符';
            }
        }
    });

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // 为表达赋值
                form.val('formUserInfo', res.data);
            }
        });
    }
    initUserInfo();

    // 重置表单的初始数据
    $('#btnReset').on('click', function (e) {
        // 阻止默认的重置行为
        e.preventDefault();
        initUserInfo();
    });

    // 监听表单的提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST', // type: 'POST' 也 ok
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');

                // 调用父页面中的渲染头像的方法即可
                window.parent.getUserInfo();
            }
        });
    });
});