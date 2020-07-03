var alert = {
    success: function (options) {
        var _options = $.extend({}, {
            title: '操作成功',
            text: '',
            buttonColor: "#7bc351",
            ButtonText: "确定",
            callback: function () { },
        }, options);
        swal({
            title: _options.title,
            text: _options.text,
            type: "success",
            confirmButtonColor: _options.buttonColor,
            confirmButtonText: _options.ButtonText,
            closeOnConfirm: true
        }, function () {
            _options.callback();
        });
    },
    warning: function (options) {
        var _options = $.extend({}, {
            title: '',
            text: '',
            buttonColor: "#e28b3e",
            ButtonText: "确定",
            callback: function () { },
        }, options);
        swal({
            title: _options.title,
            text: _options.text,
            type: "warning",
            confirmButtonColor: _options.buttonColor,
            confirmButtonText: _options.ButtonText,
        }, function () {
            _options.callback();
        });
    },
    normal: function (options) {
        var _options = $.extend({}, {
            title: '',
            text: '',
            buttonColor: "#1e88e5",
            ButtonText: "确定",
            callback: function () { },
        }, options);
        swal({
            title: _options.title,
            text: _options.text,
            confirmButtonColor: _options.buttonColor,
            confirmButtonText: _options.ButtonText,
        }, function () {
            _options.callback();
        });
    },
    error: function (options) {
        var _options = $.extend({}, {
            title: '',
            text: '',
            buttonColor: "#e44c4c",
            ButtonText: "确定",
            callback: function () { },
        }, options);
        swal({
            title: _options.title,
            text: _options.text,
            type: "error",
            confirmButtonColor: _options.buttonColor,
            confirmButtonText: _options.ButtonText,
        }, function () {
            _options.callback();
        });
    },
    delete: function (options) {
        var _options = $.extend({}, {
            title: '',
            text: '',
            buttonColor: "#e44c4c",
            ButtonText: "确定",
            deleteText: '确认删除',
            callback: function () { },
        }, options);
        swal({
            title: _options.title,
            text: _options.text,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: _options.deleteText,
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            swal({
                title: '',
                text: '操作中,请稍等',
                showConfirmButton: false,
            });
            _options.callback(function () {
                swal({
                    title: '操作成功',
                    text: '',
                    type: "success",
                    confirmButtonColor: "#7bc351",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                }, function () { });
            }, function (text) {
                swal({
                    title: '操作失败',
                    text: text,
                    type: "error",
                    confirmButtonColor: "#e44c4c",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                }, function () { });
            });
        });
    }
};

export default alert;