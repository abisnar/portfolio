import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { App } from '../App';
import { ServicesProvider, type Services } from '../services/ServicesContext';

function renderWithServices(overrides: Partial<Services> = {}) {
  const services: Services = {
    analytics: { pageView: vi.fn(), linkClick: vi.fn() },
    ...overrides,
  };
  render(
    <ServicesProvider value={services}>
      <App />
    </ServicesProvider>,
  );
  return services;
}

describe('App', () => {
  it('renders the profile header', () => {
    renderWithServices();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Allan Bisnar');
  });

  it('tracks a page view on mount', () => {
    const services = renderWithServices();
    expect(services.analytics.pageView).toHaveBeenCalledWith('home');
  });

  it('tracks a click on profile links', async () => {
    const services = renderWithServices();
    await userEvent.click(screen.getByRole('link', { name: /linkedin/i }));
    expect(services.analytics.linkClick).toHaveBeenCalledWith('linkedin');
  });
});
