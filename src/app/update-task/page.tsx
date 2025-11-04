import UpdateTaskForm from '@/components/UpdateTaskForm'
import { Suspense } from 'react'

export default function CreateTask() {
  return (
    <Suspense fallback={null}>
      <UpdateTaskForm />
    </Suspense>
  )
}
