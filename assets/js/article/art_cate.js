$(function () {
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
});