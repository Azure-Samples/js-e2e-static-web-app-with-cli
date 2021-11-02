/// <reference types="react-scripts" />

declare module '*.svg' {
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  const content: string;
  export default content;
}