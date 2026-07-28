import type { SVGProps } from "react";
import type { SocialPlatform } from "@/types/tour";

type IconProps = SVGProps<SVGSVGElement>;

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.35C15.86 4.25 14.96 4.2 13.9 4.2c-2.2 0-3.7 1.34-3.7 3.8v2.4H7.6v3h2.6V21h3.3Z" />
    </svg>
  );
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="7.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <path d="M7.5 11v6" />
      <path d="M12 17v-3.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5V17" strokeLinecap="round" />
      <path d="M12 11v6" strokeLinecap="round" />
    </svg>
  );
}

function TiktokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 4v10.2a3.3 3.3 0 1 1-2.6-3.23" />
      <path d="M14 4c.4 2.2 2 3.8 4.2 4.1" />
    </svg>
  );
}

function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l6.6 8.4L4.2 20H6l5.6-6.4L15.7 20H20l-6.9-8.8L19.6 4h-1.9l-5.2 5.9L8.3 4H4Z" />
    </svg>
  );
}

const icons: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  x: XIcon,
};

export function SocialIcon({ platform, ...props }: { platform: SocialPlatform } & IconProps) {
  const Icon = icons[platform];
  return <Icon {...props} />;
}
