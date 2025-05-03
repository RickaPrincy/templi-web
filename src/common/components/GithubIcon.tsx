import { CSSProperties, FC } from 'react';
import { useTheme } from './ThemeProvider';
import githubIcon from '@/assets/images/icons/github.png';
import githubWhiteIcon from '@/assets/images/icons/github-white.png';

export const GithubIcon: FC<{
  style?: CSSProperties;
  theme?: 'light' | 'dark';
}> = ({ style = {}, theme: providedTheme }) => {
  const { theme } = useTheme();
  const themeValue = providedTheme ?? theme;

  return (
    <img
      src={themeValue === 'light' ? githubIcon : githubWhiteIcon}
      className="w-4"
      style={style}
      alt="Github"
    />
  );
};
