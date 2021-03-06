var drawHex = (function(center,shapeRadius){
    // var stage = v4v.stage(document.getElementById("exampleContainer"));
    var h = 0;
    var v = 0;
    var cols = 40;
    var space = {x:20,y:20};
    var totalPoints = 6;
    var pointList = [];
    var slf = {}
    // var center = {x: 400, y: 400};
    var midPoints = [
        {x: 0, y: 0, indexes:[1,0], extender: {target: 2, position: {x: 0, y: 0}}, intersecotrs: {targets:[2,1],positions:[{x:0,y:0},{x:0,y:0}]}},
        {x: 0, y: 0, indexes:[2,3], extender: {target: 3, position: {x: 0, y: 0}}, intersecotrs: {targets:[1,2],positions:[{x:0,y:0},{x:0,y:0}]}},
        {x: 0, y: 0, indexes:[4,3], extender: {target: 0, position: {x: 0, y: 0}}, intersecotrs: {targets:[5,4],positions:[{x:0,y:0},{x:0,y:0}]}},
        {x: 0, y: 0, indexes:[5,0], extender: {target: 1, position: {x: 0, y: 0}}, intersecotrs: {targets:[4,5],positions:[{x:0,y:0},{x:0,y:0}]}}
    ];

    var corners = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
    var hexPoints = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]

    var sidePoints = {right:[1, 2], left:[4, 5]}

    for(var i = 0;i<totalPoints;i++){
        var pos = {x: v4v.orbit(center.x, shapeRadius, (360/totalPoints)*i, "cos"), y: v4v.orbit(center.y, shapeRadius, (360/totalPoints)*i, "sin")};
        var fp = v4v.flexPoint(pos.x, pos.y, shapeRadius*1.6, shapeRadius*.6, false);
        // var circle = v4v.circle(stage,{cx:pos.x,cy:pos.y,r:2});
        pointList.push({point:fp});
    }

    setPosition({x:-9000000,y:-9000000});
    var initialFootprint = {x:corners[3].x,y:corners[3].y,width:corners[0].x-corners[3].x,height:corners[2].y-corners[3].y};
    // console.log(corners);


    // stage.getElement().addEventListener('mousemove',function(e){
    //     setPosition({x:e.pageX,y:e.pageY});
    // });

    slf.reposition = function(position){
        setPosition(position);
    }
    slf.getCorners = function () {
        return corners;
    }
    slf.getHexPoints = function () {
        return hexPoints;
    }

    slf.isDistorted = function () {
        var distorted = false;
        for(var i = 0;i<pointList.length;i++){
            if(Math.round(v4v.distance(center.x,center.y,pointList[i].point.getPosition().x,pointList[i].point.getPosition().y)) != shapeRadius) {
                distorted = true;
            }
        }
        console.log(distorted);
        return distorted;
    }

    slf.getInitialFootprint = function(){
        return initialFootprint;
    }

    function setPosition(position){
        adjustPoints(position);
        adjustMidpoints();
        applyExtensions();
    }
    
    function adjustPoints(position){
        for(var i = 0;i<pointList.length;i++){
            pointList[i].point.reposition(position);
            hexPoints[i] = pointList[i].point.getPosition();
            // pointList[i].element.attr('cx',pointList[i].point.getPosition().x);
            // pointList[i].element.attr('cy',pointList[i].point.getPosition().y);
        }
    }

    function adjustMidpoints(){
        for(var i = 0;i<midPoints.length;i++){
            var a = midPoints[i].indexes[0];
            var b = midPoints[i].indexes[1];
            var aPos = {x: pointList[a].point.getPosition().x, y: pointList[a].point.getPosition().y};
            var bPos = {x: pointList[b].point.getPosition().x, y: pointList[b].point.getPosition().y};
            midPoints[i].x = aPos.x + ((bPos.x - aPos.x)/3);
            midPoints[i].y = aPos.y + ((bPos.y - aPos.y)/3);
            // midPoints[i].element.attr('cx',midPoints[i].x);
            // midPoints[i].element.attr('cy',midPoints[i].y);
        }
    }

    function applyExtensions(){
        for(var i = 0;i<midPoints.length;i++){
            var partner = midPoints[midPoints[i].extender.target]
            var angle = v4v.angle(midPoints[i].x,midPoints[i].y,partner.x,partner.y);
            var distance = v4v.distance(midPoints[i].x,midPoints[i].y,partner.x,partner.y);
            var distFactor = 10;
            var position = {x: v4v.orbit(midPoints[i].x, distance*distFactor, angle, "cos"),y: v4v.orbit(midPoints[i].y, distance*distFactor, angle, "sin")};
            
            // midPoints[i].element.attr('cx',position.x);
            // midPoints[i].element.attr('cy',position.y);

            var aIntersector = pointList[midPoints[i].intersecotrs.targets[0]].point.getPosition();
            var bIntersector = pointList[midPoints[i].intersecotrs.targets[1]].point.getPosition();
            var intersectorAngle = v4v.angle(aIntersector.x,aIntersector.y,bIntersector.x,bIntersector.y);
            var intersectorDist = v4v.distance(aIntersector.x,aIntersector.y,bIntersector.x,bIntersector.y);

            var intersectorPoint = {x: v4v.orbit(aIntersector.x, intersectorDist*distFactor, intersectorAngle, "cos"),y: v4v.orbit(aIntersector.y, intersectorDist*distFactor, intersectorAngle, "sin")};

            // midPoints[i].element.attr('cx',intersectorPoint.x);
            // midPoints[i].element.attr('cy',intersectorPoint.y);

            var cornerPoint = v4v.intersection(intersectorPoint,position,aIntersector,midPoints[i]);
            corners[i] = cornerPoint;
            // midPoints[i].element.attr('cx',cornerPoint.x);
            // midPoints[i].element.attr('cy',cornerPoint.y);

            // midPoints[i].lines[0].attr('x1',position.x);
            // midPoints[i].lines[0].attr('x2',midPoints[i].x);
            // midPoints[i].lines[0].attr('y1',position.y);
            // midPoints[i].lines[0].attr('y2',midPoints[i].y);

            // midPoints[i].lines[1].attr('x1',intersectorPoint.x);
            // midPoints[i].lines[1].attr('x2',aIntersector.x);
            // midPoints[i].lines[1].attr('y1',intersectorPoint.y);
            // midPoints[i].lines[1].attr('y2',aIntersector.y);
        }
    }


    // function createMidPointMarker(){
    //     return v4v.circle(stage,{cx:0,cy:0,r:4});
    // }

    // function createLines(){
    //     return [v4v.line(stage,{x1:0,x1:0,x2:1,y2:0,stroke:'#000000'}),v4v.line(stage,{x1:0,x1:0,x2:1,y2:0,stroke:'#000000'})];
    // }
    return slf;
});