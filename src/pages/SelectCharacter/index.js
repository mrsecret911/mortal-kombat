import React, { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";

import "./SelectCharacter.scss";
import characterList from "../../characterList";
import { setActiveCharacter } from "../../redux/actions";
import {
  KEY_UP,
  KEY_DOWN,
  KEY_RIGHT,
  KEY_LEFT,
  KEY_ENTER,
  CLICK_TIMEOUT,
} from "../../constants";
import useIntro from "../../hooks/useIntro";
import AutoFocus from "../../containers/AutoFucus";
import intro from "../../assets/opening-theme.mp3";
import click from "../../assets/click.mp3";

const ITEMS_IN_ROW = 4;

function SelectCharacter() {
  const [characters, setCharacters] = useState();
  const activeCharacter = useSelector(({ activeCharacter }) => activeCharacter);
  const dispatch = useDispatch();
  const [playClick, { stop: stopClick }] = useSound(click);
  const history = useHistory();

  useIntro(intro);

  useEffect(() => {
    setCharacters(characterList);
    dispatch(setActiveCharacter(characterList[0]));
  }, [dispatch]);

  useEffect(() => stopClick, [stopClick]);

  const onSelect = useCallback(
    ({ key }) => {
      const { index } = activeCharacter;
      playClick();
      switch (key) {
        case KEY_UP:
          if (index - ITEMS_IN_ROW >= 0) {
            dispatch(setActiveCharacter(characterList[index - ITEMS_IN_ROW]));
          }
          break;
        case KEY_DOWN:
          if (index + ITEMS_IN_ROW < characterList.length) {
            dispatch(setActiveCharacter(characterList[index + ITEMS_IN_ROW]));
          }
          break;
        case KEY_LEFT:
          if (index % ITEMS_IN_ROW) {
            dispatch(setActiveCharacter(characterList[index - 1]));
          }
          break;
        case KEY_RIGHT:
          if ((index + 1) % ITEMS_IN_ROW) {
            dispatch(setActiveCharacter(characterList[index + 1]));
          }
          break;
        case KEY_ENTER:
          setTimeout(() => history.push("/loading"), CLICK_TIMEOUT);
          break;
        default:
          break;
      }
    },
    [activeCharacter, playClick, dispatch, history]
  );

  return (
    <AutoFocus onKeyDown={onSelect} className="select-character">
      <div className="select-character__selected">
        {activeCharacter && (
          <img src={`${activeCharacter.img}.gif`} alt={activeCharacter.name} />
        )}
      </div>
      <div className="select-character__list">
        <div className="select-character__title">Select your fighter</div>
        {characters &&
          characters.map((character) => (
            <div className="select-character__list-item" key={character.index}>
              <img
                src={`${character.img}.jpg`}
                alt={character.name}
                className={
                  character.index === activeCharacter.index
                    ? "select-character__active-item"
                    : ""
                }
              />
            </div>
          ))}
      </div>
      {/** TO_DO add second fighter in a future*/}
      <div className="select-character__selected"></div>
    </AutoFocus>
  );
}

export default memo(SelectCharacter);
