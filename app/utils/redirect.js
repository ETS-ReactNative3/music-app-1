import history from './history';
import routes from './routes.json';

const redirectOnAlbum = slug => {
  const URL = routes.ALBUM.replace(':slug', slug);
  history.push(URL);
};

export { redirectOnAlbum };
