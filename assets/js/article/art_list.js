$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const laypage = layui.laypage;

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
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                // 调用渲染分页的方法
                renderPage(res.total);
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

    // 为筛选表单绑定 submit 事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        const cate_id = $('[name=cate_id]').val();
        const state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        // 根据最新的筛选条件重新渲染数据
        initTable();
    });

    // 定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 ID
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // 分页发生切换的时候，会触发 jump
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                if (!first) {
                    initTable();
                }
            }
        });
    }



});