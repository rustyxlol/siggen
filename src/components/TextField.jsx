const TextField = ({ label, value, readOnly = false, rows = 6, onChange }) => {
  return (
    <div className="text-field">
      <label htmlFor={label}>{label}:</label>
      <textarea
        id={label}
        rows={rows}
        cols="40"
        value={value}
        onInput={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextField;
