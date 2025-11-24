"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";
import { calculateAge } from "../../../utils/calculateAge";

export default function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    api.get(`/people/${id}/`).then(res => setPerson(res.data));
  }, [id]);

  if (!person) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detalhes da Pessoa</h1>
      <p>Nome: {person.first_name} {person.last_name}</p>
      <p>CPF: {person.cpf}</p>
      <p>Data de Nascimento: {person.birth_date}</p>
      <p>Idade: {calculateAge(person.birth_date)} anos</p>
    </div>
  );
}