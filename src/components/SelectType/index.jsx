function SelectType(props) {
  return (
    <div className="flex flex-col items-start gap-4 justify-center">
      <label htmlFor="">{props.label} : </label>
      <select
        required={props.isRequired}
        name={props.name}
        // value={props.options[0]}
        onChange={props.onChange}
        placeholder={`Insert your ${props.name}`}
        className="bg-gray-400 rounded-[24px] px-4  py-2 w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border  border-gray-100"
        type={props.type}
      >
        {props.options.map((item) => (
          <option className="bg-black" value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectType;
