# HTML5 drop-to-upload component for React

A simple React component for "drop-to-upload" feature. File dropped will be returned as `ArrayBuffer` or Data URI.

It supports Internet Explorer 10 and up, and all major desktop browsers. You can also check up-to-date browser compatibilities at [Can I use ___?](http://caniuse.com/#feat=dragndrop).

## How to use

Install our package thru NPM.

`npm install react-drop-to-upload`

Add the following code to your React component.

```js
import DropToUpload from 'react-drop-to-upload';
```

And in the render loop, add the following JSX.

```jsx

<DropToUpload
  onDrop={ this.handleDrop }
/>
```

When a file is dropped, `handleDrop` will be triggered. For example, the following code use `FormData` and [`fetch`](https://github.com/github/fetch) to POST all dropped files to the server at `/upload`.

```js
handleDrop(files) {
  var data = new FormData();

  files.forEach((file, index) => {
    data.append('file' + index, file);
  });

  fetch('/upload', {
    method: 'POST',
    body: data
  });
}
```

Additionally, if you provide `onDropArrayBuffer` or `onDropDataURI` props, the file will be read as `ArrayBuffer` and/or data URIs, and then passed to the corresponding handlers.

## Supported props

| Name                                       | Supported types                    | Default | Description                                                                                                  |
| ------------------------------------------ | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `className`                                | String                             |         | Class name to apply                                                                                          |
| `dropEffect`                               | `copy`, `link`, `move`, or `none`  |         | Drop effect to show when `onDragOver` is emitted                                                             |
| `element`                                  | String or React element            | `div`   | Component type of the dropping element                                                                       |
| `id`                                       | String                             |         | HTML ID of the element                                                                                       |
| `onDrop(File[])`                           | Function                           |         | Handler to call when a file is dropped                                                                       |
| `onDropArrayBuffer(ArrayBuffer[], File[])` | Function                           |         | Handler to call when a file is dropped and read as `ArrayBuffer`                                             |
| `onDropDataURI(string[], File[])`          | Function                           |         | Handler to call when a file is dropped and read as [Data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) |
| `onLeave`                                  | Function                           |         | Handler to call when a cursor has left without dropping anything, i.e. `onDragLeave`                         |
| `onOver`                                   | Function                           |         | Handler to call when a cursor is over with droppable item, i.e. `onDragOver`                                 |
| `style`                                    | Map                                |         | Inline style                                                                                                 |

### Points to note

* If `onDropArrayBuffer` is not specified, the component will not issue any I/O operations to read the file content. This also applies to `onDropDataURI`
* If both `onDropArrayBuffer` and `onDropDataURI` are specified, it will read the file twice by calling `FileReader.readAsArrayBuffer` and `FileReader.readAsDataURL` simultaneously

## Sample code

```jsx
import React, { Component } from 'react';
import DropToUpload from 'react-drop-to-upload';

class Page extends Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropArrayBuffer = this.handleDropArrayBuffer.bind(this);
    this.handleDropDataURI = this.handleDropDataURI.bind(this);
  }

  handleDrop(files) {
    console.log(files.length > 0); // true
    console.log(files[0] instanceof File); // true
  }

  handleDropArrayBuffer(arrayBuffers, files) {
    console.log(files.length > 0); // true
    console.log(files.length === arrayBuffers.length); // true
    console.log(files[0] instanceof File); // true
    console.log(arrayBuffers[0] instanceof ArrayBuffer); // true
  }

  handleDropDataURI(dataURIs, files) {
    console.log(files.length > 0); // true
    console.log(files.length === dataURIs.length); // true
    console.log(files[0] instanceof File); // true
    console.log(typeof dataURIs[0] === 'string'); // true
    console.log(/^data:(.*);(.*),/.test(dataURIs[0])); // true
  }

  render() {
    return (
      <DropToUpload
        onDrop={ this.handleDrop }
        onDropArrayBuffer={ this.handleDropArrayBuffer }
        onDropDataURI={ this.handleDropDataURI }
      />
    );
  }
}
```

## Contributions

Fork our [repository](https://github.com/compulim/react-drop-to-upload) and clone it to your box. Then type `npm install`, followed by `npm run selfhost`. A Webpack development server will then up at [http://localhost:8080/](http://localhost:8080/) for testing and debugging.

We recommend [Visual Studio Code](https://code.visualstudio.com/) with [Chrome debugger extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) for best debugging experience. Open the workspace with Visual Studio Code and press F5 to start debugging in Chrome.

Like us? Please star our [NPM package](https://npmjs.com/react-drop-to-upload) and [GitHub repository](https://github.com/compulim/react-drop-to-upload).

Don't feel quite right? Please [file a wish or an issue](https://github.com/compulim/react-drop-to-upload/issues) to us.

Want to give us a hand? Please look at our [issue list](https://github.com/compulim/react-drop-to-upload/issues) and submit pull requests.