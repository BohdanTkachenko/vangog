import cx from 'classnames';
import React, { PropTypes } from 'react';
import { Loader, Dropzone } from './components';

export class Vangog extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      file: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
    multiple: PropTypes.bool,
  };

  state = {
    selected: [],
  };

  componentWillMount() {
    this.setSelected(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setSelected(nextProps.value);
  }

  onChange() {
    const { onChange } = this.props;
    const { selected } = this.state;

    if (typeof onChange === 'function') {
      onChange(selected);
    }
  }

  setSelected(items) {
    let selected = items;
    if (!Array.isArray(selected)) {
      selected = [];
    }

    if (!this.props.multiple && selected.length > 1) {
      selected = [selected[0]];
    }

    this.setState({ selected });
  }

  select(file) {
    return () => {
      const { selected } = this.state;

      const index = selected.indexOf(file);
      if (index >= 0) {
        selected.splice(index, 1);
      } else {
        selected.push(file);
      }

      this.setSelected(selected);
    };
  }

  render() {
    const { loading, onDrop, list } = this.props;
    const { selected } = this.state;

    return (
      <div className="Vangog">
        {loading && <Loader />}

        <Dropzone onDrop={onDrop}>
          {list.map(item => (
            <div
              key={item.file}
              className={cx({
                Vangog__gridItem: true,
                Vangog__gridItem_selected: item.file && selected.includes(item.file),
              })}
              style={{
                backgroundImage: `url('${item.thumb}')`,
              }}
              onClick={this.select(item.file)}
            >
              <div className="Vangog__gridItem_mask"></div>
              <div className="Vangog__gridItem_description">
                {item.description}
              </div>
            </div>
          ))}

          <div
            className="Vangog__toolbar Vangog__toolbar_bottom"
            style={{ bottom: selected.length ? 0 : -48 }}
          >
            <div className="Vangog__pullRight">
              <button
                className="Vangog__button"
                onClick={::this.onChange}
              >Select</button>
            </div>
          </div>
        </Dropzone>
      </div>
    );
  }
}
