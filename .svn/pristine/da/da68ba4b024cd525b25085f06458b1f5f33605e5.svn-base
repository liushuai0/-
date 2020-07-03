import calendar from "./calendar"
import tableComponent from "../../component/table";


module.exports = {
    render: function (params, linkTo, request, closeEvent) {
        var table = layui.table;
        var _this = this;
        var toDoListSum = 0;
        var doneListSum = 0;
        var tableExToDo = new tableComponent({
            height: _this.$el.find('#toDoList').height() + 40,
            limit: 4,
            paging: {
                limits: [4, 8, 12],
            },
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
                                tableExToDo.search(tableExToDo);
                            },
                        });
                    }
                }
            ],
            cols: [
                { field: 'xmmc', align: 'center', title: '项目名称' },
                { field: 'nodename', align: 'center', title: '当前环节', width: 200 },
                { field: 'xmbh', align: 'center', title: '项目编号', width: 150 },
                { field: 'sendtime', align: 'center', title: '接收时间', width: 200 },
                { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: true, }
            ],
            getEvent: function (data, setData) {
                _this.$api.getTodoList({
                    page: data.index,
                    limit: data.limit,
                    startTime: null,
                    endTime: null,
                    xmbh: null,
                    xmmc: null,
                }, function (res) {
                    setData({
                        count: res.count,
                        data: res.data,
                    });
                    toDoListSum = res.count;
                    _this.$el.find('#toDoListSum').text("( " + toDoListSum + " ) ");
                });
            }
        });
        _this.$el.find('#toDoList').append(tableExToDo.render());
        tableExToDo.headerBox.css({
            display: 'none'
        });
        tableExToDo.pagingElement.css({
            'margin': '-2px 0 0 0',
        })
        table.on('rowDouble(' + tableExToDo.tableId + ')', function (obj) {
            dialog({
                top: '30px',
                width: '85%',
                height: '95%',
                path: '/mission/' + obj.data.flowid + '/await',
                params: obj.data,
                title: obj.data.flowname,
                events: {},
                onClose: function () {
                    tableExToDo.search(tableExToDo);
                },
            });
        })
        var tableExDone = new tableComponent({
            height: _this.$el.find('#doneList').height() + 40,
            limit: 4,
            paging: {
                limits: [4, 8, 12],
            },
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
                                tableExDone.search(tableExDone);
                            },
                        });
                    }
                }
            ],
            cols: [
                { field: 'xmmc', align: 'center', title: '项目名称' },
                { field: 'nodename', align: 'center', title: '当前环节', width: 200 },
                { field: 'xmbh', align: 'center', title: '项目编号', width: 150 },
                { field: 'sendtime', align: 'center', title: '接收时间', width: 200 },
                { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: true, }
            ],
            getEvent: function (data, setData) {
                _this.$api.getDoneList({
                    page: data.index,
                    limit: data.limit,
                    startTime: null,
                    endTime: null,
                    xmbh: null,
                    xmmc: null,
                }, function (res) {
                    setData({
                        count: res.count,
                        data: res.data,
                    });
                    doneListSum = res.count;
                    _this.$el.find('#doneListSum').text("( " + doneListSum + " ) ");
                });
            }
        });
        _this.$el.find('#doneList').append(tableExDone.render());




        tableExDone.headerBox.css({
            display: 'none'
        });


        tableExDone.pagingElement.css({
            'margin': '-2px 0 0 0',
        })


        table.on('rowDouble(' + tableExDone.tableId + ')', function (obj) {
            dialog({
                top: '30px',
                width: '85%',
                height: '95%',
                path: '/mission/' + obj.data.flowid + '/await',
                params: obj.data,
                title: obj.data.flowname,
                events: {},
                onClose: function () {
                    tableExDone.search(tableExToDo);
                },
            });
        });
        var myChart_cm1 = echarts.init(_this.$el.find('#chart_main1')[0], 'infographic');
        myChart_cm1.showLoading({
            text: '正在加载数据'
        });
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 'left',
                // data: ['建设用地', '储备管理', '征地管理', '执法监察', '公文管理', '矿产管理', '开发整理', '规划管理', '土地供应']
            },
            series: [
                {
                    name: '业务统计',
                    type: 'pie',
                    radius: '70%',
                    center: ['30%', '50%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    // data: [
                    //     { value: 335, name: '建设用地' },
                    //     { value: 310, name: '储备管理' },
                    //     { value: 234, name: '征地管理' },
                    //     { value: 135, name: '执法监察' },
                    //     { value: 135, name: '公文管理' },
                    //     { value: 135, name: '矿产管理' },
                    //     { value: 135, name: '开发整理' },
                    //     { value: 135, name: '规划管理' },
                    //     { value: 1548, name: '土地供应' }
                    // ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.$api.getChartData(function (res) {
            var _array = [];
            var _name = [];
            for (var i = 0; i < res.data.length; i++) {
                var element = res.data[i];
                _array.push({
                    name: element.TYPE,
                    value: element.NUM
                });
                _name.push(element.TYPE);
            }
            option.series[0].data = _array;
            option.legend.data = _name;
            myChart_cm1.setOption(option);
            myChart_cm1.hideLoading();
        });
        var _calendar = new calendar();
        _this.$el.find('#test-n1').append(_calendar.render());
        _calendar.renderDayslist('2020', '6');
    }
};