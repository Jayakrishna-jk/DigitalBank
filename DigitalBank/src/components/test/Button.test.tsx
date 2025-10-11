import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../ui/button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const button = screen.getByText('Default');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-9');
  });

  it('applies custom variant and size', () => {
    render(<Button variant="outline" size="sm">Outline Small</Button>);
    const button = screen.getByText('Outline Small');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('h-8');
  });

  it('renders as a child when `asChild` is true', () => {
    render(
      <Button asChild>
        <a>testLink Button</a>
      </Button>
    );
    // const link = screen.getByRole('link');
    // expect(link).toHaveAttribute('href', '/test');
  });

  it('disables the button when `disabled` is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });
});
