import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import CatchItem from './CatchItem'

test('renders the catch fish name', () => {
    render(
        <MemoryRouter>
            <CatchItem
                id={1}
                fish="Horse Mackerel"
                length={16}
                onDelete={() => {}}
                onEdit={() => {}}
            />
        </MemoryRouter>
    )

    expect(screen.getByText('Horse Mackerel')).toBeInTheDocument()
})