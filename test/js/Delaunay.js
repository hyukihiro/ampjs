var Delaunay = (function(){

  function Delaunay(width, height, points){
    this.delaunayEdges = [];
    this.setSize(width, height);
    this.points = points;
  }


  var p = Delaunay.prototype;


  p.setSize = function(width, height){
    this.width = width;
    this.height = height;

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

    // 一番最初の三角形2個
    this._defaultTriangles = [
      [this.rect[0], this.rect[1], this.rect[2]],
      [this.rect[1], this.rect[2], this.rect[3]]
    ];
  };


  // 分割を作成
  p.getDelaunay = function(){
    var self = this,
    delaunayEdges = this._defaultTriangles.concat();

    AMP.each(this.points, function(point, index){
      // FIXME
      var triangles = self._chooseTriangles(delaunayEdges, point);

      // FIXME: 三角形をマージして多角形にする
      var poly = self._mergeTriangles(triangles.ok);
      delaunayEdges = triangles.ng.concat(self._splitPolygon(poly, point));
    });

    this.delaunayEdges = delaunayEdges;

    return delaunayEdges;
  };


  // 点pが三角形tの外接円に含まれるか
  p._test = function(triangle, point){
    // FIXME: 円の中心からpまでの距離と円の半径を比較
    var circle = Delaunay.getCircumscribedCircle(triangle);
    return circle.diffMag >= AMP.Vector.diffMag(point, circle.point);
  };

  // 点pが外接円に含まれるような三角形を選ぶ
  p._chooseTriangles = function(triangles, point) {

    // FIXME: ok, ngはあとでかえる
    var ok = [];
    var ng = [];

    for (var i = 0, n = triangles.length; i < n; i++) {
      if (this._test(triangles[i], point)) {
        ok.push(triangles[i]);
      } else {
        ng.push(triangles[i]);
      }
    }

    return {
      ok: ok,
      ng: ng
    };
  };

  // 三角形の集合から辺の集合へ
  p.trianglesToEdges = function(triangles) {
    var edges = [];

    AMP.each(triangles, function(edge){
      edges.push([edge[0], edge[1]], [edge[1], edge[2]], [edge[2], edge[0]]);
    });

    return edges;
  };

  // 複数の三角形をマージしてひとつの多角形にする
  p._mergeTriangles = function(triangles) {
    var polygon = [];

    // 各三角形を辺に分割して、重なる辺を取り除く
    var edges = this.trianglesToEdges(triangles);

    var total = edges.length;


    AMP.each(edges, function(edge1, index){
      if(edge1.skip){
        return true;
      } else {

        var found = false;

        for(var j = index + 1; j < total; j += 1){
          var edge2 = edges[j];

          // FIXME:
          if((edge1[0].x == edge2[0].x && edge1[0].y == edge2[0].y && edge1[1].x == edge2[1].x && edge1[1].y == edge2[1].y) ||
            (edge1[0].x == edge2[1].x && edge1[0].y == edge2[1].y && edge1[1].x == edge2[0].x && edge1[1].y == edge2[0].y)){
            // 次以降のループでスキップする
            edges[j].skip = true;
            found = true;
            break;
          }
        }

        found || polygon.push([edge1[0], edge1[1]]);
      }
    });

    // total-1ループでn番目が評価されていないので
    if (!edges[total - 1].skip){
      polygon.push([edges[total - 1][0], edges[total - 1][1]]);
    }

    return polygon;
  };


  // 多角形の各頂点と点pを結んで三角形に分割する
  p._splitPolygon = function(polygon, point) {
    var triangles = [];
    AMP.each(polygon, function(edge, index){
      triangles[index] = [edge[0], edge[1], point];
    });

    return triangles;
  };


  Delaunay.getCircumscribedCircle = function(triangle){
    var px, py, qx, qy, rx, ry,
    ax, ay, bx, by,
    d, a, b, pl2, ql2, rl2;

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

    if (d === 0) {
      return null;
    }

    pl2 = px * px + py * py;
    ql2 = qx * qx + qy * qy;
    rl2 = rx * rx + ry * ry;
    a = pl2 - rl2;
    b = ql2 - rl2;

    var point = {
        x: (by * a - ay * b) / d / 2,
        y: (-bx * a + ax * b) / d / 2
    };

    diffMag = AMP.Vector.diffMag(point, triangle[2]);

    return {
      point  : point,
      diffMag: diffMag
    };
  }


  return Delaunay;
}())

