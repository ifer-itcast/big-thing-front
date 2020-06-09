$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    const $image = $('#image');
    const layer = layui.layer;
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });

    $('#file').on('change', function (e) {
        const filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请先选择文件！');
        }

        // 拿到用户上传的文件并转换为路径
        const newImgURL = URL.createObjectURL(filelist[0]);
        // 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });

    // 确定按钮
    $('#btnUpload').on('click', function () {
        const dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 调用接口把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！');
                }
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            }
        });
    });
});