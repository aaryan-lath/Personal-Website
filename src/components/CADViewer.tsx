'use client';

import { useEffect, useState } from 'react';

interface CADViewerProps {
  modelUrl?: string;
  width?: string;
  height?: string;
  showControls?: boolean;
}

export default function CADViewer({
  modelUrl,
  width = '100%',
  height = '400px',
  showControls = true
}: CADViewerProps) {
  // Fallback component for deployment compatibility
  return (
    <div 
      className="flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
      style={{ width, height }}
    >
      <div className="text-center p-8">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium mb-2">3D Model Viewer</p>
        <p className="text-sm text-gray-500 mb-1">Model: {modelUrl?.split('/').pop()}</p>
        <p className="text-xs text-gray-400">Interactive 3D viewer coming soon</p>
      </div>
    </div>
  );
}