import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { css, Global as G } from "@emotion/react"

const Global = () => (
  <G
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "Roboto", sans-serif !important;
      }
      img {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      .marker {
        cursor: pointer;
        width: 24px;
        transition: width 0.3s;
      }
      .marker svg {
        width: 100%;
      }
      .marker.big {
        width: 36px;
      }
      .marker .fill {
        transition: fill 0.3s;
      }
      .marker.blue .fill {
        fill: #00b6ad;
      }
      .marker.black .fill {
        fill: #2b3c4d;
      }
      .marker.red .fill {
        fill: #ff7373;
      }
      .marker.yellow .fill {
        fill: #ffc700;
      }
      .mapboxgl-popup {
        top: -24px;
      }
      .mapboxgl-popup-content {
        background: none;
        box-shadow: none;
        padding: 0;
      }
      .mapboxgl-popup-tip {
        display: none;
      }
      .map-popup {
        background: #fff;
        font-size: 14px;
        padding: 4px;
        border-radius: 8px;
      }
    `}
  />
)

export default Global
