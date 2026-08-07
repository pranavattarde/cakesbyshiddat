import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Do you take same-day cake orders?",
    answer:
      "Depending on availability, we may accept same-day orders. We recommend ordering in advance for custom cakes.",
  },
  {
    question: "How early should I book an event?",
    answer:
      "For birthdays and small events, 1-2 weeks is ideal. Weddings and large events should be booked as early as possible.",
  },
  {
    question: "Do you provide delivery?",
    answer:
      "Yes, delivery options are available depending on the location and order requirements.",
  },
  {
    question: "Can decorations be customized?",
    answer:
      "Absolutely. We specialize in personalized themes, color schemes, and custom event setups.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We primarily serve Kurukshetra and nearby regions. Contact us for location-specific inquiries.",
  },
  {
    question: "Do you handle complete event setups?",
    answer:
      "Yes. From planning and decoration to execution, our team manages the entire celebration experience.",
  },
];

const ContactFAQ = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">

        <div className="text-center mb-20">
          <p className="section-subtitle">
            FAQ
          </p>

          <h2 className="section-title">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Quick answers to the questions we receive most often.
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

                {active === index ? <FiMinus /> : <FiPlus />}
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

export default ContactFAQ;