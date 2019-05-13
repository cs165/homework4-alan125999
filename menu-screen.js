// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(container, submit) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.container = container;
    this.submit = submit;

    this.selector = this.container.querySelector('#song-selector');
    this.theme = this.container.querySelector('#query-input');
    this.errorMsg = this.container.querySelector('#error');

    this.theme.addEventListener('input', () => this.errorMsg.classList.add('inactive'));
    this._fetchSongs();
    this._renderTheme();
    this._onSubmit();
  }
  // TODO(you): Add methods as necessary.

  _fetchSongs() {
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then(Response => Response.json())
      .then(value => {
        this.songs = Object.keys(value).map(key => value[key]);
        this._renderOptions();
      });
  }

  _renderOptions() {
    this.songs.forEach(value => {
      const choice = document.createElement('option');
      choice.textContent = `${value.artist}: ${value.title}`;
      this.selector.appendChild(choice);
    });
  }

  _onSubmit() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = {
        songValue: this.songs[this.selector.selectedIndex].songUrl,
        gifValue: this.theme.value,
      };
      console.log('form submitted! data:');
      console.log(data);
      this.submit(data);
    })
  }

  _renderTheme() {
    const themes = [
      'candy',
      'charlie brown',
      'computers',
      'dance',
      'donuts',
      'hello kitty',
      'flowers',
      'nature',
      'turtles',
      'space'
    ];
    const randIndex = Math.floor(Math.random() * themes.length);
    this.theme.value = themes[randIndex];
  }

  hide() {
    this.container.classList.add('inactive');
  }

  error() {
    this.container.classList.remove('inactive');
    this.errorMsg.classList.remove('inactive');
  }
}
