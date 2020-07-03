import viewRender from '../layout/renderView';
import router from '../layout/router';

export default function (template, path, routerOption) {
    var route = router(path, routerOption);
    var contentItem = viewRender(route, {});
    contentItem.render.call(contentItem, template);
    return contentItem;
};