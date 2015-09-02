/*
    2D系の計算

    author:nakagawa[]ville.jp
    license:NYSL
*/
var Math2D = {
    //  2点間の距離の二乗
    d2: function(p, q) {
        return Math.pow((p.x - q.x), 2) + Math.pow((p.y - q.y), 2);
    },
    // 2点の座標からベクトルに
    pointsToVector: function(p, q) {
        return {
            x: q.x - p.x,
            y: q.y - p.y
        };
    },
    // 三角形の重心
    getCenterOfGravity: function(triangle) {
        // 任意の2つのベクトルの和の1/3が重心になる
        var p = this.pointsToVector(triangle[0], triangle[1]);
        var q = this.pointsToVector(triangle[0], triangle[2]);

        return {
            x: (p.x + q.x) / 3 + triangle[0].x,
            y: (p.y + q.y) / 3 + triangle[0].y
        }
    },
    /*
        三角形の外接円
        return {
            o : 中心の座標
            r2: 半径の二乗
        }
    */
    getCircumscribedCircle: function(triangle) {
        var px, py, qx, qy, rx, ry;
        var ax, ay, bx, by;
        var d, a, b, pl2, ql2, rl2, o, r2;

        px = triangle[0].x;
        py = triangle[0].y;
        qx = triangle[1].x;
        qy = triangle[1].y;
        rx = triangle[2].x;
        ry = triangle[2].y;

        ax = px - rx;
        ay = py - ry;
        bx = qx - rx;
        by = qy - ry;
        d = ax * by - ay * bx;
        if (d == 0) return null;

        pl2 = px * px + py * py;
        ql2 = qx * qx + qy * qy;
        rl2 = rx * rx + ry * ry;
        a = pl2 - rl2;
        b = ql2 - rl2;

        o = {
            x: (by * a - ay * b) / d / 2,
            y: (-bx * a + ax * b) / d / 2
        };
        r2 = this.d2(o, triangle[2]);

        return {
            o: o,
            r2: r2
        };
    }
};


/*
    ドロネー分割

    requires : 2d.js
    author:nakagawa[]ville.jp
    license:NYSL
*/
function MathDelaunay(width, height, points) {
    this.rect = [{
        x: 0,
        y: 0
    }, {
        x: width,
        y: 0
    }, {
        x: 0,
        y: height
    }, {
        x: width,
        y: height
    }];
    this.points = points;
    this.triangles = [ // 一番最初の三角形2個
    [this.rect[0], this.rect[1], this.rect[2]],
        [this.rect[1], this.rect[2], this.rect[3]]
    ];
}
MathDelaunay.prototype = {
    split: function() {
        var triangles = this.triangles;
        for (var i = 0, n = this.points.length; i < n; i++) {
            var p = this.points[i];
            // 点pが外接円に含まれるような三角形を選ぶ
            var t = this._chooseTriangles(triangles, p);

            // 三角形をマージして多角形にする
            var poly = this._mergeTriangles(t.ok);

            // 多角形の各頂点と点pを結んで三角形に分割する
            // chooseTriangles()で選ばれなかった三角形は全部残す
            triangles = t.ng.concat(this._splitPolygon(poly, p));
        }
        return triangles;
    },
    // 点pが三角形tの外接円に含まれるか
    _test: function(t, p) {
        // 円の中心からpまでの距離と円の半径を比較
        var circle = Math2D.getCircumscribedCircle(t);
        return circle.r2 >= Math2D.d2(p, circle.o);
    },
    // 点pが外接円に含まれるような三角形を選ぶ
    _chooseTriangles: function(triangles, p) {
        var ok = [];
        var ng = [];
        for (var i = 0, n = triangles.length; i < n; i++) {
            if (this._test(triangles[i], p)) {
                ok.push(triangles[i]);
            } else {
                ng.push(triangles[i]);
            }
        }
        return {
            ok: ok,
            ng: ng
        };
    },
    // 三角形の集合から辺の集合へ
    _triangles2edges: function(triangles) {
        var edges = [];
        for (var i = 0, n = triangles.length; i < n; i++) {
            var t = triangles[i];
            edges.push(
            [t[0], t[1]], [t[1], t[2]], [t[2], t[0]]);
        }
        return edges;
    },
    // 複数の三角形をマージしてひとつの多角形にする
    _mergeTriangles: function(triangles) {
        var polygon = [];
        // 各三角形を辺に分割して、重なる辺を取り除く
        var edges = this._triangles2edges(triangles);
        var n = edges.length;
        for (var i = 0; i < n - 1; i++) {
            var e1 = edges[i];
            if (e1.skip) continue;
            var found = false;
            for (var j = i + 1; j < n; j++) {
                var e2 = edges[j];
                if (
                (e1[0].x == e2[0].x && e1[0].y == e2[0].y && e1[1].x == e2[1].x && e1[1].y == e2[1].y) || (e1[0].x == e2[1].x && e1[0].y == e2[1].y && e1[1].x == e2[0].x && e1[1].y == e2[0].y)) {
                    edges[j].skip = true; // 次以降のループでスキップする
                    found = true;
                    break;
                }
            }
            found || polygon.push([e1[0], e1[1]]);
        }
        // n-1ループでn番目が評価されていないので
        if (!edges[n - 1].skip) polygon.push([edges[n - 1][0], edges[n - 1][1]]);
        return polygon;
    },
    // 多角形の各頂点と点pを結んで三角形に分割する
    _splitPolygon: function(polygon, p) {
        var triangles = [];
        for (var i = 0, n = polygon.length; i < n; i++) {
            var edge = polygon[i];
            triangles.push([edge[0], edge[1], p]);
        }
        return triangles;
    }
};


/*
    canvas wrapper

    author:nakagawa[]ville.jp
    license:NYSL
*/
function VilleCanvas(elem, width, height) {
    this.elem = elem;
    this.ctx = null;
    this.width = elem.width = width;
    this.height = elem.height = height;

    if (!this.elem || !this.elem.getContext) return null;
    this.ctx = this.elem.getContext('2d');
}
VilleCanvas.prototype = {
    plot: function(point, color, size) {
        if (!size) size = 1;
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        this.setFillStyle(color);
        //this.ctx.fillRect(point.x, point.y, size, size);
        this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fill();
    },
    drawTriangle: function(triangle, lineColor, lineWidth, fillColor) {
        this.ctx.beginPath();
        this.setLineStyle(lineColor, lineWidth);
        this.setFillStyle(fillColor);
        this.ctx.globalAlpha = 0.8;
        this.ctx.moveTo(triangle[0].x, triangle[0].y);
        this.ctx.lineTo(triangle[1].x, triangle[1].y);
        this.ctx.lineTo(triangle[2].x, triangle[2].y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    },
    clear: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    setFillStyle: function(color) {
        if (!color) color = '#000000';
        this.ctx.fillStyle = color;
    },
    setLineStyle: function(color, width) {
        if (!color) color = '#000000';
        if (!width) width = 1;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
    },
    loadImage: function(img, x, y) {
        this.ctx.drawImage(img, x, y);
        var im = new VilleImageObject();
        var imagedata = this.ctx.getImageData(0, 0, img.width, img.height);
        im.init(imagedata.width, imagedata.height, imagedata.data);
        return im;
    }
}

var VilleImageObject = function() {
    this.w = 0;
    this.h = 0;
    this.pixels = [];
}
VilleImageObject.prototype = {
    init: function(w, h, pixels) {
        this.w = w;
        this.h = h;
        this.pixels = pixels;
    },
    getPixel: function(p) {
        var n = (Math.floor(p.y) * this.w + Math.floor(p.x) + 1) * 4;
        return [ // r,g,b,alpha
        this.pixels[n],
        this.pixels[n + 1],
        this.pixels[n + 2],
        this.pixels[n + 3]];
    },
    getColor: function(p) {
        var px = this.getPixel(p);
        var color = '#';
        for (var i = 0; i < 3; i++) {
            var n = px[i];
            var c = Math.round(n).toString(16);
            if (n < 16) c = '0' + c;
            color += c;
        }
        return color;
    }
};


/*
var src = 'k.jpg';
$('#img').attr('src', src);

var img = new Image();
img.src = src;
img.onload = function(){
    var w = this.width;
    var h = this.height;

    var vc = new VilleCanvas($('#c').get(0), w, h);
    if(!vc) return;

    var points = [];
    var im = vc.loadImage(img, 0, 0);

    $('#c').click(function(e){
        var x = $(this).position().left;
        var y = $(this).position().top;
        var p = {
            x : e.pageX - x - 9,
            y : e.pageY - y - 9
        }
        //im.getPixel(p);
        vc.plot(p, '#FF0000', 3);
        points.push(p);
    });

    $('button').click(function(){
        var d = new MathDelaunay(w, h, points);
        var triangles = d.split();
        $.each(triangles, function(i, t){
            var center = Math2D.getCenterOfGravity(t);
            var color = im.getColor(center);
            vc.drawTriangle(t, '#FFFFFF', 1, color);
        });
    });
}
*/

