interface Props {
	className: string,
}

export default function Line({ className }: Props) {
	return (
		<div className={`absolute bg-[#A7D7C5] left-1/2 top-1/2
			transform -translate-x-1/2 -translate-y-1/2 rounded-full ${className}
		`}/>
	);
}
