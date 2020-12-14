import * as utils from '../utils/storage';

function acceptLocation(lastLocation) {
  return (
    lastLocation &&
    lastLocation.pathname &&
    lastLocation.pathname !== '/' &&
    lastLocation.pathname.indexOf('auth') === -1 &&
    lastLocation.pathname !== '/logout'
  );
}

export function saveLastLocation(lastLocation) {
  const localStorateLocations = utils.getStorage(localStorageLastLocationKey);
  const _useLocations = localStorateLocations
    ? JSON.parse(localStorateLocations)
    : [];

  if (acceptLocation(lastLocation)) {
    _useLocations.push(lastLocation.pathname);
    utils.setStorage(
      localStorageLastLocationKey,
      JSON.stringify(_useLocations),
      120,
    );
  }
}

export function forgotLastLocation() {
  utils.removeStorage(localStorageLastLocationKey);
}

export function getLastLocation() {
  const localStorateLocations = utils.getStorage(localStorageLastLocationKey);
  if (!localStorateLocations) {
    return '/';
  }

  const _userLocations = JSON.parse(localStorateLocations);
  const result = _userLocations.length > 0 ? _userLocations.pop() : '/';
  return result;
}
