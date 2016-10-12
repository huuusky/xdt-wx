/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/sheet-metal/template.html", "text!assets/svg/car.svg", "router"], function (template, svg, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: {
            price: 0, // 喷漆部位参考价格
            selectedParts: [], // 已选择的部位
            $totalMoney: null // 底部总金额
        },
        render: function (parts, price) {
            var compiled = _.template(template);
            $(this.el).html(compiled({svg: svg}));

            this.varCache.price = price;
            this.varCache.$totalMoney = $("#total-money");
            console.info("sheet-metal module rendering finished! --- View:render");
        }
    });
});
