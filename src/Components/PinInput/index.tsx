import { useCallback, useEffect, useState } from "react";
import "./index.scss";
import { Input, Select } from "antd";

enum PIN_MODE {
  "SECRET",
  "PUBLIC",
}
export const PinInput = () => {
  const [pinLength, setPinLength] = useState(4);
  const [mode, setMode] = useState<PIN_MODE>(PIN_MODE.SECRET);
  const [activeNumber, setActiveNumber] = useState(0);
  const autoFocus = useCallback((el: any) => (el ? el.focus() : null), []);

  let emptyPin = Array.from(Array(pinLength).keys()).map((item) => ({
    id: Number(item),
    value: "",
  }));

  const [pin, setPin] = useState(emptyPin);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const newPin = pin.map((num) => {
        if (num.id === Number(event.target.id)) {
          return { id: Number(event.target.id), value: event.target.value };
        } else return num;
      });

      setPin(newPin);
      setActiveNumber(activeNumber + 1);
    }
  };

  const handleChangeMode = (pinMode: PIN_MODE) => {
    setMode(pinMode);
  };

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveNumber(+event.target.id);
  };

  const pinToString = pin.map((num) => num.value).join("");
  const isValid = pinLength == pinToString.length;
  useEffect(() => {
    setPin(emptyPin);
  }, [pinLength]);

  return (
    <div className="mainContainer">
      <h1>INPUT PIN </h1>
      {isValid && (
        <h1>
          PIN VALID <span role="img">✅</span>
        </h1>
      )}
      <div className="pinContainer">
        {Array.from(Array(pinLength).keys()).map((item) => (
          <input
            key={item}
            type={mode === PIN_MODE.SECRET ? "password" : "text"}
            id={String(item)}
            maxLength={1}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={(event) => {
              if (event.keyCode !== 8 && !/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            ref={item == activeNumber ? autoFocus : undefined}
          />
        ))}
      </div>
      <br></br>
      <h1>PIN MODE</h1>
      <Select
        style={{ width: 120 }}
        onChange={handleChangeMode}
        value={mode}
        options={[
          { value: PIN_MODE.SECRET, label: "SECRET" },
          { value: PIN_MODE.PUBLIC, label: "PUBLIC" },
        ]}
      />
      <h1>PIN LENGTH</h1>
      <Input
        className="w-1/4"
        type="number"
        min={4}
        placeholder="Change pin length"
        value={pinLength}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPinLength(Number(e.target.value))
        }
      />
    </div>
  );
};
