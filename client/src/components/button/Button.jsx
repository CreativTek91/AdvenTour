function Button({classBtnName='btn',children='Go Back', onClick}) {
  return (
    <div className="mt-12">
      <button className={classBtnName} onClick={onClick}>{children}</button>
    </div>
  );
}

export default Button
