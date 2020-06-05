import React, { useEffect, useCallback, useRef, memo } from 'react';
import { useHistory } from "react-router-dom";

import './PressEnter.scss';
import {  ARROW_ENTER } from '../../constants';
import click from '../../assets/click.mp3'

function BattleLoading() {
  const container = useRef(null);
  const history = useHistory();
  const clickAudio = new Audio(click);

  useEffect(() => {
    container.current.focus();
  }, []);

  const onSelect = useCallback(({ key }) => {
    if (key === ARROW_ENTER) {
      clickAudio.play()
      history.push('/select'); 
    }
  }, [history, clickAudio]);

  return (
    <div className='press-enter' tabIndex='0' ref={container} onKeyDown={onSelect}>
      <h1>Press enter to start</h1>
    </div>
  );
}

export default memo(BattleLoading);
