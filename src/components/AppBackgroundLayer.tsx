import React, { useState } from 'react';
import yellowPurpleBgImg from '../assets/images/app_yellow_purple_bg_1794755033863.jpg';
import { AppBackdrop } from '../types/logo';

interface AppBackgroundLayerProps {
  backdrop: AppBackdrop;
}

export const AppBackgroundLayer: React.FC<AppBackgroundLayerProps> = ({ backdrop }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (backdrop === 'plain') {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-[#F8F9FA] pointer-events-none"
      />
    );
  }

  if (backdrop === 'grid') {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 app-bg-grid pointer-events-none"
      />
    );
  }

  if (backdrop === 'mesh') {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 app-bg-mesh pointer-events-none"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FACC15 0%, #A855F7 55%, #581C87 100%)',
      }}
    >
      {!imgFailed && (
        <img
          src={yellowPurpleBgImg}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-center"
        />
      )}
    </div>
  );
};
