import React, { useEffect, useState, useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSound from "use-sound";
import * as icons from "@fortawesome/free-solid-svg-icons";

import "./BattleLoading.scss";
import {
  KEY_Q,
  KEY_W,
  KEY_E,
  KEY_R,
  KEY_T,
  KEY_Y,
  REDIRECT_TIMEOUT,
} from "../../constants";
import useIntro from "../../hooks/useIntro";
import AutoFocus from "../../containers/AutoFucus";
import fight from "../../assets/courtyard.mp3";
import click from "../../assets/click.mp3";

function BattleLoading() {
  const [iconList, setIcons] = useState({});
  const [playClick, { stop: stopClick }] = useSound(click);
  const history = useHistory();

  useIntro(fight);

  const getRandomIcon = useCallback(() => {
    const index = Math.floor(Math.random() * Object.keys(icons).length);
    const name = Object.keys(icons)[index];
    return icons[name];
  }, []);

  useEffect(() => {
    setTimeout(() => history.push("/"), REDIRECT_TIMEOUT);
  }, [history]);

  useEffect(() => {
    setIcons(
      [KEY_Q, KEY_W, KEY_E, KEY_R, KEY_T, KEY_Y].reduce((prev, next) => {
        prev[next] = getRandomIcon();
        return prev;
      }, {})
    );
  }, [getRandomIcon]);

  const onSelect = useCallback(
    ({ key }) => {
      if (iconList[key]) {
        playClick();
        setIcons({ ...iconList, [key]: getRandomIcon() });
      }
    },
    [getRandomIcon, iconList, playClick]
  );

  useEffect(() => stopClick, [stopClick]);

  return (
    <AutoFocus onKeyDown={onSelect} className="battle-loading">
      {Object.keys(iconList).map((key, i) => (
        <FontAwesomeIcon icon={iconList[key]} key={i} />
      ))}
    </AutoFocus>
  );
}

export default memo(BattleLoading);
