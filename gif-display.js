// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(container, theme, onSuccess, onError) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.container = container;
    this.onSuccess = onSuccess;
    this.onError = onError;

    this.layers = container.querySelectorAll('.layer');
    this.loadedGifs = [];
    this.allGifs = [];
    this.prevIndex = -1;
    this.started = false
    this.changeImage = this.changeImage.bind(this);

    this._fetch(theme);
  }
  // TODO(you): Add methods as necessary.
  changeImage() {
    let randIndex;
    while (true) {
      randIndex = Math.floor(Math.random() * this.loadedGifs.length);
      if (randIndex !== this.prevIndex) break;
    }
    this.prevIndex = randIndex;

    this.layers.forEach(value => {
      if (value.classList.contains('foreground')) {
        value.style.backgroundImage = `url('${this.loadedGifs[randIndex]}')`;
      }
      value.classList.toggle('foreground');
    });
  }

  _fetch(theme) {
    const url = new URL('https://api.giphy.com/v1/gifs/search');
    // const url = new URL('https://gist.githubusercontent.com/vrk/3dd93294a4a53970013dbc23ae7008b9/raw/6da6d6c9ce5a220a4eedbc8778ed6bf58d8f5021/gistfile1.txt');
    url.search = new URLSearchParams({
      q: theme,
      limit: 25,
      rating: 'g',
      api_key: '6G9cMqqdAtg8AzzBNJQ4XcEb15XaM5jf',
    });
    fetch(url)
      .then(Response => Response.json())
      .then(json => {
        if (json.data.length < 2) return this.onError();
        const urls = json.data.map(value => value.images.downsized.url);
        this._preloadImg(urls);
      })
  }

  _preloadImg(urls) {
    this.allGifs = urls.map(value => {
      const img = new Image;
      img.src = value;
      img.addEventListener('load', this._afterLoaded.bind(this));
      return img
    })
  }

  _afterLoaded({ currentTarget }) {
    this.loadedGifs.push(currentTarget.src);
    if (this.loadedGifs.length >= 2 && this.started === false) {
      console.log('2 images preloaded. Music start!');
      this.started = true;
      this.changeImage();
      this.changeImage();
      this.onSuccess();
    }
  }
}
