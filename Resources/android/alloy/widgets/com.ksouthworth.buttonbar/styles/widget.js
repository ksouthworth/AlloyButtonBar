function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.ksouthworth.buttonbar/" + s : s.substring(0, index) + "/com.ksouthworth.buttonbar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0002,
    key: "buttonBar",
    style: {
        borderColor: "#007AFF",
        borderWidth: 1,
        borderRadius: 4,
        buttonColor: "#007AFF",
        selectedButtonColor: "white",
        selectedButtonBackgroundColor: "#007AFF"
    }
}, {
    isClass: true,
    priority: 10101.0003,
    key: "buttonBar",
    style: {
        buttonBackgroundColor: "white"
    }
} ];