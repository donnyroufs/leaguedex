import { Browter } from 'browter';

const browter = new Browter();

browter.group('users', (browter) => {
  browter.get('/', 'UserController.index', [
    Auth.authenticateToken,
    Auth.withUser,
    auth.isAdmin,
  ]);
});
