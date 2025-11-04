interface Props {
  placeholder: string
  handleOnChange: (value: string) => void
  title: string
}

export default function FormInput({ placeholder, handleOnChange, title }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={title}
      onChange={e => handleOnChange(e.target.value)}
      className={`focus:ring-1r w-full rounded-lg border-1 border-[#E5E5E5] p-4 outline-none focus:border-[#3AAFA9] dark:border-[#7A7A7A] dark:bg-transparent dark:text-[#A9A9A9] dark:focus:border-[#BB86FC]`}
    />
  )
}
