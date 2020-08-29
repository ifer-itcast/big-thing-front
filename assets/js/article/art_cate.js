$(function () {
    const layer = layui.layer;
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
                initArtCateList();
                layer.msg('新增分类成功！');
                layer.close(indexAdd); // 根据索引关闭对应的弹出层
            }
        });
    });
});