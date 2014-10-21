function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function buttonBarClickHandler(e) {
        console.log("test.js -> buttonBarClickHandler() : e = " + JSON.stringify(e));
    }
    function directButtonHandler(e) {
        console.log("test.js -> directButtonHandler() : e = " + JSON.stringify(e));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "test";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.test = Ti.UI.createWindow({
        backgroundColor: "white",
        top: "20",
        id: "test"
    });
    $.__views.test && $.addTopLevelView($.__views.test);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.test.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "iOS Tabbed Bar",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    var __alloyId5 = [];
    var __alloyId9 = {
        title: "One"
    };
    __alloyId5.push(__alloyId9);
    var __alloyId10 = {
        title: "Two"
    };
    __alloyId5.push(__alloyId10);
    var __alloyId11 = {
        title: "Three"
    };
    __alloyId5.push(__alloyId11);
    $.__views.__alloyId3 = Ti.UI.iOS.createTabbedBar({
        labels: __alloyId5,
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        text: "Button Bar 1",
        id: "__alloyId12"
    });
    $.__views.__alloyId1.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createButton({
        title: "One",
        id: "__alloyId13"
    });
    $.__views.__alloyId14 = Ti.UI.createButton({
        title: "Two",
        color: "yellow",
        backgroundColor: "orange",
        selectedColor: "black",
        id: "__alloyId14"
    });
    $.__views.__alloyId15 = Ti.UI.createButton({
        title: "Three",
        id: "__alloyId15"
    });
    directButtonHandler ? $.__views.__alloyId15.addEventListener("click", directButtonHandler) : __defers["$.__views.__alloyId15!click!directButtonHandler"] = true;
    $.__views.__alloyId16 = Ti.UI.createButton({
        title: "Four",
        id: "__alloyId16"
    });
    $.__views.buttonBar1 = Alloy.createWidget("com.ksouthworth.buttonbar", "widget", {
        backgroundColor: "purple",
        id: "buttonBar1",
        buttonColor: "red",
        selectedButtonColor: "white",
        selectedButtonBackgroundColor: "blue",
        children: [ $.__views.__alloyId13, $.__views.__alloyId14, $.__views.__alloyId15, $.__views.__alloyId16 ],
        __parentSymbol: $.__views.__alloyId1
    });
    $.__views.buttonBar1.setParent($.__views.__alloyId1);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        text: "Button Bar 2",
        id: "__alloyId17"
    });
    $.__views.__alloyId1.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createButton({
        title: "One Uno",
        id: "__alloyId18"
    });
    $.__views.__alloyId19 = Ti.UI.createButton({
        title: "Two Dos",
        id: "__alloyId19"
    });
    $.__views.__alloyId20 = Ti.UI.createButton({
        title: "Three Tres",
        id: "__alloyId20"
    });
    $.__views.buttonBar2 = Alloy.createWidget("com.ksouthworth.buttonbar", "widget", {
        id: "buttonBar2",
        height: "60dp",
        children: [ $.__views.__alloyId18, $.__views.__alloyId19, $.__views.__alloyId20 ],
        __parentSymbol: $.__views.__alloyId1
    });
    $.__views.buttonBar2.setParent($.__views.__alloyId1);
    buttonBarClickHandler ? $.__views.buttonBar2.on("click", buttonBarClickHandler) : __defers["$.__views.buttonBar2!click!buttonBarClickHandler"] = true;
    $.__views.__alloyId21 = Ti.UI.createLabel({
        text: "Button Bar 3",
        id: "__alloyId21"
    });
    $.__views.__alloyId1.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        height: "100dp",
        id: "__alloyId22"
    });
    $.__views.__alloyId1.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createButton({
        title: "One (1)",
        id: "__alloyId23"
    });
    $.__views.__alloyId24 = Ti.UI.createButton({
        title: "Two (2)",
        id: "__alloyId24"
    });
    $.__views.__alloyId25 = Ti.UI.createButton({
        title: "Three (3)",
        id: "__alloyId25"
    });
    $.__views.buttonBar3 = Alloy.createWidget("com.ksouthworth.buttonbar", "widget", {
        backgroundColor: "orange",
        id: "buttonBar3",
        height: Ti.UI.FILL,
        selectedIndex: "2",
        children: [ $.__views.__alloyId23, $.__views.__alloyId24, $.__views.__alloyId25 ],
        __parentSymbol: $.__views.__alloyId22
    });
    $.__views.buttonBar3.setParent($.__views.__alloyId22);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        text: "Button Bar 4",
        id: "__alloyId26"
    });
    $.__views.__alloyId1.add($.__views.__alloyId26);
    $.__views.buttonBar4 = Alloy.createWidget("com.ksouthworth.buttonbar", "widget", {
        id: "buttonBar4",
        selectedIndex: "3",
        __parentSymbol: $.__views.__alloyId1
    });
    $.__views.buttonBar4.setParent($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var buttons = [ Ti.UI.createButton({
        title: "1"
    }), Ti.UI.createButton({
        title: "2"
    }), Ti.UI.createButton({
        title: "3"
    }), Ti.UI.createButton({
        title: "4"
    }), Ti.UI.createButton({
        title: "5"
    }) ];
    $.buttonBar4.addButtons(buttons);
    $.buttonBar4.selectedIndex = 0;
    $.buttonBar4.addEventListener("click", function(e) {
        console.log("test.js -> buttonBar4 handler : e = " + JSON.stringify(e));
    });
    __defers["$.__views.__alloyId15!click!directButtonHandler"] && $.__views.__alloyId15.addEventListener("click", directButtonHandler);
    __defers["$.__views.buttonBar2!click!buttonBarClickHandler"] && $.__views.buttonBar2.on("click", buttonBarClickHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;