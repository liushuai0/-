import config from './layoutConfig.js';
import router from './router.js';
import util from '../component/util';
import renderView from './renderView';

import tab from './tab/index';
import menu from './menu/index';

import session from '../component/session'
import userinfo from './userinfo';


var layout = function () {
    this.renderType = null;

    // 关联主体框架元素
    this.html = $('#layout-content');

    // 为背景添加背景色
    this.html.css('background', '#f0f0f0');
};

layout.prototype.render = function () {
    // 创建元素容器
    this.$el = {};

    // 创建头部元素
    this.$el.header = $('<div class="layout-header"></div>').appendTo(this.html);

    // 创建logo元素
    this.$el.logo = $('<div class="layout-logo"><img src="' + config.logoImage + '"/></div>').appendTo(this.$el.header);

    // 创建用户信息元素
    this.$el.userinfo = $('<div class="layout-userinfo"></div>').appendTo(this.$el.header);

    // 创建主菜单元素
    this.$el.mainMenuBox = $('<div class="layout-mainMenu"></div>').appendTo(this.$el.header);

    // 创建右侧菜单树元素
    this.$el.subMenuBox = $('<div class="layout-submenu"></div>').appendTo(this.html);

    // 创建tab 框架主体 
    this.$el.tabBox = $('<div class="layout-tab"></div>').appendTo(this.html);

    // 创建 主体内容容器
    this.$el.content = $('<div class="layout-content"></div>').appendTo(this.html);

    this.tab = new tab(this.$el.tabBox);
    this.tab.on('active', (item) => {
        this.setRouter(item.key, {});
    });
    this.tab.on('defaultActive', () => {
        this.setRouter(config.defaultPage);
    });
    this.tab.on('refresh', () => {
        if (this.content && this.content.destroy) {
            this.content.reload();
        };
    })

    this.userinfo = new userinfo(this.$el.userinfo);

    this.userinfo.on('logout', () => {
        this.setRouter('/login', {});
    });

    this.userinfo.setUserName(session.get('userInfo').realName);


    this.menu = new menu(this.$el.mainMenuBox, this.$el.subMenuBox);

    this.menu.on('showSubMenu', () => {
        this.showSubMenu();
    });

    this.menu.on('hideSubMenu', () => {
        this.hideSubMenu();
    });

    this.menu.on('active', (path) => {
        this.setRouter(path);
    });

    this.menu.renderMenu(config.menuData);

    this.content = {};
};

// 显示左侧菜单框架
layout.prototype.showSubMenu = function () {
    this.$el.subMenuBox.css({
        left: '0px',
    });

    this.$el.content.css({
        left: '210px',
        top: '117px',
    });
};

// 隐藏左侧菜单框架
layout.prototype.hideSubMenu = function () {
    this.$el.subMenuBox.css({
        left: '-200px',
    });
    this.$el.content.css({
        left: '0px',
        top: '117px'
    });
};

layout.prototype.clear = function () {
    if (this.content && this.content.destroy) {
        this.content.destroy();
    };
    this.content = {};
    if (this.menu) {
        this.menu.destroy();
    };
    if (this.tab) {
        this.tab.destroy();
    };
    this.renderType = null;
    this.html.empty();
};

layout.prototype.renderLogin = function (data) {
    this.clear();
    var route = router('/login', data);
    var id = util.uuid();
    var contentItem = renderView(route, {
        goto: (path, data) => {
            this.setRouter(path, data);
        }
    });
    this.content = contentItem;
    contentItem.render(this.html);
};

layout.prototype.renderContent = function (route) {
    if (this.renderType === null || this.renderType === 'login') {
        this.clear();
        this.render();
        this.renderType = 'content';
    };
    // 当前点击页面已经是焦点页面，则停止渲染；
    if (this.content.$path == route.path) {
        return;
    };
    if (this.content && this.content.destroy) {
        this.content.destroy();
    };
    this.tab.checkChildren(route);
    this.GoToPath(route);
};

layout.prototype.GoToPath = function (route) {
    var contentItem = renderView(route, {
        goto: (path, data) => {
            this.setRouter(path, data);
        }
    });
    this.content = contentItem;
    contentItem.render(this.$el.content);
    this.menu.setRouter(route.route);
};

layout.prototype.setRouter = function (path, data) {
    var _data = data || {};
    var route = router(path, _data);
    if (!route) {
        return;
    };
    if (path == '/login') {
        this.renderLogin(route);
    } else {
        this.renderContent(route);
    };
};

layout.prototype.init = function () {
    var token = session.get('token');
    var nav = session.get('nav');
    var huizhengToken = session.get('huizheng-token');
    var userInfo = session.get('userInfo');
    if (!token || !nav || !huizhengToken || !userInfo) {
        this.setRouter('/login');
    } else {

        config.beforeMenuRender(nav, config.cache);
        config.menuData = nav;
        config.defaultPage = config.getDefaultPage(nav);
        this.setRouter(config.defaultPage);
    };
};

var _layout = (function () {
    return new layout();
})();

export default {
    main: _layout,
    init: function () {
        console.log('../config/menu');
        // if (config.devModel) {
        //     session.set('token', config.devToken);
        //     session.set('nav', require('../config/menu').default);
        //     session.set('userInfo', {
        //         realName: '测试用户',
        //     })
        // };
        _layout.init.call(_layout);
    },
};