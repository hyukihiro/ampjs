/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara


(function(root, AMP){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * [Delaunay description]
   * @param {[type]} width  [description]
   * @param {[type]} height [description]
   * @param {[type]} points [description]
   */
  function Delaunay(width, height, points){
    /**
     * [rect description]
     * @type {Array}
     */
    this.rect = [];


    /**
     * [_defaultTriangles description]
     * @type {Array}
     */
    this._defaultTriangles = [];


    /**
     * [delaunayEdges description]
     * @type {Array}
     */
    this.delaunayEdges = [];


    /**
     * [points description]
     * @type {[type]}
     */
    this.points = points;

    this.setSize(width, height);
  }

  // 基底クラスを継承
  AMP.inherits(Delaunay, AMP.BASE_CLASS);

  // prototype
  var p = Delaunay.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Delaunay.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Delaunay';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * [setSize description]
   * @param {[type]} width  [description]
   * @param {[type]} height [description]
   */
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
  /**
   * [getDelaunay description]
   * @return {[type]} [description]
   */
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


  // 点pが外接円に含まれるような三角形を選ぶ
  // FIXME: ok, ngはあとでかえる
  /**
   * [_chooseTriangles description]
   * @param  {[type]} triangles [description]
   * @param  {[type]} point     [description]
   * @return {[type]}           [description]
   */
  p._chooseTriangles = function(triangle, point) {
    var self = this,
    ok = [],
    ng = [];

    AMP.each(triangle, function(edges){
      if(self._test(edges, point)){
        ok.push(edges);
      } else {
        ng.push(edges);
      }
    });

    return {
      ok: ok,
      ng: ng
    };
  };


  // 点pが三角形tの外接円に含まれるか
  /**
   * [_test description]
   * @param  {[type]} triangle [description]
   * @param  {[type]} point    [description]
   * @return {[type]}          [description]
   */
  p._test = function(edges, point){
    // 円の中心からpまでの距離と円の半径を比較
    var circle = Delaunay.getCircumscribedCircle(edges);
    return circle.diffMag >= AMP.Vector.diffMag(point, circle.point);
  };


  // 複数の三角形をマージしてひとつの多角形にする
  /**
   * [_mergeTriangles description]
   * @param  {[type]} triangles [description]
   * @return {[type]}           [description]
   */
  p._mergeTriangles = function(triangles) {
    // 各三角形を辺に分割して、重なる辺を取り除く
    var polygon = [],
    edges = this.trianglesToEdges(triangles),
    total = edges.length;

    AMP.each(edges, function(edge1, index){
      if(edge1.skip || index === total - 1){
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


  // 三角形の集合から辺の集合へ
  /**
   * [trianglesToEdges description]
   * @param  {[type]} triangles [description]
   * @return {[type]}           [description]
   */
  p.trianglesToEdges = function(triangles) {
    var edges = [];

    AMP.each(triangles, function(edge){
      edges.push([edge[0], edge[1]], [edge[1], edge[2]], [edge[2], edge[0]]);
    });

    return edges;
  };


  // 多角形の各頂点と点pを結んで三角形に分割する
  /**
   * [_splitPolygon description]
   * @param  {[type]} polygon [description]
   * @param  {[type]} point   [description]
   * @return {[type]}         [description]
   */
  p._splitPolygon = function(polygon, point) {
    var triangles = [];
    AMP.each(polygon, function(edge){
      triangles.push([edge[0], edge[1], point]);
    });

    return triangles;
  };


  /**
   * 追加
   * 三角形の重心
   */
  Delaunay.getCenterOfGravity = function(triangle){
    // 任意の2つのベクトルの和の1/3が重心になる
    var p = AMP.Vector.sub(triangle[0], triangle[1]);
    var q = AMP.Vector.sub(triangle[0], triangle[2]);
    p.add(q);

    return {
      x: p.x / 3 + triangle[0].x,
      y: p.y / 3 + triangle[0].y
    };
  };


  /**
   * [getCircumscribedCircle description]
   * @param  {[type]} triangle [description]
   * @return {[type]}          [description]
   */
  Delaunay.getCircumscribedCircle = function(edges){
    var px, py, qx, qy, rx, ry,
    ax, ay, bx, by,
    d, a, b, pl2, ql2, rl2;

    px = edges[0].x;
    py = edges[0].y;
    qx = edges[1].x;
    qy = edges[1].y;
    rx = edges[2].x;
    ry = edges[2].y;

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

    var diffMag = AMP.Vector.diffMag(point, edges[2]);

    return {
      point  : point,
      diffMag: diffMag
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Delaunay = Delaunay;



}(window, AMP));
