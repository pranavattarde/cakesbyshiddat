import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Do you make eggless cakes?",
    answer:
      "Yes, we offer delicious eggless cakes across most of our cake categories.",
  },
  {
    question: "How much advance notice do you require?",
    answer:
      "We recommend placing your order at least 48-72 hours in advance. Larger custom cakes may require more time.",
  },
  {
    question: "Can I request a completely custom design?",
    answer:
      "Absolutely. We specialize in personalized cakes tailored to your theme, occasion, and preferences.",
  },
  {
    question: "Do you offer cake delivery?",
    answer:
      "Yes, delivery options are available depending on location and order requirements.",
  },
  {
    question: "Do you create wedding cakes?",
    answer:
      "Yes, we design luxury wedding cakes ranging from elegant single-tier creations to grand multi-tier masterpieces.",
  },
  {
    question: "Can I place an order through WhatsApp?",
    answer:
      "Yes, you can contact us directly through WhatsApp to discuss your requirements and place an order.",
  },
];

const CakeFAQ = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2 className="section-title">
            Everything You Need To Know
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Have questions? Here are some of the most common things
            our customers ask before placing an order.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#fffaf6] border border-[#f3e5dc] rounded-[24px] overflow-hidden"
            >
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3
                  className="text-xl text-[#3a2d28]"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {faq.question}
                </h3>

                {active === index ? (
                  <FiMinus className="text-xl" />
                ) : (
                  <FiPlus className="text-xl" />
                )}
              </button>

              {active === index && (
                <div className="px-6 pb-6 text-gray-500 leading-7">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CakeFAQ;