import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";

const App = () => {
  const [sintomas, setSintomas] = useState([]);
  const [diagnostico, setDiagnostico] = useState(null);
  const [query, setQuery] = useState(""); // Estado para a barra de pesquisa

  const listaSintomas = [
    "Febre", "Tosse", "Dor de garganta", "Fadiga", "Dor de cabeça", "Falta de ar", "Dor no peito", "Náusea", "Vômito", 
    "Dor abdominal", "Dor no estômago", "Pressão no rosto", "Coriza", "Espirros", "Perda de peso inexplicável", "Dores no corpo",
    "Produção de muco", "Dificuldade para engolir", "Necessidade frequente de urinar", "Chiado ao respirar", "Inchaço nas amígdalas",
    "Falta de apetite", "Sensibilidade à luz ou som", "Dor ao urinar", "Diarreia", "Perda de paladar ou olfato", "Visão embaçada", 
    "Tontura", "Enxaqueca"
  ];

  // Normalizar sintomas para envio ao backend
  const normalizeSintomas = (sintomas) =>
    sintomas.map((sintoma) =>
      sintoma
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

  const handleCheck = (sintoma) => {
    setSintomas((prev) =>
      prev.includes(sintoma)
        ? prev.filter((item) => item !== sintoma)
        : [...prev, sintoma]
    );
  };

  const handleSubmit = async () => {
    try {
      const normalizedSintomas = normalizeSintomas(sintomas);
      const response = await fetch("http://127.0.0.1:5000/diagnosticar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sintomas: normalizedSintomas }),
      });

      const data = await response.json();
      setDiagnostico(data.diagnostico || "Nenhum diagnóstico encontrado.");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setDiagnostico("Erro ao consultar diagnóstico.");
    }
  };

  const filteredSintomas = listaSintomas.filter((sintoma) =>
    sintoma.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.header}
      >
        <FaStethoscope style={styles.icon} />
        <h1 style={styles.title}>Diagnóstico Médico</h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={styles.description}
      >
        Selecione os sintomas abaixo e clique em "Diagnosticar".
      </motion.p>
      <motion.input
        whileFocus={{ scale: 1.05 }}
        type="text"
        placeholder="Pesquisar sintomas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.searchBar}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={styles.checkboxContainer}
      >
        {filteredSintomas.map((sintoma, index) => (
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={index}
            style={styles.checkboxLabel}
          >
            <input
              type="checkbox"
              checked={sintomas.includes(sintoma)}
              onChange={() => handleCheck(sintoma)}
              style={styles.checkbox}
            />
            {sintoma}
          </motion.label>
        ))}
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        style={styles.button}
      >
        Diagnosticar
      </motion.button>
      {diagnostico && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={styles.result}
        >
          <h2>Diagnóstico:</h2>
          <p>{diagnostico}</p>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #74b9ff, #a29bfe)",
    color: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "2rem",
    color: "#dff9fb",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  searchBar: {
    padding: "10px",
    width: "80%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  checkboxContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    background: "#dfe6e9",
    color: "#2d3436",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  checkbox: {
    marginRight: "10px",
  },
  button: {
    background: "#00cec9",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "background 0.3s",
  },
  result: {
    marginTop: "20px",
    padding: "15px",
    background: "#55efc4",
    borderRadius: "8px",
    color: "#2d3436",
  },
};

export default App;
