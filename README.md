# HTML5 drop-to-upload component for React

[![NPM version](https://img.shields.io/npm/v/react-drop-to-upload.svg)](https://npmjs.org/package/react-drop-to-upload)

A simple React component for "drop-to-upload" feature. Files dropped will be returned as [`File`](https://w3c.github.io/FileAPI/), `ArrayBuffer`, and data URI.

It supports Internet Explorer 10 and up, and all major desktop browsers. You can also check up-to-date browser compatibilities at [Can I use ___?](http://caniuse.com/#feat=dragndrop).

## Why another file drop component?

Most file drop components are comprehensive and restrictive. They do all the heavylifting including file drop and HTTP POST upload. They all have good intentions. But to ensure everything works as expected, developers may need to follow their way to work, include adding specific server code.

We embrace microservices and focus on making a great, small, and simple-to-learn UI component. We believe React component should not cross the visualization border and touch any transport code.

Thus, we intentionally leave the HTTP POST upload part away from the component, for a few good reasons.

1. Select your transport. `XMLHttpRequest` or [`window.fetch`](https://github.github.io/fetch/), add HTTP headers, use multipart, and flexible CORS handling
2. Be creative. Dropping file means more than just upload. You could generate thumbnails, [calculate MD5](https://www.npmjs.com/package/spark-md5), [open PDF](http://mozilla.github.io/pdf.js/), etc
3. Be flexible. Use [JSZip](https://stuk.github.io/jszip/) to compress plain text files before upload

## How to use

Install our package thru NPM.

```
npm install react-drop-to-upload
```

Add the following code to your React component to import the `react-drop-to-upload` component.

```js
import DropToUpload from 'react-drop-to-upload';
```

And in the render loop, add the following JSX code to instantiate the component.

```jsx

<DropToUpload
  onDrop={ this.handleDrop }
>
  Drop file here to upload
</DropToUpload>
```

By default, `<DropToUpload>` is realized as `<div>`, it can be modified thru the `element` props.

When a file is dropped, `handleDrop` will be triggered. For example, the following code use `FormData` and [`fetch`](https://github.com/github/fetch) to upload all dropped files to the server at `/upload` via HTTP POST.

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

Additionally, if `onDropArrayBuffer` or `onDropDataURI` props are specified, the file will be read as `ArrayBuffer` and/or data URIs, and then passed to the corresponding handlers.

In addition to ES5 build, we also provide ES6, UMD, and SystemJS builds under [`dist`](https://github.com/compulim/react-drop-to-upload/tree/master/dist) folder. We support ES6 build thru `jsnext:main` in `package.json`.

## Supported props

Followings are list of props supported by the component.

| Name                                       | Supported types                    | Default | Description                                                                                                  |
| ------------------------------------------ | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `className`                                | String                             |         | Class name to apply                                                                                          |
| `dropEffect`                               | `copy`, `link`, `move`, or `none`  |         | Drop effect to show when `onDragOver` is emitted                                                             |
| `element`                                  | String or React element            | `"div"`   | Component type of the dropping element                                                                       |
| `id`                                       | String                             |         | HTML ID of the element                                                                                       |
| `onDrop(File[])`                           | Function                           |         | Handler to call when a file is dropped                                                                       |
| `onDropArrayBuffer(ArrayBuffer[], File[])` | Function                           |         | Handler to call when a file is dropped and read as `ArrayBuffer`                                             |
| `onDropDataURI(string[], File[])`          | Function                           |         | Handler to call when a file is dropped and read as [Data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) |
| `onLeave`                                  | Function                           |         | Handler to call when a cursor has left without dropping anything, i.e. `onDragLeave`                         |
| `onOver`                                   | Function                           |         | Handler to call when a cursor is over with droppable item, i.e. `onDragOver`                                 |
| `style`                                    | Map                                |         | Inline style                                                                                                 |

### Points to note

* If visualization is given when `onOver` is called, the visualization should be removed when either `onDrop` or `onLeave` is called. This is because `onLeave` will not be called when the user did drop the file
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
      >
        Drop file here to upload
      </DropToUpload>
    );
  }
}
```

> You can find our testbed repository [here](https://github.com/compulim/react-drop-to-upload-testbed).

## Changelog

You can find the changelog [here](CHANGELOG.md).

## Contributions

Like us? Please star our [NPM package](https://npmjs.com/react-drop-to-upload) and [GitHub repository](https://github.com/compulim/react-drop-to-upload).

Don't feel quite right? Please [file a wish or an issue](https://github.com/compulim/react-drop-to-upload/issues) to us.

Want to give us a hand? Please look at our [issue list](https://github.com/compulim/react-drop-to-upload/issues) and submit pull requests.