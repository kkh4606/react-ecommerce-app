function Errors({ error, name }) {
  if (error?.[name]) {
    return <p className="text-[red] font-bold">{error[name]}</p>;
  }
}

export default Errors;
