////////////////////////////////////////////////
// 模块化 router 加载组件
// DevSpeed
// 2020-06-09 09:59:42
////////////////////////////////////////////////


const files = require.context('.', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    if (key === './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});
var router = {};
for (const key in modules) {
    if (modules.hasOwnProperty(key)) {
        const element = modules[key];
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const item = element[key];
                router[key] = item;
            }
        }
    }
};
export default router;