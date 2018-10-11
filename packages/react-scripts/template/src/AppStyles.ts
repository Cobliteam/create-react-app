import { css, keyframes } from 'emotion';

const app = css`
  text-align: center;
`;

const logoKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

const appLogo = css`
  animation: ${logoKeyframe} infinite 10s linear;
  height: 40vmin;
`;

const appHeader = css`
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #18182e;
`;

const appLink = css`
  color: #1774f0;
`;

export default {
  app,
  appHeader,
  appLink,
  appLogo,
};
