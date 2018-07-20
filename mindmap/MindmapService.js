//모델 관리 기능을 제공하는 서비스 객체
class MindmapService {
    constructor(nodes = {}) {
        this._nodes = nodes; //모든 노드 정보를 관리하는 map
    }

    get nodes() {
        return this._nodes;
    }

    //새로운 노드 추가
    addNode(node) {
        if (node.id in this._nodes) {
            return false;
        } else {
            this._nodes[node.id] = node;
            return true;
        }
    }

    //노드 삭제
    deleteNode(id) {
        if (id in this._nodes) {
            //삭제 처리
            delete this._nodes[id];
            
            for (var key in this._nodes) {
                if (this._nodes[key].from == id) {
                    //삭제 대상 노드를 루트 노드로 가질 경우 -1 로 초기화
                    this._nodes[key].from = -1;
                }
            }

            //선택 해제 처리
            window.controller.selectedId = null;
            return true;
        } else {
            return false;
        }
    }

    //선택 처리
    selectNodeId(x, y) {
        for (var key in this._nodes) {
            //매개변수로 전달 된 좌표 값과 노드의 좌표, 너비, 높이를 비교하여 매칭된 노드의 아이디 반환.
            if (x >= this._nodes[key].x && y >= this._nodes[key].y && x <= this._nodes[key].x + this._nodes[key].width && y <= this._nodes[key].y + this._nodes[key].height) {
                return key;
            }
        }

        return null;
    }

    getNode(id) {
        return this._nodes[id];
    }

    //노드 이동 처리
    moveNode(id, x, y) {
        this._nodes[id].x = x;
        this._nodes[id].y = y;
    }

    //노드 사이즈 변경
    resizeNode(id, width, height) {
        if (id in this._nodes) {
            this._nodes[id].width = width;
            this._nodes[id].height = height;
            return true;
        } else {
            return false;
        }
    }

    //노드 텍스트 변경
    setText(id, text) {
        if (id in this._nodes) {
            this._nodes[id].text = text;
            return true;
        } else {
            return false;
        }
    }

    //노드 링크 변경
    setFrom(from, to) {
        if (((from in this._nodes) || from < 0) && to in this._nodes) {
            this._nodes[to].from = from;
            return true;
        } else {
            return false;
        }
    }

    //노드 모양 변경
    setShape(id, shape) {
        if (id in this._nodes) {
            this._nodes[id].shape = shape;
        }
    }

    //노드 링크 연결선 색 변경
    setLineColor(id, lineColor) {
        if (id in this._nodes) {
            this._nodes[id].lineColor = lineColor;
        }
    }

    //노드 경계선 색 변경
    setStrokeColor(id, strokeColor) {
        if (id in this._nodes) {
            this._nodes[id].strokeColor = strokeColor;
        }
    }

    //노드 배경색 변경
    setBackground(id, background) {
        if (id in this._nodes) {
            this._nodes[id].background = background;
        }
    }

    //노드 글꼴 변경
    setFont(id, font) {
        if (id in this._nodes) {
            this._nodes[id].font = font;
        }
    }

    //노드 글자색 변경
    setFontColor(id, fontColor) {
        if (id in this._nodes) {
            this._nodes[id].fontColor = fontColor;
        }
    }

    //노드 글자 크기 변경
    setFontSize(id, fontSize) {
        if (id in this._nodes) {
            this._nodes[id].fontSize = fontSize;
        }
    }

    //노드 배경 이미지 url 변경
    setImageUrl(id, imageUrl) {
        if (id in this._nodes && imageUrl.length > 0) {
            this._nodes[id].imageUrl = imageUrl;
        }
    }

    //노드 배경 이미지 url 삭제
    clearImageUrl(id) {
        if (id in this._nodes && imageUrl.length > 0) {
            this._nodes[id].imageUrl = '';
            
        }
    }
}