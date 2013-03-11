function namespace(namespaceString, contents) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
    
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    eval(parent);
    contents();
}
