import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';
import AttributeControls from "./components/AttributeControls.js";
import ClassSelection from "./components/ClassSelection.js";
import Skills from "./components/Skills.js";
import SkillCheck from "./components/SkillCheck.js";

function App() {
  const githubUsername = "riseworld27";
  const apiUrl = `https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`;

  const initialAttr = 10;
  const [characters, setCharacters] = useState([]);

  // Fetch characters from the API when the app starts
  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setCharacters(data);
      } else {
        console.log("API returned non-array data, initializing with default character.");
        setCharacters([createDefaultCharacter(1)]);
      }
    } catch (error) {
      console.error("Error loading characters:", error);
      setCharacters([createDefaultCharacter(1)]);
    }
  };

  const saveAllCharacters = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characters),
      });

      if (!response.ok) {
        throw new Error(`Failed to save characters: ${response.statusText}`);
      }

      alert("Characters saved successfully!");
    } catch (error) {
      console.error("Error saving characters:", error);
      alert("Failed to save characters.");
    }
  };

  const createDefaultCharacter = (id) => ({
    id,
    name: `Character ${id}`,
    attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
      acc[attr] = initialAttr;
      return acc;
    }, {}),
    modifiers: ATTRIBUTE_LIST.reduce((acc, attr) => {
      acc[attr] = 0;
      return acc;
    }, {}),
    skills: SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = 0;
      return acc;
    }, {}),
    selectedClass: null,
  });

  const sumAttributes = (charId: number) => {
    const character = characters.find((char) => char.id === charId);
    if (!character) return 0;

    return Object.values(character.attributes).reduce((sum: number, value: number) => {
      return sum + value;
    }, 0);
  };

  const updateCharacterAttributes = (charId, attribute, delta) => {
    const totalAttributes = Number(sumAttributes(charId));
    if (delta > 0 && totalAttributes >= 70) {
      alert("Attributes exceed the maximum limit of 70.");
      return;
    }

    setCharacters((prev) =>
      prev.map((char) =>
        char.id === charId
          ? {
            ...char,
            attributes: {
              ...char.attributes,
              [attribute]: Math.max(0, char.attributes[attribute] + delta),
            },
            modifiers: {
              ...char.modifiers,
              [attribute]: Math.floor((char.attributes[attribute] + delta - initialAttr) / 2),
            },

          }
          : char
      )
    );
  };
  const addNewCharacter = () => {
    const newCharacterId = characters.length + 1;
    setCharacters((prev) => [...prev, createDefaultCharacter(newCharacterId)]);
  };

  const resetAllCharacters = () => {
    setCharacters((prev) => prev.map((char) => createDefaultCharacter(char.id)));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Lucas Lee</h1>
      </header>
      <section className="App-section">
        <>
          <div className="App-content-header">
            <button onClick={addNewCharacter}>Add New Character</button>
            <button onClick={resetAllCharacters}>Reset All Characters</button>
            <button onClick={saveAllCharacters}>Save All Characters</button>
          </div>
          {characters.map((char) => (
            <div key={char.id} className="character-section">
              <h2>{char.name}</h2>
              <SkillCheck characters={[char]} />
              <div className="App-content">
                <AttributeControls
                  characters={[char]}
                  updateCharacterAttributes={updateCharacterAttributes}
                />
                <ClassSelection
                  characters={[char]}
                  selectedClass={char.selectedClass}
                  setSelectedClass={(selected) =>
                    setCharacters((prev) =>
                      prev.map((c) =>
                        c.id === char.id ? { ...c, selectedClass: selected } : c
                      )
                    )
                  }
                />

                <Skills characters={[char]} setCharacters={setCharacters} />
              </div>
            </div>
          ))}
        </>

      </section>
    </div>
  );
}

export default App;
