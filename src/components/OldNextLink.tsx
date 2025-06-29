import React from "react";
import Link from "next/link";

function OldNextLink({ href, legacyBehavior = false, ...props }) {
  if (legacyBehavior) return <Link href={href} {...props} />;
  else
    return (
      <Link href={href} passHref>
        <a {...props} />
      </Link>
    );
}

export default OldNextLink;
