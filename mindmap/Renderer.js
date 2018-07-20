//모델 정보를 바탕으로 화면을 그리는 클래스
class Renderer {
    constructor(canvas, nodes={}) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._nodes = nodes;
        //this._nodeFont = 'bold 20px Arial';
        this._nodePadding = 10;

        this._nodeRenderer = new NodeBackgroundRenderer(this._context);
    }

    get nodes() {
        return this._nodes;
    }

    set nodes(nodes) {
        this._nodes = nodes;
    }

    //화면 전체를 그리는 메소드
    render() {
        //전체 화면 클리어
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        //전체 모델 정보를 가지고 화면 그리기
        for(var id in this._nodes) {
            //노드 글자 수 만큼 가로 길이 조정
            this.stretchNodeWidth(this._nodes[id]);
            //노드 배경 그리기
            this.drawNode(this._nodes[id]);
            //노드 텍스트 그리기
            this.writeNodeText(this._nodes[id]);

            //연결선 그리기
            var fromId = this._nodes[id].from;
            if (fromId in this._nodes) {
                var fromNode = this._nodes[fromId];

                //노드 사이의 연결점 계산
                var calculator = new NodeConnectionPointsCalculator(fromNode, this._nodes[id]);
                //계산된 연결 선 그리기
                this.drawNodeLine(calculator.x1, calculator.y1, calculator.x2, calculator.y2, this._nodes[id].lineColor);
            }
        }
        //선택 선 그리기
        this.drawSelection();
        //크기 변경 핸들 그리기
        //this.drawScaleHandler();
    }

    //노드 글자 수 만큼 가로 길이 조정, 글자 크기 만큼 세로 길이 조정
    stretchNodeWidth(node) {
        var minimumWidth = this._context.measureText(node.text).width + (this._nodePadding * 2);
        var minimumHeight = node.fontSize;

        if (node.width < minimumWidth) {
            node.width = minimumWidth;
        }
        
        if (node.height < minimumHeight) {
            node.height = minimumHeight;
        }
    }

    //노드 배경 그리기
    drawNode(node) {
        this._nodeRenderer.render(node);
    }

    //노드 텍스트 그리기
    writeNodeText(node) {
        this._context.fillStyle = node.fontColor;
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.font = 'bold ' + node.fontSize + 'px ' +node.font;

        this._context.fillText(node.text, node.centerX, node.middleY);
    }

    //연결선 그리기
    drawNodeLine(x1, y1, x2, y2, color='black') {
        this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineWidth = 1;
        this._context.strokeStyle = color;
        this._context.lineTo(x2, y2);
        this._context.stroke();
    }

    //선택 선 그리기
    drawSelection() {
        if (window.controller.selectedId != null) {
            var node = this._nodes[window.controller.selectedId];
            this._context.strokeStyle = 'red';
            this._context.lineWidth = 3;
            
            this._context.strokeRect(node.x, node.y, node.width, node.height);
        }
    }

    //크기 변경 핸들 그리기
    drawScaleHandler() {
        try {
            var node = this._nodes[window.controller.selectedId];
            this._context.fillStyle = 'red';
            
            this._context.beginPath();
            this._context.arc(node.rightX, node.bottomY, 5, 0, 2 * Math.PI);
            this._context.fill();
        } catch(e) {
            console.log('');
        }
    }

    //연결 중인 선 그리기
    drawLinking(toX, toY) {
        try {
            if (window.controller.isLinking && window.controller.selectedId) {
                var node = this._nodes[window.controller.selectedId];
                var fromX = node.centerX;
                var fromY = node.middleY;

                this.drawNodeLine(fromX, fromY, toX, toY, 'darkgrey');
            }
        } catch(e) {
            console.log('');
        }
    }

    
}