import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import "./home.css"

const socket = io("http://localhost:4000", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd",
    },
});

const Home = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [showModalNewGame, setShowModalNewGame] = useState(false);
    const [isnewgame, setisnewgame] = useState(false);
    const [codigo, setCodigo] = React.useState("");
    const [showTitle, setShowTitle] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = React.useState(["X", "X", "X", "O", "", "O", "O", "", ""])
    const [entrou, setEntrou] = useState("");

    function handleAbrirModal() {
        setMostrarModal(true);
    }

    function handleisnewgame() {
        setisnewgame(!isnewgame);
        setCodigo(Math.floor(Math.random() * 900000) + 100000)
        setShowModalNewGame(true)
    }

    function copyText(value) {
        navigator.clipboard.writeText(value);
        setShowTitle(!showTitle);
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function endGame() {
        setisnewgame(false)
        setShowTitle(false)
        setCodigo("")
    }

    function enterGame() {
        setisnewgame(true)
        setMostrarModal(false)
        socket.emit("EnterGame", { codigo: inputValue });
    }

    useEffect(() => {
        socket.on("EnterGame", (data) => {
            if (codigo === data.codigo)
                setEntrou(data.codigo)
        });
    }, []);

    return (
        <>
            olha aí: {entrou}
            <div>
                {mostrarModal && (
                    <div className="modal">

                        <div className="modal-fundo" onClick={() => setMostrarModal(false)} />
                        <div className="modal-corpo">
                            <h2>Digite o código</h2>
                            <input type="text" placeholder="Digite aqui" value={inputValue} onChange={handleInputChange} />
                            <br />
                            <button className="enterGame" onClick={() => enterGame()}>Entrar</button>
                            <button className="newGame" onClick={() => setMostrarModal(false)}>Fechar</button>
                        </div>
                    </div>
                )}

                {showModalNewGame && (
                    <div className="modal">

                        <div className="modal-fundo" onClick={() => setShowModalNewGame(false)} />
                        <div className="modal-corpo">
                            <h2>Compartilhe o código do seu jogo: </h2>
                            <div className="copy-container">
                                <span>{codigo}</span>
                                <span className="copy" title="Copiar" onClick={() => copyText(codigo)}><FontAwesomeIcon color="#0d6efd" icon={faCopy} /></span>
                            </div>
                            {showTitle && <p class="codCopied">Copiado para área de transferência</p>}
                            <button className="newGame" onClick={() => setShowModalNewGame(false)}>Fechar</button>
                        </div>
                    </div>
                )}
            </div>

            <h1 className="title" >Jogo da Velha</h1>
            <div>
                <button className="enterGame" onClick={handleAbrirModal}><FontAwesomeIcon icon={faRightToBracket} /> Entrar com código</button>
                {!isnewgame ?
                    <button className="newGame" onClick={handleisnewgame}><FontAwesomeIcon icon={faCirclePlus} /> Criar Jogo</button>
                    :
                    <button className="endGame" onClick={endGame}><FontAwesomeIcon icon={faXmark} /> Encerrar Jogo</button>
                }
            </div>

            {
                isnewgame && (
                    <>
                        <div class="board">
                            <div class="row">
                                <div class="square" id="0">{values[0]}</div>
                                <div class="square square_middle" id="1">{values[1]}</div>
                                <div class="square" id="2">{values[2]}</div>
                            </div>
                            <div class="row row_middle">
                                <div class="square" id="3">{values[3]}</div>
                                <div class="square square_middle" id="4">{values[4]}</div>
                                <div class="square" id="5">{values[5]}</div>
                            </div>
                            <div class="row">
                                <div class="square" id="6">{values[6]}</div>
                                <div class="square square_middle" id="7">{values[7]}</div>
                                <div class="square" id="8">{values[8]}</div>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    );
};

export default Home;