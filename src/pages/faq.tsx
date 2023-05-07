import Head from "next/head";

const faqs = [
  {
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual form of currency that uses cryptography for secure financial transactions, control the creation of additional units, and verify the transfer of assets.",
  },

  {
    question: "How does cryptocurrency work?",
    answer:
      "Cryptocurrency operates on decentralized technology called blockchain, which is a distributed ledger that records all transactions across a network of computers. Transactions are secured through cryptography and verified by network participants.",
  },

  {
    question: "How do I buy cryptocurrency?",
    answer:
      "You can buy cryptocurrency through various crypto exchanges or platforms. Sign up on a reputable exchange, complete the verification process, deposit funds, and choose the cryptocurrency you want to buy. You can usually purchase crypto with fiat currency or other cryptocurrencies.",
  },

  {
    question: "How do I store my cryptocurrency?",
    answer:
      "Cryptocurrencies are stored in digital wallets. There are different types of wallets, including software wallets (desktop or mobile apps), hardware wallets (physical devices), and online wallets (web-based). Each offers different levels of security and accessibility.",
  },

  {
    question: "Is cryptocurrency safe?",
    answer:
      "Cryptocurrency can be safe when proper security measures are taken. It's important to use secure wallets, enable two-factor authentication, and be cautious of phishing attempts. Additionally, research and choose reputable exchanges and exercise due diligence before investing.",
  },

  {
    question: "How do I keep track of my cryptocurrency investments?",
    answer:
      "You can track your cryptocurrency investments through portfolio management tools or dedicated crypto tracking apps. These tools provide real-time price updates, portfolio performance analysis, and transaction history.",
  },

  {
    question: "Are cryptocurrencies legal?",
    answer:
      "The legality of cryptocurrencies varies from country to country. In many jurisdictions, cryptocurrencies are considered legal, but regulations and tax implications may apply. It's essential to familiarize yourself with the regulations in your country or region.",
  },

  {
    question: "Can I use cryptocurrency for online purchases?",
    answer:
      "Yes, many online merchants and platforms accept cryptocurrencies as a form of payment. Look for websites that display crypto payment options or use third-party services that facilitate crypto payments.",
  },
];

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ</title>
      </Head>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <h2 className="text-center text-2xl font-bold leading-10 tracking-tight text-white">
            FAQ
          </h2>
          <p className="text-center w-full mt-6 max-w-2xl m-auto text-base leading-7 text-gray-300">
            Have a different question and can’t find the answer you’re looking
            for? Reach out to our support team by{" "}
            <a
              href="#"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              sending us an email
            </a>{" "}
            and we’ll get back to you as soon as we can.
          </p>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
              {faqs.map((faq,index) => (
                <div key={index}>
                  <dt className="text-base font-semibold leading-7 text-white">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
