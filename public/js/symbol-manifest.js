var symbolManifest = (function () {
    var symbols = [];
    symbols.push('')
    symbols.push('0:20,50:0,100:20,100:100,60:50,0:100');
    symbols.push('0:50,50:0,100:50,10:100');
    symbols.push('0:50,30:30,50:0,70:30,100:50,70:70,50:100,30:70');
    symbols.push('0:0,50:30,100:0,70:50,100:100,50:70,0:100,30:50');
    function getSymbol(index,scale,offset){
        var symbolSplit = symbols[index].split(",");
        var pointList = [];
        for(var i = 0; i < symbolSplit.length;i++){
            var xySplit = symbolSplit[i].split(":");
            pointList.push({x:((Number(xySplit[0])-50)*scale)+offset.x,y:((Number(xySplit[1])-50)*scale)+offset.y});
        }
        return pointList;
    }
    return {symbols:symbols,getSymbol:getSymbol,count:symbols.length};
})();