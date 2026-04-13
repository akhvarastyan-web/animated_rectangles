import React from 'react';
import './App.scss';
import { PixiViewport } from './PixiViewport';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <PixiViewport />
    </div>
  );
};
