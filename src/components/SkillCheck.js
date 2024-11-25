import React, { useState } from "react";
import { SKILL_LIST } from "../consts";

const SkillCheck = ({ characters }) => {
  const [skill, setSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState(0);
  const [result, setResult] = useState(null);

  const performSkillCheck = (character) => {
    if (!skill) {
      alert("Select a skill for the skill check.");
      return;
    }

    const skillValue = character.skills[skill]

    const roll = Math.floor(Math.random() * 20) + 1;
    const total = skillValue + roll;
    const success = total >= dc;

    setResult({
      character: character.name,
      roll,
      skillValue,
      total,
      success,
    });
  };


  return (
    <div>
      <h3>Skill Check</h3>
      <div>
        <label>
          Skill:
          <select value={skill} onChange={(e) => setSkill(e.target.value)}>
            {SKILL_LIST.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          DC:
          <input
            type="number"
            value={dc}
            onChange={(e) => setDC(Number(e.target.value))}
            placeholder="Enter DC"
          />
        </label>
      </div>
      {characters.map((char) => (
        <div key={char.id}>
          <button onClick={() => performSkillCheck(char)}>Roll for {char.name}</button>
        </div>
      ))}

      {result && (
        <div>
          <h4>Skill Check Result:</h4>
          <p>Character: {result.character}</p>
          <p>You Rolled: {result.roll}</p>
          <p>Skill: {skill} {": "} {result.skillValue}</p>
          <p>Total: {result.total}</p>
          <p>Result: {result.success ? "Success!" : "Failure!"}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
