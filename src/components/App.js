import React from 'react';
import imageCompression from 'browser-image-compression';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1024,
      compressedLink: "",
      originalImage: "",
      originalLink: "",
      clicked: false,
      upload: false 
    };
  }
  handleChange = e => {
    const image = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(image),
      originalImage: image,
      outputFileName: image.name,
      upload: true
    })
  }

  click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: this.state.maxSizeMB,
      maxWidthOrHeight: this.state.maxWidthOrHeight,
      useWebWorker: true
    };
    
    let output;
    imageCompression(this.state.originalImage, options).then(data => {
      output = data;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });
    this.setState({clicked: true});
  }


  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh'}}>
        <h2>Image Compressor</h2>

        <div>
          <input  type="file" accept="image/*" onChange={e => this.handleChange(e)}/>
        </div>

        <div className="ui centered card">
          <div className="image">
            {this.state.upload ? (
              <img src={this.state.originalLink}/>
            ): (
              <img style={{maxWidth: '80%', margin: 'auto'}} src='photo.svg'/>
            )}
          </div>
        </div>

        <div>
          {this.state.outputFileName ? (
            <button 
              className="ui secondary button"
              type="button"
              onClick={e => this.click(e)}
            >
              Compress
            </button>
            ) : (
              <></>
            )}
          </div>
        <div>
          {this.state.clicked ? (
            <a
              href={this.state.compressedLink}
              download={this.state.outputFileName}
            >
              Download compressed file
            </a>
            ) : (
              <></>
            )}
            </div>
      </div>
    )
   
  }
}





