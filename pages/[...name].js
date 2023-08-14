import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Name.module.css";
import { useRouter } from "next/router";
import ConfettiGenerator from "confetti-js";
import messages from "../utils/birthdayWishes.js";
import useTheme from "../hooks/useTheme";
import * as htmlToImage from "html-to-image";
import FileSaver from "file-saver";
import { Button, CopyLinkButton } from "../components";

const Wish = ({ history }) => {
	const router = useRouter();
	const { name } = router.query; // gets both name & color id in form of array [name,colorId]
	const color = name ? name[1] : 0; //extracting colorId from name
	const [downloading, setDownloading] = useState(false);
	const [downloadedOnce, setDownloadedOnce] = useState(false);
	const audioRef = useRef();

	const { setTheme } = useTheme();

	useEffect(() => {
		// Theme Change
		setTheme(color);

		if (downloading === false) {
			// Confetti
			const confettiSettings = {
				target: "canvas",
				start_from_edge: true,
			};
			const confetti = new ConfettiGenerator(confettiSettings);
			confetti.render();
			audioRef.current.play();
		}
	}, [color, downloading]);

	useEffect(() => {
		if (downloading === true && downloadedOnce === false) {
			downloadImage();
		}
	}, [downloading, downloadedOnce]);

	// function for randomly picking the message from messages array
	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	const downloadImage = () => {
		if (downloadedOnce === true) return;

		const node = document.getElementById("image");

		if (node) {
			setDownloadedOnce(true);

			htmlToImage.toPng(node).then((blob) => {
				FileSaver.saveAs(blob, "birthday-wish.png");
				setDownloading(false);
			});
		}
	};

	const title = (name) => {
		const wish = "Feliz Aniversário " + name + "!";
		const base_letters = [];
		const name_letters = [];

		for (let i = 0; i < wish.length; i++) {
			if (i < 17) {
				const letter = wish.charAt(i);
				base_letters.push(
					<span key={i} style={{ "--i": i + 1 }}>
						{letter}
					</span>
				);
			} else {
				const letter = wish.charAt(i);
				name_letters.push(
					<span key={i} style={{ "--i": i + 1 }} className={styles.span}>
						{letter}
					</span>
				);
			}
		}

		return (
			<>
				{downloading ? (
					<h1
						className={styles.titleImg}
						style={{ "--wish-length": wish.length }}
					>
						<div>{base_letters.map((letter) => letter)}</div>
						<div>{name_letters.map((letter) => letter)}</div>
					</h1>
				) : (
					<h1 className={styles.title} style={{ "--wish-length": wish.length }}>
						<div>{base_letters.map((letter) => letter)}</div>
						<div>{name_letters.map((letter) => letter)}</div>
					</h1>
				)}
			</>
		);
	};

	if (downloading) {
		return (
			<div className={styles.containerImg} id="image" onClick={downloadImage}>
				{downloadImage()}
				<main className={styles.image}>
					<div>
						<div className={styles.main}>{title(name && name[0])}</div>

						<div style={{ height: 40 }} />

						<p className={styles.descImg}>
							{messages[randomNumber(0, messages.length)].value}
						</p>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Feliz Aniversário {name && name[0]}</title>
				<meta
					name="description"
					content={`Desejo-lhe Feliz Aniversário!`}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<canvas className={styles.canvas} id="canvas"></canvas>

			<main className={styles.animate}>
				<div>
					<div className={styles.main}>{title(name && name[0])}</div>
					<p className={styles.desc}>
						{messages[randomNumber(0, messages.length)].value}
					</p>
				</div>
				<div className={styles.card}>
					<img src="/_Andre.png" height="121" width="121" />
					<div>
						<p>Parabéns, muitas felicidades, saúde e sucesso! 🎉🎂</p>
						<p>Que seu novo ciclo seja repleto de desafios que te façam crescer cada vez mais, nos surpreendendo como já vem fazendo, entregando tudo com muita qualidade!</p>
						<p>Aproveite muito o seu dia!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Daniel.png" height="121" width="121" />
					<div>
						<p>🎉 Parabéns, Ernildo! 🎂</p>
						<p>Hoje tudo é possível, por isso sonhe ainda mais alto do que já sonhou e conquiste tudo aquilo que ainda não conquistou.</p>
						<p>Feliz Aniversário!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Dariel.png" height="121" width="121" />
					<div>
						<p>🎉 Parabéns, Ernildo! 🎉</p>
						<p>Hoje é um dia especial, e estamos aqui para celebrar você, o incrível Ernildo! 🥳</p>
						<p>Desejamos a você um dia cheio de alegria, rodeado de amigos, família e muita diversão!</p>
						<p>Que este novo ano de vida seja repleto de conquistas, saúde, amor e sucesso em todas as áreas da sua vida!</p>
						<p>Continue brilhando como sempre e alcançando seus sonhos. Feliz aniversário!</p>
						<p><strong>#PIMTeam</strong></p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Diego.png" height="121" width="121" />
					<div>
						<p>🎉 Feliz Aniversário, Ernildo! 🎂</p>
						<p>O dia do Aniversário é sempre um dia especial, espero que você tenha aproveitado seu dia cheio de alegria, amor e sorrisos!</p>
						<p>Que este novo ano da sua vida seja repleto de conquistas e momentos incríveis.</p>
						<p>Que vc continue sendo esta pessoa leve e descontraida!</p>
						<p>Grande abraço!!!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Ester.png" height="121" width="121" />
					<div>
						<p>Feliz Aniversário Ernildo! </p>
						<p>Desejo muitos anos de vida com muito código e coisas boas pro melhor front-end da Way2 🎈🎉</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Franssa.png" height="121" width="121" />
					<div>
						<p>Feliz Aniversário!</p>
						<p>Aproveita esse novo ciclo, cada vez com mais experiência para cumprir metas e concluir desafios!</p>
						<p>Grande abraço, você é o cara!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Gabriel.png" height="121" width="121" />
					<div>
					<p><b>Parabéns, Ernildo!</b></p>
					<p>Aproveite seu dia mano!</p>
					<p>Desejo um aniversário repleto de alegria, sucesso, realizações e muito código! Que todos os seus sonhos se concretizem e que você continue sendo essa pessoa incrível!</p>
					</div>
				</div>

				<div className={styles.card}>
					<img src="/_Luis.png" height="121" width="121" />
					<div>
						<p>Parabéns Ernildo!</p>
						<p>Muitas felicidades, conquistas e sucessos</p>
						<p>Que sua vida seja cheia de css bem formatados, que as vulnerabilidades que você encontrar pelo caminho sejam fáceis de serem corrigidos e que sua rede não caia (a de internet e a física)</p>
						<p>Aproveite muito seu dia, tmj</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Warley.png" height="121" width="121" />
					<div>
						<p>Feliz Aniversário, Ernildo!</p>
						<p>Como um desenvolvedor front-end talentoso, você traz criatividade e funcionalidade para a web. Hoje é o seu dia especial, e espero que esteja repleto de alegria, realização e código bem organizado! 🎉🎂</p>
						<p>Que o seu próximo ano seja cheio de novos desafios empolgantes, projetos incríveis e muito sucesso no mundo do desenvolvimento front-end. Continue criando interfaces impressionantes e melhorando a experiência online para todos nós!</p>
						<p>Divirta-se muito no seu dia e aproveite cada momento. Parabéns novamente!</p>
					</div>
				</div>
				<div className={styles.buttonContainer}>
					{history[0] == "/" ? <CopyLinkButton /> : ""}

					{history[0] == "/" ? (
						<Button
							onClick={() => {
								setDownloadedOnce(false);
								setDownloading(true);
							}}
							text="Download as Image"
						/>
					) : (
						""
					)}

					{/* <Button
						onClick={() => router.push("/")}
						text="&larr; Create a wish"
					/> */}
				</div>
			</main>
			<audio ref={audioRef} id="player" autoPlay>
				<source src="media/hbd.mp3" />
			</audio>
		</div>
	);
};

export default Wish;
