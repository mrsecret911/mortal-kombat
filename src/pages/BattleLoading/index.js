import React, { useEffect, useState, useCallback, useRef, memo } from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

import './BattleLoading.scss';
import fight from '../../assets/courtyard.mp3'
import click from '../../assets/click.mp3'

function BattleLoading() {
  const [iconList, setIcons] = useState({});
  const container = useRef(null);
  const clickAudio = new Audio(click);
  const history = useHistory();

  const getRandomIcon = useCallback(() => {
    const index = Math.floor(Math.random() * Object.keys(icons).length);
    const name = Object.keys(icons)[index];
    return icons[name];
  }, []);

  useEffect(() => {
    const audio = new Audio(fight);
    audio.play();
    container.current.focus();
    
    return () => audio.pause();
  }, []);

  useEffect(() => {
    setTimeout(() => history.push('/'), 10000)
  }, [history]);

  useEffect(() => {
    setIcons(['q', 'w', 'e', 'r', 't', 'y'].reduce((prev, next) => {
      prev[next] = getRandomIcon();
      return prev;
    }, {}))
  }, [getRandomIcon]);

  const onSelect = useCallback(({ key }) => {
    if(iconList[key]) {
      clickAudio.play();
      setIcons({...iconList, [key]: getRandomIcon()})
    }
  }, [getRandomIcon, iconList, clickAudio]);
  
  return (
    <div className='battle-loading' tabIndex='0' ref={container} onKeyDown={onSelect}>
      {Object.keys(iconList).map((key, i) => 
        <FontAwesomeIcon icon={iconList[key]} key={i} />
      )}
    </div>
  );
}

export default memo(BattleLoading);
