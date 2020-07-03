import request from '../component/ajax';
import session from '../component/session';


var getFlowDefList = function (success) {
    request.post({
        url: '/renren-admin/workflow/getFlowDefList',
        devUrl: 'renrenService',
        token: 'renren',
        success: function (res) {
            success(res);
        },
    });
};


var renderGetFlowDefList = function (successs) {

    getFlowDefList(function (res) {
        var data = res.data;
        var typeNameArray = [];
        var typeData = {};
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let _data = null;

            element.label = element.flowname;
            element.value = element.flowname;

            if (element.typename && !typeData.hasOwnProperty(element.typename)) {
                typeData[element.typename] = [];


                typeNameArray.push(element.typename);
                typeData[element.typename].push(element)
            } else if (element.typename && typeData.hasOwnProperty(element.typename)) {
                typeData[element.typename].push(element)
            } else {
                if (!typeData.hasOwnProperty('其他')) {
                    typeData['其他'] = [];
                };
                typeData['其他'].push(element)
            };
        };
        if (typeData.hasOwnProperty('其他')) {
            typeNameArray.push('其他');
        };


        var renderData = [];

        for (let i = 0; i < typeNameArray.length; i++) {
            const element = typeNameArray[i];
            if (element == '其他') {
                var data = {
                    label: element,
                    value: 'other',
                    children: typeData[element],
                };
            } else {
                var data = {
                    label: element,
                    value: element,
                    children: typeData[element],
                };
            }

            renderData.push(data);
        }





        successs(renderData);
    });
};




var getTodoList = function (data, success) {
    request.post({
        url: '/natureResource/manage/getTodoList',
        devUrl: 'affairService',
        loading: false,
        token: 'renren',
        query: {
            page: data.page,
            limit: data.limit,
        },
        data: {
            userId: session.get('userInfo').id,
            startTime: data.startTime,
            endTime: data.endTime,
            xmbh: data.xmbh,
            xmmc: data.xmmc,
        },
        success: function (res) {
            success(res);
        },
    });
};




var getDoneList = function (data, success) {
    request.post({
        url: '/natureResource/manage/getDoneList',
        devUrl: 'affairService',
        loading: false,
        token: 'renren',
        query: {
            page: data.page,
            limit: data.limit,
        },
        data: {
            userId: session.get('userInfo').id,
            startTime: data.startTime,
            endTime: data.endTime,
            xmbh: data.xmbh,
            xmmc: data.xmmc,
        },
        success: function (res) {
            success(res);
        },
    });
};

var getDraftList = function (data, success) {
    request.post({
        url: '/natureResource/manage/getDraftList',
        devUrl: 'affairService',
        loading: false,
        token: 'renren',
        query: {
            page: data.page,
            limit: data.limit,
        },
        data: {
            userId: session.get('userInfo').id,
            startTime: data.startTime,
            endTime: data.endTime,
            xmbh: data.xmbh,
            xmmc: data.xmmc,
        },
        success: function (res) {
            success(res);
        },
    });
};


// var startWork = function (data, success) {
//     request.post({
//         url: '/renren-admin/workflow/createAndOpen',
//         data: {
//             "accessToken": session.get('huizheng-token'),
//             "flowId": data.flowId,
//             "title": data.title + '_' + new Date().format('yyyyMMddhhmmss') + '_' + session.get('userInfo').username,
//             "buttonName": '提交',
//             "operateFlag": '1',
//         },
//         devUrl: 'renrenService',
//         success: function (res) {
//             success(res);
//         },
//     });
// };

export default {
    getTodoList: getTodoList, //获取待办业务列表
    getFlowDefList: getFlowDefList, // 获取业务受理列表
    getDoneList: getDoneList, // 获取已办列表
    getDraftList: getDraftList, // 获取草稿箱列表
    renderGetFlowDefList: renderGetFlowDefList,

    // startWork: startWork,
}