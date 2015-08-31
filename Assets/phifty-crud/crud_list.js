// Generated by CoffeeScript 1.9.3

/*

To generate a image cover element with a hidden input of the primary key:

      coverView = new CRUDList.ImageItemView {
          deleteAction: "ProductBundle::Action::DeleteProductImage"
          relation: "images"
        }, { record json }
      coverView.appendTo( $('#productImages') )

Which generates the input name with

        name="images[id]" value="{primary id}"
 */

(function() {
  var CRUDList,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.CRUDList = CRUDList = {};

  window.InputHelper = {};

  InputHelper.hiddenInput = function(name, val) {
    return $('<input/>').attr({
      type: 'hidden',
      name: name,
      value: val
    });
  };


  /*
   *
   * @data (hash): Contains anything you need.
   *
   * @uiSettings:
   *   label (string)
   *   labelBy (string)
   *
   * @config:
   *   new (boolean)
   *   primaryKey (string): for example, "id"
   *   relation (string): for example, "product_images"
   */

  CRUDList.NewBaseItemView = (function() {
    function NewBaseItemView(data1, uiSettings, config1) {
      this.data = data1;
      this.uiSettings = uiSettings;
      this.config = config1;
      this.config.primaryKey = this.config.primaryKey || "id";
    }

    NewBaseItemView.prototype.renderHiddenField = function($el, fieldName) {
      var index, pkId, val;
      pkId = this.data[this.config.primaryKey];
      val = this.data[fieldName];
      index = this.config.index ? this.config.index : pkId;
      if (!val) {
        return;
      }
      if (this.config.relation) {
        return $el.append(InputHelper.hiddenInput(this.config.relation + ("[" + index + "][" + fieldName + "]"), val));
      } else {
        return $el.append(InputHelper.hiddenInput(fieldName, val));
      }
    };

    NewBaseItemView.prototype.renderFields = function($el) {
      var k, ref, v;
      ref = this.data;
      for (k in ref) {
        v = ref[k];
        this.renderHiddenField($el, k);
      }
    };

    NewBaseItemView.prototype._render = function() {
      if (this.el) {
        return this.el;
      }
      this.el = this.render();
      return this.el;
    };

    NewBaseItemView.prototype.append = function(el) {
      return this._render().append(el);
    };

    NewBaseItemView.prototype.appendTo = function(target) {
      return this._render().appendTo($(target));
    };

    return NewBaseItemView;

  })();

  CRUDList.NewTextItemView = (function(superClass) {
    extend(NewTextItemView, superClass);

    function NewTextItemView() {
      return NewTextItemView.__super__.constructor.apply(this, arguments);
    }

    NewTextItemView.prototype.render = function() {
      var $cover, config, data, label;
      config = this.config;
      data = this.data;
      label = this.uiSettings.label || this.data[this.uiSettings.labelBy] || "Untitled";
      $cover = AdminUI.createTag({
        label: label,
        onRemove: function(e) {
          if (config.deleteAction && data.id) {
            return runAction(config.deleteAction, {
              id: data.id
            }, {
              confirm: '確認刪除? ',
              remove: $cover
            });
          } else {
            return $cover.remove();
          }
        }
      });
      this.renderFields($cover);
      return $cover;
    };

    return NewTextItemView;

  })(CRUDList.NewBaseItemView);

  CRUDList.BaseItemView = (function() {

    /*
    @config: the config.create
     */
    function BaseItemView(config1, data1, crudConfig) {
      this.config = config1;
      this.data = data1;
      this.crudConfig = crudConfig;
      this.crudConfig || (this.crudConfig = {});
      this.config.primaryKey = this.config.primaryKey || "id";
    }

    BaseItemView.prototype.createHiddenInput = function(name, val) {
      return $('<input/>').attr({
        type: 'hidden',
        name: name,
        value: val
      });
    };

    BaseItemView.prototype.renderKeyField = function() {
      if (this.config.primaryKey && this.data[this.config.primaryKey]) {
        if (this.config.relation) {
          return this.createHiddenInput(this.config.relation + ("[" + this.data[this.config.primaryKey] + "][" + this.config.primaryKey + "]"), this.data[this.config.primaryKey]);
        } else {
          return this.createHiddenInput("id", this.data[this.config.primaryKey]);
        }
      }
    };

    BaseItemView.prototype.appendTo = function(target) {
      return this.render().appendTo($(target));
    };

    return BaseItemView;

  })();

  CRUDList.TextItemView = (function(superClass) {
    extend(TextItemView, superClass);

    function TextItemView() {
      return TextItemView.__super__.constructor.apply(this, arguments);
    }

    TextItemView.prototype.render = function() {
      var $cover, config, data, ref;
      config = this.config;
      data = this.data;
      $cover = AdminUI.createTextTag(data, {
        onClose: function(e) {
          if (config.deleteAction && data.id) {
            return runAction(config.deleteAction, {
              id: data.id
            }, {
              confirm: '確認刪除? ',
              remove: $cover
            });
          } else {
            return $cover.remove();
          }
        }
      });
      if ((ref = this.renderKeyField()) != null) {
        ref.appendTo($cover);
      }
      return $cover;
    };

    return TextItemView;

  })(CRUDList.BaseItemView);

  CRUDList.FileItemView = (function(superClass) {
    extend(FileItemView, superClass);

    function FileItemView() {
      return FileItemView.__super__.constructor.apply(this, arguments);
    }

    FileItemView.prototype.render = function() {
      var $close, $cover, $keyField, config, data;
      config = this.config;
      data = this.data;
      $cover = AdminUI.createFileCover(data);
      $close = $('<div/>').addClass('close').click(function() {
        if (config.deleteAction && data.id) {
          return runAction(config.deleteAction, {
            id: data.id
          }, {
            confirm: '確認刪除? ',
            remove: $cover
          });
        } else {
          return $cover.remove();
        }
      });
      $close.appendTo($cover);
      $keyField = this.renderKeyField();
      if ($keyField != null) {
        $keyField.appendTo($cover);
      }
      return $cover;
    };

    return FileItemView;

  })(CRUDList.BaseItemView);

  CRUDList.ResourceItemView = (function(superClass) {
    extend(ResourceItemView, superClass);

    function ResourceItemView() {
      return ResourceItemView.__super__.constructor.apply(this, arguments);
    }

    ResourceItemView.prototype.render = function() {
      var $cover, $keyField, config, data;
      config = this.config;
      data = this.data;
      $cover = AdminUI.createResourceCover(data, {
        onClose: function(e) {
          return runAction(config.deleteAction, {
            id: data[config.primaryKey]
          }, {
            confirm: '確認刪除? ',
            remove: this
          });
        }
      });
      $keyField = this.renderKeyField();
      if ($keyField != null) {
        $keyField.appendTo($cover);
      }
      return $cover;
    };

    return ResourceItemView;

  })(CRUDList.BaseItemView);

  CRUDList.ImageItemView = (function(superClass) {
    extend(ImageItemView, superClass);

    function ImageItemView() {
      return ImageItemView.__super__.constructor.apply(this, arguments);
    }

    ImageItemView.prototype.render = function() {
      var $cover, $keyField, config, self;
      self = this;
      config = this.config;
      $cover = AdminUI.createImageCover({
        thumb: this.data.thumb,
        image: this.data.image,
        title: this.data.title,
        onClose: function(e) {
          return runAction(config.deleteAction, {
            id: self.data[config.primaryKey]
          }, {
            confirm: '確認刪除? ',
            remove: this
          });
        }
      });
      $keyField = this.renderKeyField();
      if ($keyField != null) {
        $keyField.appendTo($cover);
      }
      return $cover;
    };

    return ImageItemView;

  })(CRUDList.BaseItemView);


  /*
  
  CRUDList.init({
    title: "產品附圖",
    hint: "您可於此處上傳多組產品副圖",
    container: $('#product-images'),
    crudId: "product_image",
    itemView: CRUDList.ImageItemView,
    modal:
      backdrop: false
    create: {
      deleteAction: "ProductBundle::Action::DeleteProductImage",
      relation: "images",
    }
  })
   */

  CRUDList.init = function(config) {
    var $container, $createBtn, $hint, $imageContainer, $title, itemViewClass;
    itemViewClass = config.itemView;
    if (config.dialogOptions === void 0) {
      config.dialogOptions = {
        width: 650
      };
    }
    $container = $(config.container);
    $imageContainer = CRUDList.createContainer();
    $createBtn = $('<input/>').attr({
      type: "button"
    }).val("新增" + config.title).addClass("btn btn-small").css({
      float: "right"
    });
    $createBtn.click(function(e) {
      var ui;
      ui = ModalManager.createBlock({
        title: config.title,
        ajax: {
          url: "/bs/" + config.crudId + "/crud/modal",
          args: {
            _submit_btn: false,
            _close_btn: false
          }
        },
        controls: [
          {
            label: 'Save',
            onClick: function(e, ui) {
              return ui.body.find("form").submit();
            }
          }
        ]
      });
      ui.dialog.on("dialog.ajax.done", function(e, ui) {
        var form;
        form = ui.body.find("form").get(0);
        return Action.form(form, {
          status: true,
          clear: true,
          onSuccess: function(resp) {
            var coverView;
            ui.dialog.modal('hide');
            setTimeout((function() {
              return ui.container.remove();
            }), 800);
            if (itemViewClass) {
              coverView = new itemViewClass(config.create, resp.data, config);
              return coverView.appendTo($imageContainer);
            } else {
              return $.get("/bs/" + config.crudId + "/crud/item", {
                id: resp.data.id
              }, function(html) {
                return $container.append(html);
              });
            }
          }
        });
      });
      return ui.container.modal((config != null ? config.modal : void 0) || 'show');
    });
    $title = $('<h3/>').text(config.title);
    $hint = $('<span/>').text(config.hint).addClass("hint");
    CRUDList.renderRecords($imageContainer, config.records, config);
    return $container.append($createBtn).append($title).append($hint).append($imageContainer);
  };

  CRUDList.createContainer = function() {
    return $('<div/>').addClass("clearfix item-container");
  };

  CRUDList.renderRecord = function($container, record, config) {
    var coverView, itemViewClass;
    if (!record) {
      return;
    }
    itemViewClass = config.itemView;
    coverView = new itemViewClass(config.create, record, config);
    return coverView.appendTo($container);
  };

  CRUDList.renderRecords = function($container, records, config) {
    var coverView, i, itemViewClass, len, record, results;
    if (!records) {
      return;
    }
    itemViewClass = config.itemView;
    results = [];
    for (i = 0, len = records.length; i < len; i++) {
      record = records[i];
      if (itemViewClass) {
        coverView = new itemViewClass(config.create, record, config);
        results.push(coverView.appendTo($container));
      } else {
        results.push($.get("/bs/" + config.crudId + "/crud/item", {
          id: record.id
        }, function(html) {
          return $container.append(html);
        }));
      }
    }
    return results;
  };

}).call(this);
