/* Adds a delay to whatever block code we want. In this project its used to slow down requests and loading of images so skeletons and loaders can be seen */
export default function wrapFunctionInTimeoutInDev(cb: () => void) {
  console.log(process.env.NEXT_PUBLIC_SLOW_REQUESTS);
  if (process.env.NEXT_PUBLIC_SLOW_REQUESTS === "true") {
    const delay = 1500 + Math.random() * 500;
    setTimeout(() => cb(), delay);
  } else {
    cb();
  }
}
