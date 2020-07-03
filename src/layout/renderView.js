import service from '../api/index'
import util from '../component/util'

var creatContentObject = function (_objcet, events) {
    var $parent = null;

    var id = util.uuid();

    // 防止组件重复加载，克隆路由对象
    var objcet = util.clone(_objcet);

    var view = function () { };
    view.prototype.$query = objcet.query;
    view.prototype.$data = objcet.data;
    view.prototype.$route = objcet.route;

    // 缓存path
    view.prototype.$path = objcet.path;

    view.prototype.$id = id;
    view.prototype._template = objcet.route.template;
    for (const key in objcet.route.event) {
        if (objcet.route.event.hasOwnProperty(key)) {
            const element = objcet.route.event[key];
            if (key != 'render' || key != 'destroy') {
                view.prototype[key] = element
            };
        }
    };

    for (const key in events) {
        if (events.hasOwnProperty(key)) {
            const element = events[key];
            view.prototype[key] = element
        }
    };

    view.prototype.$render = objcet.route.event.render;
    view.prototype.$destroy = objcet.route.event.destroy || function () { };
    view.prototype.$api = service.get(objcet.route.api);

    // 扩展对象渲染方法
    view.prototype.render = function (parent) {
        $parent = parent
        // this.$parent = parent;
        view.prototype.$el = $('<div class="layout-template-view">' + this._template + '</div>');
        $parent.append(this.$el);
        setTimeout(() => {
            this.$render.apply(this);
        }, 10);
    };

    // 扩展对象注销方法
    view.prototype.destroy = function () {
        this.$destroy.apply(this);
        this.$el.remove();
    };

    view.prototype.reload = function () {
        this.destroy();
        this.render($parent);
    };

    return new view();
};

export default creatContentObject
