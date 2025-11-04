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
      onChange={e => handleOnChange(e.target.value)}
      rows={rows}
      className={`w-full rounded-lg border border-[#E5E5E5] p-4 outline-none focus:border-[#3AAFA9] dark:border-[#7A7A7A] dark:bg-transparent dark:text-[#A9A9A9] dark:focus:border-[#BB86FC]`}
    />
  )
}
