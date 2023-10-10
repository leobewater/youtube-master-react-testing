import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}

test('render one row per user', () => {
  // const users = [
  //   { name: 'jane', email: 'jane@jane.com' },
  //   { name: 'sam', email: 'sam@sam.com' },
  // ];

  // const { container } = render(<UserList users={users} />);
  // render(<UserList users={users} />);
  renderComponent();

  // browser tool
  //  screen.logTestingPlaygroundURL();

  // const rows = screen.getAllByRole('row');
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // show warning, just ignore it by adding the following line
  // eslint-disable-next-line
  // const rows = container.querySelectorAll('tbody tr');

  expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
