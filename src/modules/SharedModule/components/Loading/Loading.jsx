import { useState} from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <BeatLoader
          color={"green"}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
