import Image from "next/image"

interface TokenTagProps {
    slug: string;
    logo: string;
}

export default function TokenTag({slug, logo}: TokenTagProps) {
    return (
        <button className="bg-gray-600 rounded-xl">
            <div className='flex'>
                <Image className='rounded-full inline mr-2' alt={slug} width={30} height={30} src={logo} />
                <span className='text-lg mr-2 inline text-white'>{slug}</span>
            </div>
        </button>
    )
}