import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How early should I book my event?",
    answer:
      "We recommend booking at least 1-2 weeks in advance. Larger events may require additional planning time.",
  },
  {
    question: "Do you provide balloon decorations?",
    answer:
      "Yes. We provide premium balloon decorations, arches, backdrops, and themed setups.",
  },
  {
    question: "Do you provide mascot services?",
    answer:
      "Absolutely. We offer mascot experiences that are especially popular for children's celebrations.",
  },
  {
    question: "Can you create custom themes?",
    answer:
      "Yes. Every event can be customized according to your preferred theme, colors, and requirements.",
  },
  {
    question: "Do you handle complete event setups?",
    answer:
      "Yes. We manage everything from decoration and props to setup and execution.",
  },
  {
    question: "Which locations do you serve?",
    answer:
      "We serve Haryana and nearby regions. Contact us to discuss your event location.",
  },
];

const EventFAQ = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            EVENT FAQ
          </p>

          <h2 className="section-title">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Answers to common questions about our event services.
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
                  <FiMinus />
                ) : (
                  <FiPlus />
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

export default EventFAQ;