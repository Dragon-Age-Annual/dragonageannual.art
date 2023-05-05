import Masonry from "react-masonry-css";
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type ListItem = {
  id: number;
  year: string;
  cover: string;
  alt: string;
  title: string;
  theme: string;
  charity: string;
  url: string;
  donation: string;
};

let items: ListItem[] = [
  {
    id: 1,
    year: "2022",
    cover: "/img/past/2022.png",
    alt: "The cover for the 2022 Dragon Age Annual. It features the silhouette of a dragon made up of patchwork textures. The top part is a fleur dis lis pattern fading from blue to black, while the bottom has a teal section featuring the Inquisition logo, a red section featuring the Kirkwall logo, and a blue section featuring the Grey Wardens logo. The background is a green color reminiscent of the Fade. Above the background and behind the dragons head sits a golden circle. On the main body of the dragon is gold lettering which says 'Dragon Age Annual 2022: An Age of Friendship'.",
    title: "An Age of Friendship",
    theme: "Friendship",
    charity: "CoolEarth",
    url: "https://www.coolearth.org/",
    donation: "£1,650 / $2,230",
  },
  {
    id: 2,
    year: "2023",
    cover: "/img/past/2023.png",
    alt: "The cover for the 2023 Dragon AGe Annual. The background is a greenish hued landscape, featuring an ethereal ghostly griffin. Behind the griffin in silhouette are floating nugs. On the right side, overlaying the background is a golden cutout of shrubs and branches featuring a halla who's horns blend into the branches above. In front of the halla in black text is 'Dragon Age Annual 2023' and beneath that in green text is 'Paws & Pauldrons'.",
    title: "Paws & Pauldrons",
    theme: "Companions and Animals",
    charity: "FourPaws",
    url: "https://www.four-paws.org/",
    donation: "£4,193 / $5,175",
  },
];

let past = items.map(function (item) {
  return (
    <div className="card-demo">
      <div className="card">
        <div className="card__image">
          <img src={item.cover} alt={item.alt} />
        </div>
        <div className="card__body">
          <p>
            <strong>Title:</strong> {item.title}
          </p>
          <p>
            <strong>Theme:</strong> {item.theme}
          </p>
          <p>
            <strong>Charity:</strong> <a href={item.url}>{item.charity}</a>
          </p>
          <p>
            <strong>Donation Amount:</strong> {item.donation}
          </p>
        </div>
      </div>
    </div>
  );
});

const breakpointColumnsObj = {
  default: 4,
  1950: 3,
  1520: 2,
  1010: 1,
};

export default function Past(): JSX.Element {
  return (
    <div className={styles.Past}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {past}
      </Masonry>
    </div>
  );
}
