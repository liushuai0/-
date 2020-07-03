import './component/loading'
import layoutForMain from './layout/frame';
// import layoutForHash from './layout/hash';
import alert from './component/alert'
import './style/layout.css'
import './style/navItem.css'

import dialog from './component/dialogForPage';

import viewRender from './component/renderView'

window.dialog = dialog;
window.alert = alert;

var path = null;

try {
    path = location.hash.split("?")[0].split("#")[1];
} catch (error) {
    console.error(error);
};

if (path) {
    // 加载路由并渲染
    var contentItem = viewRender($('#layout-content'), path, {});
    $('#layout-content').css({
        background: '#fff'
    });
    // 更改通用样式中的内边距
    contentItem.$el.css({
        'padding': 0,
    });
} else {
    // 初始化页面框架
    window.layout = layoutForMain;
    layout.main.init();
    // 框架渲染
};

window.addEventListener('hashchange', function () {
    var path = location.hash.split("?")[0].split("#")[1];
    $('#layout-content').empty();

    // 加载路由并渲染
    var contentItem = viewRender($('#layout-content'), path, {});

    // 更改通用样式中的内边距
    contentItem.$el.css({
        'padding': 0,
    });
});