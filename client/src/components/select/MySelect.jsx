

export default function MySelect({
  value,
  setValue,
  options,
  isMultiple=false,
  children
}) 


{
   const handleSelect = (e) => {
     setValue(() => e.target.value);
      
   };

   const handleSelectMultiple = (e) => {
     const options = [...e.target.selectedOptions];
     const valuesOpt = options.map((option) => option.value);
     setValue((prev) => ({
       ...prev,
       ...valuesOpt,
     }));
   };

  return (
    <label htmlFor={value}>
      {children}
      <select
        multiple={isMultiple}
        value={value}
        name={value}
        id={value}
        onChange={isMultiple ? handleSelectMultiple : handleSelect}
        className=""
      >
        <option value="" className="font-bold text-center">
          {value}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
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