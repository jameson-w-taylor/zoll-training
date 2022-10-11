import { render } from '@testing-library/react';
import { SplashScreen } from '@capacitor/splash-screen';
import { isPlatform } from '@ionic/react';
import App from './App';

jest.mock('@capacitor/splash-screen');
jest.mock('@ionic/react', () => {
  const actual = jest.requireActual('@ionic/react');
  return { ...actual, isPlatform: jest.fn() };
});

describe('<App />', () => {
  beforeEach(() => (SplashScreen.hide = jest.fn()));

  describe('initialization', () => {
    describe('in an Android context', () => {
      beforeEach(() => (isPlatform as jest.Mock).mockImplementation(() => true));
      it('should hide the splash screen', () => {
        const { container } = render(<App />);
        expect(container).toBeDefined();
        expect(SplashScreen.hide).toHaveBeenCalledTimes(1);
      });
    });

    describe('in an iOS context', () => {
      beforeEach(() => (isPlatform as jest.Mock).mockImplementation(() => true));
      it('should hide the splash screen', () => {
        const { container } = render(<App />);
        expect(container).toBeDefined();
        expect(SplashScreen.hide).toHaveBeenCalledTimes(1);
      });
    });

    describe('in a web context', () => {
      beforeEach(() => (isPlatform as jest.Mock).mockImplementation(() => false));
      it('should not hide the splash screen', () => {
        const { container } = render(<App />);
        expect(container).toBeDefined();
        expect(SplashScreen.hide).not.toHaveBeenCalled();
      });
    });
  });

  afterEach(() => jest.restoreAllMocks());
});
