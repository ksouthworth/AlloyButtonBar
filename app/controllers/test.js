function buttonBarClickHandler(e) {
    console.log('test.js -> buttonBarClickHandler() : e = ' + JSON.stringify(e));
}

function directButtonHandler(e) {
    console.log('test.js -> directButtonHandler() : e = ' + JSON.stringify(e));
}

var buttons = [
    Ti.UI.createButton({title: '1'}),
    Ti.UI.createButton({title: '2'}),
    Ti.UI.createButton({title: '3'}),
    Ti.UI.createButton({title: '4'}),
    Ti.UI.createButton({title: '5'})
];
$.buttonBar4.addButtons(buttons);
$.buttonBar4.selectedIndex = 0;
$.buttonBar4.addEventListener('click', function(e) {
    console.log('test.js -> buttonBar4 handler : e = ' + JSON.stringify(e));
});