// import React from "react";
import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
// import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
// import { database } from "../services/firebase";
import "../styles/room.scss";
import { database } from "../services/firebase";

import deleteImg from "../assets/delete.svg";
import checkImg from '../assets/check.svg'
import answerImg from '../assets/answer.svg'

type RoomParams = {
  id: string;
};

export const AdminRoom = () => {
  // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Você tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
   }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined
            onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    
                    <button type="button"
                    onClick={() => handleHighLightQuestion(question.id)}>
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}

                <button type="button"
                onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>

              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};
