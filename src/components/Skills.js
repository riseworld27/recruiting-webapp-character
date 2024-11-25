import { SKILL_LIST } from "../consts";

const Skills = ({ characters, setCharacters }) => {
  const sumSkills = (charId) => {
    const character = characters.find((char) => char.id === charId);
    if (!character) return 0;

    return Object.values(character.skills).reduce((sum, value) => {
      return sum + value;
    }, 0);
  };

  const updateSkill = (charId, skill, delta) => {
    const character = characters.find((char) => char.id === charId);
    if (!character) return;

    const maxSkillPoints = Math.max(0, 10 + 4 * character.modifiers["Intelligence"]);
    const totalSkills = sumSkills(charId);

    if (totalSkills + delta > maxSkillPoints) {
      alert("Skill points exceed the maximum limit.");
      return;
    }

    setCharacters((prev) =>
      prev.map((char) =>
        char.id === charId
          ? {
            ...char,
            skills: {
              ...char.skills,
              [skill]: Math.max(0, char.skills[skill] + delta),
            },
          }
          : char
      )
    );
  };

  return (
    <div>
      {characters.map((char) => (
        <div key={char.id}>
          <h3>Skills</h3>
          <h3>
            Total skill points available:{" "}
            {Math.max(0, 10 + 4 * char.modifiers["Intelligence"])}
          </h3>
          {SKILL_LIST.map((skill) => (
            <div key={skill.name}>
              <span>{skill.name}: {char.skills[skill.name]} {"(Modifier: " + skill.attributeModifier + "):" + char.modifiers[skill.attributeModifier]}</span>
              <button onClick={() => updateSkill(char.id, skill.name, 1)}>+</button>
              <button onClick={() => updateSkill(char.id, skill.name, -1)}>-</button>
              <span>
                Total:{" "}
                {char.skills[skill.name] + char.modifiers[skill.attributeModifier]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skills;
