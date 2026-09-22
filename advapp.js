import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

/* ============================================================
   1) CONFIGURACIÓN
   ============================================================ */

const firebaseConfig = {
  apiKey: "REEMPLAZAR_API_KEY",
  authDomain: "REEMPLAZAR_AUTH_DOMAIN",
  projectId: "REEMPLAZAR_PROJECT_ID",
  storageBucket: "REEMPLAZAR_STORAGE_BUCKET",
  messagingSenderId: "REEMPLAZAR_MESSAGING_SENDER_ID",
  appId: "REEMPLAZAR_APP_ID"
};

// null = usa automáticamente el día real entre el 1 y el 31 de octubre.
// Para pruebas puedes poner, por ejemplo: const DEMO_DAY = 15;
const DEMO_DAY = 31;

// ============================================================
// DATOS DE LAS 31 PELÍCULAS
// ============================================================

const movies = [
  {
    day: 1,
    title: "Película del día 01",
    year: "",
    poster: "./assets/posters/day-01.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 2,
    title: "Película del día 02",
    year: "",
    poster: "./assets/posters/day-02.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 3,
    title: "Película del día 03",
    year: "",
    poster: "./assets/posters/day-03.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 4,
    title: "Película del día 04",
    year: "",
    poster: "./assets/posters/day-04.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 5,
    title: "Película del día 05",
    year: "",
    poster: "./assets/posters/day-05.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 6,
    title: "Película del día 06",
    year: "",
    poster: "./assets/posters/day-06.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 7,
    title: "Película del día 07",
    year: "",
    poster: "./assets/posters/day-07.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 8,
    title: "Película del día 08",
    year: "",
    poster: "./assets/posters/day-08.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 9,
    title: "Película del día 09",
    year: "",
    poster: "./assets/posters/day-09.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 10,
    title: "Película del día 10",
    year: "",
    poster: "./assets/posters/day-10.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 11,
    title: "Película del día 11",
    year: "",
    poster: "./assets/posters/day-11.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 12,
    title: "Película del día 12",
    year: "",
    poster: "./assets/posters/day-12.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 13,
    title: "Película del día 13",
    year: "",
    poster: "./assets/posters/day-13.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 14,
    title: "Película del día 14",
    year: "",
    poster: "./assets/posters/day-14.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 15,
    title: "Película del día 15",
    year: "",
    poster: "./assets/posters/day-15.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 16,
    title: "Película del día 16",
    year: "",
    poster: "./assets/posters/day-16.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 17,
    title: "Película del día 17",
    year: "",
    poster: "./assets/posters/day-17.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 18,
    title: "Película del día 18",
    year: "",
    poster: "./assets/posters/day-18.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 19,
    title: "Película del día 19",
    year: "",
    poster: "./assets/posters/day-19.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 20,
    title: "Película del día 20",
    year: "",
    poster: "./assets/posters/day-20.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 21,
    title: "Película del día 21",
    year: "",
    poster: "./assets/posters/day-21.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 22,
    title: "Película del día 22",
    year: "",
    poster: "./assets/posters/day-22.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 23,
    title: "Película del día 23",
    year: "",
    poster: "./assets/posters/day-23.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 24,
    title: "Película del día 24",
    year: "",
    poster: "./assets/posters/day-24.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 25,
    title: "Película del día 25",
    year: "",
    poster: "./assets/posters/day-25.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 26,
    title: "Película del día 26",
    year: "",
    poster: "./assets/posters/day-26.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 27,
    title: "Película del día 27",
    year: "",
    poster: "./assets/posters/day-27.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 28,
    title: "Película del día 28",
    year: "",
    poster: "./assets/posters/day-28.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 29,
    title: "Película del día 29",
    year: "",
    poster: "./assets/posters/day-29.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 30,
    title: "Película del día 30",
    year: "",
    poster: "./assets/posters/day-30.svg",
    driveFileId: "",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  },
  {
    day: 31,
    title: "abcedario",
    year: "Coso",
    poster: "https://howlongtobeat.com/games/57052_Albion_Online.jpeg",
    driveFileId: "https://drive.google.com/file/d/1t4l76tbXr29uO_GzYm7bQcBhfXixWbUZ/view",
    cast: ["Actor / Actriz", "Actor / Actriz"],
    synopsis: "Añade aquí la sinopsis de la película."
  }
];

/* ============================================================
   2) FIREBASE
   ============================================================ */

const firebaseConfigured = !Object.values(firebaseConfig).some(
  value => String(value).startsWith("REEMPLAZAR_")
);

let auth = null;
let db = null;
let currentUser = null;

let ratings = new Map();
let currentMovie = null;
let selectedRating = 0;

if (firebaseConfigured) {
  const app = initializeApp(firebaseConfig);

  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn(
    "Firebase aún no está configurado. Completa firebaseConfig en app.js."
  );
}

/* ============================================================
   3) DOM
   ============================================================ */

const movieGrid = document.querySelector("#movieGrid");
const featuredMovie = document.querySelector("#featuredMovie");
const closedCalendar = document.querySelector("#closedCalendar");
const calendarStatus = document.querySelector("#calendarStatus");

const authButton = document.querySelector("#authButton");
const userName = document.querySelector("#userName");
const userAvatar = document.querySelector("#userAvatar");

const modal = document.querySelector("#movieModal");
const closeModalButton = document.querySelector("#closeModal");

const modalTitle = document.querySelector("#modalTitle");
const modalHeadingDay = document.querySelector("#modalHeadingDay");
const modalYear = document.querySelector("#modalYear");

const modalCast = document.querySelector("#modalCast");
const modalSynopsis = document.querySelector("#modalSynopsis");

const movieFrame = document.querySelector("#movieFrame");
const videoPlaceholder = document.querySelector("#videoPlaceholder");

const ratingValue = document.querySelector("#ratingValue");
const ratingHint = document.querySelector("#ratingHint");

const saveRating = document.querySelector("#saveRating");
const saveMessage = document.querySelector("#saveMessage");

const ratingDown = document.querySelector("#ratingDown");
const ratingUp = document.querySelector("#ratingUp");

const randomButton = document.querySelector("#randomButton");
const watchPartyButton = document.querySelector("#watchPartyButton");

const toast = document.querySelector("#toast");

/* ============================================================
   4) FECHA / DÍA ACTUAL
   ============================================================ */

function getCurrentDay() {
  if (Number.isInteger(DEMO_DAY)) {
    return Math.max(0, Math.min(31, DEMO_DAY));
  }

  const now = new Date();

  if (now.getMonth() !== 9) {
    return 0;
  }

  return Math.max(1, Math.min(31, now.getDate()));
}

/* ============================================================
   5) UTILIDADES
   ============================================================ */

function getMovie(day) {
  return movies.find(movie => movie.day === day);
}

function posterFallback(title) {
  const safeTitle = String(title)
    .replace(/[&<>"']/g, "")
    .substring(0, 24);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="500"
         height="750"
         viewBox="0 0 500 750">
      <rect width="500" height="750" fill="#09060d"/>
      <rect x="20" y="20" width="460" height="710"
            rx="22"
            fill="#160b19"
            stroke="#ff7417"
            stroke-width="5"/>
      <text x="250"
            y="325"
            text-anchor="middle"
            fill="#ff8b32"
            font-family="Arial"
            font-size="34"
            font-weight="bold">
        HALLOWEEN
      </text>
      <text x="250"
            y="385"
            text-anchor="middle"
            fill="#ffffff"
            font-family="Arial"
            font-size="22">
        ${safeTitle}
      </text>
      <text x="250"
            y="680"
            text-anchor="middle"
            fill="#888"
            font-family="Arial"
            font-size="18">
        🎃
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

/* ============================================================
   6) POSICIONES DEL PERÍMETRO
   ============================================================ */

/*
   Grid de 11 columnas x 10 filas.

   ARRIBA:
   6 tarjetas

   IZQUIERDA:
   9 tarjetas

   DERECHA:
   9 tarjetas

   ABAJO:
   7 tarjetas
*/

function getGridPosition(day) {

  // Días 1 - 6
  if (day <= 6) {
    return {
      gridColumn: `${day + 2}`,
      gridRow: "1"
    };
  }

  // Días 7 - 15
  if (day <= 15) {
    return {
      gridColumn: "1",
      gridRow: `${day - 5}`
    };
  }

  // Días 16 - 24
  if (day <= 24) {
    return {
      gridColumn: "11",
      gridRow: `${day - 14}`
    };
  }

  // Días 25 - 31
  return {
    gridColumn: `${day - 22}`,
    gridRow: "10"
  };
}

/* ============================================================
   7) RENDER DEL CALENDARIO
   ============================================================ */

function renderCalendar() {

  const currentDay = getCurrentDay();

  movieGrid.innerHTML = "";

  /*
     Fuera de octubre:
     no hay película disponible todavía.
  */

  if (currentDay === 0) {

    featuredMovie.classList.add("hidden");
    closedCalendar.classList.remove("hidden");

    calendarStatus.textContent =
      "La temporada comienza el 1 de octubre.";

  } else {

    featuredMovie.classList.remove("hidden");
    closedCalendar.classList.add("hidden");

    calendarStatus.textContent =
      `Hoy es el día ${currentDay}. La película del día está en el centro.`;

    renderFeatured(currentDay);
  }

  /*
     Crear las 31 tarjetas
  */

  movies.forEach(movie => {

    const card = document.createElement("article");

    card.className = "movie-card";
    card.dataset.day = movie.day;

    const position = getGridPosition(movie.day);

    Object.assign(card.style, position);

    /*
       Estado de la tarjeta
    */

    let state;

    if (currentDay === 0) {
      state = "locked";
    }
    else if (movie.day < currentDay) {
      state = "past";
    }
    else if (movie.day === currentDay) {
      state = "today";
    }
    else {
      state = "locked";
    }

    card.classList.add(state);

    /*
       Imagen
    */

    const img = document.createElement("img");

    img.src = movie.poster;

    img.alt =
      `Día ${movie.day}: ${movie.title}`;

    img.onerror = () => {
      img.src = posterFallback(movie.title);
    };

    /*
       Información
    */

    card.innerHTML = `
      <span class="day-number">
        ${String(movie.day).padStart(2, "0")}
      </span>

      <span class="card-title">
        ${escapeHtml(movie.title)}
      </span>
    `;

    card.prepend(img);

    /*
       Promedio comunitario
    */

    if (
      movie.day < currentDay &&
      ratings.has(movie.day)
    ) {

      const average = averageForDay(movie.day);

      if (average !== null) {

        const badge = document.createElement("span");

        badge.className = "avg-badge";

        badge.textContent =
          `🎃 ${average.toFixed(1)}`;

        card.appendChild(badge);
      }
    }

    /*
       Solo se pueden abrir películas
       que ya estén disponibles.
    */

    if (movie.day <= currentDay && currentDay > 0) {

      card.addEventListener(
        "click",
        () => openMovie(movie)
      );

      card.title =
        "Ver información y votar";

      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.addEventListener("keydown", event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openMovie(movie);
        }
      });

    } else {

      card.title =
        "Esta película todavía está bloqueada";
    }

    movieGrid.appendChild(card);
  });
}

/* ============================================================
   8) PELÍCULA DESTACADA
   ============================================================ */

function renderFeatured(day) {

  const movie = getMovie(day);

  if (!movie) {
    return;
  }

  const poster =
    document.querySelector("#featuredPoster");

  const featuredDay =
    document.querySelector("#featuredDay");

  const featuredTitle =
    document.querySelector("#featuredTitle");

  const featuredDate =
    document.querySelector("#featuredDate");

  poster.src = movie.poster;

  poster.onerror = event => {

    event.currentTarget.src =
      posterFallback(movie.title);
  };

  featuredDay.textContent =
    `DÍA ${movie.day}`;

  featuredTitle.textContent =
    movie.title;

  featuredDate.textContent =
    movie.year
      ? `${movie.year}`
      : "";

  featuredMovie.onclick =
    () => openMovie(movie);

  featuredMovie.onkeydown =
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openMovie(movie);
      }
    };
}

/* ============================================================
   9) MODAL
   ============================================================ */

function openMovie(movie) {

  const currentDay = getCurrentDay();

  /*
     No abrir películas futuras
  */

  if (
    currentDay === 0 ||
    movie.day > currentDay
  ) {

    showToast(
      "Esta película todavía no está disponible."
    );

    return;
  }

  currentMovie = movie;

  /*
     Cargar puntuación personal
  */

  selectedRating =
    getUserRating(movie.day) ?? 0;

  /*
     Información
  */

  modalTitle.textContent =
    movie.title;

  modalHeadingDay.textContent =
    `DÍA ${movie.day}:`;

  modalYear.textContent =
    movie.year || "";

  modalSynopsis.textContent =
    movie.synopsis ||
    "No hay sinopsis configurada.";

  /*
     Reparto
  */

  modalCast.innerHTML = "";

  (movie.cast || []).forEach(actor => {

    const li =
      document.createElement("li");

    li.textContent = actor;

    modalCast.appendChild(li);
  });

  /*
     Google Drive
  */

  if (movie.driveFileId) {

    movieFrame.src =
      `https://drive.google.com/file/d/${encodeURIComponent(
        movie.driveFileId
      )}/preview`;

    movieFrame.classList.remove("hidden");

    videoPlaceholder.classList.add("hidden");

  } else {

    movieFrame.src = "";

    movieFrame.classList.add("hidden");

    videoPlaceholder.classList.remove("hidden");
  }

  /*
     Puntuación
  */

  renderRating();

  /*
     Mostrar modal
  */

  modal.classList.remove("hidden");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";
}

/* ============================================================
   10) CERRAR MODAL
   ============================================================ */

function closeModal() {

  movieFrame.src = "";

  modal.classList.add("hidden");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

  currentMovie = null;
}

if (closeModalButton) {

  closeModalButton.addEventListener(
    "click",
    closeModal
  );
}

const modalBackground =
  document.querySelector("[data-close-modal]");

if (modalBackground) {

  modalBackground.addEventListener(
    "click",
    closeModal
  );
}

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      !modal.classList.contains("hidden")
    ) {

      closeModal();
    }
  }
);

/* ============================================================
   11) PUNTUACIONES
   ============================================================ */

function renderRating() {

  ratingValue.textContent =
    selectedRating
      ? selectedRating.toFixed(1)
      : "—";

  if (currentUser) {

    ratingHint.textContent =
      "Usa las flechas para cambiar en pasos de 0.5.";

  } else {

    ratingHint.textContent =
      "Inicia sesión para votar.";
  }

  saveRating.disabled =
    !currentUser ||
    !currentMovie ||
    selectedRating < 1;

  ratingDown.disabled =
    !currentUser ||
    selectedRating <= 1;

  ratingUp.disabled =
    !currentUser ||
    selectedRating >= 10;
}

/*
   Cambiar puntuación
*/

function changeRating(delta) {

  if (!currentUser) {

    showToast(
      "Inicia sesión con Google para votar."
    );

    return;
  }

  /*
     Si todavía no existe una puntuación,
     el primer incremento comienza en 1.
  */

  if (!selectedRating) {

    selectedRating =
      delta > 0
        ? 1
        : 1;

  } else {

    selectedRating += delta;
  }

  /*
     Mantener entre 1 y 10
  */

  selectedRating =
    Math.max(
      1,
      Math.min(
        10,
        selectedRating
      )
    );

  /*
     Asegurar incrementos de 0.5
  */

  selectedRating =
    Math.round(
      selectedRating * 2
    ) / 2;

  renderRating();
}

ratingDown.addEventListener(
  "click",
  () => changeRating(-0.5)
);

ratingUp.addEventListener(
  "click",
  () => changeRating(0.5)
);

/* ============================================================
   12) MODO ALEATORIO
   ============================================================ */

randomButton.addEventListener(
  "click",
  () => {

    const currentDay =
      getCurrentDay();

    const available =
      movies.filter(
        movie =>
          currentDay > 0 &&
          movie.day <= currentDay
      );

    if (!available.length) {

      showToast(
        "No hay películas disponibles todavía."
      );

      return;
    }

    const randomMovie =
      available[
        Math.floor(
          Math.random() *
          available.length
        )
      ];

    openMovie(randomMovie);
  }
);

/* ============================================================
   13) WATCH PARTY
   ============================================================ */

watchPartyButton.addEventListener(
  "click",
  () => {

    showToast(
      "Watch Party: la coordinación se realizará externamente por Discord."
    );
  }
);

/* ============================================================
   14) GUARDAR PUNTUACIÓN
   ============================================================ */

saveRating.addEventListener(
  "click",
  async () => {

    if (!currentUser) {

      showToast(
        "Inicia sesión con Google para guardar tu puntuación."
      );

      return;
    }

    if (
      !currentMovie ||
      selectedRating < 1
    ) {

      return;
    }

    const day =
      currentMovie.day;

    /*
       Un documento por usuario y película.

       Ejemplo:
       ratings/31_IDDELUSUARIO
    */

    const ratingId =
      `${day}_${currentUser.uid}`;

    try {

      saveRating.disabled = true;

      saveMessage.textContent =
        "Guardando…";

      await setDoc(
        doc(
          db,
          "ratings",
          ratingId
        ),
        {
          day,
          uid: currentUser.uid,
          rating: selectedRating,
          updatedAt: serverTimestamp()
        },
        {
          merge: true
        }
      );

      saveMessage.textContent =
        "Guardado ✓";

      showToast(
        "Tu puntuación se guardó correctamente."
      );

    } catch (error) {

      console.error(
        "Error guardando puntuación:",
        error
      );

      saveMessage.textContent =
        "";

      showToast(
        "No se pudo guardar la puntuación."
      );

    } finally {

      renderRating();
    }
  }
);

/* ============================================================
   15) OBTENER PUNTUACIÓN DEL USUARIO
   ============================================================ */

function getUserRating(day) {

  if (!currentUser) {
    return null;
  }

  const rating =
    ratings.get(
      `${day}_${currentUser.uid}`
    );

  return rating?.rating ?? null;
}

/* ============================================================
   16) PROMEDIO GLOBAL
   ============================================================ */

function averageForDay(day) {

  const values =
    [...ratings.values()]
      .filter(
        item =>
          item.day === day &&
          Number.isFinite(item.rating)
      )
      .map(
        item =>
          Number(item.rating)
      );

  if (!values.length) {
    return null;
  }

  const total =
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  return total / values.length;
}

/* ============================================================
   17) AUTENTICACIÓN GOOGLE
   ============================================================ */

authButton.addEventListener(
  "click",
  async () => {

    if (!firebaseConfigured) {

      showToast(
        "Primero configura Firebase en app.js."
      );

      return;
    }

    try {

      /*
         Si ya está conectado,
         cerrar sesión.
      */

      if (currentUser) {

        await signOut(auth);

      } else {

        /*
           Login mediante Google
        */

        const provider =
          new GoogleAuthProvider();

        await signInWithPopup(
          auth,
          provider
        );
      }

    } catch (error) {

      console.error(
        "Error de autenticación:",
        error
      );

      /*
         No mostrar error si el usuario
         simplemente cerró el popup.
      */

      if (
        error.code !==
        "auth/popup-closed-by-user"
      ) {

        showToast(
          "No se pudo completar el inicio de sesión."
        );
      }
    }
  }
);

/* ============================================================
   18) ESTADO DEL USUARIO
   ============================================================ */

if (auth) {

  onAuthStateChanged(
    auth,
    user => {

      currentUser = user;

      if (user) {

        authButton.textContent =
          "Cerrar sesión";

        userName.textContent =
          user.displayName ||
          user.email ||
          "";

        if (user.photoURL) {

          userAvatar.src =
            user.photoURL;

          userAvatar.classList.remove(
            "hidden"
          );
        }

      } else {

        authButton.textContent =
          "Iniciar sesión";

        userName.textContent =
          "";

        userAvatar.classList.add(
          "hidden"
        );
      }

      /*
         Si el modal está abierto,
         actualizar la puntuación.
      */

      if (currentMovie) {

        selectedRating =
          getUserRating(
            currentMovie.day
          ) ?? 0;

        renderRating();
      }
    }
  );
}

/* ============================================================
   19) FIRESTORE EN TIEMPO REAL
   ============================================================ */

if (db) {

  onSnapshot(
    collection(db, "ratings"),

    snapshot => {

      ratings = new Map();

      snapshot.forEach(
        docSnap => {

          const data =
            docSnap.data();

          /*
             Validación básica
          */

          if (
            Number.isInteger(data.day) &&
            data.day >= 1 &&
            data.day <= 31 &&
            Number.isFinite(data.rating)
          ) {

            ratings.set(
              docSnap.id,
              data
            );
          }
        }
      );

      /*
         Actualizar tarjetas
         con promedios.
      */

      renderCalendar();

      /*
         Actualizar puntuación
         personal si el modal está abierto.
      */

      if (currentMovie) {

        selectedRating =
          getUserRating(
            currentMovie.day
          ) ?? 0;

        renderRating();
      }
    },

    error => {

      console.error(
        "Firestore listener:",
        error
      );

      showToast(
        "No se pudieron cargar las puntuaciones comunitarias."
      );
    }
  );
}

/* ============================================================
   20) NOTIFICACIONES
   ============================================================ */

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      2800
    );
}

/* ============================================================
   21) INICIALIZACIÓN
   ============================================================ */

renderCalendar();

renderRating();
