/**
 * Utility to check if Hermes is enabled and provide detailed information
 * @returns Object with Hermes status and environment details
 */

declare global {
  interface HermesInternal {
    getRuntimeProperties?(): { version: string };
  }
}

export const isHermesEnabled = (): boolean => {
  return typeof (global as any).HermesInternal !== 'undefined';
};

/**
 * Get detailed information about the JavaScript engine and environment
 */
export const getEngineInfo = (): Record<string, any> => {
  const isHermes = isHermesEnabled();
  const hermesInternal = (global as any).HermesInternal;
  const platform = (global as any).Platform;
  
  return {
    engine: isHermes ? 'Hermes' : 'JSC',
    isHermesEnabled: isHermes,
    platform: platform?.OS || 'unknown',
    version: platform?.Version || 'unknown',
    hermesVersion: hermesInternal?.getRuntimeProperties?.()?.version || 'unknown',
    environment: process.env.NODE_ENV || 'unknown',
    // Additional debug info
    hasGlobalHermesInternal: !!hermesInternal,
    hasGetRuntimeProperties: !!hermesInternal?.getRuntimeProperties,
  };
};

/**
 * Logs detailed information about the JavaScript engine and environment
 */
export const logEngineInfo = (): void => {
  const info = getEngineInfo();
  
  console.log('=== JavaScript Engine Information ===');
  console.log(`Engine: ${info.engine}`);
  console.log(`Hermes Enabled: ${info.isHermesEnabled}`);
  console.log(`Platform: ${info.platform}`);
  console.log(`Version: ${info.version}`);
  console.log(`Hermes Version: ${info.hermesVersion}`);
  console.log(`Environment: ${info.environment}`);
  console.log('====================================');
  
  // Log to Metro console for debugging
  if ((global as any).__DEV__) {
    console.log('[DEBUG] Hermes status check:', JSON.stringify(info, null, 2));
  }
}; 