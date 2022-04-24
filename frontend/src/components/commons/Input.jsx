import React from "react";

export default function Input({ name, label, error, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...rest} name={name} className="form-control" id={name} />
      {/* {...rest} is spread operator, which spreads the arguments and we are setting attributes using it
        e.g. value={value}, onChange={onChange} */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
