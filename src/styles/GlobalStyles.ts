import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
    }

    body{
        background: #121214;
        color: #fff;
        text-align: center;
        font-family: Roboto ,Arial, Helvetica, sans-serif;
    }
    a{
        color: #fff;
        text-decoration: none;
    }
    img{
        width: 360px;
        height: 380px;
    }
`;
