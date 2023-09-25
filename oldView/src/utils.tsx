interface IGradientIconProps {
  Icon: any;
  startColor: string;
  endColor: string;
  size: string;
}

export const GradientIcon = ({
  Icon,
  startColor,
  endColor,
  size = "12",
}: IGradientIconProps) => {
  return (
    <>
      <svg width={size} height={size}>
        <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="100%">
          <stop stopColor={startColor} offset="0%" />
          <stop stopColor={endColor} offset="100%" />
        </linearGradient>
        <Icon size={size} style={{ fill: "url(#gradient)" }} />
      </svg>
    </>
  );
};
