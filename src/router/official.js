////////////////////////////////////////////////
// 公文系统路由配置
// 刘帅
// 2020-06-22 11:56:27
////////////////////////////////////////////////
export default {

     //--------------发文管理------------------
    '/official/dispatch/startBox/startBox': {
        title: '发文拟文',
        path: 'official/dispatch/startBox/startBox',
        api: ['startBox'],
    },
    '/official/dispatch/inBox/inBox': {
        title: '待办发文',
        path: 'official/dispatch/inBox/inBox',
        api: ['inBox'],
    },
    '/official/dispatch/endBox/endBox': {
        title: '已办发文',
        path: 'official/dispatch/endBox/endBox',
        api: ['endBox'],
    },
    '/official/dispatch/draftBox/draftBox': {
        title: '发文草稿箱',
        path: 'official/dispatch/draftBox/draftBox',
        api: ['draftBox'],
    },
    '/official/dispatch/otherPage/detail': {
        title: '业务办理',
        path: 'official/dispatch/otherPage/detail',
        api: ['asdf'],
    },

    //--------------收文管理------------------
    '/official/receive/startBox/startBox': {
        title: '收文登记',
        path: 'official/receive/startBox/startBox',
        api: ['startBox'],
    },
    '/official/receive/inBox/inBox': {
        title: '待办收文',
        path: 'official/receive/inBox/inBox',
        api: ['inBox'],
    },
    '/official/receive/endBox/endBox': {
        title: '已办收文',
        path: 'official/receive/endBox/endBox',
        api: ['endBox'],
    },
    '/official/receive/draftBox/draftBox': {
        title: '收文草稿箱',
        path: 'official/receive/draftBox/draftBox',
        api: ['draftBox'],
    },

     //--------------公文传输------------------
    '/official/transfer/transmit/transmit': {
        title: '公文转发',
        path: 'official/transfer/transmit/transmit',
        api: ['transmit'],
    },
    '/official/transfer/receive/receive': {
        title: '公文接收',
        path: 'official/transfer/receive/receive',
        api: ['receive'],
    },
    '/official/transfer/pass/pass': {
        title: '查看传阅',
        path: 'official/transfer/pass/pass',
        api: ['pass'],
    },

    //--------------档案管理------------------
    '/official/profile/profile/profile': {
        title: '档案管理',
        path: 'official/profile/profile/profile',
        api: ['profile'],
    },
    
    //--------------公文配置------------------
    '/official/configuration/symbol/symbol': {
        title: '文号管理',
        path: 'official/configuration/symbol/symbol',
        api: ['symbol'],
    },
    '/official/configuration/red/red': {
        title: '套红模板管理',
        path: 'official/configuration/red/red',
        api: ['red'],
    },

    //--------------公文查询------------------
    '/official/query/query/query': {
        title: '公文查询',
        path: 'official/query/query/query',
        api: ['doc_query'],
    },
    '/official/query/supervise/supervise': {
        title: '督查督办',
        path: 'official/query/supervise/supervise',
        api: ['supervise'],
    },

    //--------------公文统计------------------
    '/official/statistics/statistics/statistics': {
        title: '公文统计',
        path: 'official/statistics/statistics/statistics',
        api: ['statistics'],
    },
  

}