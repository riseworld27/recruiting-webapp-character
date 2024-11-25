import { ATTRIBUTE_LIST } from "../consts";

const AttributeControls = ({ characters, updateCharacterAttributes }) => {
  return (
    <>
      {characters.map((char) => (
        <div key={char.id}>
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map((attr) => (
            <div key={attr} style={{ marginBottom: "10px" }}>
              <span>
                {attr}: {char.attributes[attr]}{" "}
                {"(Modifier: " + char.modifiers[attr] + ")"}
              </span>
              <button
                onClick={() => updateCharacterAttributes(char.id, attr, 1)}
                style={{ marginLeft: "10px" }}
              >
                +
              </button>
              <button
                onClick={() => updateCharacterAttributes(char.id, attr, -1)}
                style={{ marginLeft: "10px" }}
              >
                -
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default AttributeControls;
