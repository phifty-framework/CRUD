import React from "react";


import CRUDRelModal from "../CRUDRelModal";

/*
<CRUDCreateButton 
    label="Create"
    size="large"
    side=false
    baseUrl=/bs/user
>
</CRUDCreateButton>



<CRUDCreateButton 
    modelLabel="Create"
    size="large"
    side=false
    baseUrl=/bs/user
>
</CRUDCreateButton>


*/
export default React.createClass({

  propTypes: {
    /**
     * label of the button
     */
    "label": React.PropTypes.string,

    /*
     * the baseUrl of a CRUD handler, usually "/bs"
     */
    "baseUrl": React.PropTypes.string,


    // modal related options
    // ==============================
    /**
     * the modal size: it could be "large", "small"
     */
    "size": React.PropTypes.string,

    /**
     * show the modal as a side modal?
     */
    "side": React.PropTypes.bool,

    /**
     * the title of the modal
     */
    "title": React.PropTypes.string,

    "onInit": React.PropTypes.func,

    "onSuccess": React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {};
  },

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() { },

  componentWillUnmount: function() { },


  handleCreateAction: function(e) {
    e.stopPropagation();
    CRUDRelModal.open(
        this.props.title || this.props.label || 'Untitled',
        this.props.baseUrl + "/crud/create", {},
        {
            "size": this.props.size || "large",
            "side": this.props.side || false,
            "closeOnSuccess": true,
            "init": this.props.onInit, /* function(e, ui) { */
            "success": this.props.onSuccess, /* function(ui, resp) { */
        });
  },

  render: function() {
      return <div key={this.key} className="btn-group">
        <button className="btn btn-success" onClick={this.handleCreateAction}>
            {this.props.label || '建立'}
        </button>
      </div>;
  }
});
