const TextLine = ({ label, value, onChange }) => {
  return (
    <div className="text-line">
      <label htmlFor={label}>{label}:</label>
      <input type="text" id={label} value={value} onInput={onChange} />
    </div>
  );
};

export default TextLine;
