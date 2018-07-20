//마인드맵의 기능을 중계하는 컨트롤러. 마우스 이벤트, 화면, 인터페이스 기능을 제공
class MindmapController {
    constructor(canvas, mindId) {
        this._canvas = canvas;
        
        //마우스 이벤트를 처리하는 객체
        this._mouse = new MouseListener(this._canvas);
        //모델 관리 기능을 제공하는 서비스 객체
        this._service = new MindmapService(this.requestNodes(mindId));
        //화면 그리기 기능을 제공하는 객체
        this._renderer = new Renderer(this._canvas, this._service._nodes);

        //유저에 의해 선택된 노드의 아이디를 저장
        this._selectedId = null;
        //노드 연결 조작 중 인지를 나타내는 플래그
        this._isLinking = false;
    }

    //유저에 의해 선택된 노드의 아이디
    get selectedId() {
        return this._selectedId;
    }

    set selectedId(selectedId) {
        this._selectedId = selectedId;
        this.render();
    }

    //유저가 노드연결 작업중인지를 나타내는 상태 플래그
    get isLinking() {
        return this._isLinking;
    }

    set isLinking(isLinking) {
        this._isLinking = isLinking;
    }

    //캔버스
    get canvas() {
        return this._canvas;
    }

    //모델 관리 기능을 제공하는 서비스 객체
    get service() {
        return this._service;
    }

    //마우스 이벤트를 처리하는 객체
    get mouse() {
        return this._mouse;
    }

    //화면 그리기 기능을 제공하는 객체
    get renderer() {
        return this._renderer;
    }

    //서버에 이미 저장된 노드정보를 요청하는 메소드
    requestNodes(mindId) {
        //temporary
        return {};
        //TODO get nodes datas from server
    }

    //지금까지 저장된 노드정보를 서버에 저장하는 메소드
    update() {
        //TODO save nodes datas to server
    }

    //화면 갱신처리
    render() {
        this._renderer.render();
    }

    //노드 연결 작업 중 일때 연결선 갱신처리 
    renderLinking(toX, toY) {
        this._renderer.render();
        this._renderer.drawLinking(toX, toY);
    }

    //새로운 노드의 아이디를 서버에서 가져오는 메소드
    generateNewId() {
        //temporary
        return Math.round(Math.random() * 1000);
        //TODO get new id from server
    }

    //새로운 노드를 생성하는 메소드. 노드의 시각적인 모양을 매개변수로 전달.
    newNode(shape='rectangle') {
        var newId = window.controller.generateNewId();
        var selectedId = window.controller.selectedId;
        window.controller.addNode(newId, (selectedId) ? selectedId : -1, shape);
        window.controller.selectedId = newId;
    }

    //노드를 추가하는 메소드. 새 노드의 아이디, 연결할 부모 노드의 아이디, 노드의 시각적 모양을 매개변수로 전달.
    addNode(id = -1, from = -1, shape='rectangle') {
        var rootNode = this.getNode(from);
        var x = 10;
        var y = 10;
        try {
            x = rootNode.x;
            y = rootNode.bottomY + 20;
        } catch(e){}
        var node = new MindNode(id, x, y, from);
        node.shape = shape;
        var result = this._service.addNode(node);
        this.render();

        return result;
    }

    //노드를 삭제하는 메소드. 삭제할 노드의 아이디를 매개변수로 전달.
    deleteNode(id) {
        var result = this._service.deleteNode(id);
        this.render();

        return result;
    }

    //노드의 텍스트를 설정하는 메소드. 노드 아이디, 텍스트를 매개변수로 전달.
    setText(id, text) {
        var result = this._service.setText(id, text);
        this.render();

        return result;
    }

    //노드의 사이즈를 변경하는 메소드. 변경할 노드의 아이디, 새로운 가로길이, 새로운 높이를 매개변수로 전달.
    resizeNode(id, width, height) {
        var result = this._service.resizeNode(id, width, height);
        this.render();

        return result;
    }

    //노드를 이동시키는 메소드. 이동할 노드의 아이디, x좌표, y좌표를 매개변수로 전달.
    moveNode(id, x, y) {
        this._service.moveNode(id, x, y);
        this.render();
    }

    //노드를 선택하는 메소드. x좌표, y좌표를 매개변수로 전달하면 해당 좌표에 위치하는 노드 아이디가 선택 됨.
    selectNodeId(x, y) {
        this._selectedId = this._service.selectNodeId(x, y);
        this.render();
    }

    //링크를 세팅/변경 하는 메소드. 부모노드 아이디, 자식노드 아이디를 매개변수로 전달.
    setFrom(from, to) {
        this._service.setFrom(from, to);
        this.render();
    }

    //노드 객체를 반환하는 메소드.
    getNode(id) {
        return this._service.getNode(id);
    }

    //노드의 모양을 변경하는 메소드. 모양을 변경할 노드의 아이디, 모양이름을 매개변수로 전달.
    setShape(id, shape) {
        this._service.setShape(id, shape);
        this.render();
    }

    //링크 색상을 변경하는 메소드. 자식노드의 아이디, 변경할 색상을 매개변수로 전달.
    setLineColor(id, lineColor) {
        this._service.setLineColor(id, lineColor);
        this.render();
    }

    //노드의 경계선 색상을 변경하는 메소드. 노드 아이디, 변경할 색상을 매개변수로 전달.
    setStrokeColor(id, strokeColor) {
        this._service.setStrokeColor(id, strokeColor);
        this.render();
    }

    //노드의 배경색상을 변경하는 메소드. 노드 아이디, 변경할 색상을 매개변수로 전달.
    setBackground(id, background) {
        this._service.setBackground(id, background);
        this.render();
    }

    //노드의 글꼴을 변경하는 메소드. 노드 아이디, 변경할 글꼴 이름을 매개변수로 전달.
    setFont(id, font) {
        this._service.setFont(id, font);
        this.render();
    }

    //노드의 글꼴 색상을 변경하는 메소드. 노드 아이디, 변경할 색상을 매개변수로 전달.
    setFontColor(id, fontColor) {
        this._service.setFontColor(id, fontColor);
        this.render();
    }

    //노드의 글꼴 크기를 변경하는 메소드. 노드 아이디, 변경할 글꼴 크기를 매개변수로 전달.
    setFontSize(id, fontSize) {
        this._service.setFontSize(id, fontSize);
        this.render();
    }

    //노드의 배경으로 사용할 이미지의 Url을 변경하는 메소드. 노드 아이디, 이미지 Url을 매개변수로 전달.
    setImageUrl(id, imageUrl) {
        this._service.setImageUrl(id, imageUrl);
        this.render();
    }

    //설정된 노드 배경 이미지를 삭제하는 메소드.
    clearImageUrl(id) {
        this._service.clearImageUrl(id);
        this._renderer();
    }

    //지금까지 그려진 캔버스 이미지 정보를 문자열로 반환하는 메소드.
    getCanvasDataUrl() {
        var dataURL = this._canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}