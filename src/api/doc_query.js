import request from '../component/ajax';
import session from '../component/session';


var getQueryTable = function (data, success) {
    request.post({
        url: '/ysjgw/dispatchReceiptInfo/selectDispatchl',
        devUrl: 'affairService',
        contentType: 'text',
        query: {
            page: data.page,
            limit: data.limit
        },
        data: data,
        success: function (res) {
            console.log(res);

            success(res);
        },
    });
};



export default {

    getQueryTable: getQueryTable, // 获取公文查询表格

}