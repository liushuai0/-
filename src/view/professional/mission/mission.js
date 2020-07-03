
// import config from '../../config/config'
import session from '../../../component/session'
// import layoutEX from '../../frame/layout';

var timer = null;


module.exports = {
    render: function (template, params, closeEvent) {
        var _this = this;
        _this.DialogPatent.closeElement.hide();
        setTimeout(() => {
            var width = _this.$el.width();
            var height = _this.$el.height() - 5;
            var accessToken = session.get('huizheng-token');
            var token = session.get('token');


            if (_this.$query.state == 'accept') { // 创建流程
                _this.$el.find('.mission-body').append('<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
                    'flowId=' + _this.$data.flowid + '&' +
                    'isembedded=false' + '&' +
                    'token=' + token + '&' +
                    'accessToken=' + accessToken + '"></iframe>');


            } else if (_this.$query.state == 'await') { // 在办流程
                _this.$el.find('.mission-body').append('<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
                    'workId=' + _this.$data.workid + '&' +
                    'trackId=' + _this.$data.trackid + '&' +
                    'subjection=D_D' + session.get('userInfo').deptId + '&' +
                    'token=' + token + '&' +
                    'accessToken=' + accessToken + (_this.$data.readonly ? '&readonly=1' : '') + '"></iframe>');


            } else if (_this.$query.state == 'flowChart') { // 流程图
                var html = '<iframe name="from" style="padding:0;margin:0;border:none;" ' +
                    'height="' + height + 'px" width="' + width + 'px" ' +
                    'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/flow.info.html?' +
                    'workId=' + _this.$data.workid + '&nodeId=' + _this.$data.nodeid + '&' +
                    'accessToken=' + accessToken + '"></iframe>'

                _this.$el.find('.mission-body').append(html);
            };

            var myFunction = function (event) {
                console.log(event.data);
                if (event.data == 'closeEvent') {
                    window.removeEventListener("message", myFunction);
                    _this.closeEvent();
                };
                if (event.data == 'logoutEvent') {
                    window.removeEventListener("message", myFunction);
                    _this.closeEvent();
                    layout.go('/login', {});
                };
            };
            window.addEventListener('message', myFunction);
        }, 200);

        // params.api.startWork({
        //     flowId: params.data.flowid,
        //     title: params.data.flowname,
        // }, function (res) {
        //     var width = template.width();
        //     var height = template.height();

        //     var accessToken = session.get('huizheng-token');


        //     // http://192.168.0.224:10045/horizon-workflow-boot/workflow/module/workflow/index.html?flowId=jsxmydysxqj&isembedded=false
        //     // template.append('<iframe style="padding:0;margin:0;border:none;" height="' + height + 'px" width="' + width + 'px" ' +
        //     //     'src="' + config.InterfaceAddress.huizhengService + '/horizon-workflow-boot/workflow/module/workflow/index.html?' +
        //     //     'workId=' + res.data.workId + '&trackId=' + res.data.trackId + '&isembedded=false&subjection=D_D' + session.get('userInfo').deptId + '&accessToken=' + accessToken + '"></iframe>');

        //     console.log(res);
        // });


    },
    destroy: function () {

    },
}