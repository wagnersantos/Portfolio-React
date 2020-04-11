import React from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setReposiories] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get("/repositories");
      setReposiories(data);
    })();
  }, []);

  const handleAddRepository = async () => {
    const repo = {
      url: "https://github.com/wagnersantos",
      title: "Wagner",
      techs: ["Node", "React", "React-native"],
    };
    const { data } = await api.post("/repositories", repo);
    data?.id && setReposiories([...repositories, data]);
  };

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
