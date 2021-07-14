import { Children, cloneElement } from "react";

function Steps({ children, currentStep }) {
  return (
    <>
      {Children.map(
        children,
        (child, index) => currentStep === index && cloneElement(child)
      )}
    </>
  );
}

export default Steps;
