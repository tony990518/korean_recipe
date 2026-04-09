import React from 'react';

const base = "object-contain";
const big = "w-8 h-8 md:w-10 md:h-10"; // ← 사이즈 업!

const Icon = {
  link: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="/images/link_icon.webp" alt=""
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" aria-hidden="true" {...props}
    />
  ),
  line: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="/images/line_icon.webp" alt=""
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" aria-hidden="true" {...props}
    />
  ),
  facebook: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="/images/fb_icon.webp" alt=""
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" aria-hidden="true" {...props}
    />
  ),
  instagram: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="/images/instagram_icon.webp" alt=""
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" aria-hidden="true" {...props}
    />
  ),
  threads: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="/images/thread_icon.webp" alt=""
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" aria-hidden="true" {...props}
    />
  ),
  dcard: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="/images/dcard_icon.webp" alt=""
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" aria-hidden="true" {...props}
    />
  ),
};

export default Icon;
