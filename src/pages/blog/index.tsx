import Image from 'next/image';
import path from 'path';
import fs from 'fs'
import matter from 'gray-matter'
import dayjs from 'dayjs';
import Head from 'next/head';

interface BlogProps {
    posts: any[];
}

export default function Blog({posts}:BlogProps) {
    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">From the blog</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-400">
                            Learn how to grow your business with our expert advice.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((item,index) => (
                            <article
                                key={index}
                                className="relative isolate flex flex-col justify-end overflow-hidden transition-all border border-transparent hover:border-gray-500 rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                                >
                                <a href={'/blog/'+item.slug}>
                                    <Image src={item.post.coverImage} alt={item.post.id} className="absolute inset-0 -z-10 h-full w-full object-cover" width={500} height={500} />
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                                    <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-400">
                                        <time dateTime={item.post.datetime} className="mr-8">
                                        {dayjs(item.post.date).format('DD/MM/YYYY')}
                                        </time>
                                        <div className="-ml-4 flex items-center gap-x-4">
                                            <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                                <circle cx={1} cy={1} r={1} />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                        
                                        <span className="absolute inset-0" />
                                        {item.post.title}
                                    </h3>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps = async () => {

    const pathToPosts = 'src/posts';

    const files = fs.readdirSync(path.join(pathToPosts))
    const posts = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join(pathToPosts, filename), 'utf-8')
        const { data:post } = matter(markdownWithMeta)
        return {
            post,
            slug: filename.split('.')[0]
        }
    })
    return {
        props: {
            posts
        }
    }
}