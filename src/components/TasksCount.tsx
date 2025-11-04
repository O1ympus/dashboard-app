interface Props {
	divColorHexCode: string,
	textColorHexCode: string,
	count: number,
}

export default function TasksCount({divColorHexCode, textColorHexCode, count}: Props) {
	return (
		<div
			className={`flex items-center justify-center w-6 h-6 rounded-full font-medium`}
			style={{backgroundColor: divColorHexCode, color: textColorHexCode}}
		>
			{count}
		</div>
	);
}
