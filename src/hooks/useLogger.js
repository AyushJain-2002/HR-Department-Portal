import {useCallback} from 'react';
import logger from '../api/Logger';
import DebugUtils from '../Utils/Debug';

export const useLogger = (context) => {
    const isDebug = DebugUtils.isDebugEnabled();
 const debug = useCallback(
    (message, data) => {
      if (isDebug) logger.debug(message, data, context);
    },
    [context, isDebug]
  );

  const info = useCallback(
    (message, data) => {
      logger.info(message, data, context);
    },
    [context]
  );

  const warn = useCallback(
    (message, data) => {
      logger.warn(message, data, context);
    },
    [context]
  );

  const error = useCallback(
    (message, data) => {
      logger.error(message, data, context);
    },
    [context]
  );

  const apiCall = useCallback((method, endpoint, data) => {
    logger.logRequest(method, endpoint, data);
  }, []);

  const navigation = useCallback((routeName, params) => {
    DebugUtils.logNavigation(routeName, params);
  }, []);

  const timer = useCallback((label) => {
    return DebugUtils.startTimer(label);
  }, []);

  return {
    debug,
    info,
    warn,
    error,
    apiCall,
    navigation,
    timer,
  };
};