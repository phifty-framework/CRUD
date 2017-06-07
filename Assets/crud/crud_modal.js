// Generated by CoffeeScript 1.9.3
(function() {
  var ControlBuilder;

  window.CRUDModal = {};

  ControlBuilder = {
    primaryButtonClass: "btn btn-primary btn-success"
  };

  ControlBuilder.createButton = function(label, config) {
    var btn;
    btn = document.createElement('button');
    btn.innerText = label;
    btn.className = this.primaryButtonClass;
    return btn;
  };


  /*
  
  A CRUDModal presents the record form in a modal. There will be at least a
  submit button, close button and extra custom buttons.
  
  Users may also register customzied controls to the modal.
  
  
  Create a bootstrap modal with the ajax content.
  
  Options
  ================
  
  title (string): title of the modal
  side (boolean): if it's a side modal
  size (string): size of the modal, css class name
  id (integer): the record id.
  url (string):  the url of ajax content
  controls (array): the config for creating controls
  
  Callback options
  ----------------
  
  init (function): the callback for initializing modal content.
  success (function): this callback will be triggered when the form is submited successfully.
  
  
  Example
  =================
  
      CRUDModal.open({
        "title": "建立新的" + this.props.modelLabel,
        "size": "lg",
        "side": true,
        "url": "/bs/org/crud/create",
        "init": function(e, ui) {
          // the modal content init callback
          console.log("modal content is ready to be initialized.")
        },
        "success": function(ui, resp) {
          console.log("form is submitted successfully")
        }
      })
   */

  CRUDModal.open = function(config, modalConfig) {
    var ajaxConfig, defaultControls, saveButton, ui;
    saveButton = {
      label: '儲存',
      primary: true,
      onClick: function(e, ui) {
        return ui.body.find("form").submit();
      }
    };
    defaultControls = [saveButton];
    ajaxConfig = {
      url: config.url,
      args: {
        _submit_btn: false,
        _close_btn: false
      }
    };
    if (config.args) {
      ajaxConfig.args = config.args;
    }
    if (config.id) {
      ajaxConfig.args.id = config.id;
    }
    ui = ModalManager.create({
      "title": config.title,
      "side": config.side || false,
      "size": config.size,
      "ajax": config.ajax || ajaxConfig,
      "controls": config.controls || defaultControls
    });
    this._initBody(ui, config);
    ui.dialog.foldableModal(modalConfig || 'show');
    return ui;
  };

  CRUDModal.update = function(ui, opts) {
    ModalFactory.update(ui, opts);
    return this._initBody(ui, opts);
  };

  CRUDModal._initBody = function(ui, config) {
    return ui.dialog.on("dialog.ajax.done", function(e, ui) {
      var form, setupForm;
      if (config.init) {
        config.init(e, ui);
      }
      form = ui.body.find("form").get(0);
      setupForm = function(ui, form) {
        var $result, a, scrollTimer;
        $result = $('<div/>').addClass('action-result-container');
        $(form).before($result);
        scrollTimer = null;
        $(ui.body).scroll(function(e) {
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }
          return scrollTimer = setTimeout((function() {
            return $result.css({
              top: ui.body.get(0).scrollTop
            });
          }), 100);
        });
        a = Action.form(form, {
          status: true,
          clear: false,
          onSuccess: function(resp) {
            if (config.success) {
              config.success(ui, resp);
            }
            if (config.closeOnSuccess) {
              return setTimeout((function() {
                return ui.dialog.foldableModal('close');
              }), 1000);
            }
          }
        });
        a.plug(new ActionBootstrapHighlight);
        return a.plug(new ActionMsgbox({
          container: $result,
          fadeOut: false
        }));
      };
      if (form) {
        return setupForm(ui, form);
      }
    });
  };


  /*
  
  CRUDModal.openFromBtn depends on data attributes:
  
  - data-modal-title: modal title
  - data-modal-side: display as a side modal?
  - data-modal-size: modal size size
  - data-edit-url: the url of the content to be embedded.
  
  This method reads the attributes from button element and open the CRUD form in
  a modal.
  
  modalConfig will be used when you need to define modal options.
   */

  CRUDModal.openFromBtn = function($btn, modalConfig) {
    var id, side, size, title;
    id = $btn.data("record-key");
    title = $btn.data("modal-title");
    size = $btn.data("modal-size");
    side = $btn.data("modal-side");
    return CRUDModal.open({
      "title": title,
      "size": size,
      "side": side,
      "closeOnSuccess": true,
      "url": $btn.data("edit-url"),
      "id": id
    });
  };

}).call(this);
