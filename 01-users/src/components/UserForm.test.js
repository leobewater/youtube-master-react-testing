import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  // Arrange, Act, Assert
  render(<UserForm />);

  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // assertion
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', async () => {
  // NOT the best implementation
  // const argList = [];
  // const callback = (...args) => {
  //   argList.push(args);
  // };
  // render(<UserForm onUserAdd={callback} />);
  // expect(argList).toHaveLength(1);
  // expect(argList[0][0]).toEqual({ name: 'jane', email: 'jane@jane.com' });

  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  // find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole('textbox');
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  // const emailInput = screen.getByLabelText(/enter email/i);

  // simulate typing a name
  await user.click(nameInput);
  await user.keyboard('jane');

  // simulate typing in an email
  await user.click(emailInput);
  await user.keyboard('jane@jane.com');

  // find the button
  const button = screen.getByRole('button');

  // simulate clicking the button
  await user.click(button);

  // assertion to make sure 'onUserAdd' get called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });
});
