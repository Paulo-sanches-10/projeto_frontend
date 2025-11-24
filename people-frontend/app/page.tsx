"use client";

import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";

interface Person {
  id: string;
  name: string;
  birth_date: string;
  cpf: string;
}

export default function Page() {
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const response = await api.get("/people/");
      const results = response.data.results || response.data;
      // 🔹 pega só o último cadastrado
      setPeople(results.slice(-1));
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const formatCPF = (value: string) => {
    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);
    if (value.length > 9) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      return value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      return value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    return value;
  };

  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanCpf = cpf.replace(/\D/g, "");

    if (!name || !birthDate || !cpf) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }
    if (!validateCPF(cleanCpf)) {
      setErrorMessage("CPF inválido.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/people/${editingId}/`, {
          name,
          birth_date: birthDate,
          cpf: cleanCpf,
        });
        setEditingId(null);
      } else {
        await api.post("/people/", {
          name,
          birth_date: birthDate,
          cpf: cleanCpf,
        });
      }
      setName("");
      setBirthDate("");
      setCpf("");
      loadPeople();
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(JSON.stringify(error.response.data));
      } else {
        setErrorMessage("Erro de conexão com o servidor.");
      }
    }
  };

  const handleEdit = (person: Person) => {
    setEditingId(person.id);
    setName(person.name);
    setBirthDate(person.birth_date);
    setCpf(formatCPF(person.cpf));
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/people/${id}/`);
      loadPeople();
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(JSON.stringify(error.response.data));
      } else {
        setErrorMessage("Erro ao excluir registro.");
      }
    }
  };

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <div className="bg-gray-900 min-h-screen text-white">
        <nav className="bg-blue-700 dark:bg-blue-900 text-white p-4 shadow-md fixed w-full top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-bold">👥 Sistema de Pessoas</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black px-3 py-1 rounded"
          >
            {darkMode ? "🌞 Claro" : "🌙 Escuro"}
          </button>
        </nav>

        <div className="pt-20 max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Último Cadastro
          </h2>

          {errorMessage && (
            <div className="bg-red-600 text-white p-2 rounded mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 bg-gray-800 p-4 rounded-md shadow-md mb-6"
          >
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-2 bg-gray-700 text-white placeholder-gray-400"
              required
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              className="border rounded p-2 bg-gray-700 text-white placeholder-gray-400"
              required
            />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border rounded p-2 bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
            >
              {editingId ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </form>

          {people.length === 0 ? (
            <p className="text-center text-gray-400">Nenhum cadastro encontrado</p>
          ) : (
            <ul className="space-y-3">
              {people.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center bg-gray-800 p-3 rounded-md shadow"
                >
                  <div>
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="text-sm text-gray-400">
                      CPF: {formatCPF(p.cpf)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Nascimento: {p.birth_date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}