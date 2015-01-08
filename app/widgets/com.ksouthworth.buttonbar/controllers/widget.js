require(WPATH('underscore_extensions'));

/**
 *
    WIDGET properties applied to CONTAINER:
        'height', 'width',
        'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundRepeat',
        'borderColor', 'borderWidth', 'borderRadius'
    WIDGET properties applied to BUTTON:
        'buttonColor',
        'selectedButtonColor',
        'buttonBackgroundColor', 'buttonBackgroundGradient', 'buttonBackgroundImage', 'buttonBackgroundRepeat',
        'selectedButtonBackgroundColor', 'selectedButtonBackgroundGradient', 'selectedButtonBackgroundImage', 'selectedButtonBackgroundRepeat',
    BUTTON properties applied to BUTTON:
        'color', 'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundRepeat',
        'selectedColor','selectedBackgroundColor', 'selectedBackgroundGradient', 'selectedBackgroundImage', 'selectedBackgroundRepeat'
 */
var DEFAULT_BAR_HEIGHT = '30dp';
var WIDGET_STYLE_NAMES = [
  'buttonColor',
  'selectedButtonColor',
  'buttonBackgroundColor', 'buttonBackgroundGradient', 'buttonBackgroundImage', 'buttonBackgroundRepeat', 'buttonBorderWidth', 'buttonBorderColor',
  'selectedButtonBackgroundColor', 'selectedButtonBackgroundGradient', 'selectedButtonBackgroundImage', 'selectedButtonBackgroundRepeat',
];
var BUTTON_BAR_STYLE_NAMES = [
  'height', 'width', 'top', 'right', 'bottom', 'left',
  'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundRepeat',
  'borderColor', 'borderWidth', 'borderRadius'
];
var BUTTON_STYLE_NAMES = [
  'color', 'backgroundColor', 'backgroundGradient', 'backgroundImage', 'backgroundRepeat', 'borderWidth', 'borderColor',
  'selectedColor','selectedBackgroundColor', 'selectedBackgroundGradient', 'selectedBackgroundImage', 'selectedBackgroundRepeat'
];
var _buttons = [];
var _baseButtonStyle = null;
var _selectedIndex = null;

// INIT
if(arguments[0]) {
  var args = arguments[0];

  if (args.id) {
    exports.id = args.id;
    delete args.id;
  }
  delete args.__parentSymbol;
  delete args.__itemTemplate;
  delete args['$model'];

  // Build buttonBar styles from widget & buttonBar markup
  var inheritedStyles = _.pick($.buttonBar, BUTTON_BAR_STYLE_NAMES);
  var buttonBarStyles = _.extend(inheritedStyles, _.pick(args, BUTTON_BAR_STYLE_NAMES));
  buttonBarStyles = _.defaults(buttonBarStyles, {
    width: Ti.UI.FILL,
    height: DEFAULT_BAR_HEIGHT
  });
  // console.log('buttonBarStyles = ' + JSON.stringify(buttonBarStyles));
  $.buttonBar.applyProperties(buttonBarStyles);

  // Build button styles from widget & button markup
  var inheritedStyles = _.pick($.buttonBar, WIDGET_STYLE_NAMES);
  var markupStyles = _.pick(args, WIDGET_STYLE_NAMES);
  _baseButtonStyle = convertPropertiesToButtonStyle( _.extend(inheritedStyles, markupStyles) );

  // Add buttons to our container
  addButtons(args.children);

  if(_.isString(args.selectedIndex)) {
    selectButton( parseInt(args.selectedIndex, 10) );
  }

  delete args.children;
}

/**
 * Add multiple buttons to our container view

 * @param {Ti.UI.Button[]} tiButtons array
 */
function addButtons(tiButtons) {
  // Make sure we're dealing with Ti.UI.Button objects
  tiButtons = _.filter(tiButtons, function(b) {
    return (b && (b.apiName === 'Ti.UI.Button'));
  });

  if(tiButtons) {
    // Set button style width/height
    _baseButtonStyle.normal.height = Ti.UI.FILL;
    _baseButtonStyle.normal.width = ((100.0 / tiButtons.length) + '%');

    // Add buttons to our container view
    _.each(tiButtons, addTiButton);

    if(_buttons.length) {
      // set last button to FILL width
      _buttons[_buttons.length - 1].view.width = Ti.UI.FILL;
    }
  }
}

/**
 * Add a Ti.UI.Button object to our container view,
 * apply style, hook up click event
 *
 * @param {Ti.UI.Button} tiButton
 */
function addTiButton(tiButton) {
  var baseStyle = JSON.parse(JSON.stringify(_baseButtonStyle));
  var props = _.pick(tiButton, BUTTON_STYLE_NAMES);
  var buttonStyle = convertPropertiesToButtonStyle(props);
  buttonStyle = _.deepExtend(baseStyle, buttonStyle);
  // console.log('buttonStyle = ' + JSON.stringify(buttonStyle));

  tiButton.applyProperties(buttonStyle.normal);
  tiButton.bubbleParent = false;

  // Custom click handlind
  var buttonIndex = _buttons.length;
  tiButton.addEventListener('click', function(e) {
    e.cancelBubble = true;

    if(selectButton(buttonIndex)) {
      // Trigger click event for anyone listening
      $.trigger('click', _.extend(e, {
        index: buttonIndex
      }));
    }
  });

  _buttons.push({
    view: tiButton,
    style: buttonStyle
  });
  $.buttonBar.add(tiButton);
}

/**
 * Convert properties object into Button Style object,
 * parsing out the 'normal' and 'selected' styles
 *
 * @param  {object} props         properties object (from Alloy markup)
 * @param  {string[]} stripPrefixes optional prefixes to strip out of property names. Default: ['button', 'Button', 'selected']
 * @return {object}               Style object: { normal: {}, selected: {} }
 */
function convertPropertiesToButtonStyle(props, stripPrefixes) {
  var prefixes = stripPrefixes || ['button', 'Button'];
  prefixes = prefixes.concat(_.map(prefixes, function(s) {
      return 'selected' + s;
  }));
  prefixes.push('selected');
  var rx = new RegExp('^(' + prefixes.join('|') + ')');

  var buttonStyle = {
    normal: {},
    selected: {}
  };
  _.each(props, function(value, key) {
    if(!_.isUndefined(value)) {
      var styleKey = (key.indexOf('selected') === 0) ? 'selected' : 'normal';
      var styleProp = key.replace(rx, '');
      styleProp = styleProp.charAt(0).toLowerCase() + styleProp.slice(1);
      buttonStyle[styleKey][styleProp] = value;
    }
  });
  return buttonStyle;
}

/**
 * Update the selected button
 * @param  {integer} buttonIndex
 * @return {boolean}             true if button was changed, false otherwise
 */
function selectButton(buttonIndex) {
  if((buttonIndex < 0) || (buttonIndex > (_buttons.length - 1))) {
    return false;
  }

  var havePreviousButton = (_selectedIndex !== null);
  var buttonIndexChanged = (_selectedIndex !== buttonIndex);

  if(havePreviousButton && buttonIndexChanged) {
    // UN-SELECT the previously selected button
    var oldButton = _buttons[_selectedIndex];

    var propsToApply = _.omit(oldButton.style.normal, ['width', 'height']);
    var propsToUnset = _.difference(_.keys(oldButton.style.selected), _.keys(oldButton.style.normal));
    _.each(propsToUnset, function(p) {
        propsToApply[p] = undefined;
        // iOS:     update Button directly for this to 'unset' properly
        // Android: doesn't seem to work for 'backgroundColor',
        //          but you can workaround by explicitly setting in TSS
        oldButton.view[p] = undefined;
    });
    oldButton.view.applyProperties(propsToApply);
  }

  if(buttonIndexChanged) {
    // SELECT this button
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

function getAtIndex(index) {
  return _buttons[index];
}

/**
 * EXPORTS
 */
exports.addButtons = addButtons;

exports.setSelectedIndex = setSelectedIndex;
exports.getSelectedIndex = getSelectedIndex;
exports.getAtIndex = getAtIndex;

Object.defineProperty($, "selectedIndex", {
    get: getSelectedIndex,
    set: setSelectedIndex
});

/**
 * Events
 * proxies for standard Ti/Alloy event handling
 */
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;
