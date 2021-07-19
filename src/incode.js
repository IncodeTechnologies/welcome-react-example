import { useEffect, useRef, useState } from "react";
import OnBoarding from "./OnBoarding";

const apiURL = process.env.REACT_APP_USER_SERVER;
const clientId = process.env.REACT_APP_CLIENT_ID;
const sdkSrc = process.env.REACT_APP_SDK_URL;

const cache = {};
function useLoadAsync({ src, onLoad }) {
  const scriptRef = useRef();
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  useEffect(() => {
    if (cache[src] === true) {
      // this is already loaded, let's call the onLoad function
      onLoadRef.current();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = onLoadRef.current;
    document.body.appendChild(script);
    scriptRef.current = script;
    cache[src] = true;
  }, [src]);

  return {
    scriptRef,
  };
}

function Incode() {
  const [incodeIsLoaded, setIncodeIsLoaded] = useState();
  const [incode, setIncode] = useState();

  useLoadAsync({
    src: sdkSrc,
    onLoad: () => setIncodeIsLoaded(true),
  });

  useEffect(() => {
    if (!incodeIsLoaded) {
      return;
    }
    console.log("incode is Loaded", window.OnBoarding);
    const incode = window.OnBoarding.create({
      clientId: clientId,
      apiURL: apiURL,
      lang: "en",
      theme: {
        // main: "",
        // mainButton: {
        //   borderRadius: "",
        //   color: "",
        //   border: "",
        // },
      },
    });
    setIncode(incode);
  }, [incodeIsLoaded]);

  if (!setIncode) return <p>Loading...</p>;

  return (
    <div className="incode-container">
      <OnBoarding incode={incode} />
    </div>
  );
}

export default Incode;
