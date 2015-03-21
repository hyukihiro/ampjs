(function(root, Backbone, _) {

  /**
   * <h4>イベントを仲介します</h4>
   * Backbone.Eventsクラスをエクスポートしています
   *
   * @module MEDIATOR
   */
  root.app = root.app || {};
  root.app.MEDIATOR = _.extend({}, Backbone.Events);


}(window, Backbone, _));
