import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { useState } from 'react';
function useSpinnerLoader(next) {

    const [hideSpinner, setHideSpinner] = useState(false); 

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    
    const renderSpinner = () => {
        return <ClipLoader css={override} loading={!hideSpinner}  size={150} />;
    };

    const setDoneLoading = state => {
        setHideSpinner(state);
    };

    const doneLoading = () => {
        return hideSpinner;
    }

      return [renderSpinner, setDoneLoading, doneLoading];

};

export default useSpinnerLoader;