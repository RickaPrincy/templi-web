import { CSSProperties, FC } from 'react';
import { useTheme } from './theme-provider';
import githubIcon from '@/assets/images/icons/github.png';
import githubWhiteIcon from '@/assets/images/icons/github-white.png';

export const GithubIcon: FC<{
  reverse?: boolean;
  style?: CSSProperties;
  theme?: 'light' | 'dark';
}> = ({ style = {}, reverse = false, theme: providedTheme }) => {
  const { theme } = useTheme();
  const themeValue = providedTheme ?? theme;
  const reversedTheme = reverse
    ? themeValue === 'light'
      ? 'dark'
      : 'light'
    : themeValue;

  return (
    <img
      src={reversedTheme === 'light' ? githubIcon : githubWhiteIcon}
      className="w-4"
      style={style}
      alt="Github"
    />
  );
};
