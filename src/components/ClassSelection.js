import { CLASS_LIST } from "../consts";

const ClassSelection = ({ characters, selectedClass, setSelectedClass }) => {
  const meetsRequirements = (charAttributes, classAttributes) => {
    return Object.keys(classAttributes).every(
      (attr) => charAttributes[attr] >= classAttributes[attr]
    );
  };

  const onCloseView = () => {
    setSelectedClass(null)
  }

  return (
    <>
      <div>
        <h2>Classes</h2>
        {Object.entries(CLASS_LIST).map(([className, classAttributes]) => (
          <div
            key={className}
            onClick={() => setSelectedClass({ name: className, attributes: classAttributes })}
            style={{
              backgroundColor: characters.some((char) =>
                meetsRequirements(char.attributes, classAttributes)
              )
                ? "lightgreen"
                : "lightgray",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
            }}
          >
            {className}
          </div>
        ))}
      </div>
      <div>
        {selectedClass && (
          <div>
            <h3>{selectedClass.name}:<br /> Minimum Requirement</h3>
            <ul>
              {Object.entries(selectedClass.attributes).map(([attr, value]) => (
                <li key={attr}>
                  {attr}: {value}
                </li>
              ))}
            </ul>
            <button onClick={onCloseView}>Close Requirement View</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ClassSelection;
