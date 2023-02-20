//DEV ONLY Pause
export function pauseSuccess(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('123');
    }, duration);
  });
}
export function pauseError(duration: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error from pause function!');
    }, duration);
  });
}
