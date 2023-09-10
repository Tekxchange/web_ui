import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "./CarouselItem";
import { useState } from "react";

export default function PicturePicker() {
  const [pictures, setPictures] = useState<{ file: File; url: string }[]>([]);

  function deletePicture(pic: File) {
    return () => {
      setPictures((pics) => pics.filter((p) => p.file !== pic));
    };
  }

  return (
    <div>
      <Carousel showThumbs={false}>
        {pictures.map((pic) => (
          <CarouselItem imageSrc={pic.url} key={pic.file.name} onDelete={deletePicture(pic.file)} />
        ))}
      </Carousel>

      <input
        type="file"
        multiple
        accept=".png,.jpg,.jpeg"
        onChange={(evt) => {
          const files = evt.target.files;
          if (!files) return;
          for (const file of files) {
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = function () {
              const src = this.result;
              setPictures((pics) => [...pics, { file, url: src as string }]);
            };
          }
        }}
      />
    </div>
  );
}
