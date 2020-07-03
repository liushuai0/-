import util from '../util';
import optionSide from '../optionSide'

let verify = {};

verify.is = util.is;
var rules = util.rules;


var selectOption = function (key, data, parent) {
    this.parent = parent;
    this.data = data;
    this.name = data[key];
    this.value = data[parent.options.setKey];
    // 生成HTML模板
    this.html = $('<div class="form_select_option">' + this.name + '</div>');
    this.selectStutas = false;
    var _this = this;
    this.html.unbind().bind('click', function () {
        // 所有的change操作放到父级中执行
        _this.parent.clear().change(_this);
    });
};
selectOption.prototype = {
    constructor: this,
    select: function () {
        // 当元素被选中时
        this.selectStutas = true;
        this.html.addClass('active');
        this.html.unbind();
    },
    unSelect: function () {
        // 取消选中时
        var _this = this;
        this.selectStutas = false;
        this.html.removeClass('active');
        this.html.unbind().bind('click', function () {
            _this.parent.clear().change(_this);
        });
    },
};




var select = function (options, layout) {
    if (options === undefined) {
        options = {};
    };
    var _this = this;
    this.layout = layout;
    this.options = $.extend({}, {
        className: '', // 自定义元素样式
        verify: {  // 验证判断组
            text: '',
            rules: []
        },
        showUnSelect: false, // 是否显示置空项
        UnSelectData: {
            showName: ' - 请选择 - ',
            data: null,
        },
        showKey: 'label', // 根据子对象的数据Key值进行显示
        setKey: 'value', // 根据子对象的数据Key值进行赋值
        getKey: 'setKey', // 根据子对象的数据Key值进行取值
        "default": null, // 默认值
        readonly: false, // 是否只读
        size: 'normal', // 默认大小
        data: [], // 数据来源
        placeholder: '- 请选择 -',  // 当未选值时,元素显示内容
        onChange: function () { }, // 当值发生改变时,调用方法
        onError: function () { } // 当值发生错误时(不符合验证时),调用方法
    }, options);
    // 生成模板元素
    var html = '';
    html += '   <div class="form_select ' + (this.options.size ? this.options.size : '') + ' ' + this.options.className + '">';
    html += '       <div class="form_select_nameBox">';
    html += '           <div class="form_select_name">' + this.options.placeholder + '</div>';
    html += '           <span class="fa fa-angle-down"></span>';
    html += '       </div>';
    html += '       <div class="form_select_optionBox"></div>';
    html += '   </div>';

    this.html = $(html);
    // 显示主元素
    this.nameBox = this.html.find('.form_select_nameBox');
    // 文字显示元素
    this.name = this.html.find('.form_select_name');
    // 下拉列表元素
    this.optionBox = this.html.find('.form_select_optionBox');
    // 下拉菜单显示状态
    this.showOptionBox = false;
    // 事件集合
    this.event = {
        change: this.options.onChange,
        error: this.options.onError
    };
    // 子对象储存集合
    this.child = [];
    // 子对象取值数据
    this.valueData = null;
    // 子对象根据getKey 值获取的真实值
    this.value = null;
    // 赋值缓存 
    this.cache = null;
    // 存在Data,直接生成子对象
    if (this.options.data.length != 0) {
        this.setData(this.options.data);
    };
    // 存在模板对象,直接输出元素
    if (this.layout) {
        this.layout.append(this.html);
    };
    this.errorMessage = null;
    // this.readonly(this.options.readonly);
};
select.prototype = {
    constructor: this,
    on: function (str, event) {
        if (this.event.hasOwnProperty(str)) {
            this.event[str] = event;
        };
        return this;
    },
    // 单独绑定 change 方法
    onChange: function (event) {
        this.event.change = event;
        return this;
    },
    // 单独绑定 error 方法
    onError: function (event) {
        this.event.error = event;
        return this;
    },
    // 遍历子对象方法
    eachChild: function (event) {
        for (var i = 0; i < this.child.length; i++) {
            var element = this.child[i];
            event(element);
        };
        return this;
    },
    // 取消点击事件
    clearClick: function () {
        // this.name.text('加载中 ... ');
        this.nameBox.unbind('click');
        this.html.removeClass('active');
        this.optionBox.css('display', 'none');
        this.showOptionBox = false;
        $(document).unbind('click', this.documentClick);
        return this;
    },
    // 绑定点击事件
    bindClick: function () {
        var _this = this;
        _this.documentClick = function () {
            _this.html.removeClass('active');
            _this.showOptionBox = false;
            _this.optionBox.css('display', 'none');
            $(document).unbind('click', _this.documentClick);
        };

        this.nameBox.unbind('click').bind('click', function (e) {
            e.stopPropagation();
            if (_this.showOptionBox) {
                _this.documentClick();
            } else {
                _this.html.addClass('active');
                _this.showOptionBox = true;
                _this.optionBox.css('display', 'block');

                $(document).click();
                $(document).unbind('click', _this.documentClick).bind('click', _this.documentClick);
            };
        });
        return this;
    },
    // 只读状态
    readonly: function (isReadonly) {
        var _isReadonly = null;
        if (verify.is(isReadonly) == 'function') {
            _isReadonly = isReadonly();
        };
        _isReadonly = !!isReadonly;
        // this.options.readonly = _isReadonly;
        if (_isReadonly) {
            this.clearClick();
        } else {
            this.bindClick();
        };
    },
    // 选项赋值方法
    setData: function (data) {
        this.child = [];
        var _data = $.extend([], {}, data);
        this.optionBox.empty();
        this.valueData = null;
        var dataType = verify.is(data);
        if (dataType == 'string' && data.indexOf('OptionSide:') != -1) {
            _data = optionSide.get(data.split(':')[1]);
        };
        if (_data.length == 0) {
            console.error('Select => 选择项赋值失败 : ' + data);
        };
        this.options.data = _data;
        if (this.options.showUnSelect) {
            var UnSelectData = {};
            UnSelectData[this.options.setKey] = this.options.UnSelectData.data;
            UnSelectData[this.options.getKey] = this.options.UnSelectData.data;
            UnSelectData[this.options.showKey] = this.options.UnSelectData.showName;
            this.options.data.unshift(UnSelectData);
        };

        if (dataType == 'array' || verify.is(_data, 'array')) {
            for (var i = 0; i < _data.length; i++) {
                var item = _data[i];
                var child = new selectOption(this.options.showKey, item, this);
                this.child.push(child);
                this.optionBox.append(child.html);
            };
        }
        this.defaultValue().readonly(this.options.readonly);
        return this;
    },
    // 清除选择方法
    clear: function () {
        this.eachChild(function (child) {
            child.unSelect();
        });
        this.valueData = null;
        this.value = null;
        this.name.text(this.options.placeholder);
        return this;
    },
    // 制空方法
    clearData: function () {
        this.clear();
        this.child = [];
        this.optionBox.empty();
    },
    // 赋值方法
    set: function (data) {
        if (data === null) {
            this.clear();
        } else {
            var isComplete = false;
            var dataType = verify.is(data);
            if (dataType == 'array') {
                this.clear();
                this.setData(data);
                isComplete = true;
            } else {
                if (this.child.length === 0) {
                    this.cache = data;
                    isComplete = true;
                } else {
                    var _this = this;
                    if (dataType == 'string' || dataType == 'number') {
                        this.clear().eachChild(function (clild) {
                            if (data == clild.data[_this.options.setKey]) {
                                _this.select(clild);
                                isComplete = true;
                            };
                        });
                    } else if (dataType == 'object') {
                        this.clear().eachChild(function (clild) {
                            if (verify.isEqual(clild.data, data)) {
                                _this.select(clild);
                            };
                        });
                        isComplete = true;
                    } else if (dataType == 'number') {
                        if (this.child[data]) {
                            this.clear();
                            _this.select(this.child[data]);
                            isComplete = true;
                        };
                    };
                };
            };
            if (!isComplete) {
                console.error('select => set 错误 : 未找到指定的值');
            };
        };
        return this;
    },
    // 赋予默认值方法
    defaultValue: function () {
        if (this.options['default'] === null) {
            this.clear();
        } else {
            this.set(this.options['default']);
        };
        return this;
    },
    // 选中方法
    select: function (childObject) {
        this.valueData = childObject.data;
        if (this.options.getKey == 'object') {
            this.value = this.valueData;
        } else if (this.options.getKey == 'setKey') {
            this.value = this.valueData[this.options.setKey];
        } else if (this.valueData.hasOwnProperty(this.options.getKey)) {
            this.value = this.valueData[this.options.getKey];
        } else {
            // console.log('select => select 错误 : 错误的取值类型');
        };
        childObject.select();
        this.name.text(childObject.data[this.options.showKey]);
        return this;
    },
    // 验证方法
    verify: function () {
        // 判断 select 取值类型为对象时如何做非空验证
        if (this.options.getKey == 'object' &&
            ($.inArray("notNull", this.options.verify.rules) != -1) &&
            (this.value !== null) &&
            this.options.showUnSelect &&
            this.value.hasOwnProperty(this.options.getKey) &&
            (this.value[this.options.getKey] == this.options.UnSelectData.data)) {
            var text = this.options.verify.text + '不能为空';
        } else {
            var text = rules(this.options.verify, this.value);
        };

        // 如果错误信息不为空,则触发error方法,并保留错误信息
        if (text) {
            this.event.error.apply(this, [text, this.value]);
            this.errorMessage = text;
        } else {
            // 如果错误信息为空,侧清空错误信息
            this.errorMessage = null;
        };
        return this;
    },
    // 当元素改变时触发事件
    change: function (childObject) {
        this.clear().select(childObject);
        this.event.change.apply(this, [this.value]);
        this.verify();
        return this;
    },
    // 取值方法
    get: function (callBack, ignore) {
        if (ignore) {
            return this.value;
            // callBack(this.value);
        } else {
            this.verify();
            if (this.errorMessage) {
                callBack(this.errorMessage);
            } else {
                callBack(false, this.value);
            };
        };
        return this;
    },
};



export default select