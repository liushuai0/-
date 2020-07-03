### 安装运行说明

需要安装nodejs  8.0+
安装 npm install 或 cnpm install
运行 npm run dev
打包 npm run build

打包后路径 /dist


### 路由配置相关 （router config）

```javascript
    '/login': {
		// 路由地址
		// 带参数路由配置 
		// '/login/:userid'
		// 参数将以 params.query 格式带入页面参数中
	
        title: '登录',  // 标题 （ tab标签上显示的名称 ）
		
        path: 'login',  // 文件夹路径 （跟目录路径 /src/view/login ）
		// 多级文件夹示例
		// 'index/page1' => '/src/view/login/page1'

		
		name: 'login',  // 引入文件夹内文件名称 对应上方文件夹内的文件名称
		// 输出的路径
		// => /src/view/login/login.js
		// => /src/view/login/login.html
		// => /src/view/login/login.css
		
        service: ['login'], // 合并api目标
		// 合并api路径目标
		// => /src/service/login.js
		
        activeId: null, // 导航焦点ID
		// 设置为null，则忽略焦点目标（不显示焦点）
		// 多级别导航对应焦点  '一级导航ID - 二级导航ID - 三级导航ID - ...'
		// 示例  'index-page-login-...'
    },
```

### 导航配置相关 （menu config）

##### 导航配置
第一级别为主导航
余下级别 显示为左侧导航菜单

```javascript
	{
        class: 'nav_1',  	  // 为导航添加特定的class
        text: '主页', 		// 导航上显示的文字
        activeId: 'index',	  // 导航焦点ID （注：导航ID不能重复）
        path: '/index',		  // 导航点击时切换的路由
    }, {
        class: 'nav_2',
        text: '业务管理',
        activeId: 'business',
        path: '/business',
        subItems: [{		// 多级别导航示例，可以无限极嵌套
            text: '业务受理',
            activeId: 'accept',
            path: '/mission',
        }, {
            text: '待办业务',
            activeId: 'await',
            path: '/mission',
        }
		...
		],
    }
```
##### 导航样式

左侧导航样式按照嵌套深度，每层深度自动增加class '.depth-嵌套级别' 
交单状态的导航 自动增加class '.active'
```css
/* 第一层active */
#subMenu .depth-1 .submenu-title { height: 43px; line-height: 43px;}
#subMenu .depth-1 .submenu-title .submenu-button { height: 43px; width: 43px; }
#subMenu .depth-1 .submenu-title.active { background: #f8f8f8; color: #009688; }
#subMenu .depth-1 .submenu-title.active >.submenu-button i { color: #999;}
#subMenu .depth-1 .submenu-title.active::before { content: ''; position: absolute; width: 5px; height: 100%; background: #009688; left: 0; top: 0; }
```

### 接口相关 (api config)

```javascript
// 封装 ajax 接口
import request from '../component/ajax';

// 接口实体
var login = function (data, success) {
    request.get({
        url: '/login',
        success: function (res) {
            success(res);
        },
    });
};

export default {
	// 接口输出方法
    login: login, // 登录
}

```
### 页面相关 （page config）

```javascript
// 当页面由导航跳转来时

module.exports = {
    render: function (template, params, linkTo/closeEvent) {
		// template 参数为 当前页面的 html 的 jquery 对象
		// template 可以直接进行 jquery 对象操作
		
		template.find('#dialog').click(function () {
			config.log('点击事件');
        });
		
		// params 参数为页面传递数据
		// params.data  页面跳转时带入参数 
		// params.api   由路由配置的Api接口集合
		// params.query 路由传递参数
		
		// linkTo/closeEvent
		// linkTo 为由路由跳转时传递的方法，
		// 调用方法将跳转到其他页面，并自动增加对应路由的 tab 标签
		// 示例
		// linkTo(path, data)
	    // path : 路由地址
		// data : 页面跳转时带入的自定义参数
		
		// closeEvent
		// closeEvent 为dialog打开时关闭dialog的方法；
		// 方法将调用 dialog传入的 onClose 方法，并关闭弹出框。将会传递最多7个参数
		// 点击dialog 的关闭按钮也将调用 dialog传入的 onClose 方法，但不会传递任何参数
		
        console.log(params);

    },
    destroy: function () {

    },
}

```

### ajax 配置参数

```javascript
// {options} 参数设置
{
    // 请求地址
    url : '/api/user/login',  
 
    // 请求参数   注 ： GET，DELETE 方法忽略此项  
    data : {}                  
 
    // loading 选项 ，
    // false 为使用loading ，默认对象为 $('body')
    // true 为不使用loading （默认值）
    // $(element) 传入jquery元素对象，可在对应元素中使用 loading。（不常用）
    loading : false,             
 
    // 是否传入 Token （ 默认为false, 登录/注册等接口不需要token验证则 传入 false ）
    // 注 : token  自动取值 
    // 取值来源  _storage.get('token');
    useToken : true,          
 
    // 开发时使用的接口调用设置，
    // 自动调用 _request.develop.urlList 中缓存的接口对象。
    // 设置方法 _request.develop.urlList['8081'] = 'http://192.168.1.125:8081'
    // 调用时，url自动加入 'http://192.168.1.125:8081'。
    // 注 ：请在对应项目的 developConfig.js 进行统一设置，部署到生产环境时，进行注释
    devUrl : '80',
 
    // 请求成功 回调函数
    success : function (res) {  
        // res 为 返回值对象
        doSameThing(res);
    },
 
    // 请求失败 回调函数 （可忽略，忽略则使用默认error进行判断）
    error : function (res) {    
        // res 为 返回值对象
        doSameThing(res);
    },
}

// 极简示例
_request.POST({
    url : '/api',
    data : {},
    success : function (res) {  
        doSameThing(res);
    },
});

```


### 路由弹出框设置 （dialog）


```javascript
dialog({
	path: '/mission',
	// path 参数直接调用路由
	
	params: {
		a: 'a',
		callback: function (a) {
			console.log(a);
		},
	},
	// 自定义传参，可以传递方法
	
	title: '测试',
	// 弹出框标题
	
	onClose: function () { },
	// 参数框关闭方
	 
	
});
```















