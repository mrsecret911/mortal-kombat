import React, { useEffect, useState, useCallback, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import './SelectCharacter.scss';
import characterList from '../../characterList'
import { setActiveCharacter } from '../../redux/actions';
import { 
  ARROW_UP,
  ARROW_DOWN,
  ARROW_RIGHT,
  ARROW_LEFT, 
  ARROW_ENTER
} from '../../constants';

import intro from '../../assets/opening-theme.mp3'
import click from '../../assets/click.mp3'

const ITEMS_IN_ROW = 4;

function SelectCharacter() {
  const [characters, setCharacters] = useState();
  const activeCharacter = useSelector(({ activeCharacter }) => activeCharacter);
  const dispatch = useDispatch();
  const container = useRef(null);
  const clickAudio = new Audio(click);
  const history = useHistory();

  useEffect(() => {
    setCharacters(characterList)
    dispatch(setActiveCharacter(characterList[0]))
    container.current.focus();
  }, [dispatch]);

  useEffect(() => {
    const introAudio = new Audio(intro);
    introAudio.play();

    return () => introAudio.pause();
  }, []);

  const onSelect = useCallback(({ key }) => {
    const { index } = activeCharacter;
    clickAudio.play()
    switch(key) {
      case ARROW_UP:
        if(index - ITEMS_IN_ROW >= 0) {
          dispatch(setActiveCharacter(characterList[index - ITEMS_IN_ROW]));
        }
        break;
      case ARROW_DOWN:
        if(index + ITEMS_IN_ROW < characterList.length) {
          dispatch(setActiveCharacter(characterList[index + ITEMS_IN_ROW]));
        }
        break;
      case ARROW_LEFT:
        if(index % ITEMS_IN_ROW) {
          dispatch(setActiveCharacter(characterList[index - 1]));
        }
        break;
      case ARROW_RIGHT:
        if((index + 1) % ITEMS_IN_ROW) {
          dispatch(setActiveCharacter(characterList[index + 1]));
        }
        break;
      case ARROW_ENTER:
        history.push('/loading')
        break;
      default:
        break;
    }
  }, [activeCharacter, clickAudio, dispatch, history]);

  return (
    <div className='select-character' onKeyDown={onSelect} tabIndex='0' ref={container}>
      <div className='select-character__selected'>
        {activeCharacter && <img src={activeCharacter.imgGif}  alt={activeCharacter.name} />}
      </div>
      <div className='select-character__list'>
        <div className='select-character__title'>Select your fighter</div>
        {characters && characters.map(character => 
          <div className='select-character__list-item' key={character.index}>
            <img src={character.imgJpg} 
                 alt={character.name}
                 className={character.index === activeCharacter.index ? 'select-character__active-item' : ''}/>
          </div>
        )}
      </div>
      <div className='select-character__selected'></div>
    </div>
  );
}

export default memo(SelectCharacter);
