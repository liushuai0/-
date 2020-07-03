import request from '../component/ajax';
import session from '../component/session'


var loginForHuizheng = function (data, success, error) {
    request.post({
        url: '/renren-admin/workflow/login',
        data: {
            loginName: data.username,
            password: data.password,
        },
        devUrl: 'renrenService',
        success: function (res) {
            if (res.code == 0) {
                session.set('huizheng-token', res.data.accessToken);
                success();
            } else {
                layer.open({
                    title: '警告',
                    content: res.message
                });
                error();
            };
        },
    });
};

var getUserInfo = function (success, error) {
    request.get({
        url: '/renren-admin/sys/user/info',
        token: 'renren',
        dataType: 'xml',
        devUrl: 'renrenService',
        success: function (res) {
            session.set('userInfo', res.data);
            // console.log('setUserName');
            // window.layout.setUserName(res.data.realName);
            loginForHuizheng({
                username: res.data.username,
                password: res.data.password,
            }, function () {
                success(res);
            });
        },
        error: function () {
            error();
        }
    });
}

var getMenuList = function (success, error) {
    request.get({
        url: '/renren-admin/sys/menu/nav',
        token: 'renren',
        dataType: 'xml',
        devUrl: 'renrenService',
        success: function (res) {
            try {
                var data = res.data[0].children;
                session.set('nav', data);
                success(res);
            } catch (errorMessage) {
                error();
            };
        },
    });
};

var login = function (data, success, error) {
    request.post({
        url: '/renren-admin/login',
        data: data,
        devUrl: 'renrenService',
        success: function (res) {
            if (res.code == 0 && res.data && res.data.token) {
                session.set('token', res.data.token);
                // 获取权限菜单
                getMenuList(function () {
                    // 获取用户信息
                    getUserInfo(function () {
                        success();
                    }, function () {
                        error();
                    });
                }, function () {
                    error();
                });
            } else if (!res.data || !res.data.token) {
                layer.open({
                    title: '警告',
                    content: '用户登录失败'
                });
            } else {
                if (res.msg == '账号或密码错误') {
                    error(res.msg);
                } else if (res.msg == '验证码不正确') {
                    error(res.msg);
                } else {
                    layer.open({
                        title: '警告',
                        content: res.msg
                    });
                };
            };
        },
    });
};

var updatePassword=function (data,success, error) {
    request.put({
        url: '/renren-admin/sys/user/password',
        data: data,
        token: 'renren',
        devUrl: 'renrenService',
        success: function (res) {
            if (res.code == 0) {
                success(res)
            } else {
                if (res.msg == '账号或密码错误') {
                    error(res.msg);
                }else {
                    layer.open({
                        title: '警告',
                        content: res.msg
                    });
                };
            };
        },
    });
}
export default {
    login: login, // 登录
    getMenuList: getMenuList, // 获取目录列表
    getUserInfo: getUserInfo, // 获取用户信息
    loginForHuizheng: loginForHuizheng, //慧正工作流登录
    // captcha: captcha,// 获取验证码
    updatePassword:updatePassword,//修改密码
}