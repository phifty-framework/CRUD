// Generated by CoffeeScript 1.7.1

/*

new Phifty.CRUDChooser('/=/product_feature/chooser/list.json',{  },{ 
 onChoose: function(el) {  },
 listBuilder: function(items) {  }
})
 */

(function() {
  Phifty.CRUDChooser = (function() {
    function CRUDChooser(path, args, opts) {
      this.opts = opts;
      if ($('.ui-dialog').get(0)) {
        $('.ui-dialog').remove();
      }
      this.dialog = $('<div/>');
      $.getJSON(path, args, (function(_this) {
        return function(items) {
          if (_this.opts.listBuilder) {
            return _this.opts.listBuilder.apply(_this, [items]).appendTo(_this.dialog);
          } else {
            _this.buildList(items).appendTo(_this.dialog);
            return _this.dialog.dialog({
              minWidth: 450,
              modal: true
            });
          }
        };
      })(this));
    }

    CRUDChooser.prototype.bindOnChoose = function($el, item) {
      return $el.click((function(_this) {
        return function(e) {
          if (_this.opts.onChoose) {
            _this.opts.onChoose.apply(_this, [item]);
          }
          return _this.dialog.dialog('close');
        };
      })(this));
    };

    CRUDChooser.prototype.buildList = function(items) {
      var $ul, item, _fn, _i, _len;
      $ul = $('<ul/>').addClass('crud-chooser');
      _fn = (function(_this) {
        return function(item) {
          var $a, $li;
          $li = $('<li/>');
          $a = $('<a/>').text(item.label).appendTo($li);
          _this.bindOnChoose($a, item);
          return $li.appendTo($ul);
        };
      })(this);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _fn(item);
      }
      return $ul;
    };

    return CRUDChooser;

  })();

}).call(this);