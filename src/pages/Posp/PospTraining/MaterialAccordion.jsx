import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const MaterialAccordion = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value); // Toggle the accordion
  };

  return (
    <div className="w-full">
      {/* Accordion Item 1 */}
      <Accordion open={open === 1} className="mb-4">
        <AccordionHeader onClick={() => handleOpen(1)}>
          What is Flowbite?
        </AccordionHeader>
        <AccordionBody>
          <p className="mb-2 text-gray-700">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS, including buttons, dropdowns, modals,
            navbars, and more.
          </p>
          <p className="text-gray-700">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-blue-600 hover:underline"
            >
              get started
            </a>{" "}
            and start developing websites faster with components built on
            Tailwind CSS.
          </p>
        </AccordionBody>
      </Accordion>

      {/* Accordion Item 2 */}
      <Accordion open={open === 2} className="mb-4">
        <AccordionHeader onClick={() => handleOpen(2)}>
          Is there a Figma file available?
        </AccordionHeader>
        <AccordionBody>
          <p className="mb-2 text-gray-700">
            Flowbite is first conceptualized and designed using the Figma
            software, so everything you see in the library has a design
            equivalent in our Figma file.
          </p>
          <p className="text-gray-700">
            Check out the{" "}
            <a
              href="https://flowbite.com/figma/"
              className="text-blue-600 hover:underline"
            >
              Figma design system
            </a>{" "}
            based on the utility classes from Tailwind CSS and components from
            Flowbite.
          </p>
        </AccordionBody>
      </Accordion>

      {/* Accordion Item 3 */}
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What are the differences between Flowbite and Tailwind UI?
        </AccordionHeader>
        <AccordionBody>
          <p className="mb-2 text-gray-700">
            The main difference is that the core components from Flowbite are
            open source under the MIT license, whereas Tailwind UI is a paid
            product. Another difference is that Flowbite relies on smaller and
            standalone components, whereas Tailwind UI offers sections of pages.
          </p>
          <p className="mb-2 text-gray-700">
            However, we actually recommend using both Flowbite, Flowbite Pro,
            and even Tailwind UI as there is no technical reason stopping you
            from using the best of two worlds.
          </p>
          <p className="text-gray-700">Learn more about these technologies:</p>
          <ul className="pl-5 list-disc">
            <li>
              <a
                href="https://flowbite.com/pro/"
                className="text-blue-600 hover:underline"
              >
                Flowbite Pro
              </a>
            </li>
            <li>
              <a
                href="https://tailwindui.com/"
                className="text-blue-600 hover:underline"
                rel="nofollow"
              >
                Tailwind UI
              </a>
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default MaterialAccordion;
