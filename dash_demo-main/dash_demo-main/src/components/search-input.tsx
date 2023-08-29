import { useRef } from "react"

interface Props {
  onSearchTermChange: (term: string) => void
  inputPlaceholder: string
}

export default function SearchInput({ onSearchTermChange, inputPlaceholder }: Props) {
  const ref = useRef<HTMLInputElement>(null)

    return (
        <div className="relative mt-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6 text-dark-ebony"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </span>
            <input ref={ref} onChange={() => onSearchTermChange(ref.current?.value!)} type="search" name="q" className="py-2 text-sm rounded-lg pl-10 focus:outline-none bg-blue-50" placeholder={inputPlaceholder} />
        </div>
    )
}
