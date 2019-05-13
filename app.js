// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    const menu = document.getElementById('menu');
    const player = document.getElementById('music-player');

    this.menuScreen = new MenuScreen(menu, this._submut.bind(this));
    this.musicScreen = new MusicScreen(player, this._cancel.bind(this));
  }
  // TODO(you): Add methods as necessary.
  _submut(data) {
    this.menuScreen.hide();
    this.musicScreen.play(data);
  }
  _cancel() {
    this.menuScreen.error();
  }
}
