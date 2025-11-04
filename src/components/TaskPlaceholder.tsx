import Line from '@/components/ui/Line'
import Link from 'next/link'
import {TaskType} from '@/types/DashboardContext'

interface Props {
	columnType: TaskType,
}

export default function TaskPlaceholder({ columnType }: Props) {
	return (
		<Link
			href={`/create-task?type=${encodeURIComponent(columnType)}`}
			className={`w-full bg-white rounded-sm shadow-sm h-30 mb-3 p-3
				cursor-pointer hover:bg-[#F4F5F7] dark:text-black
			`}
		>
			<div className={`relative w-full h-full`}>
				<Line className='w-10 h-1' />
				<Line className='h-10 w-1' />
			</div>
		</Link>
	);
}
