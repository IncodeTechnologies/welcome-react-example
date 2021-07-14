// check public/index.html
import { useEffect, useRef, useState } from "react";
import Steps from "./Steps";

import "./index.css";
import incode from "./incode";

function TutorialFrontId({ token, onSuccess }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderFrontTutorial(containerRef.current, {
      onSuccess,
      noWait: true,
    });
  }, [onSuccess]);

  return <div ref={containerRef}></div>;
}

function FrontId({ session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderCamera("front", containerRef.current, {
      onSuccess,
      onError: showError,
      token: session,
      numberOfTries: -1,
    });
  }, [onSuccess, showError, session]);

  return <div ref={containerRef}></div>;
}

function BackId({ session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderCamera("back", containerRef.current, {
      onSuccess,
      onError: showError,
      token: session,
      numberOfTries: -1,
    });
  }, [onSuccess, showError, session]);

  return <div ref={containerRef}></div>;
}

function ProcessId({ session, onSuccess }) {
  useEffect(() => {
    incode.processId({ token: session.token }).then(() => {
      onSuccess();
    });
  }, [onSuccess, session]);

  return <p>Processing...</p>;
}

function Selfie({ session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderCamera("selfie", containerRef.current, {
      onSuccess,
      onError: showError,
      token: session,
      numberOfTries: 3,
    });
  }, [onSuccess, showError, session]);

  return <div ref={containerRef}></div>;
}

function Conference({ session, onSuccess, showError }) {
  const [status, setStatus] = useState();
  const containerRef = useRef();

  useEffect(() => {
    incode.renderConference(
      containerRef.current,
      {
        token: session,
      },
      {
        onSuccess: (status) => {
          setStatus(status);
        },
        onError: (error) => {
          console.log("error", error);
          setStatus(error);
        },
        onLog: (...params) => console.log("onLog", ...params),
      }
    );
  }, [onSuccess, showError, session]);

  if (status) {
    return <p>Finished with status {status}</p>;
  }

  return <div ref={containerRef}></div>;
}

function VideoSelfie({ session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderVideoSelfie(
      containerRef.current,
      {
        token: session,
        showTutorial: true,
        modules: ["selfie", "front", "back", "speech"], // you can add 'poa' and 'questions',
        speechToTextCheck: true, // this is the check for the speech
      },
      {
        onSuccess: (status) => {
          alert("speech detected");
        },
        onError: (error) => {
          console.log("error", error);
        },
        onLog: (...params) => console.log("onLog", ...params),
      }
    );
  }, [onSuccess, showError, session]);

  return <div ref={containerRef}></div>;
}

export default function App() {
  const [session, setSession] = useState();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    incode.createSession("ALL").then(async (session) => {
      await incode.warmup();
      setSession(session);
    });
  }, []);

  function goNext() {
    setStep(step + 1);
  }

  function showError() {
    setError(true);
  }

  if (!session) return "loading";
  if (error) return "Error!";
  return (
    <Steps currentStep={step}>
      <TutorialFrontId onSuccess={goNext} />
      <FrontId session={session} onSuccess={goNext} showError={showError} />
      <BackId session={session} onSuccess={goNext} showError={showError} />
      <ProcessId session={session} onSuccess={goNext} />
      <Selfie session={session} onSuccess={goNext} showError={showError} />
    </Steps>
  );
}
