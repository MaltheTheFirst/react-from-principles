import type { CatchFormData } from '../schemas/catchFormSchema'
import type { Catch } from '../types/Catch'
import { useState, useReducer, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router'
import { UnitContext } from '../context/UnitContext'
import { useCatches } from '../context/CatchContext'
import { catchFormSchema } from '../schemas/catchFormSchema'
import CatchControls from '../components/CatchControls'
import CatchList from '../components/CatchList'
import CatchForm from '../components/CatchForm'
import '../App.css'

type CatchFormState = {
  fish: string
  length: string
  editingId: number | null
  errors: {
    fish: string | null
    length: string | null
  }
}

const initialFormState: CatchFormState = {
  fish: "",
  length: "",
  editingId: null,
  errors: {
    fish: null,
    length: null
  }
}

type CatchFormAction = 
  | { type: "fishChanged"; value: string }
  | { type: "lengthChanged"; value: string }
  | { type: "startEditing"; id: number; fish: string; length: number }
  | { type: "cancelEditing" }
  | { type: "reset" }
  | {
      type: "validationFailed",
      errors: {
        fish: string | null
        length: string | null
      } 
    }

function buildCatch(data: CatchFormData): Catch {
    return {
        id: Date.now(),
        fish: data.fish,
        length: data.length,
    }
}

function catchFormReducer(
  state: CatchFormState,
  action: CatchFormAction
): CatchFormState {
  switch (action.type) {
    case  "fishChanged":
      return {
        ...state,
        fish: action.value,
        errors: {
            ...state.errors,
            fish: null
        }
      }
    
    case "lengthChanged":
      return {
        ...state,
        length: action.value,
        errors: {
            ...state.errors,
            length: null
        }
    }
  
    case "startEditing":
      return {
        fish: action.fish,
        length: String(action.length),
        editingId: action.id,
        errors: {
            fish: null,
            length: null
        }
    }

    case "cancelEditing":
    case "reset":
      return initialFormState

    case "validationFailed":
      return {
        ...state,
        errors: action.errors
    }

    default:
      return state
  }
}

function CatchLogPage() {
    const { catches, setCatches } = useCatches()

    const [formState, dispatch] = useReducer(
        catchFormReducer,
        initialFormState
    )

    const [search, setSearch] = useState("")
    const [sortOrder, setSortOrder] = useState("default")
    const [unit, setUnit] = useState<"cm" | "in">("cm")
    const fishInputRef = useRef<HTMLInputElement>(null)
    const lengthInputRef = useRef<HTMLInputElement>(null)

    const catchLengths = catches.map((catchItem) => {
        return catchItem.length
    })

    const longestCatch = Math.max(...catchLengths)

		function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
			event.preventDefault()

			const result = catchFormSchema.safeParse({
				fish: formState.fish,
				length: formState.length
			})

			if (!result.success) {
				const fieldErrors = result.error.flatten().fieldErrors

				const fishError = fieldErrors.fish?.[0] ?? null
				const lengthError = fieldErrors.length?.[0] ?? null

				dispatch({
					type: "validationFailed",
					errors: {
						fish: fishError,
						length: lengthError
					}
				})

				if (fishError) {
					fishInputRef.current?.focus()
				} else if (lengthError) {
					lengthInputRef.current?.focus()
				}

				return
			}

			const validatedCatch = result.data

			if (formState.editingId !== null) {
				setCatches((currentCatches) => {
					return currentCatches.map((catchItem) => {
						if (catchItem.id === formState.editingId) {
							return {
								id: catchItem.id,
								fish: validatedCatch.fish,
								length: validatedCatch.length
							}
						}

						return catchItem
					})
				})

				dispatch({ type: "reset" })
				return
			}

			const newCatch = buildCatch(validatedCatch)

			setCatches((currentCatches) => {
				return [
					...currentCatches,
					newCatch
				]
			})

			dispatch({ type: "reset" })
		}

		const handleDelete = useCallback((id: number) => {
			setCatches((currentCatches) => {
				return currentCatches.filter((catchItem) => {
					return catchItem.id !== id
				})
			})
		}, [setCatches])

		const handleEdit = useCallback((id: number) => {
			const catchToEdit = catches.find((catchItem) => {
				return catchItem.id === id
			})

			if (catchToEdit === undefined) {
				return
			}

			dispatch({
				type: "startEditing",
				id: catchToEdit.id,
				fish: catchToEdit.fish,
				length: catchToEdit.length
			})

			fishInputRef.current?.focus()
		}, [catches])

		function handleCancelEdit() {
			dispatch({ type: "cancelEditing" })
		}

		const { filteredCatches, sortedCatches } = useMemo(() => {
			const filteredCatches = catches.filter((catchItem) => {
				return catchItem.fish
					.toLowerCase()
					.includes(search.toLowerCase())
			})

			const sortedCatches = [...filteredCatches]

			if (sortOrder === "shortest") {
				sortedCatches.sort((a, b) => a.length - b.length)
			}

			if (sortOrder === "longest") {
				sortedCatches.sort((a, b) => b.length - a.length)
			}

			return {
				filteredCatches,
				sortedCatches
			}
		}, [catches, search, sortOrder])

		const displayLongestCatch =
			unit === "cm"
				? longestCatch
				: Number((longestCatch / 2.54).toFixed(1))

    return (
        <UnitContext value={unit}>
            <main id="center">
                <Link to="/" style={{ textDecoration: 'none' }}><h1>Catch Log</h1></Link>
                <Link to="/stats">Statistics</Link>

                <CatchControls 
                    search={search}
                    sortOrder={sortOrder}
                    onSearchChange={setSearch}
                    onSortOrderChange={setSortOrder}
                />

                <select
                value={unit}
                onChange={(event) => setUnit(event.target.value as "cm" | "in")}
                >
                <option value="cm">Centimeters</option>
                <option value="in">Inches</option>
                </select>

                { 
                catches.length === 0 
                    ? <h3>No catches logged yet</h3> 
                    : <h3>{catches.length} catches logged</h3> 
                }

                {
                catches.length === 0
                    ? null
                    : <h3>Longest catch: {displayLongestCatch}</h3>
                }

                {
                search !== "" && filteredCatches.length === 0
                ? <p>No catches match your search</p>
                : <CatchList
                    catches={sortedCatches}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    />
                }
                <CatchForm 
                fish={formState.fish}
                length={formState.length}
                editingId={formState.editingId}
                onFishChange={(value) => {
                    dispatch({
                        type: "fishChanged",
                        value
                    }
                )}}
                onLengthChange={(value) =>
                    dispatch({
                        type: "lengthChanged",
                        value
                    })}
                onSubmit={handleSubmit}
                onCancelEdit={handleCancelEdit}
                fishInputRef={fishInputRef}
                lengthInputRef={lengthInputRef}
                errors={formState.errors}
                />
            </main>
        </UnitContext>
    )
}

export default CatchLogPage