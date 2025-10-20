interface InputGroupProps {
  label: string
  name: string
  type?: string
  prefix?: string
  disabled?: boolean
  readOnly?: boolean
  defaultValue?: string | number
}

export const InputGroup = ({
  label,
  name,
  type = 'text',
  prefix,
  disabled,
  readOnly,
  defaultValue,
}: InputGroupProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative mt-1">
      {prefix && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full py-2 border-none rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 ${prefix ? 'pl-10' : 'px-3'} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
      />
    </div>
  </div>
)

interface SelectGroupProps {
  label: string
  name: string
  disabled?: boolean
  defaultValue?: string
  options: string[]
}

export const SelectGroup = ({ label, name, disabled, defaultValue, options }: SelectGroupProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      name={name}
      id={name}
      defaultValue={defaultValue}
      disabled={disabled}
      className={`w-full mt-1 py-2 px-3 border-none rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#0b2239]/50 ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)
