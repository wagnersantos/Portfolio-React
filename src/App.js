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

  const handleRemoveRepository = async (id) => {
    const resp = await api.delete(`repositories/${id}`);
    resp?.status === 204 &&
      setReposiories(repositories.filter((e) => e.id !== id));
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
