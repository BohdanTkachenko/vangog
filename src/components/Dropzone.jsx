import React, { PropTypes } from 'react';
import ReactDropzone from 'react-dropzone';

export class Dropzone extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onDrop: PropTypes.func,
  };

  render() {
    const { children, onDrop } = this.props;
    const uploadEnabled = typeof onDrop === 'function';

    if (!uploadEnabled) {
      return (
        <div className="Vangog__dropzone">
          {children}
        </div>
      );
    }

    return (
      <ReactDropzone
        ref={dropzone => { this.dropzone = dropzone; }}
        className="Vangog__dropzone"
        activeClassName="Vangog__dropzone_active"
        onDrop={onDrop}
        disableClick
      >
        <div
          className="Vangog__gridItem Vangog__gridItemUpload"
          onClick={() => this.dropzone.open()}
        >
          <div className="Vangog__gridItem_mask"></div>
        </div>

        {children}
      </ReactDropzone>
    );
  }
}
