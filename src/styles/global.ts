import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root {
    --background: #f7f8fc;
    --white: #FBFBFB;
    --black: #1c1c1c;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font: 16px "Poppins", Arial, sans-serif;
    background: var(--background);
}

html {
    @media (max-width: 1080px) {
        font-size: 93.75%;
    }

    @media (max-width: 720px) {
        font-size: 87.5%;
    }
}

button {
    cursor: pointer;
}
`;