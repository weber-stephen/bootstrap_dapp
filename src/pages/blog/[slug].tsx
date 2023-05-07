import Image from 'next/image';
import path from 'path';
import fs from 'fs'
import matter from 'gray-matter'
import html from 'remark-html';
import { remark } from 'remark';
import Head from 'next/head';

interface BlogProps {
    post: any;
}
export default function Blog({post}:BlogProps) {
  return (
    <>
      <Head>
          <title>{post.title}</title>
      </Head>
      <div className="px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
          <h1 className="mt-2 text-center mb-12 text-3xl font-bold tracking-tight text-white sm:text-4xl">{post.title}</h1>
          <div className="mt-16 mb-16">
              <Image width={800} height={400} src={post.coverImage} className="aspect-video rounded-xl bg-gray-50 object-cover" alt={post.title} />
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {

    const pathToPosts = 'src/posts';

    const files = fs.readdirSync(path.join(pathToPosts))
    const posts = files.map(filename => {
        const idStr = filename.split('.')[0];
        return { params: { slug: idStr } };
    })
    return {
        paths: posts,
        fallback: false, // can also be true or 'blocking'
    };
}

export const getStaticProps = async ({params}:any) => {

    const pathToPosts = 'src/posts';

    const markdownWithMeta = fs.readFileSync(path.join(pathToPosts, params.slug+'.mdx'), 'utf-8')
    // const { data:post } = matter(markdownWithMeta)

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(markdownWithMeta);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        props: {
            post: {
                contentHtml,
                ...matterResult.data,
            }
        }
    }
}