// Generated by CoffeeScript 1.6.3
(function() {
  var QuickCRUD;

  QuickCRUD = (function() {
    function QuickCRUD(element, options) {
      var self,
        _this = this;
      this.element = element;
      this.options = options;
      this.selectInput = $(this.element);
      this.createButton = $('<button/>').text('新增').click(function(e) {
        _this.create();
        return false;
      });
      this.deleteButton = $('<button/>').text('刪除').click(function(e) {
        var val;
        val = _this.selectInput.val();
        if (val && confirm('確定刪除?')) {
          runAction(_this.options.deleteAction, {
            id: val
          }, function(resp) {
            _this.selectInput.find("option[value=" + val + "]").remove();
            return _this.selectInput.trigger("change");
          });
        }
        return false;
      });
      self = this;
      this.selectInput.after(this.createButton);
      this.selectInput.change(function(e) {
        var val;
        val = $(this).val();
        if (val) {
          return self.deleteButton.show();
        } else {
          return self.deleteButton.hide();
        }
      });
      this.deleteButton.hide();
      if (!this.selectInput.val()) {
        this.deleteButton.hide();
      }
    }

    QuickCRUD.prototype.create = function() {
      var dialog,
        _this = this;
      return dialog = new CRUDDialog(this.options.dialogPath, {}, {
        dialogOptions: {
          width: 400
        },
        onSuccess: function(resp) {
          var label, val;
          label = resp.data[_this.options.dataLabelField];
          val = resp.data[_this.options.dataValueField];
          _this.selectInput.find('option:selected').removeAttr('selected');
          $('<option/>').text(label).val(val).attr('selected', 'selected').appendTo(_this.selectInput);
          return _this.selectInput.trigger("change");
        }
      });
    };

    return QuickCRUD;

  })();

  window.QuickCRUD = QuickCRUD;

}).call(this);
