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

  // ���ץ��饹��@��
  AMP.inherits(Delaunay, AMP.BASE_CLASS);

  // prototype
  var p = Delaunay.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>�Щ`��������</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Delaunay.VERSION = '1.0.0';


  /**
   * <h4>���饹��</h4>
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

    // һ�������������2��
    this._defaultTriangles = [
      [this.rect[0], this.rect[1], this.rect[2]],
      [this.rect[1], this.rect[2], this.rect[3]]
    ];
  };


  // �ָ������
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

      // FIXME: �����Τ�ީ`�����ƶ���Τˤ���
      if(triangles.ok.length){
        delaunayEdges = triangles.ng.concat(self._splitPolygon(self._mergeTriangles(triangles.ok), point));
      }
    });

    this.delaunayEdges = delaunayEdges;

    return delaunayEdges;
  };


  // ��p����ӃҤ˺��ޤ��褦�������Τ��x��
  // FIXME: ok, ng�Ϥ��ȤǤ�����
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


  // ��p��������t����ӃҤ˺��ޤ�뤫
  /**
   * [_test description]
   * @param  {[type]} triangle [description]
   * @param  {[type]} point    [description]
   * @return {[type]}          [description]
   */
  p._test = function(edges, point){
    // �Ҥ����Ĥ���point�ޤǤξ��x�ȃҤΰ뾶����^
    var circle = Delaunay.getCircumscribedCircle(edges);
    return !!circle && circle.diffMag >= AMP.Vector.diffMag(point, circle.point);
  };


  // �}���������Τ�ީ`�����ƤҤȤĤζ���Τˤ���
  /**
   * [_mergeTriangles description]
   * @param  {[type]} triangles [description]
   * @return {[type]}           [description]
   */
  p._mergeTriangles = function(triangles) {
    // �������Τ��x�˷ָ�ơ��ؤʤ��x��ȡ�����
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
            // ���Խ��Υ�`�פǥ����åפ���
            edges[j].skip = true;
            found = true;
            break;
          }
        }

        found || polygon.push([edge1[0], edge1[1]]);
      }
    });

    // total-1��`�פ�n��Ŀ���u������Ƥ��ʤ��Τ�
    if (!edges[total - 1].skip){
      polygon.push([edges[total - 1][0], edges[total - 1][1]]);
    }

    return polygon;
  };


  // �����Τμ��Ϥ����x�μ��Ϥ�
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


  // ����Τθ�픵�ȵ�p��Y��������Τ˷ָ��
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
   * ׷��
   * �����Τ�����
   */
  Delaunay.getCenterOfGravity = function(triangle){
    // �����2�ĤΥ٥��ȥ�κͤ�1/3�����Ĥˤʤ�
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
    var point, radius,
    p1x, p1y, p2x, p2y, p3x, p3y,
    o1x, o1y, o2x, o2y,
    a, b, pl2, ql2, rl2;

    // ���������
    p1x = edges[0].x;
    p1y = edges[0].y;
    p2x = edges[1].x;
    p2y = edges[1].y;
    p3x = edges[2].x;
    p3y = edges[2].y;

    // ���Ǥ��⾶
    o1x = p1x - p3x;
    o1y = p1y - p3y;
    o2x = p2x - p3x;
    o2y = p2y - p3y;

    // ���Ǿ����x�뾶������
    radius = (o1x * o2y - o1y * o2x) / 2;

    if(radius === 0){
      return null;
    }

    // ��������
    pl2 = p1x * p1x + p1y * p1y;
    ql2 = p2x * p2x + p2y * p2y;
    rl2 = p3x * p3x + p3y * p3y;
    a = pl2 - rl2;
    b = ql2 - rl2;

    point = {
      x: (o2y * a - o1y * b) / radius,
      y: (o2x * a * -1 + o1x * b) / radius
    };

    return {
      point  : point,
      diffMag: AMP.Vector.diffMag(point, edges[2])
    };
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Delaunay = Delaunay;



}(window, AMP));
