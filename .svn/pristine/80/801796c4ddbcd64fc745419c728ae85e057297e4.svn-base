import util from './util';
import requester from './ajax';

var optionsDate = {
    Gender: [
        { label: '男', value: '0', },
        { label: '女', value: '1', },
        { label: '未知', value: '2', }
    ],
    test: [
        { label: 'A', value: 'a', },
        { label: 'B', value: 'b', },
        { label: 'C', value: 'c', }
    ],
};

var setOptionSide = function (data, key) {
    if (util.is(data, 'array') && util.is(key, 'string')) {
        optionsDate[key] = data;
    } else {
        console.error('OptionSide => 错误的赋值格式');
    };
};


var formatOptions = function (key, type, custom) {
    var data;
    type = type || 'list';
    if (!optionsDate.hasOwnProperty(key)) {
        data = getOptionAjax(key);
        if (data === null || data.length == 0) {
            console.error('OptionSide => 没有找到对应的Key值,或对应Key值没有数据 : ' + key);
            return [];
        } else {
            setOptionSide(data, key);
        };
    };
    if (type == 'list') {
        data = util.clone(optionsDate[key]);
    } else if (type == 'object') {
        var _array = util.clone(optionsDate[key]);
        custom = custom || 'value';
        data = util.converArrayToObj(_array, custom);
    };
    return data;
};

var getOptionAjax = function (type) {
    var _res = null;
    requester.post({
        url: config.InterfaceAddress.dictService + '?type=' + type,
        async: false,
        token: true,
        success: function (res) {
            _res = res;
        },
    });
    return _res;
};


var optionSide = {
    get: function (name, type, custom) {
        if (util.is(name, 'string')) {
            return formatOptions(name, type, custom)
        } if (util.is(name, 'array')) {
            var data = {};
            for (let i = 0; i < name.length; i++) {
                const element = name[i];
                data[element] = formatOptions(element, type, custom);
            };
            return data;
        };
    },
    set: setOptionSide
};



export default optionSide;