import React from 'react'

export const RussiaFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" width={width} height={height}>
    <rect fill="#fff" width="9" height="2"/>
    <rect fill="#0039A6" y="2" width="9" height="2"/>
    <rect fill="#D52B1E" y="4" width="9" height="2"/>
  </svg>
)

export const UKFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width={width} height={height}>
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
)

export const ChinaFlag = ({ width = 24, height = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width={width} height={height}>
    <rect width="30" height="20" fill="#de2910"/>
    <polygon fill="#ffde00" points="5,2 5.7,4.1 7.9,4.1 6.1,5.4 6.8,7.5 5,6.2 3.2,7.5 3.9,5.4 2.1,4.1 4.3,4.1"/>
    <polygon fill="#ffde00" points="5,2 5.7,4.1 7.9,4.1 6.1,5.4 6.8,7.5 5,6.2 3.2,7.5 3.9,5.4 2.1,4.1 4.3,4.1" transform="translate(7.5,-0.7) rotate(23 5 5) scale(0.34)"/>
    <polygon fill="#ffde00" points="5,2 5.7,4.1 7.9,4.1 6.1,5.4 6.8,7.5 5,6.2 3.2,7.5 3.9,5.4 2.1,4.1 4.3,4.1" transform="translate(10.1,2.1) rotate(45 5 5) scale(0.34)"/>
    <polygon fill="#ffde00" points="5,2 5.7,4.1 7.9,4.1 6.1,5.4 6.8,7.5 5,6.2 3.2,7.5 3.9,5.4 2.1,4.1 4.3,4.1" transform="translate(10.1,5.4) rotate(23 5 5) scale(0.34)"/>
    <polygon fill="#ffde00" points="5,2 5.7,4.1 7.9,4.1 6.1,5.4 6.8,7.5 5,6.2 3.2,7.5 3.9,5.4 2.1,4.1 4.3,4.1" transform="translate(7.5,7.8) rotate(45 5 5) scale(0.34)"/>
  </svg>
)
