import Loading from "@components/Loading";
import { c } from "@utils";
import { DetailedHTMLProps, ImgHTMLAttributes, forwardRef, useEffect, useState } from "react";
import brokenImage from "@assets/brokenImage.svg?url";
import classes from "./asyncImage.module.less";

type ImgProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & {
  containerClassname?: string;
};

const AsyncImage = forwardRef<HTMLImageElement, ImgProps>(({ containerClassname, ...props }, ref) => {
  const [loading, setLoading] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  useEffect(() => {
    setImgBroken(false);
    setLoading(true);
  }, [props.src]);

  return (
    <div className={c`w-full h-full ${containerClassname}`}>
      {loading && (
        <div className={c`dark:bg-slate-900 bg-slate-200 w-full h-full flex justify-center items-center`}>
          <Loading />
        </div>
      )}
      <img
        {...props}
        src={imgBroken ? brokenImage : props.src}
        className={c`${props.className} ${classes.fixBroken}`}
        ref={ref}
        onLoad={(evt) => {
          setLoading(false);
          props.onLoad?.(evt);
        }}
        onLoadCapture={() => setLoading(true)}
        onError={(evt) => {
          setLoading(false);
          setImgBroken(true);
          props.onError?.(evt);
        }}
      />
    </div>
  );
});

AsyncImage.displayName = "AsyncImage";

export default AsyncImage;
