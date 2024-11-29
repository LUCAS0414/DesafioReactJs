import React, { useState } from "react";
import "./cadastro.css"; // Importa o arquivo de estilos

function Cadastro() {
  // Estados para armazenar os valores dos campos
  const [formData, setFormData] = useState({
    nome: "",
    curso: "",
    estado: "",
    cidade: "",
  });

  const [cidadesDisponiveis, setCidadesDisponiveis] = useState([]);
  const [error, setError] = useState("");

  // Dados das cidades por estado
  const cidadesPorEstado = {
    "São Paulo": ["Mogi das Cruzes", "Suzano", "Poá", "Guararema"],
    "Rio de Janeiro": ["Angra dos Reis", "Niterói", "Itaboraí"],
    "Minas Gerais": ["Belo Horizonte", "Monte Azul", "Muzambinho"],
  };

  // Atualiza o estado ao mudar um campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "estado") {
      setCidadesDisponiveis(cidadesPorEstado[value] || []);
      setFormData({ ...formData, estado: value, cidade: "" }); // Reseta a cidade ao mudar o estado
    }
  };

  // Valida e salva os dados
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o reload da página

    const { nome, curso, estado, cidade } = formData;
    if (!nome || !curso || !estado || !cidade) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setError("");
    console.log("Dados salvos:", formData);
    alert("Cadastro realizado com sucesso!");
    setFormData({ nome: "", curso: "", estado: "", cidade: "" }); // Reseta o formulário
  };

  return (
    <div className="cadastro-container">
      <div className="titulo">
        <h1>Cadastro de Ingressantes</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder=""
          />
        </label>

        <label>
          Curso
          <select name="curso" value={formData.curso} onChange={handleChange}>
            <option value=""></option>
            <option value="Matemática">Matemática</option>
            <option value="Letras">Letras</option>
            <option value="Geografia">Geografia</option>
          </select>
        </label>

        <label>
          Estado
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value=""></option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Minas Gerais">Minas Gerais</option>
          </select>
        </label>

        <label>
          Cidades
          <select
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            disabled={!cidadesDisponiveis.length}
          >
            <option value=""></option>
            {cidadesDisponiveis.map((cidade, index) => (
              <option key={index} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="error">{error}</p>}

        <div className="buttons">
          <button
            type="button"
            onClick={() =>
              setFormData({ nome: "", curso: "", estado: "", cidade: "" })
            }
            id="voltar"
          >
            Voltar
          </button>
          <button type="submit" id="gravar">
            Gravar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
