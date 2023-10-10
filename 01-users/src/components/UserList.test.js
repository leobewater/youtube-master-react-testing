import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserList from './UserList';

test('render one row per user', () => {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];

  render(<UserList users={users} />);

  // browser tool
  // screen.logTestingPlaygroundURL();

  // const rows = screen.getAllByRole('row');
  const rows = within(screen.getByTestId('users')).getAllByRole('row');
  
  expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
  render(<UserList users={[]} />);
});
