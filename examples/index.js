'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DropToUpload from '../src/index';

import SparkMD5 from 'spark-md5';

class Page extends Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropArrayBuffer = this.handleDropArrayBuffer.bind(this);
    this.handleDropDataURI = this.handleDropDataURI.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleOver = this.handleOver.bind(this);

    this.state = {
      active: 0,
      drops: []
    };
  }

  handleDrop(files) {
    console.log('drop');
    console.log(arguments);

    this.setState({
      active: 0,
      drops: this.state.drops.slice().concat(
        files.map(file => ({
          type: 'File',
          name: file.name,
          size: file.size
        }))
      )
    });
  }

  handleDropArrayBuffer(arrayBuffers, files) {
    console.log('dropArrayBuffer');
    console.log(arguments);

    this.setState({
      active: 0,
      drops: this.state.drops.slice().concat(
        files.map((file, index) => ({
          type: 'ArrayBuffer',
          name: file.name,
          size: file.size,
          md5: SparkMD5.ArrayBuffer.hash(arrayBuffers[index])
        }))
      )
    });
  }

  handleDropDataURI(dataURIs, files) {
    console.log('dropDataURI');
    console.log(arguments);

    this.setState({
      active: 0,
      drops: this.state.drops.slice().concat(
        files.map(file => ({
          type: 'Data URI',
          name: file.name,
          size: file.size
        }))
      )
    });
  }

  handleLeave() {
    this.setState({ active: 0 });
  }

  handleOver() {
    this.setState({ active: 1 });
  }

  render() {
    return (
      <div>
        <DropToUpload
          element="div"
          onDrop={ this.handleDrop }
          onDropArrayBuffer={ this.handleDropArrayBuffer }
          onDropDataURI={ this.handleDropDataURI }
          onLeave={ this.handleLeave }
          onOver={ this.handleOver }
        >
          {
            this.state.active ?
              <h1>Drop file to upload</h1>
            :
              <h1>Drag file here</h1>
          }
        </DropToUpload>
        <ul>
          {
            this.state.drops.map((drop, index) =>
              <li key={ index }>
                <span>{ drop.type }: { drop.name } ({ drop.size } bytes)</span>
                {
                  drop.md5 &&
                    <ul>
                      <li>MD5 is { drop.md5 }</li>
                    </ul>
                }
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('reactRoot')
);
