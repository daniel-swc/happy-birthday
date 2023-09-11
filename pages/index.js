import Head from "next/head";
import styles from "../styles/Home.module.css";
import Router from "next/router";
import useTheme from "../hooks/useTheme";
import { useState } from "react";
import { Button } from "../components";

export default function Home() {
  const { themes, setTheme, currentTheme } = useTheme();
  const [value, setValue] = useState("Fernando");

  const handleInput = (e) => {
    e.preventDefault();
    const id = currentTheme.id;

    if (!value || value[0] === " ") {
      alert("Por favor informe seu nome");
      return;
    }
    if (id == 0) Router.push(value);
    // If the theme is default blue then push to '/{name}'
    else Router.push(`/${value}/${id}`); // If the theme is not default then will push to '/{name}?color={id}
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Feliz aniversário</title>
        <meta name="description" content="APIMcativo para gerar mensagens de aniversário :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Escolha seu destino
          </h1>
        </div>
        {/* Theme Color  */}

        <div className={styles.themeWrapper}>
          <form
            className={styles.theme}
            id="theme-input"
            onChange={(e) => setTheme(e.target.id)}
          >
            {themes.map((item) => (
              <div className={styles.destination} key={item.label}> 
                <input
                  key={item.id}
                  type="radio"
                  className={item.name}
                  id={item.id}
                  name="theme"
                  value={item.color}
                  defaultChecked={currentTheme.id === item.id}
                />
                <label htmlFor={item.id}>{item.label}</label>
              </div>
            ))}
          </form>
        </div>

        <div>
          <form className={styles.form} onSubmit={handleInput}>
            <input
              id="input"
              name="go"
              className={styles.input}
              placeholder="Informe seu nome"
              value="Fernando"
              readOnly={true}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button className={styles.button} type="submit" text="Bora!" />
          </form>
          {/* <p className={styles.desc}>
            Crafted by{" "}
            <a
              className={styles.span}
              href="https://github.com/gouravkhunger"
              target="_blank"
              rel="noreferrer"
            >
              Gourav
            </a>
            .
          </p>
          <p className={styles.desc}>
            Thanks to all the{" "}
            <a
              className={styles.span}
              href="https://github.com/gouravkhunger/nextjs-birthday-wish/graphs/contributors"
              target="_blank"
              rel="noreferrer"
            >
              contributors
            </a>
            !
          </p> */}
        </div>
      </main>
    </div>
  );
}
