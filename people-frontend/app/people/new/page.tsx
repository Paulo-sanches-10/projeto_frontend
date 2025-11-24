"use client";
import PersonForm from "../../../components/PersonForm";

export default function NewPersonPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastrar Pessoa</h1>
      <PersonForm onSuccess={() => window.location.href = "/"} />
    </div>
  );
}