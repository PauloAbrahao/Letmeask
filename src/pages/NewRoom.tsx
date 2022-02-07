import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();

  const navigate = useHistory();

  const [newRoom, setNewRoom] = React.useState("");

  async function handleCreateRoom(event: React.FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit"> Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
