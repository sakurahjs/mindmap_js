//노드 배경 모양을 그리는 객체
class NodeBackgroundRenderer {
    constructor(context) {
        this._context = context;
    }

    //노드 모양 렌더링
    render(node) {
        switch(node.shape) {
            case 'rectangle' : this.drawRectangle(node); break;
            case 'diamond' : this.drawDiamond(node); break;
            case 'circle' : this.drawCircle(node); break;
        }
    }

    drawRectangle(node) {
        this._context.fillStyle = node.background;
        this._context.strokeStyle = node.strokeColor;
        this._context.lineWidth = 1;
        
        this.fillBackgroundRect(node);
        this._context.strokeRect(node.x, node.y, node.width, node.height);
    }

    //사각형 모양 배경 채우기
    fillBackgroundRect(node) {
        if (node.imageUrl.length > 0) {
            this._context.drawImage(node.image, node.x, node.y, node.width, node.height);
        } else {
            this._context.fillRect(node.x, node.y, node.width, node.height);
        }
    }

    drawDiamond(node) {
        this._context.fillStyle = node.background;
        this._context.strokeStyle = node.strokeColor;
        this._context.lineWidth = 1;

        this._context.save();
        this._context.beginPath();
        this._context.moveTo(node.x, node.middleY);
        this._context.lineTo(node.centerX, node.y);
        this._context.lineTo(node.rightX, node.middleY);
        this._context.lineTo(node.centerX, node.bottomY);
        
        this.fillBackgroundPath(node);
        
        this._context.stroke();
        this._context.closePath();
        this._context.restore();
    }

    drawCircle(node) {
        this._context.fillStyle = node.background;
        this._context.strokeStyle = node.strokeColor;
        this._context.lineWidth = 1;

        this._context.save();
        this._context.beginPath();
        node.height = node.width;
        this._context.arc(node.centerX, node.middleY, node.width / 2, 0, 2 * Math.PI);
        this.fillBackgroundPath(node);
        this._context.stroke();
        this._context.closePath();
        this._context.restore();
    }

    //사각형 이외 모양 배경 채우기
    fillBackgroundPath(node) {
        if (node.imageUrl.length > 0) {
            this._context.clip();
            this._context.drawImage(node.image, node.x, node.y, node.width, node.height);
        } else {
            this._context.fill();
        }
    }
}