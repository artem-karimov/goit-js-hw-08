import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const initializePlayer = () => {
  const vimeoPlayer = document.getElementById('vimeo-player');

  const player = new Player(vimeoPlayer);

  const playerTimeKey = 'videoplayer-current-time';

  const storedPlayerTime = localStorage.getItem(playerTimeKey);

  if (storedPlayerTime && +storedPlayerTime > 0) {
    player.setCurrentTime(+storedPlayerTime);
  }

  const handleTimeUpdate = data => {
    localStorage.setItem(playerTimeKey, data.seconds);
  };

  const handleTimeUpdateThrottled = throttle(handleTimeUpdate, 1000);

  player.on('timeupdate', handleTimeUpdateThrottled);
};

initializePlayer();
