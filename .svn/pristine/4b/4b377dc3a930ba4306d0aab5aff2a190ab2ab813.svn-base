import util from './util'
import select from './from/select'




var table = function (options) {
    var _this = this;


    // 表头参数
    this.cols = options.cols || [];

    // 表格相关参数
    this.height = options.height || 400;
    this.text = options.text || { none: '暂无相关数据' };
    this.index = options.index || 1;
    this.limit = options.limit || 15;

    this.paging = {};
    if (!options.paging) {
        options.paging = {};
    };

    // 分页相关参数
    this.paging.index = this.index || 1;
    this.paging.limit = this.limit || 15;
    this.paging.limits = options.paging.limits || [this.limit, 30, 50];
    this.paging.groups = options.paging.groups || 3;
    this.paging.layout = options.paging.layout || ['prev', 'page', 'next', 'skip', 'count', 'limit'];
    this.paging.prev = options.paging.prev || '<i class="fa fa-angle-left" aria-hidden="true"></i>';
    this.paging.next = options.paging.next || '<i class="fa fa-angle-right" aria-hidden="true"></i>';

    // 表格Ajax处理关联事件

    if (options.getEvent) {
        this.renderEvent = options.getEvent
    } else {
        console.error('没有表格加载数据对象');
        this.renderEvent = function () { };
    };


    // 表格查询条件 (表单项)
    this.where = options.where || [];

    // 头部功能按钮 (重置，选择，删除，查询)
    this.whereButtons = options.whereButtons || [];

    this.rightButtion = options.rightButtion || [];

    this.screen = options.screen || false;

    // 表格功能按钮 (表格功能按钮)
    this.toolButtons = options.tableButtons || [];


    // 设置元素ID
    this.tableId = util.uuid();
    this.pagingId = util.uuid();
    this.buttonBoxId = util.uuid();

    // 生成整体html
    this.html = $('<div class="layui-card-header"></div>');
    this.headerBox = $('<div class="layui-form layuiadmin-card-header-auto"></div>').appendTo(this.html);
    this.whereBox = $('<div class="layui-form-item"></div').appendTo(this.headerBox);
    this.whereButtonBox = $('<div class="layui-inline"></div').appendTo(this.whereBox);
    this.rightButtionBox = $('<div class="layui-btn-right"></div>').appendTo(this.whereBox);
    this.tableButtonElement = $('<div id="' + this.buttonBoxId + '" style="display: none;"></div>').appendTo(this.html);
    this.tableElement = $('<div id="' + this.tableId + '" lay-filter="' + this.tableId + '"></div>').appendTo(this.html);
    this.pagingElement = $('<div class="layout-table-paging" id="' + this.pagingId + '"></div>').appendTo(this.html);

    this.screenColsOption = [];

    // 表格初始化数据
    this.tableOption = {
        elem: this.tableElement[0]
        , height: this.height - 120
        , text: this.text
        , cols: [this.cols]
    };


    // 分页初始化数据
    this.pagingOption = {
        elem: this.pagingElement[0]
        , count: 0
        , curr: this.index
        , limit: this.paging.limit
        , limits: this.paging.limits
        , groups: this.paging.groups
        , layout: this.paging.layout
        , prev: this.paging.prev
        , next: this.paging.next
        , jump: function (obj, first) {
            if (!first) {
                var option = _this.ajaxOption();
                option.index = obj.curr;
                option.limit = obj.limit;
                _this.renderEvent(option, function (res) {
                    _this.index = obj.curr;
                    _this.limit = obj.limit;
                    _this.renderData(res);
                });
            };
        }
    };

    this.tableData = [];
    this.whereObject = {};
    this.tableButtonEvent = {};
    this.renderButtons();

    // 转换表格按钮到按钮元素事件
    for (let i = 0; i < this.cols.length; i++) {
        const element = this.cols[i];
        if (element.toolbar) {
            element.toolbar = this.html.find('#' + this.buttonBoxId)[0];
        };
    };

    this.tableEX = layui.table.render(this.tableOption);
    this.pagingEx = layui.laypage.render(this.pagingOption);


    setTimeout(function () {
        var option = _this.ajaxOption();
        option.index = _this.index;
        option.limit = _this.limit;
        _this.renderEvent(option, function (res) {
            _this.renderData(res);
        });
    }, 20);

};

// 渲染input
table.prototype.renderInputTemplate = function (data) {
    var haveText = data.text;
    var html = $('<div class="layui-inline">' +
        '    <label ' + (haveText ? '' : 'style="display:none"') + ' class="layui-form-label">' + data.text + '</label>' +
        '    <div class="layui-input-inline size2">' +
        '        <input type="text" name="name" placeholder="' + data.placeholder + '" autocomplete="off" class="layui-input">' +
        '    </div>' +
        '</div>');
    return html;
};

// 渲染select
// table.prototype.renderSelectTemplate = function (data) {
//     var id = util.uuid();
//     var html = '';
//     html += '<div class="layui-inline" lay-filter="' + id + '">';
//     html += '    <label class="layui-form-label">' + data.text + '</label>';
//     html += '    <div class="layui-input-inline">';
//     html += '        <select>';
//     html += '            <option value="">请选择问题</option>';
//     if (data.dataType == "group") {
//         for (let i = 0; i < data.data.length; i++) {
//             const group = data.data[i];
//             html += '            <optgroup label="' + group.name + '">';
//             for (let i = 0; i < group.child.length; i++) {
//                 const item = group.child[i];
//                 html += '          <option value="' + item.value + '">' + item.label + '</option>';
//             };
//             html += '            </optgroup>';
//         }
//     } else {
//         for (let i = 0; i < data.data.length; i++) {
//             const item = data.data[i];
//             html += '          <option value="' + item.value + '">' + item.label + '</option>';
//         };
//     };
//     html += '        </select>';
//     html += '    </div>';
//     html += '</div>';
//     html = $(html);
//     setTimeout(function () {
//         layui.form.render('select', id);
//     }, 100);
//     return html;
// };

// 渲染顶部右侧按钮
table.prototype.renderRightButtonTemplate = function (data) {
    var html = $('<div class="layui-btn layui-btn-ys layui-btn-sm" id="refresh">' +
        '    <i><img class="cloud-icon ' + data.icon + '"></i>' + data.name +
        '</div>');
    return html;
};
// 渲染表格功能按钮
table.prototype.renderWhereButtontemplate = function (data) {
    return $('<div class="layui-btn layui-btn-sm ' + data.class + '">' + data.name + '</div>')
};

// 渲染表格内功能按钮
table.prototype.renderTableButtontemplate = function (data) {
    var html = $('<button class="layui-btn layui-btn-ys layui-btn-sm layui-btn-table" data-type="all" lay-event="' + data.key + '">' +
        '    <i><img class="cloud-icon-table ' + data.icon + '"></i>' + data.name +
        '</button>');
    return html;
};

// 事件绑定方法
// 待完善，由于传递的为实体类型，导致内存泄露
table.prototype.bindEvent = function (ele, event, _this) {
    ele.click(function () {
        event(_this);
    });
};
table.prototype.renderButtons = function (res) {
    var _this = this;
    // 渲染筛选条件
    this.where.reverse();
    for (let i = 0; i < this.where.length; i++) {
        const element = this.where[i];
        if (element.type == 'input') {
            var html = this.renderInputTemplate(element);
            this.whereObject[element.key] = {};
            this.whereObject[element.key].elem = html.find('input');
            this.whereObject[element.key].data = element;
            this.whereBox.prepend(html);
        } else if (element.type == 'select') {
            // var html = this.renderSelectTemplate(element);
            this.whereObject[element.key] = {};
            // var select = html.find('select');

            var template = $('<div class="layui-inline">' +
                '    <label ' + (element.text ? '' : 'style="display:none"') + ' class="layui-form-label">' + element.text + '</label>' +
                '    <div class="layui-input-inline size2">' +
                '    </div>' +
                '</div>');
            var _select = new select({
                setKey: element.value || 'value',
                getKey: element.value || 'value',
                showKey: element.label || 'label',
                default: element.defaultValue || null,
                showUnSelect: (element.defaultValue ? false : true), // 是否显示置空项
                placeholder: '- ' + element.placeholder + ' -',
                UnSelectData: {
                    showName: ' - ' + element.placeholder + ' - ',
                    data: null,
                },
                onChange: element.onChange || function () { },
                data: element.data,
            });

            template.find('.layui-input-inline').append(_select.html);

            this.whereObject[element.key].elem = _select;
            this.whereObject[element.key].data = element;
            this.whereBox.prepend(template);
        } else if (element.type == 'date') {
            var html = this.renderInputTemplate(element);
            this.whereObject[element.key] = {};
            var input = html.find('input');
            layui.laydate.render({
                elem: input[0]
            });
            this.whereObject[element.key].elem = input;
            this.whereObject[element.key].data = element;
            this.whereBox.prepend(html);
        } else if (element.type == 'date ~ date') {
            var html = this.renderInputTemplate(element);
            this.whereObject[element.key] = {};
            var input = html.find('input');
            layui.laydate.render({
                elem: input[0],
                range: '~'
            });
            this.whereObject[element.key].elem = input;
            this.whereObject[element.key].data = element;
            this.whereBox.prepend(html);
        } else if (element.type == 'select') {
            console.warn('下拉菜单：即将推出');
        };
    };

    // this.headerBox = function () { };
    // 渲染事件方法
    for (let i = 0; i < this.whereButtons.length; i++) {
        const element = this.whereButtons[i];
        var html = this.renderWhereButtontemplate(element);
        this.whereButtonBox.append(html);
        if (element.event == 'refresh') {
            this.bindEvent(html, this.refresh, this);
        } else if (element.event == 'reset') {
            this.bindEvent(html, this.reset, this);
        } else if (element.event == 'search') {
            this.bindEvent(html, this.search, this);
        } else {
            this.bindEvent(html, element.event, this);
        };
    };

    // this.rightButtion
    // 渲染右侧按钮
    for (let i = 0; i < this.rightButtion.length; i++) {
        const element = this.rightButtion[i];
        var html = this.renderRightButtonTemplate(element);
        this.rightButtionBox.append(html);
        if (element.event == 'refresh') {
            this.bindEvent(html, this.refresh, this);
        } else if (element.event == 'reset') {
            this.bindEvent(html, this.reset, this);
        } else if (element.event == 'search') {
            this.bindEvent(html, this.search, this);
        } else {
            this.bindEvent(html, element.event, this);
        };
    };

    // 渲染表格内的按钮
    for (let i = 0; i < this.toolButtons.length; i++) {
        const element = this.toolButtons[i];
        var html = this.renderTableButtontemplate(element);
        this.tableButtonElement.append(html);
        this.tableButtonEvent[element.key] = element.event
    };

};
// 重置表格
table.prototype.reset = function (_this) {
    // var _this = this;
    var data = {};
    for (const key in _this.whereObject) {
        if (_this.whereObject.hasOwnProperty(key)) {
            const element = _this.whereObject[key];
            if (element.data.type == 'input') {
                element.elem.val('');
                data[key] = '';
            } if (element.data.type == 'select') {
                element.elem.clear();
                data[key] = '';
            } else if (element.data.type == 'date') {
                data[key] = element.elem.val('');
                data[key] = '';
            } else if (element.data.type == 'date ~ date') {
                var keyArray = element.data.key.split('/');
                element.elem.val('');
                data[keyArray[0]] = '';
                data[keyArray[1]] = '';
            }
        }
    };
    data.index = 1;
    data.limit = 15;
    _this.renderEvent(data, function (res) {
        _this.index = data.index;
        _this.limit = data.limit;
        _this.renderData(res);
    });
};

// 生成表格筛选条件对象
table.prototype.ajaxOption = function () {
    var data = {};
    for (const key in this.whereObject) {
        if (this.whereObject.hasOwnProperty(key)) {
            const element = this.whereObject[key];
            if (element.data.type == 'input') {
                data[key] = element.elem.val();
            } if (element.data.type == 'select') {
                data[key] = element.elem.value;
            } else if (element.data.type == 'date') {
                data[key] = element.elem.val();
            } else if (element.data.type == 'date ~ date') {
                var keyArray = element.data.key.split('/');
                var valueArray = element.elem.val().split(' ~ ');
                data[keyArray[0]] = valueArray[0];
                if (valueArray[1]) {
                    data[keyArray[1]] = valueArray[1];
                } else {
                    data[keyArray[1]] = '';
                };
            }
        }
    };
    return data;
};

// 执行搜索方法
// 待完善，由于传递的为实体类型，导致内存泄露
table.prototype.search = function (_this) {
    var option = _this.ajaxOption();
    option.index = 1;
    option.limit = _this.limit;
    _this.renderEvent(option, function (res) {
        _this.index = 1;
        _this.renderData(res);
    });
};

// 执行刷新表格方法
// 待完善，由于传递的为实体类型，导致内存泄露
table.prototype.refresh = function (_this) {
    var option = _this.ajaxOption();
    option.index = _this.index;
    option.limit = _this.limit;
    _this.renderEvent(option, function (res) {
        _this.renderData(res);
    });
};

// 执行表格数据加载方法
table.prototype.renderData = function (res) {
    this.tableData = res.data;
    this.tableEX.reload({
        data: res.data,
        limit: this.limit
    });
    this.pagingOption.count = res.count;
    this.pagingOption.curr = this.index;
    this.pagingOption.limit = this.limit;
    layui.laypage.render(this.pagingOption);
};

// 绑定表格按钮事件
table.prototype.bindTabButtonEvent = function () {
    var _this = this;
    layui.table.on('tool(' + this.tableId + ')', function (obj) {
        var layEvent = obj.event;
        _this.tableButtonEvent[layEvent](obj.data);
    });
};

// 表格渲染
table.prototype.render = function () {
    var _this = this;
    setTimeout(function () {
        _this.bindTabButtonEvent();
    }, 10);
    return this.html;
};

export default table;