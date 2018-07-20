class MouseListener {
    //캔버스를 매개변수로 초기화
    constructor(canvas) {
        //마우스 클릭 상태를 저장할 변수
        this._clicked = false;
        //마우스 좌표를 임시 저장할 변수
        this._x = 0;
        this._y = 0;

        //캔버스에 마우스 이벤트 리스너 세팅
        canvas.onmousedown = this.mouseDown;
        canvas.onmouseup = this.mouseUp;
        canvas.onmousemove = this.mouseMove;
        canvas.ondblclick = this.mouseDoubleClick;
    }

    get clicked() {
        return this._clicked;
    }

    set clicked(clicked) {
        this._clicked = clicked;
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

    //캔버스와 마우스 좌표값을 보정하는 메소드
    adjustPosition(x, y) {
        var bound = window.controller.canvas.getBoundingClientRect();
        var bw = 5;
        x = (x - bound.left - bw) * (window.controller.canvas.width / (bound.width - bw * 2));
        y = (y - bound.top - bw) * (window.controller.canvas.height / (bound.height - bw * 2));

        return {x: x, y: y};
    }

    //유저의 클릭에 의한 노드간의 연결을 확정하는 메소드
    finalizeLinking(e) {
        //링크 상태 일 때
        if (window.controller.isLinking) {
            //좌표값 보정
            var pos = this.adjustPosition(e.clientX, e.clientY);
            //링크의 루트가 될 노드 지정 - 링크 상태 이전에 선택된 노드.
            var linkFrom = window.controller.selectedId;
            //링크의 자식노드 지정
            window.controller.selectNodeId(pos.x, pos.y);
            var linkTo = window.controller.selectedId;
            //루트노드가 선택되지 않았거나, 자식노드 대신 빈 화면을 선택할 때 처리 보류
            if ( (! linkFrom) || (! linkTo) ) {
                return;
            }

            //루트노드와 자식노드를 연결
            window.controller.setFrom(linkFrom, linkTo);
            //링크 상태 해제
            window.controller.isLinking = false;
        }
    }

    //유저의 마우스 클릭에 의해 노드를 선택하거나, 선택된 노드를 해제 하는 메소드
    selectNode(e) {
        //링크 상태가 아닐 때
        if (! window.controller.isLinking) {
            //마우스 좌표 값 보정
            var pos = this.adjustPosition(e.clientX, e.clientY);

            //선택된 노드의 이동에 대비하여 좌표 임시 저장
            window.controller.mouse.x = pos.x;
            window.controller.mouse.y = pos.y;

            //노드 선택
            window.controller.selectNodeId(pos.x, pos.y);
            var selectedId = window.controller.selectedId;
            //선택된 노드가 없으면 처리 종료
            if (! selectedId) {
                return;
            }

            //마우스 클릭 상태 저장
            window.controller.mouse.clicked = true;

            //단순 로그 출력
            var node = window.controller.getNode(selectedId);
            //console.log('click clientx : '+e.clientX+', clienty : '+e.clientY+', x : '+pos.x+', y : '+pos.y+', node.x : '+node.x+', node.y : '+node.y);
        }
    }

    //마우스 클릭을 처리하는 이벤트 리스너
    mouseDown(e) {
        //노드 선택 처리
        window.controller.mouse.selectNode(e);
        //노드 연결 처리
        window.controller.mouse.finalizeLinking(e);
    }

    
    //마우스가 클릭 되었다가 떼어질 때의 이벤트 처리 메소드
    mouseUp(e) {
        //마우스 클릭 상태를 초기화
        window.controller.mouse.clicked = false;

        var pos = window.controller.mouse.adjustPosition(e.clientX, e.clientY);
        //console.log('up clientx : '+e.clientX+', clienty : '+e.clientY+', x : '+pos.x+', y : '+pos.y);
    }

    //마우스 이동 이벤트 처리 메소드
    mouseMove(e) {
        //마우스 좌표 보정
        var pos = window.controller.mouse.adjustPosition(e.clientX, e.clientY);
        
        //console.log('move clientx : '+e.clientX+', clienty : '+e.clientY+', x : '+pos.x+', y : '+pos.y);
        //선택된 노드가 있는지 확인
        var selectedId = window.controller.selectedId;
        //선택된 노드가 있고, 마우스가 클릭된 상태에서 움직이고 있으면
        if (selectedId != null && window.controller.mouse.clicked == true) {
            //선택된 노드의 객체 취득
            var node = window.controller.getNode(selectedId);
            //마우스 이동 거리 만큼 선택된 노드 이동
            window.controller.moveNode(selectedId, node.x + (pos.x - window.controller.mouse.x), node.y + (pos.y - window.controller.mouse.y));
            //다음 이동을 처리하기 위해 마우스 좌표 임시저장
            window.controller.mouse.x = pos.x;
            window.controller.mouse.y = pos.y;
            return;
        }

        //링크 상태이면
        if (window.controller.isLinking) {
            //화면을 다시 그림
            window.controller.render();
            //다시 그린 그림 위해 링크 보조선 그리기
            window.controller.renderLinking(pos.x, pos.y);
            return;
        }
    }

    mouseDoubleClick(e) {
        var pos = window.controller.mouse.adjustPosition(e.clientX, e.clientY);
        
        //console.log('double click clientx : '+e.clientX+', clienty : '+e.clientY+', x : '+pos.x+', y : '+pos.y);
    }
}