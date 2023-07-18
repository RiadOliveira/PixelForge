import { Home } from 'Home';
import GlobalStyles from 'globalStyles';
import { ImagesContext } from 'hooks/images';

export const App = () => {
  return (
    <ImagesContext>
      <GlobalStyles />
      <Home />
    </ImagesContext>
  );
};
