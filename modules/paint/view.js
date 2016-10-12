/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/paint/template.html", "text!assets/svg/car.svg", "router"], function (template, svg, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: {
            price: 0, // 喷漆部位参考价格
            selectedParts: [], // 已选择的部位
            $totalMoney: null, // 底部总金额
            $paintConfirm: null // 需要钣金弹出框
        },
        render: function (defaultCar, price) {
            var compiled = _.template(template);
            this.$el.html(compiled({svg: svg, defaultCar: defaultCar}));

            this.varCache.price = price;
            this.varCache.$totalMoney = $("#total-money");
            this.varCache.$paintConfirm = $("#paint-confirm");
            console.info("paint module rendering finished! --- View:render");
        },
        events: {
            "click .col[part-name]": "selectPart", // 点击部位列表
            "click .svg-part": "clickSvgPart", //点击SVG部位
            "click .svg-label": "clickSvgLabel", //点击SVG部位名字
            "click #select-all": "selectAllPart", //点击SVG部位名字
            "click #zoom-btn": "zoomPart", //点击SVG部位名字
            "click #paint-next-step-btn": "paintNextStep", //点击下一步按钮
            "click .confirm-action": "confirmAction" //点击下一步按钮
        },
        clickSvgPart: function (event) {
            var $selectedSvgPart = $(event.currentTarget);
            var partName = $selectedSvgPart.attr("name");
            var $selectedPart = $(".col[part-name=" + partName + "]");

            if ($selectedSvgPart.attr("class").indexOf("selected") > 0) {
                $selectedSvgPart.attr({"class": "svg-part", "fill": "#a2a2a2"});
                $selectedPart.removeClass("selected");
                // 删除部位
                //this.selectedParts.splice(this.selectedParts.indexOf(partName), 1);
                this.varCache.selectedParts = _.without(this.varCache.selectedParts, partName);
            } else {
                $selectedSvgPart.attr({"class": "svg-part selected", "fill": "#ff7000"});
                $selectedPart.addClass("selected");
                this.varCache.selectedParts.push(partName);
            }

            this.varCache.$totalMoney.text(this.varCache.price * this.varCache.selectedParts.length);
        },
        clickSvgLabel: function (event) {
            var $selectedSvgLabel = $(event.currentTarget);
            var labelName = $selectedSvgLabel.attr("name");
            $(".svg-part[name=" + labelName + "]").trigger("click");
        },
        selectPart: function (event) {
            var $selectedPart = $(event.currentTarget);
            var partName = $selectedPart.attr("part-name");
            $(".svg-part[name=" + partName + "]").trigger("click");
        },
        selectAllPart: function (event) {
            var $selectAllPart = $(event.currentTarget);
            if ($selectAllPart.hasClass("selected")) {
                this.varCache.selectedParts = [];
                $selectAllPart.removeClass("selected");
                $(".col[part-name]").removeClass("selected");
                $(".svg-part").attr({"class": "svg-part selected", "fill": "#a2a2a2"});
            } else {
                this.varCache.selectedParts = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"];
                $selectAllPart.addClass("selected");
                $(".col[part-name]").addClass("selected");
                $(".svg-part").attr({"class": "svg-part selected", "fill": "#ff7000"});
            }

            this.varCache.$totalMoney.text(this.varCache.price * this.varCache.selectedParts.length);
        },
        zoomPart: function (event) {
            var $zoomBtn = $(event.currentTarget);
            // 需要放大的SVG部位
            var $needZoomPart = $(".svg-part[need-zoom]");
            if ($zoomBtn.hasClass("zoomed")) {
                $zoomBtn.removeClass("zoomed");
                $needZoomPart.attr({"class": "svg-part", "stroke": "0"});
            } else {
                $zoomBtn.addClass("zoomed");
                $needZoomPart.attr({"class": "svg-part zoom", "stroke": "#fff"});
            }
        },
        paintNextStep: function () {
            // 选择的喷漆部位
            xdtGlobal.selectedParts.paintParts = this.varCache.selectedParts.sort();

            this.varCache.$paintConfirm.addClass("active");
        },
        confirmAction: function (event) {
            var $action = $(event.currentTarget);
            var isNeedSheetMetal = Boolean($action.attr("value"));

            if (isNeedSheetMetal) { // 需要钣金，跳转到钣金页面
                router.navigate("sheet-metal", {trigger: true});
            } else { // 不需要钣金，跳转到商家选择页面
                router.navigate("paint-shop-list", {trigger: true});
            }
        }
    });
});
