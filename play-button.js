// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(btn, toggle) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.btn = btn;
    this.toggle = toggle;
    this.btn.addEventListener('click', toggle);
  }
  // TODO(you): Add methods as necessary.
  play() {
    this.btn.src = 'images/play.png';
  }
  pause() {
    this.btn.src = 'images/pause.png';
  }
}
