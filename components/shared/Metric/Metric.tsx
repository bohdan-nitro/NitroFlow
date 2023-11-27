import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  alt: string;
  title: string;
  value: string | number;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

function Metric({
  imgUrl,
  alt,
  title,
  value,
  href,
  textStyles,
  isAuthor,
}: MetricProps) {
  const renderContent = () => {
    return (
      <>
        <Image
          className={`object-contain ${href ? "rounded-full" : ""}`}
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
        />
        <p className={`${textStyles} flex items-center gap-1`}>
          {value}
          <span
            className={`small-regular line-clamp-1 ${
              isAuthor ? "max-sm:hidden" : ""
            }`}>
            {title}
          </span>
        </p>
      </>
    );
  };
  if (href) {
    <Link className="flex-center gap-1" href={href}>
      {renderContent()}
    </Link>;
  }
  return <div className="flex-center flex-wrap gap-1">{renderContent()}</div>;
}

export default Metric;
