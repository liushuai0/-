import table from '../../../../component/table'


module.exports = {
    render: function (template, params, EVENT) {

        var tableEx = new table({
            height: this.$el.find('.query').height(),
            where: [
                { text: '公文标题:', type: 'input', placeholder: '请输入公文标题', key: 'officialTitle' },
                { text: '文号:', type: 'input', placeholder: '请输入文号', key: 'symbol' },
                {
                    text: '类型', type: 'select', label: 'key', value: 'value', placeholder: '请选择类型', key: 'dispatchReceiptType', data: [{ 'key': '发文', 'value': '1' }, { 'key': '收文', 'value': '2' }],
                },
                { text: '创建时间:', type: 'date ~ date', placeholder: '请选择登记时间', key: 'startTime/endTime' },
                {
                    text: '审批状态', type: 'select', label: 'key', value: 'value', placeholder: '请选择', key: 'isOver', defaultValue: 2, data: [{ 'key': '已完成', 'value': 2 }, { 'key': '未完成', 'value': 1 }, { 'key': '草稿', 'value': 3 }],
                },

            ],
            whereButtons: [
                { name: '查询', class: "layui-search", event: 'search' },
                { name: '重置', class: "layui-reset", event: 'reset' },
            ],
            rightButtion: [
                { icon: "cloud-icon-refresh", name: "导出", event: 'refresh' }
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
                            path: '/official/dispatch/otherPage/detail',
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
                { type: 'numbers', field: 'id', title: '序号', width: 60 },
                {
                    field: 'dispatchReceiptType', title: '类型', align: 'center', sort: false, width: 90, templet: function (data) {
                        return data.dispatchReceiptType == '1' ? '发文' : "收文"
                    }
                },
                { field: 'officialTitle', title: '公文标题', align: 'center', sort: false },
                {
                    field: 'symbol', title: '文号', width: 350, align: 'center', sort: false, templet(d) {
                        if (d.dispatchReceiptType == 1) {
                            let symbolRule = d.symbol
                            if (symbolRule != null && symbolRule.split(",") && symbolRule.split(",")[1]) {
                                return symbolRule.split(",")[0] + "〔" + symbolRule.split(",")[1] + "〕" + symbolRule.split(",")[2] + symbolRule.split(",")[3]
                            } else {
                                return ''
                            }
                        } else {
                            return d.symbol ? d.symbol : '';
                        };
                    }
                },
                { field: 'createDate', title: '创建时间', align: 'center', width: 180, sort: true },
                { fixed: 'right', title: '操作', align: 'center', width: 200, toolbar: true, }
            ],
            getEvent: (data, setData) => {
                console.log(data);

                this.$api.getQueryTable({
                    page: data.index,
                    limit: data.limit,
                    createDate: data.startTime,
                    endDate: data.endTime,
                    officialTitle: data.officialTitle,
                    symbol: data.symbol,
                    dispatchReceiptType: data.dispatchReceiptType,
                    isOver: data.isOver,

                }, function (res) {
                    setData({
                        count: res.count,
                        data: res.data,
                    });

                });
            }
        });

        this.$el.find('.query').append(tableEx.render());

    },
    destroy: function () {

    },
}