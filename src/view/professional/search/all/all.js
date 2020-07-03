import renderView from '../../../../component/renderView'


var destroyEvent = function () { };

module.exports = {
    render: function (template, params, event) {
        renderView(this.$el, '/search/event/0/0/0/0', {
            from: true,
        });
    },
    destroy: function () {

    },
}