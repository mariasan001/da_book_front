declare module "*.json" {
  import { AnimationConfigWithData } from 'lottie-web';
  const value: AnimationConfigWithData<'svg'>['animationData'];
  export default value;
}
