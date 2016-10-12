/**
 * Created by LiKun on 2016/5/26.
 */
(function () {
    "use strict";
    
    requirejs.config({
        baseUrl: "./",
        paths: {
            jquery: "scripts/lib/zepto",
            underscore: "scripts/lib/underscore",
            backbone: "scripts/lib/backbone",
            localstorage: "scripts/lib/backbone.localStorage",
            text: "scripts/lib/text",
            wx: "scripts/lib/jweixin-1.0.0"
        },
        shim: {
            jquery: {
                exports: "$"
            },
            underscore: {
                exports: "_"
            },
            backbone: {
                deps: ["jquery", "underscore"],
                exports: "Backbone"
            }
        }
    });

    require(["backbone", "router"], function () {
        Backbone.history.start();
    });
})();
