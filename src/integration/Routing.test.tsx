import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'
import { CatchProvider } from '../context/CatchContext'

beforeEach(() => {
    localStorage.clear()
})

test('opens the correct catch detail from the log', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <CatchProvider>
                <App />
            </CatchProvider>
        </MemoryRouter>
    )

    fireEvent.click(
        screen.getByRole('link', { name: 'Horse Mackerel' })
    )

    expect(
        screen.getByRole('heading', { name: 'Catch Details' })
    ).toBeInTheDocument()

    expect(
        screen.getByText('Horse Mackerel')
    ).toBeInTheDocument()
})