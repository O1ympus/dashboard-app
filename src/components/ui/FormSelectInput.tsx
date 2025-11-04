'use client'

import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions
} from '@headlessui/react'
import {ChevronUpDownIcon} from '@heroicons/react/16/solid'
import {CheckIcon} from '@heroicons/react/20/solid'
import {TaskType} from '@/types/DashboardContext'

interface Props {
	selected: string,
	handleSelected: (value: string) => void,
}

export default function FormSelectInput({ selected, handleSelected }: Props) {
	return (
		<Listbox value={selected} onChange={handleSelected}>
			<div className="relative mt-2">
				<ListboxButton className={`grid w-full cursor-default grid-cols-1 rounded-md
				 text-left dark:bg-white dark:text-[#808080]
				 border-1 border-[#E5E5E5] outline-1 -outline-offset-1 outline-white/10
				 focus-visible:outline-2 focus-visible:-outline-offset-2
				  focus-visible:outline-[#84C7AE] sm:text-sm/6 p-4
			  `}>
					<span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selected}</span>
          </span>
					<ChevronUpDownIcon
						aria-hidden="true"
						className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
					/>
				</ListboxButton>
				
				<ListboxOptions
					transition
					className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-600 py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
				>
					{Object.values(TaskType).map((t) => (
						<ListboxOption
							key={t}
							value={t}
							className="group relative cursor-default py-2 pr-9 pl-3 text-white select-none data-focus:bg-[#84C7AE] data-focus:outline-hidden"
						>
							<div className="flex items-center">
								<span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{t}</span>
							</div>
							
							<span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#3AAFA9] group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
						</ListboxOption>
					))}
				</ListboxOptions>
			</div>
		</Listbox>
	)
}
