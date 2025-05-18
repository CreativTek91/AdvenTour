export default function MySelect({
  name,
  value,
  onChange,
  options,
  isMultiple,
  children
}) 


{
   const handleChangedSelect = (e) => {
     const options = [...e.target.selectedOptions];
     const valuesOpt = options.map((option) => option.value);
     setContact((prev) => ({
       ...prev,
       days: valuesOpt,
     }));
   };

  return (
    <label htmlFor={name}>
      {children}
      <select
        multiple={isMultiple}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        className="flex flex-col min-h-[10em] sm:flex-row basis-1/2 border-3"
      >
        <option value="" className="font-bold text-center">
          Days:
        </option>
        {options.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </label>
  );
}


  // <input
  //   type="checkbox"
  //   checked={isMultiple}
  //   onChange={() => setIsMultiple((prev) => !prev)}
  // />;
  // {
  //   /* <MySelect
  //           name="days"
  //           value={contact.days}
  //           onChange={handleChangedSelect}
  //           options={allDays}
  //           isMultiple={true}
  //         /> */
  // }