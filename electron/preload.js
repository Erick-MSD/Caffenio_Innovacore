// Preload script para Electron
// Aquí puedes exponer APIs seguras al renderer process si es necesario

import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Agrega aquí las APIs que necesites exponer
  platform: process.platform,
});
