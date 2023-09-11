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
					content={`Desejamos um Feliz Aniversário!`}
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
						<p>Parabéns Fernando!</p>
						<p>Feliz Aniversário! Felicidades, saúde e sucesso! Aproveite seu dia. Grande abraço!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Pohlmann.jpg" height="121" width="121" />
					<div>
						<p>Parabéns, Fernando!</p>
						<p>Muita saúde, felicidades e sucesso. Que tenha muito mais conquistas e comemorações pela frente. Feliz Aniversário! Abraço. </p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Daniel.png" height="121" width="121" />
					<div>
						<p>🎈 Parabéns Fernando 🎉</p>
						<p>Espero que esta viagem com o time PIM esteja lhe trazendo bons momentos e muitas lembranças felizes.</p>
						<p>Hoje você completa mais um ano de vida e é hora de comemorar com muita alegria. Que seu dia seja repleto de luz e paz. Que as pessoas queridas estejam com você!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Dariel.png" height="121" width="121" />
					<div>
						<p>Parabéns Fernando!!!</p>
						<p>Que a viagem de sua vida seja tão linda quanto a viagem que fez de Kombi. Que consiga alcançar todos os objetivos que se proponha e tenha sucesso nessa jornada cheia de desafios. Muitas felicidades e conte com a gente para o que precisar #tmj.</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Diego.png" height="121" width="121" />
					<div>
						<p>Meus parabéns Fernando.</p>
						<p>Que neste novo ciclo você tenha muitas realizações pessoais e profissionais, lhe desejo tudo de bom a você e sua família. Grande abraço e feliz aniversário.</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_DiegoMartini.jpg" height="121" width="121" />
					<div>
						<p>Parabéns Fernando!</p>
						<p>Não nos conhecemos para que eu possa fazer alguma piada engraçada então fica para ano que vem. Neste, te desejo sucesso e muitos códigos sem erros.</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Ernildo.png" height="121" width="121" />
					<div>
						<p>Parabéns, Fernando!</p>
						<p>Cara, desejo todo sucesso do mundo pra ti, muita saúede e felicidades sempre. Satisfação em poder dividir equipe com um profissional incrível como você. Tmj!</p>
						<p>Forte abraço!</p>
					</div>
				</div>
				<div className={styles.card}>
					<img src="/_Jaicon.png" height="121" width="121" />
					<div>
						<p>Parabéns Fernado!!!</p>
						<p>Que suas jornadas sejam sempre repletas de conquistas e de sucessos!!! Muito bom tê-lo como colega do time. Forte Abraço.</p>
					</div>
				</div>
				{/* <div className={styles.card}>
					<img src="/_Luis.png" height="121" width="121" />
					<div>
						<p>Parabéns Ernildo!</p>
						<p>Muitas felicidades, conquistas e sucessos</p>
						<p>Que sua vida seja cheia de css bem formatados, que as vulnerabilidades que você encontrar pelo caminho sejam fáceis de serem corrigidos e que sua rede não caia (a de internet e a física)</p>
						<p>Aproveite muito seu dia, tmj</p>
					</div>
				</div> */}
				<div className={styles.card}>
					<img src="/_Warley.png" height="121" width="121" />
					<div>
						<p>Feliz aniversário Fernando!! 🎉🚐 </p>
						<p>Suas habilidades de codificação são tão impressionantes quanto sua jornada pelas belas paisagens do Brasil. Que seu aniversário seja uma mistura de código livre de bugs e novas rotas emocionantes para explorar.</p>
						<p>Um brinde, mais linhas de código e mais quilômetros na estrada! Desejo a você um ano repleto de projetos de sucesso e viagens inesquecíveis. Aproveite seu dia especial e que sua vida esteja sempre repleta de felicidade e aventura! 🎂🌄🚀</p>
					</div>
				</div>
				<h2>Presente especial do PIM para suas proximas viagens.</h2>
				<img src="/komPIM.png" width="30%"></img>
				
				<div className={styles.buttonContainer}>
					{/* {history[0] == "/" ? <CopyLinkButton /> : ""}

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
					)} */}

					{/* <Button
						onClick={() => router.push("/")}
						text="&larr; Create a wish"
					/> */}
				</div>
			</main>
			<audio ref={audioRef} id="player" autoPlay loop>
				<source src="/media/hbd.mp3" />
			</audio>
		</div>
	);
};

export default Wish;
