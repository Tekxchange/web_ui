import Loading from "@components/Loading";
import { c } from "@utils";
import { DetailedHTMLProps, ImgHTMLAttributes, forwardRef, useState } from "react";

type ImgProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">;

const AsyncImage = forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={c`w-full h-full`}>
      {loading && (
        <div className={c`dark:bg-slate-900 bg-slate-200 w-full h-full flex justify-center items-center`}>
          <Loading />
        </div>
      )}
      <img
        {...props}
        ref={ref}
        onLoad={(evt) => {
          setLoading(false);
          props.onLoad?.(evt);
        }}
        onError={(evt) => {
          setLoading(false);
          props.onError?.(evt);
        }}
      />
    </div>
  );
});

AsyncImage.displayName = "AsyncImage";

export default AsyncImage;
