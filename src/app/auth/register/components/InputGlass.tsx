function InputGlass({
  label,
  icon,
  tipo = 'text',
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  tipo?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <label className="input-group">
      <span className="input-label">{label}</span>
      <div className="input-wrapper">
        <div className="icon-box">{icon}</div>
        <input
          type={tipo}
          placeholder=""
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}
