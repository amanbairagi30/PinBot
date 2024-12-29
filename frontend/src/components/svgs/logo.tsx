import React from "react";

export default function Logo() {
  return (
    <>
      <svg
        width="42"
        height="46"
        viewBox="0 0 39 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="18" y="7" width="4" height="5" fill="#8E96FB" />
        <g filter="url(#filter0_d_2_30)">
          <circle cx="20" cy="4" r="4" fill="#9CA4FC" />
        </g>
        <circle cx="20" cy="4" r="3" fill="#7984FA" fill-opacity="0.42" />
        <rect
          width="8"
          height="13"
          rx="3"
          transform="matrix(-1 0 0 1 39 20)"
          fill="#9CA4FC"
        />
        <rect y="20" width="8" height="13" rx="3" fill="#9CA4FC" />
        <rect
          width="8"
          height="13"
          rx="3"
          transform="matrix(-1 0 0 1 38 20)"
          fill="#8E96FB"
        />
        <rect x="1" y="20" width="8" height="13" rx="3" fill="#8E96FB" />
        <rect x="4" y="11" width="31" height="31" rx="6" fill="#5865F2" />
        <path
          d="M25 39C29.0403 38.5662 30.4907 37.5938 31 34"
          stroke="#8E96FB"
        />
        <path
          d="M22.5 18.5L18.5 22.5L14.5 24L13 25.5L20 32.5L21.5 31L23 27L27 23"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5 29L12 33.5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 18L27.5 23.5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_d_2_30"
            x="12"
            y="0"
            width="16"
            height="16"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2_30"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2_30"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
