import table from '../../../../component/table'

// var setIntervalObject = {};

module.exports = {
    render: function (template, params, EVENT) {
        // var runTime = function (id, limittime, sendTime) {
        //     var send = new Date(sendTime).getTime();
        //     var limitString = parseInt(limittime) * 1000 * 60 * 60 * 24;
        //     var limit = send + limitString;
        //     setTimeout(function () {
        //         checkTime(limit, id);
        //     }, 10);

        //     setIntervalObject[id] = setInterval(() => {
        //         checkTime(limit, id);
        //         console.log('Timer');
        //     }, 1000);
        // };

        // var checkTime = function (limit, id) {
        //     var today = new Date().getTime();
        //     if (limit > today) {
        //         var today = new Date().getTime();
        //         var day = parseInt((limit - today) / (1000 * 60 * 60 * 24));
        //         var hour = parseInt((limit - today - (day * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //         var minute = parseInt((limit - today - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60)) / (1000 * 60));
        //         var second = parseInt((limit - today - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60) - (minute * 1000 * 60)) / 1000);
        //         template.find('#' + id).text('剩余' + day + '日' + hour + '时' + minute + '分' + second + '秒');
        //     } else {
        //         var today = new Date().getTime();
        //         var day = parseInt((today - limit) / (1000 * 60 * 60 * 24));
        //         var hour = parseInt((today - limit - (day * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //         var minute = parseInt((today - limit - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60)) / (1000 * 60));
        //         var second = parseInt((today - limit - (day * 1000 * 60 * 60 * 24) - (hour * 1000 * 60 * 60) - (minute * 1000 * 60)) / 1000);
        //         template.find('#' + id).text('超期' + day + '日' + hour + '时' + minute + '分' + second + '秒');
        //     };
        // };

        // var clearTimes = function () {
        //     for (const key in setIntervalObject) {
        //         if (setIntervalObject.hasOwnProperty(key)) {
        //             const element = setIntervalObject[key];
        //             clearInterval(element);
        //         }
        //     };
        // };

        var tableEx = new table({
            height: this.$el.find('.await').height(),
            where: [
                { text: '项目名称:', type: 'input', placeholder: '请输入', key: 'xmmc' },
                { text: '项目编号:', type: 'input', placeholder: '请输入', key: 'xmbh' },
                { text: '起止时间:', type: 'date ~ date', placeholder: '请输入', key: 'startTime/endTime' },
            ],
            whereButtons: [
                { name: '查询', class: "layui-search", event: 'search' },
                { name: '重置', class: "layui-reset", event: 'reset' },
            ],
            rightButtion: [
                { icon: "cloud-icon-refresh", name: "刷新", event: 'refresh' }
            ],
            tableButtons: [
                {
                    key: 'detail', name: '查看', icon: 'cloud-icon-table-view', event: function (data) {
                        var _data = {
                            flowid: data.flowid,
                            workid: data.workid,
                            trackid: data.trackid,
                            nodeid: data.nodeid,
                            readonly: false,
                        };
                        dialog({
                            top: '30px',
                            width: '85%',
                            height: '95%',
                            path: '/mission/' + data.flowid + '/await',
                            params: _data,
                            title: data.flowname,
                            events: {},
                            onClose: function () {
                                tableEx.search(tableEx);
                            },
                        });
                    }
                }
            ],
            cols: [
                { type: 'numbers', title: '序号' },
                {
                    field: 'trackstatus', align: 'center', title: '状态', width: 80, templet: function (d) {
                        var html = '';
                        switch (d.trackstatus) {
                            case "110":
                                html = '<span class="trackstatus" style="backround:#22C7C9">正<i></i>常</span>';
                                break;
                            // case "120":
                            //     html = '<span class="trackstatus" style="backround:#cc6600">会<i></i>签</span>';
                            //     break;
                            case "130":
                                html = '<span class="trackstatus" style="backround:#F9AD58">被驳回</span>';
                                break;
                            case "140":
                                html = '<span class="trackstatus" style="backround:#006699">挂<i></i>起</span>';
                                break;
                            // case "150":
                            //     html = '<span class="trackstatus" style="backround:#868686">撤<i></i>办</span>';
                            //     break;
                            // case "160":
                            //     html = '<span class="trackstatus" style="backround:#f8ac59">子流程</span>';
                            //     break;
                            case "170":
                                html = '<span class="trackstatus" style="backround:#878787">办<i></i>结</span>';
                                break;
                            case "180":
                                html = '<span class="trackstatus" style="backround:#878787">终<i></i>止</span>';
                                break;
                            // case "190":
                            //     html = '<span class="trackstatus style="backround:#006699"">拿<i></i>回</span>';
                            //     break;
                            default:
                                html = '<span></span>';
                                break;
                        };
                        return html
                    }
                },
                { field: 'xmmc', align: 'center', title: '项目名称' },
                { field: 'nodename', align: 'center', title: '当前环节', width: 100 },
                { field: 'xmbh', align: 'center', title: '项目编号', edit:true, width: 120 },
                { field: 'flowname', align: 'center', title: '业务类型' },
                { field: 'sendtime', align: 'center', title: '接收时间', width: 200 },
                {
                    field: 'limittime', align: 'center', title: '剩余天数', width: 200,
                },
                // {
                //     field: 'limittime', align: 'center', title: '剩余天数', width: 200, templet: function (d) {
                //         runTime(d.id, d.limittime, d.sendtime);
                //         return '<span id="' + d.id + '"></span>';
                //     }
                // },
                { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: true, }
            ],
            getEvent:  (data, setData)=> {
                this.$api.getTodoList({
                    page: data.index,
                    limit: data.limit,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    xmbh: data.xmbh,
                    xmmc: data.xmmc,
                }, function (res) {
                    // clearTimes();
                    setData({
                        count: res.count,
                        data: res.data,
                    });
                });
            }
        });

        this.$el.find('.await').append(tableEx.render());
        // EVENT.onActive(function () {
        //     tableEx.search(tableEx);
        // });

        // var table = template.find('#table');
        // var tableEvent = null;

        // var index = 1;
        // var limit = 15;


        // var pageOption = {
        //     elem: template.find('#paging')[0]
        //     , count: 0
        //     , limit: 1
        //     , limits: [15, 30, 50]
        //     , groups: 3
        //     , layout: ['prev', 'page', 'next', 'skip', 'count', 'limit']
        //     , prev: '<i class="fa fa-angle-left" aria-hidden="true"></i>'
        //     , next: '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        //     , jump: function (obj, first) {
        //         index = obj.curr;
        //         limit = obj.limit;
        //         if (!first) {
        //             renderdata();
        //         };
        //     }
        // };
        // layui.laydate.render({
        //     elem: template.find('#startDate')[0]
        //     , range: '~' //或 range: '~' 来自定义分割字符
        // });

        // template.find('#search').click(function () {
        //     index = 1;
        //     limit = 15;
        //     renderdata();
        // });

        // template.find('#reset').click(function () {
        //     template.find('#nameId').val('');
        //     template.find('#deptId').val('');
        //     template.find('#startDate').val('');
        //     index = 1;
        //     limit = 15;
        //     renderdata();
        // });

        // template.find('#refresh').click(function () {
        //     renderdata();
        // });

        // tableEvent = layui.table.render({
        //     elem: table[0]
        //     , height: template.height() - 200
        //     , text: {
        //         none: '暂无相关数据'
        //     }
        //     , limit: limit
        //     , cols: [[
        //         { type: 'numbers' },
        //         { field: 'title', align: 'center', title: '项目名称' },
        //         { field: 'nodename', align: 'center', title: '当前环节', width: 100 },
        //         { field: 'xmbh', align: 'center', title: '项目编号', width: 120 },
        //         { field: 'flowname', align: 'center', title: '业务类型' },
        //         { field: 'sendtime', align: 'center', title: '接收时间', width: 180 },
        //         { field: 'limittime', align: 'center', title: '剩余天数', width: 100 },
        //         { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: template.find('#awaitButtons')[0], }
        //     ]]
        // });

        // //监听行工具事件
        // layui.table.on('tool(await)', function (obj) {
        //     var layEvent = obj.event;
        //     console.log(layEvent);
        //     console.log(obj.data);
        //     if (layEvent === 'detail') {
        //         dialog({
        //             width: '90%',
        //             top: '30px',
        //             height: '80%',
        //             path: '/mission/' + obj.data.flowid + '/await',
        //             params: obj.data,
        //             title: obj.data.flowname,
        //             events: {},
        //             onClose: function () {
        //                 renderdata();
        //             },
        //         });
        //     };
        // });

        // var renderdata = function () {
        //     var DateArray = template.find('#startDate').val().split(' ~ ');
        //     params.api.getTodoList({
        //         page: index,
        //         limit: limit,
        //         startTime: DateArray[0],
        //         endTime: DateArray[1] ? DateArray[1] : '',
        //         xmbh: template.find('#nameId').val(),
        //         xmmc: template.find('#deptId').val(),
        //     }, function (res) {
        //         tableEvent.reload({
        //             data: res.data,
        //             limit: limit
        //         });
        //         pageOption.count = res.count;
        //         pageOption.limit = limit
        //         layui.laypage.render(pageOption);
        //     })

        // };

        // EVENT.onActive(function () {
        //     renderdata();
        // });
        // renderdata();
    },
    destroy: function () {
        // for (const key in setIntervalObject) {
        //     if (setIntervalObject.hasOwnProperty(key)) {
        //         const element = setIntervalObject[key];
        //         clearInterval(element);
        //         delete setIntervalObject[key];
        //     }
        // };
    },
}