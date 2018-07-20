class MindNode {
    constructor(id = -1, x=0, y=0, from=-1, text='', width=100, height=50, shape='rectangle', lineColor='black', background='yellow', strokeColor='black', font='Arial', fontColor='black', fontSize=30, imageUrl='') {
        this._id = id; //노드 id
        this._x = x; //x 좌표
        this._y = y; //y 좌표
        this._from = from; //연결된 루트 노드
        this._text = text; //노드 텍스트
        this._width = width; //너비
        this._height = height; //높이
        this._shape = shape; //모양
        this._lineColor = lineColor; //연결 선 색
        this._background = background; //배경 색
        this._strokeColor = strokeColor; //배경 border 색
        this._font = font; //텍스트 글꼴
        this._fontColor = fontColor; //텍스트 색
        this._fontSize = fontSize; //텍스트 글꼴 크기
        this._imageUrl = imageUrl; //배경 이미지 URL
        this._image = null; //배경 이미지 객체

        if (imageUrl.length > 0) {
            this._image = new Image();
            image.crossOrigin = "anonymous";
            this._image.src = imageUrl;
        }
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get from() {
        return this._from;
    }

    set from(from) {
        this._from = from;
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
    }

    get width() {
        return this._width;
    }
    
    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get lineColor() {
        return this._lineColor;
    }

    set lineColor(lineColor) {
        this._lineColor = lineColor;
    }

    get background() {
        return this._background;
    }

    set background(background) {
        this._background = background;
    }

    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(strokeColor) {
        this._strokeColor = strokeColor;
    }

    get font() {
        return this._font;
    }

    set font(font) {
        this._font = font;
    }

    get fontColor() {
        return this._fontColor;
    }

    set fontColor(fontColor) {
        this._fontColor = fontColor;
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontSize(fontSize) {
        this._fontSize = fontSize;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl;
        this._image = new Image();
        image.crossOrigin = "anonymous";
        this._image.src = imageUrl;
    }

    get image() {
        return this._image;
    }

    get centerX() {
        return this._x + (this._width / 2);
    }

    get rightX() {
        return this._x + this._width;
    }

    get middleY() {
        return this._y + (this._height / 2);
    }

    get bottomY() {
        return this._y + this._height;
    }

    isRootNode() {
        return this._id == -1;
    }
}