
window.onload = function() {
    var canvas = this.document.getElementById('canvas');
    controller = new MindmapController(canvas, 1);
    
    window.controller = controller;
}

function newNode() {
    var shape = document.getElementById('shape');
    window.controller.newNode(shape.value);
}

function deleteNode() {
    window.controller.deleteNode(window.controller.selectedId);
}

function text() {
    var selectedId = window.controller.selectedId;
    var text = document.getElementById('text').value;
    window.controller.setText(selectedId, text);
    document.getElementById('text').value = '';
}

function colorChange() {
    var target = document.getElementById('target');
    var color =  document.getElementById('color');

    var selectedId = window.controller.selectedId;
    switch(target.value) {
        case 'background' : window.controller.setBackground(selectedId, color.value); break;
        case 'fontColor' : window.controller.setFontColor(selectedId, color.value); break;
        case 'lineColor' : window.controller.setLineColor(selectedId, color.value); break;
        case 'strokeColor' : window.controller.setStrokeColor(selectedId, color.value); break;
    }
}

function linking() {
    window.controller.isLinking = !window.controller.isLinking;
    window.controller.render();
}

function changeShape() {
    var selectedId = window.controller.selectedId;

    if (! selectedId) {
        return;
    }
    var shape = document.getElementById('shape');
    window.controller.setShape(selectedId, shape.value);
}

function clearFrom() {
    var selectedId = window.controller.selectedId;

    if (! selectedId) {
        return;
    }
    window.controller.setFrom(-1, selectedId);
}

function setImage() {
    var selectedId = window.controller.selectedId;
    var imageUrl = document.getElementById('imageUrl').value;
    if (! selectedId && imageUrl.length > 0) {
        return;
    }
    window.controller.setImageUrl(selectedId, imageUrl);
}

function biggerWidth() {
    var selectedId = window.controller.selectedId;
    var node = window.controller.getNode(selectedId);

    window.controller.resizeNode(node.id, node.width + 5, node.height);
}

function biggerHeight() {
    var selectedId = window.controller.selectedId;
    var node = window.controller.getNode(selectedId);

    window.controller.resizeNode(node.id, node.width, node.height + 5);
}

function smallerWidth() {
    var selectedId = window.controller.selectedId;
    var node = window.controller.getNode(selectedId);

    window.controller.resizeNode(node.id, node.width - 5, node.height);
}

function smallerHeight() {
    var selectedId = window.controller.selectedId;
    var node = window.controller.getNode(selectedId);

    window.controller.resizeNode(node.id, node.width, node.height - 5);
}

function clearImage() {
    var selectedId = window.controller.selectedId;
    window.controller.clearImageUrl(selectedId);
}

function toImage() {
    var dataUrl = window.controller.getCanvasDataUrl();
    alert(dataUrl);
    var imgTag = document.getElementById('image');
    imgTag.src = dataUrl;
}