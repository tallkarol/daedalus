import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";

const docsDir = path.join(process.cwd(), "content", "docs");

const docTitles: Record<string, string> = {
  overview: "Overview",
  relay: "Relay",
  forge: "Forge",
  conventions: "Conventions",
};

async function getDoc(slug: string) {
  const filePath = path.join(docsDir, `${slug}.mdx`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return Object.keys(docTitles).map((slug) => ({ slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!docTitles[slug]) {
    notFound();
  }
  const source = await getDoc(slug);
  if (!source) {
    notFound();
  }
  return <MDXRemote source={source} />;
}
