interface Props {
	placeholder: string,
	handleOnChange: (value: string) => void,
	title: string,
}

export default function FormInput({ placeholder, handleOnChange, title }: Props) {
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={title}
			onChange={(e) => handleOnChange(e.target.value)}
			className={`p-4 dark:bg-white dark:text-[#808080] border-1 border-[#E5E5E5]
				rounded-lg w-full outline-none focus:border-[#3AAFA9] focus:ring-1r
			`}
		/>
	);
}
