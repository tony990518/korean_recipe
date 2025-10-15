import React from 'react';

const base = "object-contain";
const big = "w-8 h-8 md:w-10 md:h-10"; // ← 사이즈 업!

const Icon = {
  link: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="images/link_icon.png" alt="LINE"
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" {...props}
    />
  ),
  line: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="images/line_icon.png" alt="LINE"
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" {...props}
    />
  ),
  facebook: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="images/fb_icon.png" alt="Facebook"
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" {...props}
    />
  ),
  instagram: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="images/instagram_icon.jpg" alt="Instagram"
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" {...props}
    />
  ),
  threads: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="images/thread_icon.png" alt="Threads"
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" {...props}
    />
  ),
  dcard: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src="images/dcard_icon.png" alt="Dcard"
      className={`${big} ${base} ${props.className ?? ""}`}
      loading="lazy" decoding="async" {...props}
    />
  ),
};

export default Icon;
