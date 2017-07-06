import { SpotifyEmotionPage } from './app.po';

describe('spotify-emotion App', () => {
  let page: SpotifyEmotionPage;

  beforeEach(() => {
    page = new SpotifyEmotionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
