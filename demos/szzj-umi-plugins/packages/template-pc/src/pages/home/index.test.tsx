import { render } from '@testing-library/react';

import HomePage from './index';

test('renders HomePage by snapshot', () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
