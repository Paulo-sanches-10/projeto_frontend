"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../../services/api";
import PersonForm from "../../../../components/PersonForm";

export default function EditPersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    api.get(`/people/${id}/`).then(res => setPerson(res.data));
  }, [id]);

  if (!person) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editar Pessoa</h1>
      <PersonForm initialData={person} onSuccess={() => window.location.href = "/"} />
    </div>
  );
}