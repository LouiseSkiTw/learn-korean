import React from 'react';

const KoreaFlagBackground = ({ children }) => {
  return (
    <>
      <style>{`
        :root{
          --red: #c60c30;
          --blue: #003478;
          --bg: #ffffff;
          --bar: #111111;
          --gap: 8px;
          --anim-speed: 3.8s;
          --shade-speed: 2.8s;
        }
        .flag-bg {
          position: fixed;
          inset: 0;
          background: var(--bg);
          overflow: hidden;
          z-index: -2; /* behind everything */
          transform-origin: left center;
          perspective: 800px;
          animation: sway var(--anim-speed) ease-in-out infinite alternate;
        }
        .flag-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(0,0,0,0.08) 0%,
            rgba(0,0,0,0.00) 10%,
            rgba(0,0,0,0.06) 20%,
            rgba(0,0,0,0.00) 35%,
            rgba(0,0,0,0.07) 47%,
            rgba(0,0,0,0.00) 60%,
            rgba(0,0,0,0.05) 72%,
            rgba(0,0,0,0.00) 85%,
            rgba(0,0,0,0.06) 100%
          );
          mix-blend-mode: multiply;
          animation: shade var(--shade-speed) linear infinite;
        }
        .canvas {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          animation: wave var(--anim-speed) ease-in-out infinite alternate;
        }
        .taeguk {
          position: absolute;
          width: 25%;
          aspect-ratio: 1 / 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(20deg);
          border-radius: 50%;
          overflow: hidden;
        }
        .taeguk::before,
        .taeguk::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .taeguk::before {
          background:
            radial-gradient(circle at 50% 25%, var(--bg) 0 18%, transparent 19%) top/100% 50% no-repeat,
            var(--red);
          clip-path: inset(0 0 50% 0);
        }
        .taeguk::after {
          background:
            radial-gradient(circle at 50% 75%, var(--bg) 0 18%, transparent 19%) bottom/100% 50% no-repeat,
            var(--blue);
          clip-path: inset(50% 0 0 0);
        }
        .trigram {
          position: absolute;
          width: 22%;
          height: 10%;
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          gap: 18%;
        }
        .bar {
          position: relative;
          height: 100%;
          background: var(--bar);
          border-radius: 2px;
        }
        .bar.broken::before,
        .bar.broken::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: calc(50% - var(--gap));
          background: var(--bar);
          border-radius: 2px;
        }
        .bar.broken::before { left: 0; }
        .bar.broken::after  { right: 0; }
        .geon { left: 8%; top: 12%; transform: rotate(-30deg); }
        .gam { left: 8%; bottom: 12%; transform: rotate(30deg); }
        .ri { right: 8%; top: 12%; transform: rotate(30deg); }
        .gon { right: 8%; bottom: 12%; transform: rotate(-30deg); }

        /* Overlay for readability */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(255,255,255,0.9); /* white veil, adjust opacity */
          z-index: -1; /* above flag, below content */
        }

        @keyframes sway {
          0%   { transform: rotateY(-12deg) }
          100% { transform: rotateY(8deg)   }
        }
        @keyframes wave {
          0%   { transform: translateX(0) skewY(0.6deg) }
          50%  { transform: translateX(-0.8%) skewY(-0.6deg) }
          100% { transform: translateX(0.8%) skewY(0.6deg) }
        }
        @keyframes shade {
          0%   { background-position: 0 0 }
          100% { background-position: 120% 0 }
        }
      `}</style>

      <div className="flag-bg">
        <div className="canvas">
          <div className="taeguk"></div>

          <div className="trigram geon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <div className="trigram gam">
            <div className="bar"></div>
            <div className="bar broken"></div>
            <div className="bar"></div>
          </div>

          <div className="trigram ri">
            <div className="bar broken"></div>
            <div className="bar"></div>
            <div className="bar broken"></div>
          </div>

          <div className="trigram gon">
            <div className="bar broken"></div>
            <div className="bar broken"></div>
            <div className="bar broken"></div>
          </div>
        </div>
      </div>

      {/* Overlay veil */}
      <div className="overlay"></div>

      {/* Your app content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem', color: '#000' }}>
        {children}
      </div>
    </>
  );
};

export default KoreaFlagBackground;
