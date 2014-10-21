function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.ksouthworth.buttonbar/" + s : s.substring(0, index) + "/com.ksouthworth.buttonbar/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addButtons(tiButtons) {
        tiButtons = _.filter(tiButtons, function(b) {
            return b && "Ti.UI.Button" === b.apiName;
        });
        if (tiButtons) {
            _baseButtonStyle.normal.height = Ti.UI.FILL;
            _baseButtonStyle.normal.width = 100 / tiButtons.length + "%";
            _.each(tiButtons, addTiButton);
            _buttons.length && (_buttons[_buttons.length - 1].view.width = Ti.UI.FILL);
        }
    }
    function addTiButton(tiButton) {
        var baseStyle = JSON.parse(JSON.stringify(_baseButtonStyle));
        var props = _.pick(tiButton, BUTTON_STYLE_NAMES);
        var buttonStyle = convertPropertiesToButtonStyle(props);
        buttonStyle = _.deepExtend(baseStyle, buttonStyle);
        tiButton.applyProperties(buttonStyle.normal);
        tiButton.bubbleParent = false;
        var buttonIndex = _buttons.length;
        tiButton.addEventListener("click", function(e) {
            e.cancelBubble = true;
            selectButton(buttonIndex) && $.trigger("click", _.extend(e, {
                index: buttonIndex
            }));
        });
        _buttons.push({
            view: tiButton,
            style: buttonStyle
        });
        $.buttonBar.add(tiButton);
    }
    function convertPropertiesToButtonStyle(props, stripPrefixes) {
        var prefixes = stripPrefixes || [ "button", "Button" ];
        prefixes = prefixes.concat(_.map(prefixes, function(s) {
            return "selected" + s;
        }));
        prefixes.push("selected");
        var rx = new RegExp("^(" + prefixes.join("|") + ")");
        var buttonStyle = {
            normal: {},
            selected: {}
        };
        _.each(props, function(value, key) {
            if (!_.isUndefined(value)) {
                var styleKey = 0 === key.indexOf("selected") ? "selected" : "normal";
                var styleProp = key.replace(rx, "");
                styleProp = styleProp.charAt(0).toLowerCase() + styleProp.slice(1);
                buttonStyle[styleKey][styleProp] = value;
            }
        });
        return buttonStyle;
    }
    function selectButton(buttonIndex) {
        if (0 > buttonIndex || buttonIndex > _buttons.length - 1) return false;
        var havePreviousButton = null !== _selectedIndex;
        var buttonIndexChanged = _selectedIndex !== buttonIndex;
        if (havePreviousButton && buttonIndexChanged) {
            var oldButton = _buttons[_selectedIndex];
            var propsToApply = _.omit(oldButton.style.normal, [ "width", "height" ]);
            var propsToUnset = _.difference(_.keys(oldButton.style.selected), _.keys(oldButton.style.normal));
            _.each(propsToUnset, function(p) {
                propsToApply[p] = void 0;
                oldButton.view[p] = void 0;
            });
            oldButton.view.applyProperties(propsToApply);
        }
        if (buttonIndexChanged) {
            var newButton = _buttons[buttonIndex];
            newButton.view.applyProperties(newButton.style.selected);
            _selectedIndex = buttonIndex;
            return true;
        }
        return false;
    }
    function getSelectedIndex() {
        return _selectedIndex;
    }
    function setSelectedIndex(index) {
        selectButton(index);
        return true;
    }
    new (require("alloy/widget"))("com.ksouthworth.buttonbar");
    this.__widgetId = "com.ksouthworth.buttonbar";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.buttonBar = Ti.UI.createView({
        borderColor: "#007AFF",
        borderWidth: 1,
        borderRadius: 4,
        buttonColor: "#007AFF",
        selectedButtonColor: "white",
        selectedButtonBackgroundColor: "#007AFF",
        id: "buttonBar",
        layout: "horizontal",
        bubbleParent: "false"
    });
    $.__views.buttonBar && $.addTopLevelView($.__views.buttonBar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require(WPATH("underscore_extensions"));
    var DEFAULT_BAR_HEIGHT = "30dp";
    var WIDGET_STYLE_NAMES = [ "buttonColor", "selectedButtonColor", "buttonBackgroundColor", "buttonBackgroundGradient", "buttonBackgroundImage", "buttonBackgroundRepeat", "selectedButtonBackgroundColor", "selectedButtonBackgroundGradient", "selectedButtonBackgroundImage", "selectedButtonBackgroundRepeat" ];
    var BUTTON_BAR_STYLE_NAMES = [ "height", "width", "backgroundColor", "backgroundGradient", "backgroundImage", "backgroundRepeat", "borderColor", "borderWidth", "borderRadius" ];
    var BUTTON_STYLE_NAMES = [ "color", "backgroundColor", "backgroundGradient", "backgroundImage", "backgroundRepeat", "selectedColor", "selectedBackgroundColor", "selectedBackgroundGradient", "selectedBackgroundImage", "selectedBackgroundRepeat" ];
    var _buttons = [];
    var _baseButtonStyle = null;
    var _selectedIndex = null;
    if (arguments[0]) {
        var args = arguments[0];
        if (args.id) {
            exports.id = args.id;
            delete args.id;
        }
        delete args.__parentSymbol;
        delete args.__itemTemplate;
        delete args["$model"];
        var inheritedStyles = _.pick($.buttonBar, BUTTON_BAR_STYLE_NAMES);
        var buttonBarStyles = _.extend(inheritedStyles, _.pick(args, BUTTON_BAR_STYLE_NAMES));
        buttonBarStyles = _.defaults(buttonBarStyles, {
            width: Ti.UI.FILL,
            height: DEFAULT_BAR_HEIGHT
        });
        $.buttonBar.applyProperties(buttonBarStyles);
        var inheritedStyles = _.pick($.buttonBar, WIDGET_STYLE_NAMES);
        var markupStyles = _.pick(args, WIDGET_STYLE_NAMES);
        _baseButtonStyle = convertPropertiesToButtonStyle(_.extend(inheritedStyles, markupStyles));
        addButtons(args.children);
        _.isString(args.selectedIndex) && selectButton(parseInt(args.selectedIndex, 10));
        delete args.children;
    }
    exports.addButtons = addButtons;
    exports.setSelectedIndex = setSelectedIndex;
    exports.getSelectedIndex = getSelectedIndex;
    Object.defineProperty($, "selectedIndex", {
        get: getSelectedIndex,
        set: setSelectedIndex
    });
    exports.addEventListener = $.on;
    exports.removeEventListener = $.off;
    exports.fireEvent = $.trigger;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;