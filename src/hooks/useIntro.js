import { useEffect } from "react";
import useSound from "use-sound";

function useIntro(intro) {
  const [playIntro, { stop: stopIntro }] = useSound(intro);

  useEffect(() => {
    playIntro();
    return () => stopIntro();
  }, [playIntro, stopIntro]);
}

export default useIntro;
