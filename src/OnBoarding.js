import { useEffect, useRef, useState } from "react";
import Steps from "./Steps";

function TutorialFrontId({ incode, session, onSuccess }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderFrontTutorial(containerRef.current, {
      onSuccess,
      noWait: true,
      token: session,
    });
  }, [onSuccess, incode, session]);

  return <div ref={containerRef}></div>;
}

function FrontId({ incode, session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderCamera("front", containerRef.current, {
      onSuccess,
      onError: showError,
      token: session,
      numberOfTries: -1,
    });
  }, [onSuccess, showError, session, incode]);

  return <div ref={containerRef}></div>;
}

function BackId({ incode, session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderCamera("back", containerRef.current, {
      onSuccess,
      onError: showError,
      token: session,
      numberOfTries: -1,
    });
  }, [onSuccess, showError, session, incode]);

  return <div ref={containerRef}></div>;
}

function ProcessId({ incode, session, onSuccess }) {
  useEffect(() => {
    incode.processId({ token: session.token }).then(() => {
      onSuccess();
    });
  }, [onSuccess, session, incode]);

  return <p>Processing...</p>;
}

function Selfie({ incode, session, onSuccess, showError }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderCamera("selfie", containerRef.current, {
      onSuccess,
      onError: showError,
      token: session,
      numberOfTries: 3,
    });
  }, [onSuccess, showError, session, incode]);

  return <div ref={containerRef}></div>;
}

// Use Conference if you need it
// eslint-disable-next-line no-unused-vars
function Conference({ incode, session, onSuccess, showError }) {
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
  }, [onSuccess, showError, session, incode]);

  if (status) {
    return <p>Finished with status {status}</p>;
  }

  return <div ref={containerRef}></div>;
}

// Use VideoSelfie if you need it
// eslint-disable-next-line no-unused-vars
function VideoSelfie({ incode, session, onSuccess, showError }) {
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
  }, [onSuccess, showError, session, incode]);

  return <div ref={containerRef}></div>;
}

export default function App({ incode }) {
  const [session, setSession] = useState();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!incode) return;
    incode.createSession("ALL").then(async (session) => {
      await incode.warmup();
      setSession(session);
    });
  }, [incode]);

  function goNext() {
    setStep(step + 1);
  }

  function handleError() {
    setError(true);
  }

  if (!session) return <p>Loading...</p>;
  if (error) return "Error!";
  return (
    <Steps currentStep={step}>
      <TutorialFrontId incode={incode} session={session} onSuccess={goNext} />
      <FrontId
        incode={incode}
        session={session}
        onSuccess={goNext}
        showError={handleError}
      />
      <BackId
        incode={incode}
        session={session}
        onSuccess={goNext}
        showError={handleError}
      />
      <ProcessId incode={incode} session={session} onSuccess={goNext} />
      <Selfie
        incode={incode}
        session={session}
        onSuccess={goNext}
        showError={handleError}
      />
    </Steps>
  );
}
