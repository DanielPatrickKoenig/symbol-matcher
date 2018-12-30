var pixiUtils = (function () {
    function getDefaultProperties () {
        return {
        color: 0x000000,
        opacity: 1,
        x: 0,
        y: 0,
        radius: 72,
        strokeColor: 0x000000,
        strokeOpacity: 0,
        strokeWidth: 1
        }
    }
    
    function createCircle (props) {
        var properties = getDefaultProperties()
        if (props !== undefined && props !== null) {
        for (var p in properties) {
            properties[p] = props[p]
        }
        }
        var g = new PIXI.Graphics()
        g.lineStyle(properties.strokeWidth, properties.strokeColor, properties.strokeOpacity);
        g.beginFill(properties.color, properties.opacity);
        g.drawCircle(properties.x, properties.y, properties.radius);
        g.endFill();
        // pixiApp.stage.addChild(g);
        // console.log(g)
        return g
    }
    
    function createImage (src) {
        // console.log(self.PIXI.projection)
        var texture = src.textureCacheIds !== undefined && src.textureCacheIds !== null ? src : PIXI.Texture.fromImage(src)
        var spt = new self.PIXI.projection.Sprite2s(texture)
        // spt.anchor.set(0.5)
        return spt
    }
    
    function createPolygon (points, graphics, props) {
        var properties = getDefaultProperties()
        if (props !== undefined && props !== null) {
        for (var p in properties) {
            properties[p] = props[p]
        }
        }
        var noGraphics = graphics === undefined || graphics === null
        var g = noGraphics ? new self.PIXI.Graphics() : graphics
        if (noGraphics) {
        g.clear()
        }
        g.lineStyle(properties.strokeWidth, properties.strokeColor, properties.strokeOpacity)
        g.beginFill(properties.color, properties.opacity)
        g.moveTo(points[0].x, points[0].y)
        for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x, points[i].y)
        }
        g.lineTo(points[0].x, points[0].y)
        g.endFill()
        return g
    }

    function createTextureFromGraphics(g){
        var tx = g.generateTexture();
        return tx;
    }
    return {createPolygon:createPolygon, createCircle:createCircle, createImage:createImage, createTextureFromGraphics:createTextureFromGraphics};
})();

