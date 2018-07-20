class NodeConnectionPointsCalculator {
    constructor(fromNode, toNode) {
        this._fromNodeConnectionPoints = [
            [fromNode.centerX, fromNode.y], 
            [fromNode.x, fromNode.middleY], 
            [fromNode.rightX, fromNode.middleY], 
            [fromNode.centerX, fromNode.bottomY]
        ];
        this._toNodeConnectionPoints = [
            [toNode.centerX, toNode.y], 
            [toNode.x, toNode.middleY], 
            [toNode.rightX, toNode.middleY], 
            [toNode.centerX, toNode.bottomY]
        ];

        this.calculate();
    }

    cartesianProduct() {
        var a = this._fromNodeConnectionPoints;
        var b = this._toNodeConnectionPoints;

        var results = [];

        for(var i = 0 ; i < a.length ; i++) {
            for (var j = 0 ; j < b.length ; j++) {
                var result = [...a[i], ...b[j]];
                results.push(result);
            }
        }

        return results;
    }

    calculate() {
        var connectionPointsList = this.cartesianProduct();
        var distances = [];

        for (var i = 0 ; i < connectionPointsList.length ; i++) {
            var x1 = connectionPointsList[i][0];
            var y1 = connectionPointsList[i][1];
            var x2 = connectionPointsList[i][2];
            var y2 = connectionPointsList[i][3];

            var horizontalDistance = Math.abs(x2 - x1);
            var verticalDistance = Math.abs(y2 - y1);
            var distance = Math.sqrt((horizontalDistance * horizontalDistance) + (verticalDistance * verticalDistance));
            distances.push(distance);
        }

        this.result = connectionPointsList[this.getNearestPointsIndex(distances)];
    }

    getNearestPointsIndex(distances) {
        var index = 0;
        var min = distances[index];

        for (var i = 1 ; i < distances.length ; i++) {
            if (min > distances[i]) {
                min = distances[i];
                index = i;
            }
        }

        return index;
    }

    get x1() {
        return this.result[0];
    }

    get y1() {
        return this.result[1];
    }

    get x2() {
        return this.result[2];
    }

    get y2() {
        return this.result[3];
    }
}