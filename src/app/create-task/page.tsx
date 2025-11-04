import TaskForm from '@/components/TaskForm'
import { Suspense } from 'react'

export default function CreateTask() {
	return (
		<Suspense fallback={null}>
			<TaskForm />
		</Suspense>
	);
}
