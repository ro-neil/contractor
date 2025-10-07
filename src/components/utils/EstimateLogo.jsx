import React from 'react';

const EstimateLogo = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 1920 960" preserveAspectRatio="xMinYMid meet">
                <defs>
                    <path id="icon" d="M360-160v-240h240v240H360Zm80-80h80v-80h-80v80ZM88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-392-299L88-440Zm392 160Z" />
                </defs>

                {/* <!-- Green (smallest) — width ratio 5/13 --> */}
                <g transform="translate(0,0)">
                    <g transform="scale(0.3846153846)" fill="rgba(15, 165, 15, 1)">
                        <use href="#icon" />
                    </g>
                </g>

                {/* <!-- Black (largest) — width ratio 13/13 --> */}
                <g transform="translate(369.2307692,0)">
                    <g transform="scale(1)" fill="#000">
                        <use href="#icon" />
                    </g>
                </g>

                {/* <!-- Yellow (middle) — width ratio 8/13 --> */}
                <g transform="translate(1329.2307692,0)">
                    <g transform="scale(0.6153846154)" fill="#e6e643ff">
                        <use href="#icon" />
                    </g>
                </g>
            </svg>

        </>
    )
}

export default EstimateLogo;