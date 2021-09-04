declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare namespace JSX {
  export interface IntrinsicElements {
    'model-viewer': any;
  }
}
