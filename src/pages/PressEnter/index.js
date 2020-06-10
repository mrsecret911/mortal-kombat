import React, { useCallback, memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";

import "./PressEnter.scss";
import { KEY_ENTER, CLICK_TIMEOUT } from "../../constants";
import AutoFocus from "../../containers/AutoFucus";
import click from "../../assets/click.mp3";

function BattleLoading() {
  const history = useHistory();
  const [playClick, { stop: stopClick }] = useSound(click);

  const onSelect = useCallback(
    ({ key }) => {
      if (key === KEY_ENTER) {
        playClick();
        setTimeout(() => history.push("/select"), CLICK_TIMEOUT);
      }
    },
    [history, playClick]
  );

  useEffect(() => stopClick, [stopClick]);

  return (
    <AutoFocus onKeyDown={onSelect} className="press-enter">
      <h1>Press enter to start</h1>
    </AutoFocus>
  );
}

export default memo(BattleLoading);
