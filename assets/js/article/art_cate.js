$(function () {
    const layer = layui.layer;
    const form = layui.form;
    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        });
    }

    initArtCateList();

    let indexAdd = null;
    // 添加文章分类
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html() // 注意操作
        });
    });

    // 监听提交
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！');
                }
                layer.msg('新增分类成功！');
                layer.close(indexAdd); // 根据索引关闭对应的弹出层
            }
        });
    });

    let indexEdit = null;
    // 通过代理的方式为 btn-edit 绑定点击事件
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html() // 注意操作
        });

        const id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data);
            }
        });
    });
    // 通过代理的方式为修改表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！');
                }
                layer.msg('更新分类数据成功！');
                layer.close(indexEdit);
                initArtCateList();
            }
        });
    });

    // 通过代理的形式为删除文章分类绑定点击事件
    $('body').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id');
        layer.confirm('确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！');
                    }
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    initArtCateList();
                }
            });
        });
    });
});