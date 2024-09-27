import { withPayload } from "@payloadcms/next/withPayload";
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default withPayload(withContentlayer(nextConfig));
