// Generated by CoffeeScript 1.9.3

/*
 *
 * Initialize CRUD front-end component intiailziation
 *
 */

(function() {
  $(function() {

    /* 
     * Here is the old way to append "create form"
     * Hook the record create button
    $(document).on "click", ".record-create-btn", (e) ->
       * .control-section
       * console.log ".control-section", $(this).parents(".control-section")
       * here is the logic controls how the "form" will be opened.
      Region.after $(this).parents(".control-section").get(0), $(this).data("create-region-url")
      return false
     */
    $(document).on("click", ".record-create-btn", function(e) {
      console.log("create record", e);
      e.stopPropagation();
      CRUDModal.openFromBtn($(this), typeof config !== "undefined" && config !== null ? config.modal : void 0);
      return false;
    });
    $(document).on("click", ".column-sort", function(e) {
      var r;
      r = Region.of(this);
      r.refreshWith({
        _order_column: $(this).data('sort-column'),
        _order_by: $(this).data('sort-type')
      });
      return false;
    });
    $(document).on("change", ".crud-quicksearch", function() {
      var target;
      target = $(this).data("target");
      return $(target).asRegion().refreshWith({
        _q: this.value,
        page: 1
      });
    });
    $('.date-picker').datepicker({
      dateFormat: 'yy-mm-dd'
    });
    return $(Region).bind('region.load', function(e, $el) {
      if (typeof $.oembed !== 'undefined') {
        $el.find('.oembed').oembed(null, {
          maxHeight: 160,
          maxWidth: 300
        });
      }
      $el.find('.date-picker').datepicker({
        dateFormat: 'yy-mm-dd'
      });
      FormKit.initialize($el);
      $el.find('.nav-tabs li:first-child a[data-toggle="tab"]').tab('show');
      $el.find('.accordion').accordion({
        active: false,
        collapsible: true,
        autoHeight: false
      });
      $el.find('select[name=lang]').addClass('lang-switch');
      I18N.initLangSwitch($el);
      use_tinymce('adv1', {
        popup: true
      });
      $el.find(".collapsible").collapse();
      return $el.find(".v-field .hint").each(function(i, e) {
        var $hint;
        $hint = $(this);
        $hint.hide().css({
          position: "absolute",
          zIndex: 100
        });
        $hint.parent().css({
          position: "relative"
        });
        return $hint.prev().hover((function() {
          return $hint.fadeIn();
        }), function() {
          return $hint.fadeOut();
        });
      });
    });
  });

}).call(this);
