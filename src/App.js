import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import Steps from "./Steps";

import "./index.css";
import incode from "./incode";

import arrowUp from "./imgs/arrow-up.svg";
import arrowDown from "./imgs/arrow-down.svg";
import icons from "./imgs/icons.svg";
import threeDots from "./imgs/three-dots.svg";

const options = {
  method: "POST",
  url: "https://api.conekta.io/tokens",
  headers: {
    Authorization: "Basic a2V5X29pR2pnM3M0djk1TjFIZWJrb1hoNEFM",
    Accept: "application/vnd.conekta-v2.0.0+json",
    "Content-Type": "application/json",
  },
  data: {
    checkout: {
      returns_control_on: "Token",
    },
  },
};

function ConektaIframe({ onSuccess }) {
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        const res = response.data;
        window.ConektaCheckoutComponents.Card({
          targetIFrame: "#conektaIframeContainer",
          //Este componente "allowTokenization" permite personalizar el tokenizador, por lo que su valor siempre será TRUE
          allowTokenization: true,
          checkoutRequestId: res?.checkout?.id, // // Checkout request ID, es el mismo ID generado en el paso 1
          publicKey: "key_CbrHrpJf8kBeiVAQ1lORzTb", // Llaves: https://developers.conekta.com/docs/como-obtener-tus-api-keys
          locale: "es", // 'es' Español | 'en' Ingles
          options: {
            styles: {
              // inputType modifica el diseño del Web Checkout Tokenizer
              //        inputType: 'basic' // 'basic' | 'rounded' | 'line'
              inputType: "rounded",
              // buttonType modifica el diseño de los campos de llenado de información del  Web Checkout Tokenizer
              //        buttonType: 'basic' // 'basic' | 'rounded' | 'sharp'
              buttonType: "rounded",
              //Elemento que personaliza el borde de color de los elementos
              states: {
                empty: {
                  borderColor: "#FFAA00", // Código de color hexadecimal para campos vacíos
                },
                invalid: {
                  borderColor: "#FF00E0", // Código de color hexadecimal para campos inválidos
                },
                valid: {
                  borderColor: "#0079c1", // Código de color hexadecimal para campos llenos y válidos
                },
              },
            },
            //Elemento que personaliza el botón que finzaliza el guardado y tokenización de la tarjeta
            button: {
              colorText: "#ffffff", // Código de color hexadecimal para el color de las palabrás en el botón de: Alta de Tarjeta | Add Card
              //text: 'Agregar Tarjeta***', //Nombre de la acción en el botón ***Se puede personalizar
              backgroundColor: "#301007", // Código de color hexadecimal para el color del botón de: Alta de Tarjeta | Add Card
            },
            //Elemento que personaliza el diseño del iframe
            iframe: {
              colorText: "#65A39B", // Código de color hexadecimal para el color de la letra de todos los campos a llenar
              backgroundColor: "#FFFFFF", // Código de color hexadecimal para el fondo del iframe, generalmente es blanco.
            },
          },
          // Evento que permitirá saber que el token se creao de forma satisfactoria, es importante que se consuman los datos que de él derivan.
          onCreateTokenSucceeded: function (token) {
            console.log(token);
            onSuccess();
          },
          // Evento que permitirá saber que el token se creao de manera incorrecta, es importante que se consuman los datos que de él derivan y se hagan las correciones pertinentes.
          onCreateTokenError: function (error) {
            console.log(error);
          },
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return <div id="conektaIframeContainer" style={{ height: "1350px" }}></div>;
}

function FrontId({ session, onSuccess, onError }) {
  const containerRef = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderCamera("front", containerRef.current, {
      onSuccess,
      onError: onError,
      token: session,
      numberOfTries: -1,
      showTutorial: true,
    });

    isMounted.current = true;
  }, [onSuccess, onError, session]);

  return <div ref={containerRef}></div>;
}

function BackId({ session, onSuccess, onError }) {
  const containerRef = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderCamera("back", containerRef.current, {
      onSuccess,
      onError: onError,
      token: session,
      numberOfTries: -1,
      showTutorial: true,
    });

    isMounted.current = true;
  }, [onSuccess, onError, session]);

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

function Selfie({ session, onSuccess, onError }) {
  const containerRef = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return false;
    }
    incode.renderCamera("selfie", containerRef.current, {
      onSuccess,
      onError: onError,
      token: session,
      numberOfTries: 3,
      showTutorial: true,
    });
    isMounted.current = true;
  }, [onSuccess, onError, session]);

  return <div ref={containerRef}></div>;
}

function FaceMatch({ session, onSuccess, onError, liveness, userExists }) {
  const containerRef = useRef();

  useEffect(() => {
    incode.renderFaceMatch(containerRef.current, {
      onSuccess,
      onError,
      token: session,
      liveness,
      userExists,
    });
  }, [onSuccess, onError, session, liveness, userExists]);

  return <div ref={containerRef}></div>;
}

// Use Conference if you need it
// eslint-disable-next-line no-unused-vars
function Conference({ session, onSuccess, onError }) {
  const [status, setStatus] = useState();
  const containerRef = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
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
    isMounted.current = true;
  }, [onSuccess, onError, session]);

  if (status) {
    return <p>Finished with status {status}</p>;
  }

  return <div ref={containerRef}></div>;
}

// Use VideoSelfie if you need it
// eslint-disable-next-line no-unused-vars
function VideoSelfie({ session, onSuccess, onError }) {
  const containerRef = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
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
    isMounted.current = true;
  }, [onSuccess, onError, session]);

  return <div ref={containerRef}></div>;
}

export function usePermissions() {
  const [state, setState] = useState("unkwown");

  useEffect(() => {
    try {
      navigator.permissions
        .query({ name: "camera" })
        .then(function (result) {
          setState(result.state);
        })
        .catch(() => {
          setState("unkwown");
        });
    } catch (e) {
      setState("unkwown");
    }
  }, []);

  return state;
}

// This only works for Android, you need to handle iOS
function ResetPermissions({ onTryAgain }) {
  return (
    <div className="reset-permissions">
      <h1>Follow the next steps:</h1>
      <ul>
        <li>
          <span className="number">1</span> <p>Tap the 3 dots</p>{" "}
          <img className="three-dots" alt="three dots" src={threeDots} />
          <img
            className="arrow-up"
            src={arrowUp}
            alt="arrow pointing to the three dots"
          />
        </li>
        <li>
          <span className="number">2</span> <p>Tap this icon</p>{" "}
          <img
            src={arrowDown}
            className="arrow-down"
            alt="arrow pointing to icon with i"
          />
          <div>
            <img src={icons} alt="bar icons" />
          </div>
        </li>
        <li>
          <span className="number">3</span>{" "}
          <p>
            Tap in <span className="blue">"Site settings"</span>
          </p>
        </li>
        <li>
          <span className="number">4</span>{" "}
          <span className="blue">Allow Permission</span>{" "}
          <p style={{ marginLeft: 10 }}>to Camera</p>
        </li>
      </ul>
      <div className="button-container">
        <button onClick={onTryAgain}>Try Again</button>
      </div>
    </div>
  );
}

function RetrySteps({ session, onSuccess, onError, numberOfTries }) {
  const containerRef = useRef();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderRetrySteps(
      containerRef.current,
      {
        token: session,
        numberOfTries,
      },
      {
        onSuccess,
        onError,
      }
    );
    isMounted.current = true;
  }, [onSuccess, onError, session, numberOfTries]);

  return <div ref={containerRef}></div>;
}

export function useQuery() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}

export default function App() {
  const [session, setSession] = useState();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const permissionsState = usePermissions();
  const [resetPermissions, setResetPermissions] = useState(false);
  const [liveness, setLiveness] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const queryParams = useQuery();

  useEffect(() => {
    const flowId = queryParams.get("flowId");

    incode
      .createSession("ALL", null, {
        configurationId: flowId,
      })
      .then(async (session) => {
        await incode.warmup();
        setSession(session);
      });
  }, [queryParams]);

  useEffect(() => {
    // if permissions are denied from start, let's show the reset permissions screen
    setResetPermissions(permissionsState === "denied" ? true : false);
  }, [permissionsState]);

  function goNext() {
    setStep(step + 1);
  }

  function handleError(e) {
    if (e.type === "permissionDenied") {
      setResetPermissions(true);
      return;
    }
    setError(true);
  }

  if (!session) return "loading";
  if (resetPermissions) {
    return <ResetPermissions onTryAgain={() => setResetPermissions(false)} />;
  }
  if (error) return "Error!";
  return (
    <Steps currentStep={step}>
      <ConektaIframe onSuccess={goNext} />
      <FrontId session={session} onSuccess={goNext} onError={handleError} />
      <BackId session={session} onSuccess={goNext} onError={handleError} />
      <ProcessId session={session} onSuccess={goNext} />
      <Selfie
        session={session}
        onSuccess={(res) => {
          setLiveness(res?.liveness);
          setUserExists(res?.existingUser);
          goNext();
        }}
        onError={handleError}
      />
      <FaceMatch
        session={session}
        onSuccess={goNext}
        liveness={liveness}
        userExists={userExists}
      />
      <RetrySteps
        session={session}
        numberOfTries={3}
        onSuccess={goNext}
        onError={handleError}
      />
      <div>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          You finished the onboarding process
        </h1>
      </div>
    </Steps>
  );
}
