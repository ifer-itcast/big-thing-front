$(function () {
    getUserInfo();
    const layer = layui.layer;
    // 退出
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token');
            // 2. 重新跳转到登录页
            location.href = '/login.html';
            // 3. 关闭对应的弹出层
            layer.close(index);
        });
    });
});

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户名称
    let name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}