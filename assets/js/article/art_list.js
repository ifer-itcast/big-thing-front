$(function () {
    const layer = layui.layer;
    const form = layui.form;

    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date);
        const y = dt.getFullYear();
        const m = addZero(dt.getMonth() + 1);
        const d = addZero(dt.getDate());
        const HH = addZero(dt.getHours());
        const mm = addZero(dt.getMinutes());
        const ss = addZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + HH + ':' + mm + ':' + ss;
    };

    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }


    const q = {
        pagenum: 1, // 页码
        pagesize: 2, // 每页显示多少条
        cate_id: '', // 文章分类的 id
        state: '' // 文章的发布状态
    };

    // 获取文章列表
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！');
                }
                if (!res.data.length) {
                    res = {
                        status: 0,
                        message: "获取文章列表成功！",
                        data: [{
                                Id: 1,
                                title: "abab",
                                pub_date: "2020-01-03 12:19:57.690",
                                state: "已发布",
                                cate_name: "最新"
                            },
                            {
                                Id: 2,
                                title: "666",
                                pub_date: "2020-01-03 12:20:19.817",
                                state: "已发布",
                                cate_name: "股市"
                            }
                        ],
                        total: 5
                    };
                }
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        });
    }
    initTable();

    // 获取文章分类
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败');
                }
                const htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                // 通知 layui 重新渲染一下表单区域
                form.render();
            }
        });
    }


    initCate();
});