// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(container, onCancel) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.container = container;
    this.onCancel = onCancel;
    this.gifContainer = container.querySelector('.gif');
    this.btn = container.querySelector('.play-btn');
    this.loading = container.querySelector('.loading');
    this.playing = false;
  }
  // TODO(you): Add methods as necessary.
  play({ songValue, gifValue }) {
    this._toggleHidden();

    this.gif = new GifDisplay(this.gifContainer, gifValue, this._onSuccess.bind(this), this._onError.bind(this));
    this.audio = new AudioPlayer();
    this.playBtn = new PlayButton(this.btn, this._togglePlayer.bind(this));

    this.audio.setSong(songValue);
    this.audio.setKickCallback(() => {
      console.log('Kick!');
      this.gif.changeImage();
    });
  }
  _toggleLoading() {
    this.loading.classList.toggle('inactive');
  }
  _toggleHidden() {
    this.container.classList.toggle('inactive');
  }
  _onSuccess() {
    this._toggleLoading();
    this._togglePlayer();
  }
  _onError() {
    this._toggleHidden();
    this.onCancel();
  }
  _togglePlayer() {
    if (this.playing) {
      this.playing = false;
      this.audio.pause();
      this.playBtn.play();
    }
    else {
      this.playing = true;
      this.audio.play();
      this.playBtn.pause();
    }
  }
}
