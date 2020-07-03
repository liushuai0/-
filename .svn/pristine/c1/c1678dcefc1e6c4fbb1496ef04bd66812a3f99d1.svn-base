

module.exports = {
    render: function (template, params, service) {

        this.$api.getFlowDefList(function (res) {
            // console.log(res);
            renderList(res.data)
        });

        var item = function (data) {
            this.data = data;
            this.html = $('<div class="list-item">' +
                '<i class="fa fa-pencil-square-o"></i>' +
                '<div class="list-item-title">' + data.flowname + '</div>' +
                '<div class="list-item-text"></div>' +
                '</div>');
            var _this = this;
            this.html.click(function () {
                _this.onClick();
            });

        };

        item.prototype.onClick = function () {
            dialog({
                top: '30px',
                width: '85%',
                height: '95%',
                path: '/mission/' + this.data.flowid + '/accept',
                params: this.data,
                title: this.data.flowname,
                events: {},
            });
        };

        var list = (name) => {
            return $('<div class="list">' +
                '    <div class="list-title">' + name + '</div>' +
                '    <div class="line"></div>' +
                '    <div class="list-box"></div>' +
                '</div>');
        }

        var renderList = (data) => {
            var typeNameArray = [];
            var typeData = {};
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                let _data = null;
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


            for (let index = 0; index < typeNameArray.length; index++) {
                const element = typeNameArray[index];


                var listBox = list(element);

                for (let i = 0; i < typeData[element].length; i++) {


                    const _element = typeData[element][i];

                    //    if(_element.flowid=='ddxzjsydspsj'||_element.flowid=='gyjsydzpgsj'||_element.flowid=='jsxmydyssj'||_element.flowid=='gyjsydhb'||_element.flowid=='csfpcjsxmspsj'||_element.flowid=='gyjsydsyqxycr'||_element.flowid=='bbydsx'){

                    //    }else{
                    listBox.find('.list-box').append(new item(_element).html);
                    //    }

                };
                this.$el.find('.accept').append(listBox);
            }
        };

        // console.log(template, params, service);
    },
    destroy: function () {

    },
}