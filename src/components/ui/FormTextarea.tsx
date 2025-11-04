interface Props {
	placeholder: string
	handleOnChange: (value: string) => void
	value: string
	rows?: number
}

export default function FormTextarea({ placeholder, handleOnChange, value, rows = 4 }: Props) {
	return (
		<textarea
			placeholder={placeholder}
			value={value}
			onChange={(e) => handleOnChange(e.target.value)}
			rows={rows}
			className={`p-4 dark:bg-white dark:text-[#808080] border border-[#E5E5E5]
				rounded-lg w-full outline-none focus:border-[#3AAFA9]
			`}
		/>
	)
}
