'use client'

import React, {useState} from 'react'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import FormSelectInput from '@/components/ui/FormSelectInput'
import {useRouter, useSearchParams} from 'next/navigation'
import {useDashboardStore} from '@/stores/DashboardStore'

export default function TaskForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialType = searchParams.get('type') || '';
	
	const currentDashboard = useDashboardStore(state => state.currentDashboard);
	const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard);
	
	const [taskType, setTaskType] = useState(initialType)
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!currentDashboard?._id) {
			alert('No dashboard selected!');

			return;
		}
		
		setIsLoading(true);
		
		try {
			const res = await fetch(`/api/dashboards/${currentDashboard._id}/tasks`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: taskType,
					title,
					description,
				}),
			});
			
			if (!res.ok) {
				throw new Error('Failed to create dashboard');
			}
			
			const updatedDashboard = await res.json();
			
			setCurrentDashboard(updatedDashboard);
			
			setTitle('')
			setDescription('')
			await router.replace(`/`)
			
			setTitle('');
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}
	
	return (
		<div className={` bg-[#F6FBF9] dark:bg-[#F6FBF9]/95 rounded-2xl px-[60px]
			py-[50px] text-center flex flex-col items-center w-fit mx-auto
		`}>
			<h1 className={`text-[#212B27] font-bold text-3xl mb-2`}>
				Create A Task
			</h1>
			<p className={`text-[#212B27] text-lg max-w-[400px] mb-5`}>
				Create a task to enjoy all the services without any ads for free!
			</p>
			<form
				onSubmit={handleSubmit}
				className={`flex
					flex-col gap-8 w-full max-w-[600px] mx-auto
				`}
			>
				<FormSelectInput
					selected={taskType}
					handleSelected={setTaskType}
				/>
				<FormInput
					placeholder='Task title'
					handleOnChange={setTitle}
					title={title}
				/>
				<FormTextarea
					placeholder='Task description'
					value={description}
					handleOnChange={setDescription}
				/>
				<button
					type='submit'
					disabled={isLoading}
					className={`text-white bg-[#84C7AE] rounded-2xl py-4 w-fit
						px-15 mx-auto font-bold text-lg dark:bg-[#84C7AE]/90 cursor-pointer
					`}
				>
					Create Task
				</button>
			</form>
		</div>
	);
}
