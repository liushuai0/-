import table from '../../../component/table'
// import select from '../../component/from/select'



module.exports = {
    render: function (template, params, event) {
        var _this = this;

        console.log(_this);

        this.$api.renderGetFlowDefList(function (res) {
            var fromType = _this.$data.from;


            var tableOption = {
                height: _this.$el.height(),
                where: [
                    { text: '', type: 'input', placeholder: '请输入项目名称或项目编号', key: 'projectNameOrNum' },
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
                                readonly: true,
                            };
                            if (fromType) {
                                dialog({
                                    width: '80%',
                                    top: '50px',
                                    height: '90%',
                                    path: '/mission/' + data.flowid + '/await',
                                    params: _data,
                                    title: data.flowname,
                                    events: {},
                                    onClose: function () {
                                        tableEx.search(tableEx);
                                    },
                                });
                            } else {
                                dialog({
                                    width: '85%',
                                    top: '30px',
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
                    { field: 'flowname', align: 'center', title: '业务类型', width: 240 },
                    { field: 'nodename', align: 'center', title: '当前环节', width: 140 },
                    { field: 'xmbh', align: 'center', title: '项目编号', width: 130 },
                    { field: 'sendtime', align: 'center', title: '受理时间', width: 180 },
                    // { field: 'limittime', align: 'center', title: '剩余天数', width: 100 },
                    { fixed: 'right', title: '操作', align: 'center', width: 120, toolbar: true, }
                ],
                getEvent: function (data, setData) {
                    // console.log(data);

                    var typename = (data.typename ? (data.typename == 'other' ? '' : data.typename) : null);
                    _this.$api.searchAll({
                        "flowname": data.flowname,
                        "typename": typename,
                        "projectNameOrNum": data.projectNameOrNum,
                        "page": data.index,
                        "limit": data.limit,
                        "prodefs": (_this.$query.prodefs == '0' ? '' : _this.$query.prodefs),
                        "userId": (_this.$query.user == '0' ? false : true),
                        "deptId": (_this.$query.dep == '0' ? false : true),
                        "status": (_this.$query.status == '0' ? '' : _this.$query.status),
                    }, function (res) {
                        setData({
                            count: res.count,
                            data: res.data,
                        });
                    });
                }
            };

            if (_this.$query.prodefs == 0) {
                tableOption.where.push({
                    text: '', type: 'select', placeholder: '请选择流程类别', key: 'typename', data: res,
                    onChange: function () {
                        if (this.value) {
                            tableEx.whereObject.flowname.elem.setData(this.valueData.children);
                        } else {
                            tableEx.whereObject.flowname.elem.setData([]);
                        }
                    }
                })
                tableOption.where.push({
                    text: '', type: 'select', placeholder: '请选择流程名称',
                    label: 'label', value: 'value', key: 'flowname', data: [],
                })
            };
            var tableEx = new table(tableOption);
            if (_this.$query.prodefs == 0) {
                tableEx.whereObject.flowname.elem.setData([]);
            };
            _this.$el.append(tableEx.render());
            // if (event.onActive) {
            //     event.onActive(function () {
            //         tableEx.search(tableEx);
            //     });
            // };
        });
    },
    destroy: function () {

    },
}