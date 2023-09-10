import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "./CarouselItem";
import { useEffect, useState } from "react";
import Input from "@components/Input";
import { useIsFirstRender } from "usehooks-ts";

type Props = {
  onChange?: (files: File[]) => void;
};

export default function PicturePicker(props: Props) {
  const [pictures, setPictures] = useState<{ file: File; url: string }[]>([]);
  const isFirstRender = useIsFirstRender();

  function deletePicture(pic: File) {
    return () => {
      setPictures((pics) => pics.filter((p) => p.file !== pic));
    };
  }

  useEffect(() => {
    if (isFirstRender) return;

    props.onChange?.(pictures.map((p) => p.file));
  }, [pictures]);

  return (
    <div>
      <Carousel showThumbs={false}>
        {pictures.map((pic) => (
          <CarouselItem imageSrc={pic.url} key={pic.file.name} onDelete={deletePicture(pic.file)} />
        ))}
      </Carousel>

      <Input
        id="fileInput"
        label="Select File"
        type="file"
        title="Select your file"
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
