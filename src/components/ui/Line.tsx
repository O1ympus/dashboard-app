interface Props {
  className: string
}

export default function Line({ className }: Props) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#A7D7C5] dark:bg-[#BB86FC] ${className} `}
    />
  )
}
