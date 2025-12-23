import React, { useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { GoDotFill } from "react-icons/go";
import { BsCheck2Circle } from "react-icons/bs";
import { RxDot } from "react-icons/rx";
const MainContent = ({ activeSection }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Reset page scroll when switching sections
  }, [activeSection]);
  const renderContent = () => {
    switch (activeSection) {
      case "CHAPTER-01":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800 "
            >
              Chapter 1: Principles of Insurance
            </Typography>
            <Typography variant="h5" className="mt-2 underline font-pt_serif">
              Introduction
            </Typography>
            {/* <Typography variant="body1" className="mb-4 font-pt_serif"> */}
            In this chapter, we shall learn about the basic principles that
            govern the working of insurance. The chapter is divided into two
            sections: the elements of insurance and the special features of an
            insurance contract.
            <br />
            <br />
            {/* </Typography> */}
            <Typography variant="h6" className="mt-4 underline font-bold ">
              Learning Outcomes
            </Typography>
            <ul>
              <li className="flex items-center gap-2">
                <BsCheck2Circle />
                Elements of insurance
              </li>
              <li className="flex items-center gap-2">
                <BsCheck2Circle />
                Insurance contract – legal aspects
              </li>
              <li className="flex items-center gap-2">
                <BsCheck2Circle /> Insurance contract – special features
              </li>
            </ul>
            <hr className="border-t-2 border-gray-300 my-4" />
            <Typography  className="mb-2 font-bold ">
              After studying this chapter, you should be able to:
            </Typography>
            <ul className="mt-3 mb-4">
              <li className="flex items-center gap-2">
                <GoDotFill className="text-xs" /> Define the various elements of
                insurance
              </li>
              <li className="flex items-center gap-2">
                <GoDotFill className="text-xs" />
                Define the features of an insurance contract
              </li>
              <li className="flex items-center gap-2">
                <GoDotFill className="text-xs" />
                Identify the special features of an insurance contract
              </li>
            </ul>
            <Typography variant="h6" className="mt-4 underline font-bold">
              A. Elements of Insurance
            </Typography>
            <Typography variant="h6" className="mt-4 font-bold">
              1. Asset:
            </Typography>
            An asset may be defined as "anything that confers some benefit and
            has an economic value to its owner."
            <br />
            <Typography  className="mb-3 font-bold">
              Features of an Asset:
            </Typography>
            <ul>
              <li>
                <strong className="flex items-center gap-2">
                  <GoDotFill className="text-xs" />
                  Economic Value:
                </strong>
                An asset must have economic value. Value can arise in two ways.
                <ul>
                  <li>
                    a. Income generation : Asset may be productive and generate
                    income.
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="flex  font-semibold text-red-700 gap-2">
                      Example
                    </span>
                    : A machine used to manufacture biscuits, or a cow that
                    yields milk, both generate income for their owner. A healthy
                    worker is an asset to an organisation.
                  </li>

                  <li>
                    b. Serving needs : An asset could also add value by
                    satisfying one or a group of needs..
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="flex  font-semibold text-red-700 gap-2">
                      Example
                    </span>
                    : A refrigerator cools and preserves food while a car
                    provides comfort and convenience in transportation,
                    similarly a body free of illness adds value to oneself and
                    family also.
                  </li>
                </ul>
              </li>
              <li>
                <strong className="flex items-center gap-2">
                  <GoDotFill className="text-xs" />
                  Scarcity and Ownership:
                </strong>
                What about air and sunlight? Are they not assets?
                <br />
                The answer is ‘No’. <br />
                <li className="font-semibold">
                  Indeed, few things are as valuable as air and sunlight. We
                  cannot live without them. Yet they are not considered as
                  assets in the economic sense of the term
                </li>
                <li className="font-semibold">
                  There are two reasons for this:
                </li>
                <li className="flex items-center gap-2">
                  <RxDot /> Their supply is abundant and not scarce.
                </li>
                <li className="flex items-center gap-2">
                  <RxDot /> They are not owned by any one individual but are
                  freely available to all.
                </li>
                This implies that an asset must satisfy two more conditions to
                qualify as such - its scarcity and its ownership or possession
                by someone.
              </li>
              <li className="mb-2">
                {" "}
                <br />
                <strong className="flex items-center gap-2">
                  <GoDotFill className="text-xs" />
                  Insurance of Assets:
                </strong>{" "}
                In insurance we are interested in economic losses that arise
                from unexpected and fortuitous events, not losses arising as a
                result of natural wear and tear. Insurance provides protection
                only against financial losses arising from unexpected events and
                not natural wear and tear, of assets due to usage over time. We
                must note that insurance cannot protect an asset from loss or
                damage. An earthquake will destroy a house whether it is insured
                or not. The insurer can only pay a sum of money, which would
                reduce the economic impact of the loss. Losses can arise in the
                event of breach of an agreement.
              </li>

              <li className="flex items-start mb-2">
                <span className="flex  font-bold text-red-700 gap-2">
                  Example
                </span>
                : An exporter would lose a great deal if the importer on the
                other side refused to accept the goods or defaulted on payments.
              </li>
            </ul>
            <Typography variant="h6" className="mt-4 font-bold mb-2">
              2. Risk
            </Typography>
            {/* <Typography variant="body1" className="mb-2"> */}
            The second element in the process of insurance is the concept of
            risk. We shall define risk as the chance of a loss. Risk thus refers
            to the likely loss or damage that can arise on account of happening
            of an event. We do not usually expect our house to burn down or our
            car to have an accident. Yet it can happen Examples of risks are the
            possibility of economic loss arising from the burning of a house or
            a burglary or an accident which results in the loss of a limb.
            {/* </Typography> */}
            <Typography variant="paragraph" className="font-bold">
              This has two implications:
            </Typography>
            <ul>
              <li>
                <span className="font-bold">(I) Firstly</span>,it means that
                that the loss may or may not happen. The chance or likelihood of
                loss can be expressed mathematically.
              </li>
              <li className="flex items-start mb-2">
                <span className="flex  font-bold text-red-700 gap-2">
                  Example &nbsp;
                </span>
                : One in a thousand chances that a house will catch fire =
                1/1000 = 0.001.
                <br />
                &nbsp; Three in a thousand chances that Ram will have a heart
                attack = 3/1000 = 0.003
                <br />
                Risk always implies a probability. Its value always lies between
                0 and 1, where 0 represents certainty that a loss will not
                happen while 1 represents certainty that it will happen.
              </li>
              <li>
                <strong>Probability:</strong> Risk is measured mathematically,
                with values ranging between 0 (no chance of loss) and 1
                (certainty of loss).
              </li>
              <li>
                <strong>Perils:</strong> Events causing loss, such as fire,
                earthquakes, or burglary.
              </li>
              <li>
                <strong>Exposure to Risk:</strong> Loss occurs only when an
                asset is exposed to a peril.
              </li>
              <li>
                <strong>Degree of Risk Exposure:</strong> The likelihood and
                amount of loss can vary greatly based on the nature of the asset
                and its environment.
              </li>
            </ul>
            <ul>
              <li>
                <span className="font-bold">(II) Secondly</span>,the event,
                whose occurrence actually leads to the loss, is known as a
                peril. It is the cause of the loss.
              </li>
              <li className="flex items-start mb-2">
                <span className="flex  font-bold text-red-700 gap-2">
                  Example &nbsp;
                </span>
                : Examples of perils are fire, earthquakes, floods, lightning,
                burglary, heart attack etc.
              </li>
            </ul>
            <Typography variant="h6" className="mt-4 font-bold mb-2">
              What about natural wear and tear?
            </Typography>
            {/* <Typography variant="body1" className="mb-2"> */}
            It is true that nothing lasts forever. Every asset has a finite
            lifetime during which it is functional and yields benefits. At some
            future date, its value becomes nil. This is a natural process, and
            we discard or change our mobiles, washing machines, and clothes when
            they are worn out. Therefore, losses arising out of normal wear and
            tear are not covered in insurance.
            {/* </Typography> */}
            <ul>
              <li>
                <span className="font-bold">(I) Exposure to Risk:</span>{" "}
                Occurrence of a peril need not necessarily lead to a loss. For
                loss to happen, the asset must be exposed to the peril.
              </li>
              <li className="flex items-start mb-2">
                <span className="flex font-bold text-red-700 gap-2">
                  Example &nbsp;
                </span>
                : In giving protection against a car accident, an insurer would
                be interested in a population of cars that are ‘exposed to the
                peril called accident’ during a certain year. A car regularly
                used for racing purposes cannot be part of this population. It
                must form part of a separate group of ‘racing cars’ whose
                chances of accident are higher than ordinary cars. Exposure to
                risk alone is not enough ground for insurance compensation.
              </li>
              <li className="flex items-start mb-2">
                <span className="flex font-bold text-red-700 gap-2">
                  Example &nbsp;
                </span>
                : A fire may break out in factory premises without causing
                actual damage. <br />
              </li>
              <li>
                <span className="font-bold">Insurance Role:</span> Insurance
                comes into play only if there is an actual economic (financial)
                loss as a result of a peril.
              </li>
              <li>
                <span className="font-bold">(II) Degree of Risk Exposure:</span>{" "}
                Two assets may be exposed to the same peril, but the likelihood
                of loss or the amount of loss may vary greatly.
              </li>
              <li className="flex items-start mb-2">
                <span className="flex font-bold text-red-700 gap-2">
                  Example &nbsp;
                </span>
                : A vehicle carrying explosives can yield far greater loss from
                fire than a tanker carrying water. Similarly, the risk of
                respiratory problems is higher in polluted cities compared to
                less polluted ones.
              </li>
            </ul>
            <Typography variant="h5" className="mt-4 font-bold">
              Basis of Risk Classification
            </Typography>
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-4/5 h-4/5">
                <img
                  className="mx-4 h-full w-[70%] mx-auto"
                  src="https://www.notioninsurance.in/newportal/index/1.jpg"
                  alt=""
                />
              </div>
            </div>
            <Typography  className="mb-2 font-bold">
              Risks can be classified based on several factors:
            </Typography>
            <ul>
              <li className="mb-3">
                <span className="font-bold ">
                  a) Extent of Damage Likely to be Suffered:
                </span>
                This is given by the degree of loss and its impact on an
                individual or business. On this basis one may identify three
                types of risk events or situations:
                <ul>
                  <li className="mb-1">
                    <strong>(I) Critical or Catastrophic:</strong> Where losses
                    are of such a magnitude; that may result in total loss or
                    bankruptcy.
                    <br />
                    <strong className="text-red-700">Example:</strong> An
                    earthquake that destroys a village. <br />
                    A major fire that completely destroys a multi crore
                    installation <br />A situation like the terrorist attack of
                    9/11 on World Trade Centre which caused injuries to many
                    people
                  </li>
                  <li className="mb-1">
                    <strong>(II) Major:</strong> In which the possible losses
                    may result in serious financial losses, compelling the firm
                    to borrow in order to continue operations.
                    <br />
                    <strong className="text-red-700">Example:</strong> A fire in
                    the plant of a large multinational company at Gurgaon
                    destroys inventory worth Rs 1 crore. The loss is heavy but
                    not so high as to lead to bankruptcy. <br />A major kidney
                    transplant operation whose cost is prohibitive.
                  </li>
                  <li className="mb-1">
                    <strong>(III) Marginal/Insignificant:</strong> Where the
                    possible losses are insignificant and can be easily met from
                    an individual or a firm’s existing assets or current income
                    without imposing any undue financial strain.
                    <br />
                    <strong className="text-red-700">Example:</strong> A minor
                    car accident results in the side being slightly grazed due
                    to which some of the paint is damaged and a fender is
                    slightly bent. <br />
                    An individual suffering from common cold and cough
                  </li>
                </ul>
              </li>
              <li className="mb-2">
                <span className="font-bold">
                  b) Nature of Risk Environment:
                </span>{" "}
                <br />
                Another basis for classifying risks is by the nature of the
                environment.
                <ul>
                  <li>
                    <strong>(I) Static Risks:</strong> <br /> Static risks refer
                    to events taking place within a stable environment. They
                    have a regular pattern of occurrence over time and can be
                    reasonably predicted. They are thus easier to insure.
                    Typically such risks are caused by natural events. <br />
                    Examples are fire, earthquake, death, accident and sickness.
                  </li>
                  <li>
                    <strong>(II) Dynamic Risks:</strong> <br /> Typically refer
                    to perils that affect the social environment and result from
                    economic and social factors. They are called dynamic because
                    they don’t necessarily have a regular pattern of occurrence
                    and cannot be predicted like static risks. Again these risks
                    often have vast national and social consequences and may
                    affect a large section of people.
                    <br />
                    Examples are unemployment, inflation, war and political
                    upheavals. Insurance companies in general do not insure
                    dynamic risks.
                  </li>
                </ul>
              </li>
              <li className="mb-3">
                <span className="font-bold">c) Who is Affected ? </span>
                <br /> A third way of classifying risks may be provided by
                considering who is affected by a particular peril or loss event.
                <ul>
                  <li>
                    <strong>(I) Fundamental Risks:</strong> <br /> affect large
                    populations. Their impact is widespread and tends to be
                    catastrophic.
                    <br />
                    Examples of fundamental or systemic risks are wars,
                    droughts, floods and earthquakes and terrorist attacks.
                  </li>
                  <li>
                    <strong>(II) Particular Risks:</strong> <br /> Aaffect only
                    specific individuals and not an entire community or group.
                    In this case the loss is borne only by particular
                    individuals and not the entire community or group.
                    <br />
                    Examples of particular risks are burning of a house or an
                    automobile accident or hospitalisation following an
                    accident. Commercial insurance is available to cover both
                    fundamental and particular risk.
                  </li>
                </ul>
              </li>
              <li className="mb-3">
                <span className="font-semibold">
                  d) Result / Consequence / Outcome:
                </span>
                <ul>
                  <li>
                    <strong>(I) Speculative Risks:</strong> <br /> describes a
                    situation in which the consequence can be either a profit or
                    a loss. Typical examples of taking such risk are gambling on
                    horses or stock market speculation. One assumes such risk
                    deliberately in the hope of a gain.
                  </li>
                  <li className="mb-1">
                    <strong>(II) Pure Risks:</strong> on the other hand involves
                    situations in which the outcomes can result only in loss or
                    no loss, but never in gain. <br />
                    For example, a flood or a fire either occurs or does not
                    occur. If it happens there is a loss. If it does not happen
                    there is neither loss nor gain. Similarly, a person may or
                    may not fall seriously ill. Insurance only applies in case
                    of pure risks, where it protects against loss that may
                    arise. Speculative risks cannot be insured.
                  </li>
                  <li className="mb-1">
                    <strong className="text-red-700">
                      Examples of pure risk :
                    </strong>{" "}
                    <br /> Chemical – Fire, Explosion <br /> Natural –
                    Earthquake, Flood, Cyclone <br />
                    Social – Riots, Fraud, Thefts <br /> Technical – Machinery
                    Breakdown <br /> Personal – Death, Disability, Sickness
                  </li>
                </ul>
              </li>
            </ul>
            <Typography variant="h6" className="mt-4 font-bold">
              Hazard
            </Typography>
            {/* <Typography variant="body1" className="mb-2"> */}
            <p className="mb-2">
              We have seen above that mere exposure to a peril need not cause a
              loss. Again, a loss need not be severe. The condition or
              conditions which increase the probability of a loss or its
              severity, and thus impact(s) the risk is known as hazard. When
              insurers make an assessment of the risk, it is generally with
              reference to the hazards to which the asset is subject.
            </p>
            {/* </Typography> */}
            {/* <Typography variant="body1" className="mb-2"> */}
            <p>
              Let us now give some examples of the link between assets, peril,
              and hazards:
            </p>
            {/* </Typography> */}
            <table className="table-auto border-collapse border border-gray-300 mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Asset</th>
                  <th className="border border-gray-300 px-4 py-2">Peril</th>
                  <th className="border border-gray-300 px-4 py-2">Hazard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Life</td>
                  <td className="border border-gray-300 px-4 py-2">Cancer</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Excessive Smoking
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Factory</td>
                  <td className="border border-gray-300 px-4 py-2">Fire</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Explosive material left unattended
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Car</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Car Accident
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Careless driving by driver
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cargo</td>
                  <td className="border border-gray-300 px-4 py-2">Storm</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Water seeping in cargo; not packaged in waterproof
                    containers
                  </td>
                </tr>
              </tbody>
            </table>
            <Typography variant="h6" className="mt-4 font-bold">
              <span className="text-red-700 ">Important:</span> Types of Hazards
            </Typography>
            <ul>
              <li>
                <strong>a) Physical Hazard:</strong> A physical condition that
                increases the chance of loss.
                <ul className="ml-4">
                  <li>(I) Defective wiring in a building</li>
                  <li>(II) Indulging in water sports</li>
                  <li>(III) Leading a sedentary lifestyle</li>
                </ul>
              </li>
              <li>
                <strong>b) Moral Hazard:</strong> Refers to dishonesty or
                character defects in an individual that influence the frequency
                or severity of the loss. A dishonest individual may attempt to
                commit fraud and make money by misusing the facility of
                insurance.
                <br />
                <strong className="text-red-700">Example:</strong> A classic
                instance of moral hazard is purchasing insurance for a factory
                and then burning it down to collect the insurance amount or
                buying health insurance after onset of a major ailment.
              </li>
              <li>
                <strong>c) Legal Hazard </strong> is more prevalent in cases
                involving a liability to pay for damages. It arises when certain
                features of the legal system or regulatory environment can
                increase the incidence or severity of losses.
                <br />
                <strong className="text-red-700">Example:</strong> WThe
                enactment of law governing workmen’s compensation in the case of
                accidents can raise the amount of liability payable
                considerably.
              </li>
              A major concern in insurance is the relationship between risks and
              associated hazards. Assets are classified into various risk
              categories on this basis and the price charged for insurance
              coverage [known as the premiums] would increase if the
              susceptibility to loss, arising as a result of the presence of
              associated hazards, is high.
            </ul>
            <Typography variant="h6" className="mt-4 font-bold">
              3. Mathematical Principle of Insurance (Risk Pooling)
            </Typography>
            {/* <Typography variant="body1" className="mb-2"> */}
            <p className="mb-2">
              The third element in insurance is a mathematical principle that
              makes insurance possible. It is known as the principle of risk
              pooling.
            </p>
            {/* </Typography> */}
            {/* <Typography variant="body1" className="mb-2"> */}
            <strong className="text-red-700 font-bold">Example:</strong>{" "}
            <p className="mb-2">
              Suppose there are 100000 houses exposed to the risk of fire that
              can cause an average loss of Rs 50000. If the chance of a house
              catching fire is 2 in 1000 [or 0.002] it would mean that the total
              amount of loss suffered would be Rs 10000000 [=50000 x 0.002 x
              100000].
            </p>
            {/* </Typography> */}
            {/* <Typography variant="body1" className="mb-2"> */}
            <p className="mb-2">
              {" "}
              If an insurer were to get the owners of each of the hundred
              thousand houses to contribute Rs 100 and if these contributions
              were to be pooled into a single fund, it would be enough to pay
              for the loss of the unfortunate few who suffered from the fire.
            </p>
            {/* </Typography> */}
            <Typography  className="mb-2">
              <strong>
                The required amount of individual contribution is evident from
                the calculation below 100000 x 100 = Rs 10000000
              </strong>
            </Typography>
            <Typography variant="h6" className="mt-4 font-bold">
              a) How Exactly Does the Principle Work in Insurance?
            </Typography>
            {/* 
            <Typography variant="body1" className="mb-2"> */}
            <strong className="text-red-700 font-bold ">Example:</strong>{" "}
            <p className="mb-2">
              Mr. Shyam, who has a factory, with plant, machinery and inventory
              worth Rs 70 lakhs, wants to insure them with an insurer. The
              chance that there would be loss or damage to the factory and its
              contents from fire or other insured perils is 7 out of 1000
              [0.007]. Both Mr. Shyam and the insurer are aware about this.
            </p>
            {/* </Typography> */}
            <ul>
              <li>
                <strong>Mr. Shyam’s Position:</strong> <br /> The probability of
                loss (0.007) is of little use to Mr. Shyam since it only
                suggests that on average about 7 out of 1000 factories like his,
                would be impacted by the loss. He does not know whether his
                factory would be one among the unfortunate seven? In fact nobody
                can predict if the particular factory would suffer a loss. Shyam
                may be said to be in a state of uncertainty. Not only does he
                not know the future, he cannot even predict what it will be. It
                is obviously a cause for anxiety.
              </li>
              <li>
                <strong>Insurer’s Position:</strong> <br /> Let us now look at
                the insurer’s position. When Shyam’s risk of loss is combined
                and pooled with that of thousands of others, who are exposed to
                similar situation, it now becomes finite and predictable. The
                insurer need not worry about Shyam’s factory as much as the
                latter does. It is enough that only seven out of thousand
                factories be subjected to the loss. So long as the actual losses
                are same or nearly same as the expected, the insurer can meet
                them by drawing money from the pool of funds.
              </li>
            </ul>
            {/* <Typography variant="body1" className="mb-2 "> */}
            <p>
              It is by pooling number of risks of all the insured similarly
              placed and exposed to possibility of loss due to a peril that the
              insurer is able to assume that risk and its financial impact.
            </p>
            {/* </Typography> */}
            <div className="w-full h-full flex justify-center items-center mt-10">
              <div className="w-4/5 h-4/5">
                <img
                  className=" h-full w-[70%] mx-auto"
                  src="https://www.notioninsurance.in/newportal/index/2.jpg"
                  alt=""
                />
              </div>
            </div>
            <Typography variant="h6" className="mt-4 font-bold">
              b) Risk pooling and the law of large numbers
            </Typography>
            <ul>
              <li>
                The probability of damage [derived as 7 out of 1000 or 0.007 in
                the example above] forms the basis on which the premium is
                determined. The insurer would face no risk of loss if the actual
                experience was as expected. In such a situation the premiums of
                the numerous insured would be sufficient to completely
                compensate for the losses of those who have been affected by the
                peril. The insurer would however face a risk if the actual
                experience was more adverse than expected and the premiums
                collected were not sufficient to pay the claims
                <br />{" "}
                <span className="font-semibold">
                  How can the insurer be sure about its predictions?
                </span>
                This becomes possible because of a principle known as the “Law
                of large numbers”. It states that the larger the size of the
                pool of risks, the actual average of losses would be closer to
                the estimated or expected average loss.
              </li>
            </ul>
            {/* <Typography variant="body1" className="mb-2"> */}
            <strong className="text-red-700 font-bold">
              Example:
            </strong> <br />{" "}
            <p className="mb-2">
              To give a simple illustration, the probability of getting heads on
              a toss of the coin is ½. But how sure can you be that you will
              actually get 2 heads if you toss the coin four times? <br />
              Only when the number of tosses gets very large and closer to
              infinity, the chance of getting heads once for every two tosses
              will become closer to one.
            </p>
            {/* </Typography> */}
            <Typography variant="h6" className="mt-4 font-bold">
              a) Conditions for Insuring a Risk
            </Typography>
            {/* <Typography variant="body1" className="mb-2"> */}
            <strong className="text-red-700 font-bold">Example:</strong>
            <p>
              {" "}
              An individual owns a manufacturing unit and wants to insure it
              against risks like fire and theft. To determine whether this risk
              is insurable, the insurer will evaluate specific conditions and
              apply key principles.
            </p>
            {/* </Typography> */}
            <ul>
              <li>
                (I) A sufficiently large number of homogenous (similar) exposure
                units to make the losses reasonably predictable. This follows
                from the law of large numbers. Without this, it would be
                difficult to make predictions.
              </li>
              <li>
                (II) Loss produced by the risk must be definite and measurable.
                It is difficult to decide the compensation if one cannot say for
                sure that a loss has occurred and how much it is.
              </li>
              <li>
                (III) Loss must be fortuitous or accidental. It must be the
                result of an event that may or may not happen. The event must be
                beyond the control of the insured. No insurer would cover a loss
                that is intentionally caused by the insured.
              </li>
              <li>
                (IV) Sharing of losses of the few by many can work only if a
                small percentage of the insured group suffers loss at any given
                period of time.
              </li>
              <li>
                (V) Economic feasibility: The cost of insurance must not be high
                in relation to the possible loss; otherwise, the insurance would
                be economically unviable.
              </li>
              <li>
                (VI) Public policy: Finally, the contract should not be contrary
                to public policy and morality.
              </li>
            </ul>
            <br />
            <ul>
              <li>
                <strong>4. Insurer’s Evaluation:</strong> <br /> The fourth
                element of insurance is that it involves a contractual agreement
                in which the insurer agrees to provide financial protection
                against specified risks for a price or consideration known as
                the premium. The contractual agreement takes the form of an
                insurance policy.
              </li>
              <li className="mt-2">
                <strong className="text-red-700 mb-1">Test Yourself </strong>{" "}
                <br />
                <span className="font-bold">
                  Which one of the following does not represent an insurable
                  risk?
                </span>{" "}
                The fourth element
                <br /> I. Fire <br /> II. Stolen goods <br /> III. Burglary{" "}
                <br /> IV. Loss of goods due to ship capsizing
              </li>
              <li className="mt-2">
                <strong>Proposer’s Perspective:</strong> <br /> From the
                proposer’s side, insuring the risk provides peace of mind and
                financial protection in case of unforeseen events. By pooling
                resources with others in similar situations, the proposer
                minimizes the financial impact of potential losses.
              </li>
            </ul>
            {/* <Typography variant="body1" className="mb-2"> */}
            <p>
              {" "}
              Insurance works by pooling the risks of many individuals, making
              it economically viable for insurers to offer protection against
              significant but unpredictable losses.
            </p>
            {/* </Typography> */}
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-4/5 h-4/5">
                <img
                  className="mx-auto h-full w-[90%]"
                  src="https://www.notioninsurance.in/newportal/index/3.jpg"
                  alt="Diagram explaining conditions for insuring a risk"
                />
              </div>
            </div>
            <Typography variant="h5" className="mt-4 font-bold">
              B. Insurance contract – legal aspects
            </Typography>
            <Typography variant="h6" className="mt-4 font-bold">
              a) Legal aspects of an insurance contract
            </Typography>
            <li>
              We will now look at some features involved in an insurance
              contract and then consider legal principles that govern insurance
              contracts in general. <br />
              We have already seen that one of the elements of insurance is that
              it involves a contract between insurer and insured. <br />A
              contract is an agreement between parties, enforceable at law. The
              provisions of the Indian Contract Act, 1872 govern all contracts
              in India, including insurance contracts.
            </li>
            <Typography variant="h6" className="mt-4 font-bold">
              b) Elements of a Valid Insurance Contract
            </Typography>
            <Typography  className="mb-2 font-bold">
              The following elements are essential for an insurance contract to
              be valid:
            </Typography>
            <ul>
              <li className="mb-1">
                <strong>1. Offer and Acceptance:</strong> <br /> The proposer
                submits an offer (application), and the insurer provides
                acceptance, often subject to terms and conditions.
              </li>
              <li className="mb-1">
                <strong>2. Consideration:</strong> <br /> This refers to the
                mutual exchange of value— the premium from the insured and the
                promise of indemnity from the insurer.
              </li>
              <li className="mb-1">
                <strong>3. Capacity of the Parties:</strong> <br /> Both parties
                must be legally competent to enter the contract (e.g., not
                minors or individuals under coercion).
              </li>
              <li className="mb-1">
                <strong>4. Legality:</strong> <br /> The object of the contract
                must be lawful. Insurance cannot cover illegal activities or
                contraband goods.
              </li>
              <li className="mb-1">
                <strong>4. Agreement between the parties:</strong> <br /> Both
                the parties should agree to the same thing in the same sense.
                contraband goods.
              </li>
            </ul>
            {/* <Typography variant="body1" className="mb-2"> */}
            <strong className="text-red-700 font-bold">Important:</strong>{" "}
            <br />
            <p> The following cannot be an element of Insurance contract</p>
            {/* </Typography> */}
            <ul>
              <li className="mb-1">
                <strong>(I) Coercion</strong> <br /> Involves pressure applied
                through criminal means.
              </li>
              <li className="mb-1">
                <strong>(II) Undue influence</strong> <br /> When a person, who
                is able to dominate another, uses her position, influence or
                power to obtain undue advantage.
              </li>
              <li className="mb-1">
                <strong>(III) Fraud</strong> <br /> When a person induces
                another to act on a false belief that is caused by a
                representation he or she does not believe to be true. It can
                arise either from deliberate concealment of facts or through
                misrepresenting them.
              </li>
              <li className="mb-1">
                <strong>(IV) Mistake</strong> <br /> Error in judgement or
                interpretation of an event. This can lead to an error in
                understanding and agreement about the subject matter of
                contract.
              </li>
              <li className="mt-2">
                <strong className="text-red-700 mb-1">Test Yourself </strong>{" "}
                <br />
                <span className="font-bold">
                  Which among the following cannot be an element in a valid
                  insurance contract?
                </span>{" "}
                (I) Coercion <br /> (II) Offer and acceptance <br /> (III)
                Consideration <br /> (IV) Legality
              </li>
            </ul>
            <Typography variant="h6" className="mt-4 font-bold">
              C Insurance contract – special features
            </Typography>
            {/* <Typography variant="body1" className="mb-2"> */}
            <p className="mb-2">
              Let us look at the special features of an insurance contract.
            </p>
            {/* </Typography> */}
            <ul>
              <li>
                <strong>1. Indemnity</strong> <br /> The principle of indemnity
                is applicable to Non-life insurance policies. It means that the
                policyholder, who suffers a loss, is compensated so as to put
                him or her in the same financial position as he or she was
                before the occurrence of the loss event. The insurance contract
                (evidenced through insurance policy) guarantees that the insured
                would be indemnified or compensated up to the amount of loss and
                no more. <br /> <br />
                The philosophy is that one should not make a profit through
                insuring one’s assets and recovering more than the loss. The
                insurer would assess the economic value of the loss suffered and
                compensate accordingly.
              </li>
              <li className="mt-2">
                <strong className="text-red-700">Example:</strong> <br /> Ram
                has insured his house, worth Rs. 10 lakhs, for the full amount.
                He suffers loss on account of fire estimated at Rs. 70000. The
                insurance company would pay him an amount of Rs. 70000. The
                insured can claim no further amount.
                <br />
                Consider a situation now where the property has not been insured
                for its full value. One would then be entitled to indemnity for
                loss only in the same proportion as one’s insurance.
                <br />
                Suppose the house, worth Rs. 10 lakhs has only been insured for
                a sum of Rs. 5 lakhs. If the loss on account of fire is Rs.
                60000, one cannot claim this entire amount. It is deemed that
                the house owner has insured only to the tune of half its value
                and he is thus entitled to claim just 50% [Rs. 30000] of the
                amount of loss. This is also known as underinsurance.
                <br /> <br />
                The measurement of indemnity to be paid would depend on the type
                of insurance one takes. <br />
                Indemnity might take one or more of the following modes of
                settlement: Cash payment
                <br />
                Repair of a damaged item
                <br />
                Replacement of the lost or damaged item <br />
                Restoration, (Reinstatement) for example, rebuilding a house
                destroyed by fire
              </li>
              <li className="mt-2">
                But, there is some subject matter whose value cannot be easily
                estimated or ascertained at the time of loss. For instance, it
                may be difficult to put a price in the case of family heirlooms
                or rare artefacts. Similarly in marine insurance policies it may
                be difficult to estimate the extent of loss suffered in a ship
                accident half way around the world. <br />
                In such instances, a principle known as the Agreed Value is
                adopted. The insurer and insured agree on the value of the
                property to be insured, at the beginning of the insurance
                contract. In the event of total loss, the insurer agrees to pay
                the agreed amount of the policy. This type of policy is known as
                “Agreed Value Policy”.
              </li>
              <li className="mt-10">
                <strong>g. Subrogation</strong> <br /> Subrogation means the
                transfer of all rights and remedies, with respect to the subject
                matter of insurance, from the insured to the insurer. It means
                that if the insured has suffered from loss of property caused
                due to negligence of a third party and has been paid indemnity
                by the insurer for that loss, the right to collect damages from
                the negligent party would lie with the insurer. Note that the
                amount of damage that can be collected is only to the extent of
                amount paid by the insurance company. <br />
                Subrogation:It is the process an insurance company uses to
                recover claim amounts paid to a policy holder from a negligent
                third party. Subrogation can also be defined as surrender of
                rights by the insured to an insurance company that has paid a
                claim against the third party.
              </li>
              <li>
                <strong className="text-red-700">Example:</strong> <br /> Mr.
                Kishore’s household goods were being carried in Sylvain
                Transport service. They got damaged due to driver’s negligence,
                to the extent of Rs 45000 and the insurer paid an amount of Rs
                30000 to Mr. Kishore. The insurer stands subrogated to the
                extent of only Rs 30000 and can collect that amount from Sylvain
                Transports.
                <br />
                Suppose, the claim amount is for Rs 45,000/, insured is
                indemnified by the insurer for Rs 40,000, and the insurer is
                able to recover under subrogation Rs 45,000/ from Sylvain
                Transports, then the balance amount of Rs 5000 will have to be
                given to the insured.
                <br />
                Mr. Suresh dies in an air crash. His family is entitled to
                collect the full sum assured of Rs 50 lakhs from the insurer who
                have issued a Personal Accident Policy plus the compensation
                paid by the airline, say, Rs 15 lakhs.
              </li>
              <li className="mt-10">
                <strong>h. Contribution</strong> <br /> This principle is
                applicable to only non-life Insurance. Contribution follows from
                the principle of indemnity, which implies that one cannot gain
                more from insurance than one has lost through the peril The
                principle of “Contribution” implies that if the same property is
                insured with more than one insurance company, the compensation
                paid by all the insurers together cannot exceed the actual loss
                suffered. If insured were to collect the amount of the loss from
                each insurer fully, insured would make a profit from the loss.
                This would violate the principle of indemnity.
              </li>
              <li>
                <strong className="text-red-700">Example:</strong> <br />
                <span>Scenario 1</span> <br />
                Mr. Srinivas takes out a fire policy on his house valued at Rs.
                24 lakhs with two insurance companies. He insures it for Rs.12
                lakhs with each company. When the house is partially damaged in
                a fire, the loss is estimated at Rs. 6 lakhs. He claims Rs. 6
                lakhs each from the two insurers. The two insurers decline to
                give him Rs. 6 lakhs each.
                <br />
                They take the position that since each of them are deemed to
                have shared in the insurance to the extent of 50%, each would
                pay 50% of the loss, viz., Rs.3 lakhs each, thus ensuring that
                the insured gets no more than the value of the actual loss.
                <span>Scenario 2</span> <br />
                Rishi has taken two Mediclaim policies for self, Rs 2, 50,000
                from X company and for Rs 1, 50,000 from Y company. Rishi has
                incurred an expense of Rs 1, 60,000 on hospitalisation following
                an ailment. This compensation of Rs 1, 60,000 will be shared and
                paid by both the companies on rateable proportion basis. The
                share of each company will be
                <br />
                <br />
                X company: 1, 60,000 x 2.50,000/ (2, 50, 000 + 1, 50, 000) = RS
                1, 00.000 <br />Y company: 1, 60,000 x 150,000/ (2, 50, 000 + 1,
                50, 000) = Rs 60, 000
              </li>
            </ul>
            <ul>
              <li className="mt-10">
                <strong>2. Uberrima Fides or Utmost Good Faith</strong> <br />
                <strong className="mt-2">
                  There is a difference between good faith and utmost good faith
                </strong>{" "}
                <br />
                <br />
                <strong className="mt-2 ">a) Good faith</strong> <br />
                All commercial contracts in general require that good faith
                shall be observed in their transaction and there shall be no
                fraud or deceit. Apart from this legal duty to observe good
                faith, the seller is not bound to disclose any information about
                the subject matter of the contract to the buyer.
                <br />
                The rule observed here is that of “Caveat Emptor” which means
                buyer beware.
                <br />
                The parties to the contract are expected to examine the subject
                matter of the contract and so long as one party does not mislead
                the other and the answers are given truthfully, there is no
                question of the other party avoiding the contract
                <br />
                <strong className="text-red-700">Example:</strong> <br />
                Mr. Chandrasekhar goes to a TV showroom and is obsessed by a
                fanciful brand of TV with many features. The sales person knows
                from experience that the particular brand is not very reliable
                and has in the past given rise to problems for other customers.
                He does not reveal this for fear that it might jeopardize the
                sale. Would the situation have been different if the sales man
                had been asked about the reliability of the brand and had
                replied that it was very reliable? But, there is some subject
                matter whose value cannot be easily estimated or ascertained at
                the time of loss. For instance, it may be difficult to put a
                price in the case of family heirlooms or rare artefacts.
                Similarly in marine insurance policies it may be difficult to
                estimate the extent of loss suffered in a ship accident half way
                around the world. <br />
                In such instances, a principle known as the Agreed Value is
                adopted. The insurer and insured agree on the value of the
                property to be insured, at the beginning of the insurance
                contract. In the event of total loss, the insurer agrees to pay
                the agreed amount of the policy. This type of policy is known as
                “Agreed Value Policy”.
                <br />
                <strong>Can he be charged of deceit?</strong> <br />
                Would the situation have been different if the sales man had
                been asked about the reliability of the brand and had replied
                that it was very reliable?
                <br />
                <li className="mt-10">
                  <strong>b) Utmost good faith</strong>
                  <br />
                  Insurance contracts stand on a different footing. The proposer
                  has a legal duty to disclose all material information about
                  the subject matter of insurance to the insurers who do not
                  have this information.
                  <br />
                  Material information is that information which enables the
                  insurers to decide:
                  <br />
                  Whether they will accept the risk
                  <br />
                  If so, at what rate of premium and subject to what terms and
                  conditions
                  <br />
                  This legal duty of utmost good faith arises under common law.
                  The duty applies not only to material facts which the proposer
                  knows, but also extends to material facts which he ought to
                  know
                  <br />
                  Insurance contracts are subject to a higher obligation. When
                  it comes to insurance, good faith contracts become utmost good
                  faith contracts. The concept of "Uberrima fides" is defined as
                  involving “a positive duty to voluntarily disclose, accurately
                  and fully all facts material to the risk being proposed,
                  whether requested or not."
                  <br />
                  <strong>What is meant by complete disclosure?</strong>
                  <br />
                  The law imposes an obligation to disclose all material facts.
                  <br />
                  <strong className="text-red-700">Example:</strong> <br />
                  <strong>(I) Misleading of facts by the insured</strong> <br />
                  An executive is suffering from Hypertension and has had a mild
                  heart attack recently, following which he decides to take a
                  medical policy but does not reveal his true condition. The
                  insurer is thus duped into accepting the proposal due to
                  misrepresentation of facts by insured.
                  <br />
                  <strong>(II) Misleading of facts by the insured</strong>{" "}
                  <br />
                  An individual has a congenital hole in the heart and reveals
                  the same in the proposal form. The same is accepted by the
                  insurer and proposer is not informed that pre-existing
                  diseases are not covered for at least 4 years.
                  <br />
                </li>
                <li className="mt-10">
                  <strong>c) Material fact</strong> <br />
                  Material fact has been defined as a fact that would affect the
                  judgment of an insurance underwriter in deciding whether to
                  accept the risk and if so, the rate of premium and the terms
                  and conditions.
                  <br />
                  Whether an undisclosed fact was material or not would depend
                  on the circumstances of the individual case and could be
                  decided ultimately only in a court of law. The insured has to
                  disclose facts that affect the risk.
                  <br />
                  Let us take a look at some of the types of material facts in
                  insurance that one needs to disclose:
                  <br />
                  (I) Facts indicating that the particular risk represents a
                  greater exposure than normal. Examples are hazardous nature of
                  cargo being carried at sea; past history of illness
                  <br />
                  (II) Existence of past policies taken from all insurers and
                  their present status
                  <br />
                  (III) All questions in the proposal form or application for
                  insurance are considered to be material, as these relate to
                  various aspects of the subject matter of insurance and its
                  exposure to risk. They need to be answered truthfully and be
                  full in all respects
                  <br />
                  (IV) Existence of past policies taken from all insurers and
                  their present status
                  <br />
                  The following are some examples of material facts:
                  <br />
                  <strong className="text-red-700 ">Example:</strong> <br />
                  <br />
                  <strong>(I) Fire Insurance</strong> <br />
                  ✔Construction of the buildin
                  <br />
                  ✔Occupancy (e.g. office, residence, shop, warehouse,
                  manufacturing unit, etc.)
                  <br />
                  ✔The nature of goods stored/manufactured, i.e., non-hazardous,
                  hazardous, extra-hazardous etc.
                  <br />
                  <strong>(II) Marine Insurance</strong> <br />
                  ✔Method of packing i.e., whether in single gunny bags or
                  double gunny bags, whether in new drums or second hand drums;
                  etc.
                  <br />
                  ✔The nature of goods (e.g. whether the machinery is new or
                  second hand)
                  <br />
                  <strong>(III) Motor Insurance</strong> <br />
                  ✔Cubic capacity of engine (private car)
                  <br />
                  ✔Carrying capacity of a truck (tonnage)
                  <br />
                  ✔The purpose for which the vehicle is us
                  <br />
                  ✔The geographical area in which it is used
                  <br />
                  <strong>(IV) Personal Accident Insurance</strong> <br />
                  ✔The exact nature of occupation
                  <br />
                  ✔Ag
                  <br />
                  ✔Height and weight
                  <br />
                  ✔Physical disabilities etc.
                  <br />
                  <strong>(V) Health Insurance</strong> <br />
                  ✔Any operations undergone
                  <br />
                  ✔If suffering from Diabetes or Hypertension
                  <br />
                  <strong>(VI) Common features</strong> <br />
                  ✔The fact that previous insurers had rejected the proposal or
                  charged extra premium, or cancelled, or refused to renew the
                  policy
                  <br />
                  ✔Previous losses suffered by the proposer
                  <br />
                  {/* <Typography variant="body1" className="mb-2"> */}
                  <strong className="text-red-700 font-bold">Important:</strong>
                  <br />
                  <p>
                    Facts that need not be disclosed [unless asked for by
                    insurer]
                  </p>
                  It is also held that unless there is a specific enquiry by
                  underwriters, the proposer has no obligation to disclose the
                  following facts:
                  <br />
                  (I) Measures implemented to reduce the risk Example: The
                  presence of a fire extinguisher.
                  <br />
                  (II) Facts unknown to the insured Example: An individual, who
                  suffers from high blood pressure but was unaware of it at the
                  time of taking the policy, cannot be charged with
                  non-disclosure of this fact.
                  <br />
                  (III) Facts which could be discovered, by reasonable diligence
                  It is not necessary to disclose every minute material fact.
                  The underwriters must be conscious enough to ask for the same
                  if they require further information
                  <br />
                  (IV) Matters of law: Everybody is supposed to know the law of
                  the land. Example: Municipal laws about storing of explosives
                  <br />
                  (V) About which insurer appears to be indifferent [or has
                  waived the need for further information]. The insurer cannot
                  later disclaim responsibility on grounds that the answers were
                  incomplete.
                  <br />
                  (VI) Facts possible for discovery: Like when a medical
                  examiner on behalf of an insurer takes BP measurements in a
                  medical examination before taking of the policy.
                  <br />
                  <br />
                </li>
                {/* </Typography> */}
                <strong>
                  d) Duty of disclosure in non-life insurance
                </strong>{" "}
                <br />
                In non-life insurance, the contract will stipulate whether
                changes are required to be intimated or not. When an alteration
                is made to the
                <br />
                original contract affecting the risk, the duty of disclosure
                will arise. The duty of disclosing material facts ceases when
                the contract is <br />
                concluded by issue of a cover note or a policy. The duty arises
                again at the time of renewal of the policy,
                <br /> if during the period of the policy; there is any change
                in the risk
                <br />
                <strong className="text-red-700">Example:</strong> <br />
                A house owner has insured the building and its contents.
                <br />
                He goes on a holiday for a week - no material change in the
                facts. However if he builds another floor above and starts a
                beauty parlour, it will considerably alter the risk.
                <br />
                <strong>(V) Health Insurance</strong> <br />
                Let us now consider situations which would involve a breach of
                utmost good faith. Such breach can arise either through
                non-disclosure or
                <br />
                misrepresentation.
                <br />
                <strong>(I) Non-Disclosure</strong> <br />
                ✔Insured is silent in general about material facts because the
                insurer has not raised any specific enquiry
                <br />
                ✔Through evasive answers to questions asked by the insurer
                <br />
                ✔May be inadvertent [occurs without one’s information or
                intention] or because the proposer thought that a fact was not
                material.
                <br />
                In such case it is innocent.] When a fact is intentionally not
                disclosed it is treated as concealment. In this case there is
                intent to deceive.
                <br />
                <strong>(II) Misrepresentation</strong> <br />
                A statement made during negotiation of a contract of insurance
                is called representation. This may be a definite statement of
                fact or a statement
                <br />
                of belief, intention or expectation.
                <br />
                When it is a fact, it is expected to be substantially correct.
                <br />
                When it concerns matters of belief or expectation, it must be
                made in good faith.
                <br />
                <strong>Misrepresentation is of two kinds:</strong> <br />
                <strong>✔Innocent Misrepresentation</strong> relates to
                inaccurate statements, which are made without any fraudulent
                intention e.g. an individual who
                <br />
                occasionally smokes and is not a habitual smoker may not reveal
                the same in the proposal form as he does not think it has any
                bearing on the
                <br /> risk. <br />
                <strong>✔Fraudulent Misrepresentation</strong> are false
                statements made with deliberate intent to deceive the insurer or
                are made recklessly without due <br />
                regard for truth. E.g. a chain smoker may deliberately not
                reveal the fact that he smokes.
                <br />
                <br />
                <strong>3. Insurable interest</strong> <br />
                The existence of ‘insurable interest’ is an essential ingredient
                of every insurance contract and is considered as the legal
                pre-requisite <br />
                for insurance. Let us see how insurance differs from a gambling
                or wager agreement.
                <br />
                <li className="mt-4">
                  <strong>a) Gambling and insurance</strong> <br />
                  Consider a game of cards, where one either loses or wins. The
                  loss or gain happens only because the person enters the bet.
                  The person
                  <br /> who plays the game has no further interest or
                  relationship with the game other than that he might win the
                  game.
                  <br />
                  Betting or, wagering is not legally enforceable in a court of
                  law and thus any contract in pursuance of it will be held to
                  be illegal.
                  <br />
                  In case someone pledges his house if he happens to lose a game
                  of cards, the other party cannot approach the court to ensure
                  its fulfilment
                  <br />
                  Now consider a house and the event of it burning down. The
                  individual who insures his house has a legal relationship with
                  the subject matter
                  <br />
                  of insurance – the house. He owns it and is likely to suffer
                  financially, if it is destroyed or damaged. This relationship
                  of ownership exists
                  <br />
                  independent of whether the fire happens or does not happen,
                  and it is the relationship that leads to the loss. The event
                  [fire or theft] will lead
                  <br />
                  to a loss regardless of whether one takes insurance or not.
                  <br />
                  Unlike a card game, where one could win or lose, a fire can
                  have only one consequence – loss to the owner of the house.
                  <br />
                  The owner takes insurance to ensure that the loss suffered is
                  compensated for in some way.
                  <br />
                  The interest that the insured has in his house or his money is
                  termed as insurable interest. The presence of insurable
                  interest makes an
                  <br />
                  insurance contract valid and enforceable under the law.
                </li>
                <br />
                <strong className="text-red-700">Important</strong> <br />
                <strong>
                  Three essential elements of insurable interest:
                </strong>{" "}
                <br />
                1. There must be property, right, interest, life or potential
                liability capable of being insured.
                <br />
                2. Such property, right, interest, life or potential liability
                must be the subject matter of insurance.
                <br />
                3. The insured must bear a legal relationship to the subject
                matter such that he stands to benefit by the safety of the
                property, right, interest, life or freedom of liability. By the
                same token, he must stand to lose financially by any loss,
                damage, injury or creation of liability.
                <br />
                <strong className="text-red-700">Example</strong> <br />
                Consider the house which Mr. Chandrasekhar has brought with a
                mortgage loan of Rs 15 lakhs from a bank. If he has repaid 12
                lakhs of this
                <br />
                amount, the bank’s interest would be only to the tune of the
                balance three lakhs which is outstanding.
                <br />
                Thus the bank also has an insurable interest financially in the
                house for the balance amount of loan that is <br />
                unpaid and would ensure that it is made a co insured in the
                policy.
                <br />
                <li className="mt-4">
                  {" "}
                  <strong>
                    b) Time when insurable interest should be present
                  </strong>{" "}
                  <br />
                  In case of fire and accident insurance, insurable interest
                  should be present both at the time of taking the policy and at
                  the time of loss.
                  <br />
                  In case of health and personal accident insurance apart from
                  self, family can also be insured by the proposer since he /
                  she stands to incur
                  <br />
                  financial losses if the family meets with an accident or
                  undergoes hospitalisation. However, in marine cargo insurance,
                  insurable interest is <br />
                  required only at the time of loss.
                </li>
              </li>
              <li className="mt-10">
                <strong>4. Proximate cause</strong> <br />
                The last of the legal principles, which applies only to non-life
                insurance, is the principle of proximate cause.
                <br />
                Non-life Insurance contracts provide indemnity only if losses
                that occur are caused by insured perils, which are covered the
                policy.
                <br />
                Determining the actual cause of loss or damage is a fundamental
                step in the consideration of any claim.
                <br />
                NProximate cause is a key principle of insurance and is
                concerned with how the loss or damage actually occurred and
                whether it is indeed as
                <br />
                a result of an insured peril.
                <br />
                Under this rule, insurer looks for the predominant cause which
                sets into motion the chain of events producing the loss, which
                may not
                <br />
                necessarily be the last event that immediately preceded the loss
                i.e. <br />
                it is an event which is closest to, or immediately responsible
                for causing the loss.
                <br />
                <strong className="text-red-700">Definition</strong> <br />
                Proximate cause is defined as the active and efficient cause
                that sets in motion a chain of events which brings about a
                result, without the
                <br />
                intervention of any force started and working actively from a
                new and independent source.
                <br />
                <strong className="text-red-700">Summary</strong> <br />
                a) The process of insurance has four elements (asset, risk, risk
                pooling and an insurance contract).
                <br />
                b) An asset may be anything that confers some benefit and is of
                economic value to its owner.
                <br />
                c) A chance of loss represents risk
                <br />
                d) Condition or conditions that increase the probability or
                severity of the loss are referred to as hazards.
                <br />
                e) The mathematical principle, that makes insurance possible is
                known as principle of risk pooling.
                <br />
                f) The elements of a valid contract include offer and
                acceptance, consideration, legality, capacity of the parties and
                the agreement between parties.
                <br />
                g) Indemnity ensures that the insured is compensated to the
                extent of his loss on the occurrence of the contingent event.
                <br />
                h) Subrogation means the transfer of all rights and remedies,
                with respect to the subject matter of insurance, from the
                insured to the insurer.
                <br />
                i) The principle of contribution implies that if the same
                property is insured with more than one insurance company, the
                compensation paid by all the insurers together cannot exceed the
                actual loss suffered.
                <br />
                j) All insurance contracts are based on the principle of
                Uberrima Fides.
                <br />
                k) The existence of ‘insurable interest’ is an essential
                ingredient of every insurance contract and is considered as the
                legal pre-requisite for insurance.
                <br />
                l) Proximate cause is a key principle of insurance and is
                concerned with how the loss or damage actually occurred and
                whether it is indeed as a result of an insured peril.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700 text-2xl">
                  Self-Examination Questions
                </strong>{" "}
                <br />
                <strong>Question 1</strong> <br />
                <strong>Moral hazard means:</strong> <br />
                (I) Dishonesty or character defects in an individual
                <br />
                (II) Honesty and values in an individual
                <br />
                (III) Risk of religious beliefs
                <br />
                (IV) Hazard of the property to be insured
                <br />
                <strong>Question 2</strong> <br />
                <strong>Risk indicates:</strong> <br />
                (I) Fear of unknown
                <br />
                (II) Chance of loss
                <br />
                (III) Disturbances at public place
                <br />
                (IV) Hazard
                <br />
                <strong>Question 3</strong> <br />
                <strong>
                  ...........means spreading one’s investment in different kinds
                  of assets.
                </strong>{" "}
                <br />
                (I) Pooling
                <br />
                (II) Diversification
                <br />
                (III) Gambling
                <br />
                (IV) Dynamic risk
                <br />
                <strong>Question 4</strong> <br />
                <strong>........is not an example of an asset.</strong> <br />
                (I) House
                <br />
                (II) Sunlight
                <br />
                (III) Plant and machinery
                <br />
                (IV) Motor car
                <br />
                <strong>Question 5</strong> <br />
                <strong>.......is not an example of risk</strong> <br />
                (I) Damage to car due to accident
                <br />
                (II) Damage of cargo due to rain water
                <br />
                (III) Damage to car tyre due to wear and tear
                <br />
                (IV) Damage to property due to fire
                <br />
                <strong>Question 6</strong> <br />
                <strong>Earthquake is an example of:</strong> <br />
                (I) Catastrophic risk
                <br />
                (II) Dynamic risk
                <br />
                (III) Marginal risk
                <br />
                (IV) Speculative risk
                <br />
                <strong>Question 7</strong> <br />
                <strong>
                  Select the most appropriate logical equivalence for the
                  statement.
                </strong>{" "}
                <br />
                <strong>Statement:</strong>Insurance cannot protect an asset
                from loss or damage
                <br />
                (I) True
                <br />
                (II) False
                <br />
                (III) Partially true
                <br />
                (IV) Not necessarily true
                <br />
                <strong>Question 8</strong> <br />
                <strong>
                  .......means transfer of all rights and remedies, with respect
                  to the subject matter of insurance, from insured to insurer.
                </strong>{" "}
                <br />
                (I) Contribution
                <br />
                (II) Subrogation
                <br />
                (III) Legal hazard
                <br />
                (IV) Risk pooling
                <br />
                <strong>Question 9</strong> <br />
                <strong>
                  .......An example of a fact which need not be disclosed unless
                  asked for is by the insurer.
                </strong>
                <br />
                (I) Age of the insured
                <br />
                (II) Presence of fire extinguisher
                <br />
                (III) Heart ailment
                <br />
                (IV) Other insurance details
                <br />
                <strong>Question 10</strong>
                <br />
                <strong>
                  .........is a wrong statement made during negotiation of a
                  contract.
                </strong>
                <br />
                (I) Misrepresentation
                <br />
                (II) Contribution
                <br />
                (III) Offer
                <br />
                (IV) Representation
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700 text-2xl">
                  Answers to Self-Examination Questions
                </strong>
                <br />
                <strong>Answer 1:</strong>The correct option is (I)
                <br />
                <strong>Answer 2:</strong>The correct option is (II)
                <br />
                <strong>Answer 3:</strong>The correct option is (II)
                <br />
                <strong>Answer 4:</strong>The correct option is (II)
                <br />
                <strong>Answer 5:</strong>The correct option is (III)
                <br />
                <strong>Answer 6:</strong>The correct option is (I)
                <br />
                <strong>Answer 7:</strong>:The correct option is (I)
                <br />
                <strong>Answer 8:</strong>The correct option is (II)
                <br />
                <strong>Answer 9:</strong>The correct option is (II)
                <br />
                <strong>Answer 10:</strong>The correct option is (I)
                <br />
              </li>
            </ul>
          </div>
        );

      case "CHAPTER-02":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800 "
            >
              Chapter 2: Documentation
            </Typography>
            <br />
            <Typography variant="h5" className="mt-2 underline font-pt_serif">
              Introduction
            </Typography>
            {/* <Typography variant="body1" className="mb-4 font-pt_serif"> */}
            In the insurance industry, we deal with a large number of forms,
            documents etc. This chapter takes us through the various documents
            and their importance in an insurance contract. It also gives an
            insight to the exact nature of each form, how to fill it and the
            reasons for calling specific information.
            {/* </Typography> */}
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li className="flex items-center gap-2">K. Proposal forms</li>
              <li className="flex items-center gap-2">
                L. Acceptance of the proposal (underwriting)
              </li>
              <li className="flex items-center gap-2">M. Premium receipt</li>
              <li className="flex items-center gap-2">
                N. Cover Notes / Certificate of Insurance / Policy Document M.
                Premium receipt
              </li>
              <li className="flex items-center gap-2">O. Warranties</li>
              <li className="flex items-center gap-2">P. Endorsements</li>
              <li className="flex items-center gap-2">
                Q. Interpretation of policies
              </li>
              <li className="flex items-center gap-2">R. Renewal notice</li>
            </ul>
            <hr className="border-t-2 border-gray-300 my-4" />
            <ul>
              <li>
                After studying this chapter, you should be able to
                <br />
                <br />
                j) Explain the contents of proposal form.
                <br />
                k) Explain the premium receipt.
                <br />
                l) Appreciate and explain cover notes and certificate of
                insurance.
                <br />
                m) Explain terms and wordings in insurance policy document.
                <br />
                n) Interpret the policy warranties and endorsement.
                <br />
              </li>
            </ul>
            <Typography
              variant="h6"
              className="mt-6 text-red-500 text-xl underline"
            >
              A. Proposal forms
            </Typography>
            <ul>
              <li>
                The insurance documentation is provided for the purpose of
                bringing understanding and clarity between insured and
                insurer.There are certain documents that are conventionally used
                in the insurance business. The insurance agent, being the person
                closest to the customer, has to face the customer and clarify
                all doubts about the documents involved and help her in filling
                them up. The insurance company comes to know the customer and
                her insurance needs only from the documents that are submitted
                by customer. They help the insurerto understand the risk better.
                <br />
                <br />
                Agents should understand the purpose of each document involved
                and the importance and relevance of information contained in the
                documents used in insurance.
                <br />
              </li>
              <li>
                <strong>1. Proposal forms</strong>
                <br />
                The first stage of documentation is essentially the proposal
                forms through which the insured informs:
                <br />
                ✔ Who she is,
                <br />
                ✔ What kind of insurance she needs,
                <br />
                ✔ Details of what she wants to insure, and,
                <br />
                ✔ for what period of time
                <br />
                Details would mean the monetary value of and all material facts
                connected with the subject matter of insurance.
                <br />
              </li>
              <li className="mt-8">
                <strong>c) Risk assessment by insurer</strong>
                <strong>
                  ii. “Proposal form” is to be filled in by the proposer
                </strong>
                for insurance, for furnishing all material information required
                by the insurer in respect of a risk, in order to enable the
                insurer to decide:
                <br />
                ✔ Whether to accept or decline and
                <br />
                ✔ in the event of acceptance of the risk, to determine the
                rates, terms and conditions of a cover to be granted
                <br />
                Proposal form contains information which are useful for the
                insurance company to accept the risk offered for insurance. The
                principle of utmost good faith and the duty of disclosure of
                material information begin with the proposal form for insurance.
                <br />
                The duty of disclosure of material information arises prior to
                the inception of the policy, and continues even after the
                conclusion of the contract. (This principle has been discussed
                in Chapter 2 in detail.)
                <br />
              </li>
              <li>
                <strong className="text-red-500">Example:</strong> <br />
                If the insured was required to maintain an alarm or had stated
                that he has an automatic alarm system in his gold jewelry
                showroom, then not only is he required to disclose it, he has to
                ensure the same remains in a working condition throughout the
                policy period. The existence of the alarm is a material fact for
                the insurer who will be accepting the proposal based on these
                facts and pricing the risk accordingly.
                <br />
                Proposal forms are printed by insurers usually with the
                insurance company’s name, logo, address and the class / type of
                insurance / product that it is used for. <br />
                It is customary for insurance companies to add a printed note in
                the proposal form, though there is no standard format or
                practice in this regard.
                <br />
                <strong className="text-red-500">Important:</strong> <br />
                <strong>Material facts:</strong>These are important, essential
                and relevant information for underwriting of the risk to be
                covered by the insurer. In other words, these are facts
                connected with the subject matter of insurance which may
                influence an insurer’s decision in the following:
                <br />
                (I) Accepting or not accepting a risk for insurance,
                <br />
                (II) Fixing the amount of premium to be charged, and
                <br />
                (III) Including special provisions in the contract about the
                conditions under which the risk would be covered and how a loss
                would be payable.
                <br />
                <br />
              </li>
              <li className="mt-8">
                <strong>Declaration in the proposal form:</strong>
                <br />
                Insurance companies usually add a declaration at the end of the
                proposal form to be signed by the insurer. This ensures that the
                insured has filled up the form accurately and understood the
                facts given therein, so that at the time of a claim there is no
                scope for disagreements, on account of misrepresentation of
                facts. This serves the main principle of utmost good faith on
                the part of the insured.
                <br />
                <strong className="text-red-500">Example:</strong>
                <br />
                <strong>Examples of such declarations are:</strong>
                <br />
                ‘I/We hereby declare and warrant that the above statements are
                true and complete in all respects and that there is no other
                information which is relevant to the application for insurance
                that has not been disclosed to you.’
                <br />
                ‘I/We agree that this proposal and the declarations shall be the
                basis of the contract between me/us and (insurer’s name).’
              </li>
              <li className="mt-8">
                <strong>d) Nature of questions in a proposal form</strong>
                <br />
                The number and nature of questions in a proposal form vary
                according to the class of insurance concerned.
                <br />
                <strong>(I) Fire insurance</strong>proposal forms are usually
                used for relatively simple / standard risks like houses, shops
                etc. For large industrial risks, inspection of the risk is
                arranged by insurer before acceptance of the risk. Special
                questionnaire are sometimes used in addition to the proposal
                form to gather specific information.
                <strong>
                  Fire insurance proposal form seeks, among other things, the
                  description of the property which would include the following
                  information:
                </strong>
                <br />
                ✔ Construction of external walls and roof, number of story
                <br />
                ✔ Occupation of each portion of the building
                <br />
                ✔ Process of manufacture
                <br />
                ✔ The sums proposed for insurance
                <br />
                ✔ The period of insurance, etc.
                <br />
                <strong>(II) For motor insurance,</strong>questions are asked
                about the vehicle, its operations, make and carrying capacity,
                how it is managed by the owner and related insurance history.
                <br />
                <strong>(III) In personal lines</strong>like health, personal
                accident and travel insurance, proposal forms are designed to
                get information about the proposer’s health, way of life and
                habits, pre-existing health conditions, medical history,
                hereditary traits, past insurance experience etc.
                <strong>(IV) In other miscellaneous insurances</strong>,proposal
                forms are compulsory and they incorporate a declaration which
                extends the common law duty of good faith.
                <br />
              </li>
              <li className="mt-8">
                <strong>e) Elements of a proposal</strong>
                <br />
                <strong>(I) Proposer’s name in full</strong>
                <br />
                The proposer should be able to identify herself unambiguously.
                It is important for the insurer to know with whom the contract
                has been entered, so that the benefits under the policy would be
                received only by the insured. Establishing identity is important
                even in cases where someone else may have acquired an interest
                in the risk insured (like a mortgagee, bank or legal heirs in
                case of death) and has to make a claim.
                <br />
                <strong>(II) Proposer’s address and contact details</strong>
                <br />
                The reasons stated above are applicable for collecting the
                proposer’s address and contact details as well.
                <br />
                <strong>
                  (III) Proposer’s profession, occupation or business
                </strong>
                <br />
                In some cases like health and personal accident insurance, the
                proposer’s profession, occupation or business are of importance
                as they could have a material bearing on the risk.
                <br />
                <strong className="text-red-500">Example:</strong>
                A delivery man of a fast-food restaurant, who has to frequently
                travel on motor bikes at a high speed to deliver food to his
                customers, may be more exposed to accidents than the accountant
                of the same restaurant
                <br />
                <strong>
                  (IV) Details and identity of the subject matter of insurance:
                </strong>
                <br />
                The proposer is required to clearly state the subject matter
                that is proposed for insurance.
                <br />
                <strong className="text-red-500">Important</strong>
                <br />
                <strong>Duty of an intermediary towards prospect</strong>
                <br />
                IRDA regulation states that “An insurer or its agent or other
                intermediary shall provide all material information in respect
                of a proposed cover to the prospect to enable the prospect to
                decide on the best cover that would be in his or her interest.
                <br />
                Where the prospect depends upon the advice of the insurer or his
                agent or an insurance intermediary, such a person must advise
                the prospect dispassionately.
                <br />
                Where, for any reason, the proposal and other connected papers
                are not filled by the prospect, a certificate may be
                incorporated at the end of proposal form from the prospect that
                the contents of the form and documents have been fully explained
                to him and that he has fully understood the significance of the
                proposed contract.”
              </li>
              <li className="mt-8">
                <strong>B. Acceptance of the proposal (underwriting)</strong>
                <br />
                <p>
                  We have seen that a completed proposal form broadly gives the
                  following information:
                </p>
                <br />
                ✔ Details of the insured
                <br />
                ✔ Details of the subject matter
                <br />
                ✔ Type of cover required
                <br />
                ✔ Details of the physical features both positive and negative -
                including type and quality of construction, age, presence of
                firefighting equipment’s, the type of security etc.,
                <br />
                ✔ Previous history of insurance and loss
                <br />
                <p>
                  The insurer may also arrange for pre-inspection survey of the
                  risk before acceptance, depending on the nature and value of
                  the risk. Based on the information available in the proposal
                  and in the risk inspection report, additional questionnaire
                  and other documents, the insurer takes the decision. The
                  insurer then decides about the rate to be applied to the risk
                  factor and calculates the premium based on various parameters,
                  which is then conveyed to the insured.
                </p>
                <br />
                <p>
                  Proposals are processed by the insurer with speed and
                  efficiency and all decisions thereof are communicated by it in
                  writing within a reasonable period.
                </p>
                <strong className="text-red-700">Definition</strong>
                <br />
                <strong>Underwriting: As per guidelines,</strong> the company
                has to process the proposal within 15 days’ time. The agent is
                expected to keep track of these timelines, follow up internally
                and communicate with the prospect / insured as and when required
                by way of customer service. This entire process of scrutinizing
                the proposal and deciding about acceptance is known as
                underwriting.
              </li>
              <li className="mt-8">
                <strong className="text-red-700">C. Premium receipt</strong>
                <br />
                <strong className="text-red-700">Definition</strong>
                <br />
                <strong>Premium </strong> is the consideration or amount paid by
                the insured to the insurer for insuring the subject matter of
                insurance, under a contract of insurance.
                <br />
                <strong>
                  3. Payment of Premium in Advance (Section 64 VB of Insurance
                  Act, 1938) As per Insurance Act,{" "}
                </strong>
                premium is to be paid in advance, before the inception date of
                the insurance contract. This is an important provision, which
                ensures that only when the premium is received by the insurance
                company, a valid insurance contract can be completed and the
                risk can be assumed by the insurance company. This section is a
                special feature of non-life insurance industry in India.
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                a) Section 64 VB of the Insurance Act-1938 provides that no
                insurer shall assume any risk unless and until the premium is
                received in advance or is guaranteed to be paid or a deposit is
                made in advance in the prescribed manner.
                <br />
                b) Where an insurance agent collects a premium on a policy of
                insurance on behalf of an insurer, he shall deposit with or
                dispatch by post to the insurer the premium so collected in full
                without deduction of his commission within twenty-four hours of
                the collection excluding bank and postal holidays.
                <br />
                c) It is also provided that the risk may be assumed only from
                the date on which the premium has been paid in cash or by
                cheque.
                <br />
                d) Where the premium is tendered by postal or money order or
                cheque sent by post, the risk may be assumed on the date on
                which the money order is booked or the cheque is posted as the
                case may be.
                <br />
                e) Any refund of premium which may become due to an insured on
                account of the cancellation of policy or alteration in its terms
                and conditions or otherwise, shall be paid by the insurer
                directly to the insured by a crossed or order cheque or by
                postal / money order and a proper receipt shall be obtained by
                the insurer from the insured, and such refund shall in no case
                be credited to the account of the agent.
                <br />
              </li>
              <li className="mt-8">
                <strong>4. Method of payment of premium</strong>
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                <p>
                  The premium to be paid by any person proposing to take an
                  insurance policy or by the policyholder to an insurer may be
                  made in any one or more of the following methods:
                </p>
                <br />
                a) Cash
                <br />
                b) Any recognised banking negotiable instrument such as cheques,
                demand drafts, pay order, banker’s cheques drawn on any schedule
                bank in India;
                <br />
                c) Postal money order;
                <br />
                d) Credit or debit cards;
                <br />
                e) Bank guarantee or cash deposit;
                <br />
                f) Internet;
                <br />
                h) Direct credits via standing instruction of proposer or the
                policyholder or the life insured through bank transfers;
                <br />
                <p>
                  (I) Any other method or payment as may be approved by the
                  Authority from time to time;
                </p>
                <br />
                As per IRDA Regulations, in case the proposer / policyholder
                opts for premium payment through net banking or credit / debit
                card, the payment must be made only through net banking account
                or credit / debit card issued on the name of such proposer /
                policyholder.
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  D. Cover Notes / Certificate of Insurance / Policy Document
                </strong>
                <br />
                After underwriting is completed it may take some time before the
                policy is issued.
                <strong>
                  Pending the preparation of the policy or when the negotiations
                  for insurance are in progress and it is necessary to provide
                  cover on a provisional basis or when the premises are being
                  inspected for determining the actual rate applicable,
                </strong>{" "}
                a cover note is issued to confirm protection under the policy.
                It gives description of cover. Sometimes, insurers issue a
                letter confirming the provisional insurance cover instead of a
                cover note.
                <br />
                Although the cover note is not stamped, the wording of the cover
                note makes it clear that it is subject to the usual terms and
                conditions of the insurers' policy for the class of insurance
                concerned. If the risk is governed by any warranties, then the
                cover note would state that the insurance is subject to such
                warranties. The cover note is also made subject to special
                clauses, if applicable e.g. Agreed Bank Clause, Declaration
                Clause etc.
                <br />
                <strong>A cover note would incorporate the following:</strong>
                <br />
                a) Name and address of insured
                <br />
                b) Sum insured
                <br />
                c) Period of insurance
                <br />
                d) Risk covered
                <br />
                e) Rate and premium: if rate is not known, the provisional
                premium
                <br />
                f) Description of the risk covered: for example a fire cover
                note would indicate identification particulars <br />
                of the building, its construction and occupancy.
                <br />
                g) Serial number of the cover note
                <br />
                h) Date of issue
                <br />
                i) Validity of cover note is usually for a period of a fortnight
                and rarely up to 60 days
                <br />
              </li>

              <li>
                <strong>
                  Cover notes are used predominantly in marine and motor classes
                  of business.
                </strong>
                <br />
                <strong>1. Marine Cover Notes</strong>
                <br />
                These are normally issued when details required for the issue of
                policy such as name of the steamer, number of packages, or exact
                value etc. are not known. Even in respect of exports, a cover
                note may be issued e.g. a certain quantity of cargo meant for
                shipment is sent by the exporter to the docks. It may happen
                that, owing to difficulty of securing adequate shipping space,
                shipment of the cargo by the intended vessel does not take
                place. The quantity therefore, that may be sent by a particular
                vessel cannot be known. In the circumstances, a cover note may
                be required which is to be followed subsequently by the issue of
                regular policy when full details are available and made known to
                the insurance company.
                <br />
                <strong>
                  Marine cover note may be worded along the following lines:
                </strong>
                <br />
                i. Marine Cover Note Number
                <br />
                ii. Date of issue
                <br />
                iii. Name of the insured
                <br />
                iv. Valid up to
                <br />
                <li className="mt-8">
                  <strong>2. Motor Cover Notes</strong>
                  <br />
                  <p>
                    These are to be issued in the form prescribed by the
                    respective companies the operative clause of a motor cover
                    note may read as follows:
                  </p>
                  <br />
                  “The insured described in the form, referred to below, having
                  proposed for insurance in respect of the Motor Vehicle(s)
                  described therein and having paid the sum of Rs….as premium
                  the risk is hereby held covered under the terms of the
                  company’s usual form of……Policy applicable thereto (subject to
                  any Special Conditions mentioned below) unless the cover be
                  terminated by the Company by notice in writing in which case
                  the insurance will thereupon cease and a proportionate part of
                  the premium otherwise payable for such insurance will be
                  charged for the time the company had been on risk.”
                  <br />
                  <strong>
                    The Motor Cover Note generally contains the following
                    particulars:
                  </strong>
                  <br />
                  a) Registration mark and number, or description of the
                  vehicles insured / cubic capacity / carrying capacity / make /
                  year of manufacture, engine number, chassis number
                  <br />
                  b) Name and address of the insured
                  <br />
                  c) Effective date and time of commencement of insurance for
                  the purpose of the Act. Time……, Date……
                  <br />
                  d) Date of expiry of insurance
                  <br />
                  e) Persons or classes of persons entitled to drive
                  <br />
                  f) Limitations as to use
                  <br />
                  g) Additional risks, if any
                  <br />
                  <p>
                    The Motor Cover Note incorporates a certificate to the
                    effect that it is issued in accordance with the provisions
                    of Chapters X and XI of the Motor Vehicles Act, 1988.
                  </p>
                  <br />
                  <strong className="text-red-700">Important</strong>
                  <br />
                  The validity of the Cover Note may be extended for a further
                  period of 15 days at a time, but in, but in no case the total
                  period of validity of a Cover Note shall exceed two months.
                  <br />
                </li>
              </li>

              <li className="mt-8">
                <strong>3. Certificate of Insurance – Motor Insurance</strong>
                <br />
                A certificate of insurance provides existence of insurance in
                cases where proof may be required. For instance in motor
                insurance, in addition to the policy, a certificate of insurance
                is issued as required by the Motor Vehicles Act. This
                certificate provides evidence of insurance to the Police and
                Registration Authorities. A specimen certificate for private
                cars is reproduced below, showing salient features.
                <br />
                <li className="mt-8">
                  <strong className="text-red-600">E. Warranties</strong>
                  <br />
                  Warranties are used in an insurance contract to limit the
                  liability of the insurer under a contract. Insurers
                  incorporate appropriate warranties to reduce the hazard. With
                  a warranty, one party to the insurance contract, the insured,
                  undertakes certain obligations that need to be complied within
                  a certain period of time and the liability of the insurer
                  depends on the insured’s compliance with these obligations.
                  Warranties play an essential role in managing and improving
                  the risk.
                  <br />
                  <strong>
                    A warranty is a condition expressly stated in the policy
                    which has to be literally complied with for validity of the
                    contract. Warranty is not a separate document.
                  </strong>
                  <br />
                  It is part of both cover notes and policy document. It is a
                  condition precedent to the contract. It must be observed and
                  complied with strictly and literally, irrespective of the fact
                  whether it is material to the risk or not. If a warranty is
                  breached, the policy becomes voidable at the option of the
                  insurers even when it is clearly established that the breach
                  has not caused or contributed to a particular loss. However,
                  in practice, if the breach of warranty is of a purely
                  technical nature and does not, in any way, contribute to or
                  aggravate the loss, (losses can be treated as non-standard
                  claims and settled) insurers at their discretion may process
                  the claims according to norms and guidelines as per company
                  policy.
                  <br />
                  <strong>
                    1. Fire Insurances warranties are as given below
                  </strong>
                  <br />
                  <p>
                    Warranted, that no hazards goods shall be stored in the
                    insured premises during the currency of policy.
                  </p>
                  <br />
                  <strong> Silent Risk:</strong>Warranted that no manufacturing
                  activity is carried out in the insured premises for
                  consecutive period of 30 days or more
                  <br />
                  <strong>Cigarette Filter Manufacturing:</strong>Warranted that
                  no solvents having flash point below 300C are used/stored in
                  the premises
                  <br />
                  <strong>2. In Marine Insurance,</strong> a warranty is defined
                  as follows: “a promissory warranty, there is to say, a
                  warranty by which the assured undertake that some particular
                  thing shall or shall not be done, or that some condition will
                  be fulfilled, or whereby he affirms or negatives the existence
                  of a particular state of facts”
                  <br />
                  <strong>3. In Burglary Insurance,</strong> it is warranted
                  that the property is guarded by a watchman for twenty four
                  hours. The rates, terms and conditions of the policy continue
                  to be the same only if the warranties attached to the policy
                  are complied with.
                  <br />
                </li>
              </li>
              <li className="mt-8">
                <strong className="text-red-700">F. Endorsements</strong>
                <br />
                <p>
                  It is the practice of insurers to issue policies in a standard
                  form; covering certain perils and excluding certain others.
                </p>
                <br />
                <strong className="text-red-700">Definition</strong>
                <p>
                  If certain terms and conditions of the policy need to be
                  modified at the time of issuance, it is done by setting out
                  the amendments / changes through a document called
                  endorsement.
                </p>
                <br />
                It is attached to the policy and forms part of it. The policy
                and the endorsement together constitute the evidence of the
                contract. Endorsements may also be issued during the currency of
                the policy to record changes / amendments.
                <br />
                Whenever material information changes, the insured has to advice
                the insurance company who will take note of this and incorporate
                the same as part of the insurance contract through the
                endorsement. Endorsements normally required under a policy
                related to:
                <br />
                a) Variations /changes in sum insured
                <br />
                b) Change of insurable interest by way of sale, mortgage, etc.
                <br />
                c) Extension of insurance to cover additional perils / extension
                of policy period
                <br />
                d) Change in risk, e.g. change of construction, or occupancy of
                the building in fire insurance
                <br />
                e) Transfer of property to another location
                <br />
                f) Cancellation of insurance
                <br />
                g) Change in name or address etc.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  G. Interpretation of policies
                </strong>
                <br />
                Contracts of insurance are expressed in writing and the
                insurance policy wordings are drafted by insurers. These
                policies have to be interpreted according to certain
                well-defined rules of construction or interpretation which have
                been established by various courts. The most important rule of
                construction is that the intention of the parties must prevail
                and this intention is to be looked for in the policy itself. If
                the policy is issued in an ambiguous manner, it will be
                interpreted by the courts in favour of the insured and against
                the insurer on the general principle that the policy was drafted
                by the latter.
                <br />
                <strong>
                  Policy wordings are understood and interpreted as per the
                  following rules:
                </strong>
                <br />
                a) An express condition overrides an implied condition except
                where there is inconsistency in doing so.
                <br />
                b) In the event of a contradiction in terms between the standard
                printed policy form and the typed or handwritten parts, the
                typed or handwritten part is deemed to express the intention of
                the parties in the particular contract, and their meaning will
                overrule those of the original printed words.
                <br />
                c) If an endorsement contradicts other parts of the contract the
                meaning of the endorsement will prevail as it is the later
                document.
                <br />
                d) Clauses in italics over-ride the ordinary printed wording
                where they are inconsistent.
                <br />
                e) Clauses printed or typed in the margin of the policy are to
                be given more importance than the wording within the body of the
                policy.
                <br />
                f) Clauses attached or pasted to the policy override both
                marginal clauses and the clauses in the body of the policy.
                <br />
                g) Printed wording is over-ridden by typewritten wording or
                wording impressed by an inked rubber stamp.
                <br />
                h) Handwriting takes precedence over typed or impressed wording.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">H. Renewal Notice</strong>
                <br />
                <strong>
                  Most of the non-life insurance policies are insured on annual
                  basis.
                </strong>
                <br />
                Although there is no legal obligation on the part of insurers to
                advise the insured that his policy is due to expire on a
                particular date, yet as a matter of courtesy and healthy
                business practice, insurers issue a renewal notice in advance of
                the date of expiry, inviting renewal of the policy. The notice
                incorporates all the relevant particulars of the policy such as
                sum insured, the annual premium, etc. It is also the practice to
                include a note advising the insured that he should intimate any
                material alterations in the risk
                <br />
                <strong>
                  In motor renewal notice, for example, the insured’s attention
                  is to be drawn to revise the sum insured (i.e. the insured’s
                  declared value of the vehicle) in the light of current
                  requirements
                </strong>
                <br />
                <p>
                  The insured’s attention is also to be invited to the statutory
                  provision that no risk can be assumed unless the premium is
                  paid in advance.
                </p>
                <br />
                <strong className="text-red-700">Annexures</strong>
              </li>

              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="https://www.notioninsurance.in/newportal/index/4.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="https://www.notioninsurance.in/newportal/index/5.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="https://www.notioninsurance.in/newportal/index/6.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="https://www.notioninsurance.in/newportal/index/7.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="  https://www.notioninsurance.in/newportal/index/8.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="   https://www.notioninsurance.in/newportal/index/9.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src=" https://www.notioninsurance.in/newportal/index/10.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="https://www.notioninsurance.in/newportal/index/11.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-auto h-full w-[70%]"
                    src="  https://www.notioninsurance.in/newportal/index/12.jpg"
                    alt=""
                  />
                </div>
              </div>
            </ul>
          </div>
        );

      case "CHAPTER-03":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800 "
            >
              Chapter 3: THEORY AND PRACTICE OF PREMIUM RATING
            </Typography>
            <Typography variant="h5" className="mt-2 underline font-pt_serif">
              Introduction
            </Typography>
            In this chapter, we shall learn about the basic principles that
            govern the working of insurance. The chapter is divided into two
            sections: the elements of insurance and the special features of an
            insurance contract.
            <br />
            <br />
            <Typography variant="h6" className="mt-4 underline font-bold ">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">A. Underwriting basics</strong>
                <br />
                <strong className="text-red-700">B. Ratemaking basics</strong>
                <br />
                <strong className="text-red-700">C. Rating factors</strong>
                <br />
                <strong className="text-red-700">D. Sum insured</strong>
                <br />
                <li className="mt-8">
                  After studying this chapter, you should be able to:
                  <br />
                  1. Define the basics of underwriting
                  <br />
                  2. Explain the basics of ratemaking
                  <br />
                  3. Determine ‘Sum Insured’ under various policies.
                </li>
                <br />
              </li>
              <li>
                <strong className="text-red-700">A. Underwriting basics</strong>
                In the previous chapters we have seen that the concept of
                insurance involves managing risk through pooling. Insurers
                create a pool consisting of premiums that are made by several
                individuals / commercial / industrial firms / organizations.
                <br />
                The amount of premium to be paid by each depends on a rate,
                which is determined by two factors;
                <br />
                ✔ The probability of loss due to a loss event (caused by an
                insured peril) and
                <br />
                ✔ The estimated amount of loss that may arise due to the loss
                even
                <br />
                <strong className="text-red-700">Definition</strong>
                <br />
                <strong>
                  Underwriting is the process of determining whether a risk
                  offered for insurance is acceptable, and if so, at what rate,
                  terms and conditions the insurance cover will be accepted.
                </strong>
                <br />
              </li>
              <li>
                Underwriting, in a technical sense, comprises the following
                steps:
                <br />
                i. Assessment and evaluation of hazard and risk in terms of
                frequency and severity of loss
                <br />
                ii. Formulation of policy coverage and terms and conditions
                <br />
                iii. Fixing of rates of premium
                <br />
              </li>

              <li>
                <strong className="text-red-700">
                  a) Underwriting, equity and business sustainability
                </strong>
                <br />
                <p>
                  The need for careful underwriting and risk classification in
                  insurance arises from the simple fact that not all risks are
                  equal. Each risk thus needs to be appropriately assessed and
                  priced in accordance with the likelihood of loss occurrence
                  and severity
                </p>
                <br />
                The main features of underwriting are as follows
                <br />
                i. To identify risk based upon the characteristics
                <br />
                ii. To determine the level of risk presented by the proposer
                <br />
                iii. To ensure that the insurance business is conducted on sound
                lines
                <br />
                <p>
                  The objectives of underwriting are achieved, in short, by
                  deciding the level of acceptability, adequacy of premium and
                  other terms.
                </p>
                <br />
              </li>
              <li>
                <strong className="text-red-700">B. Ratemaking basics</strong>
                <br />
                <p>
                  Insurance is based on transfer of risk to the insurer. By
                  purchasing an insurance policy, the insured is able to reduce
                  the impact of financial losses arising from the peril against
                  which the property is insured.
                </p>
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                <p>
                  If one drives a car, there is a risk that it may be damaged in
                  an accident. If the owner has motor insurance, in the event
                  the car gets damaged, the insurance company will pay for the
                  repairs.
                </p>
                <br />
                <strong className="text-red-700">C. Rating factors</strong>
                <br />
                <p>
                  The relevant elements that are used to add up the rates and
                  make the rating plan are referred to as rating factors.
                  Insurers use ‘rating factors’ to determine the risk and to
                  decide the price they will charge.
                </p>
                <br />
                ✔ The insurer uses his assessments to firstly establish a base
                rate
                <br />
                ✔ Insurer then adjusts this rate with discounts applied for
                positive features such as superior fire protection on property
                risk and loadings applied for adverse features such as drivers
                with poor conviction records on motor risks
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">D. Sum Insured</strong>
                <br />
                It’s the maximum amount that an insurance company will indemnify
                as per policy condition. An insured has to be very careful in
                choosing the limit of indemnity, for that is the maximum amount
                that would be reimbursed at the time of claim.
                <br />
                The sum insured is always fixed by the insured and is the limit
                of liability under the policy. It is an amount on which rate is
                applied to arrive at the premium under the policy.
                <br />
                It should be representative of the actual value of the property.
                If there is over insurance, no benefit accrues to the insured
                and in case of under insurance, the claim gets proportionately
                reduced.
                <br />
              </li>
              <li className="mt-4">
                {" "}
                <strong>1. Deciding the sum insured</strong>
                <li></li>
                <br />
                Under each class of business the insured should be advised of
                the following points which have to be borne in mind while
                deciding the sum insured:
                <br />
                <strong>a) Personal accident insurance:</strong>The sum insured
                offered by a company can be a fixed amount or it can also be
                based on the insured’s income. Some insurance companies may give
                a benefit equal to 60 times or 100 times of the insured’s
                monthly income for a particular disability. There could be an
                upper limit or ‘cap’ on the maximum amount. Compensations can
                vary from company to company. In group personal accident
                policies the sum insured may be fixed separately for each
                insured person or may be linked to emoluments payable to the
                insured person.
                <br />
                <strong> b) Health insurance:</strong>
                The sum insured is available within a certain range. It depends
                on the age bracket too. Let us say for age group of 25 -40 years
                the insurer may offer a sum insured of 10 lakhs or higher and
                for age group of 3 months to 5 years it could be 2 lakhs or so.
                <br />
                <strong>c) Motor insurance:</strong>In case of motor insurance
                the sum insured is the insured's declared value [IDV]. It is the
                value of the vehicle, which is arrived at by adjusting the
                current manufacture's listed selling price of the vehicle with
                depreciation percentage as prescribed in the IRDA regulations.
                Manufacturer's listed selling price will include local duties /
                taxes excluding registration and insurance.
                <br />
                <strong> d) Fire insurance:</strong>
                In fire insurance the sum insured may be fixed on the basis of
                market value or reinstatement value for buildings / plant and
                machinery and fixtures. Contents are covered on the basis of
                their market value which is cost of the item less depreciation.
                <br />
                <strong>e) Stocks insurance:</strong>In case of stocks, sum
                insured is their market value. The insured will be reimbursed at
                the cost at which these stocks can be purchased in the market to
                replace the damaged raw material, after the loss.
                <br />
                <strong>f) Marine cargo insurance:</strong>It is an agreed
                valued policy and the sum insured is as per the agreement
                between insurer and insured at the time of contract. Normally it
                would consist of the sum of cost of the commodity plus Insurance
                + freight i.e. CIF value.
                <br />
                <strong>g) Marine hull insurance:</strong>In marine hull
                insurance, the sum insured is the value, agreed between the
                insured and the insurer at the beginning of the contract. This
                value would be arrived at by a certified valuer after an
                inspection of the hull/ship.
                <strong>h) Liability insurance:</strong>In case of liability
                policies, the sum insured is the liability exposure of the
                industrial units based on the degree of exposure, geographical
                spread. Additional legal costs and expenses may also form part
                of claim compensation. The sum insured is decided by the insured
                based on the above parameters.
                <br />
              </li>
            </ul>
          </div>
        );

      case "CHAPTER-04":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 4: PERSONAL AND RETAIL INSURANCE
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            In the previous chapters we have learnt various concepts and
            principles related to general insurance. General insurance products
            are classified differently in different markets. Some classify them
            as property, casualty and liability. Elsewhere, they are grouped as
            fire, marine, motor and miscellaneous. In this chapter, common
            products such as personal accident, health, travel, home and shop
            keepers and motor insurance that are bought by such retail customers
            are discussed.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">
                  A. Householder’s insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  B. Shopkeeper’s Insurance
                </strong>
                <br />
                <strong className="text-red-700">C. Motor Insurance</strong>
                <br />
              </li>
              <li className="mt-5">
                <strong>
                  After studying this chapter, you should be able to:
                </strong>
                <br />
                1. Explain householder’s insurance
                <br />
                2. Prepare shop insurance cover
                <br />
                3. Discuss motor insurance
                <br />
              </li>
              <li className="mt-7">
                <strong className="text-red-700">
                  A. Householder’s Insurance
                </strong>
                <br />
                <strong>a. Retail Insurance Products</strong>
                <br />
                There are some insurance products that are purchased for
                individuals for covering certain interests. Though small
                commercial or business interests could be there for such
                insurances, these are generally sold to individuals. In some
                markets these are called ‘small ticket’ policies or ‘retail
                policies’ or ‘retail products’. Insurances of the home, motor
                cars, two-wheelers, small businesses like shops etc. fall under
                this category. These products are usually sold by the same
                agents / distribution channels that deal with personal lines of
                insurance as the buyers also are essentially from th e same
                consumer segment.
                <br />
                <br />
                <strong>b. Householder’s Insurance</strong>
                <br />
                <strong>a) Why do we need householder’s insurance?</strong>
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                <strong>‘Named Perils Insurance Policy’</strong>
                <br />
                (I) A householder’s insurance policy only provides coverage on
                losses incurred to the insured’s property from hazards or events
                named in the policy. The perils covered will be clearly spelt
                out.
                <br />
                (II) Named peril policies may be purchased as a less expensive
                alternative to a comprehensive coverage or broad policies, which
                are policies that tend to offer coverage to most perils.
                <br />
                <strong>'All Risks'</strong>
                <br />
                (I) "All risks" means that any risk that the contract does not
                specifically excludes is automatically covered. For example, if
                an all-risks house holder policy does not expressly exclude
                flood coverage, then the house will be covered in the event of
                flood damage.
                <br />
                (II) A type of insurance coverage that can exclude only risks
                that have been specifically outlined in the contract. What is
                excluded will be clearly spelt out.
                <br />
                (III) All-risks insurance is obviously the most comprehensive
                type of coverage available. It is therefore priced
                proportionately higher than other types of policies, and the
                cost of this type of insurance should be measured against the
                probability of a claim.
                <br />
              </li>
              <li>
                <strong>
                  b) What is covered in Householder’s Insurance Policies?
                </strong>
                <br />
                <strong className="text-red-700">Information</strong>
                <br />
                <strong>Package or Umbrella policies</strong>
                <br />
                (I) Package or umbrella covers give, under a single document, a
                combination of covers.
                <br />
                (II) For instance there are covers such as Householder’s Policy,
                Shopkeeper’s Policy, Office Package Policy etc. that, under one
                policy, seek to cover various physical assets including
                buildings, contents etc.
                <br />
                (III) Such policies may also include certain personal lines or
                liability covers.
                <br />
                (IV) Package covers could have common terms and conditions for
                all sections as also specific terms for specific sections of the
                policy.
                <br />
              </li>
              <li>
                <strong>c) Sum Insured and Premium</strong>
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                <strong>How does one fix the Sum Insured?</strong>
                <br />
                (I) Generally, there are two methods of fixing the Sum Insured.
                One is Market Value (MV) and the other is Reinstatement Value
                (RIV). In the case of M.V., in the event of a loss, depreciation
                is levied on the asset depending on its age. Under this method,
                the insured is not paid amount sufficient to replace the
                property.
                <br />
                (II) In the RIV method, the insurance company will pay the cost
                of replacement subject to ceiling of sum insured. Under this
                method, no depreciation is levied. One condition is that the
                damaged asset should be repaired / replaced in order to get the
                claim. It may be noted that RIV method is allowed only for fixed
                assets and not for other assets like stocks and stocks in
                process.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  B. Shopkeeper’s Insurance
                </strong>
                <br />
                Trading is an economic activity and every entrepreneur would
                want her / his business venture to be profitable. Shops are
                sources of revenue for many in our country. It not only provides
                income but is also an asset. The shop owner would like to be
                free of all worries unrelated to trading that could hamper her /
                his business. An unfortunate incident could severely affect
                business finances or operations and lead to bankruptcy or
                closure. A shop owner is not a corporate house that has large
                reserves of money to restart business. A single mishap may lead
                to closure of her / his shop and could probably ruin her / his
                family. There may be bank loans also to repay.
                <br />
                <strong>
                  Shopkeeper’s Insurance policies are devised to cover many of
                  such aspects of commercial shop/retail business.
                </strong>
                There are policies that are customised to cover specific
                interests of many types of shops such as antique shop,
                barbershop, beauty parlour, bookstore, department store, dry
                cleaners, gift shop, pharmacy, stationery shop, toy shop,
                apparel store etc.
                <br />
                <strong>1. What does shopkeeper’s insurance cover?</strong>
                <br />
                The policy can be tailored to provide cover to protect the
                specific areas of retail business. It usually covers damage to
                the shop structure and contents due to fire, earthquake,
                flooding o r malicious damage; and burglary. Shop insurance can
                also include business interruption protection. This will cover
                any lost income or additional expenditure in the event of an
                unexpected claim . The coverage can be selected by the insured
                depending on her / his range of activities.
                <br />
                <strong>2. Sum Insured and Premium</strong>
                <br />
                Industrial units or offices will maintain books of accounts
                showing therein value of assets, therefore, it may not be
                difficult to arrive at the sum insured. In the case of shop and
                house this may not be always possible.
                <br />
                As already stated under householder’s insurance, generally,
                there are two methods of fixing the sum insured, viz. market
                value and reinstatement / replacement value.
                <br />
                For additional coverage like money, baggage, personal accident
                the premium would depend on the sum insured and the covers opted
                for.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">C. Motor Insurance</strong>
                <br />
                Think of a situation where you have bought a new car using all
                your savings and taken it for a drive. Out of nowhere, a dog
                comes in your way and to avoid hitting it, you swerve sharply,
                go over the divider and hit another car and injure the other
                person. So the outcome of a single incident has resulted in
                damage to own car, public property and another car as also
                injury to another person.
                <br />
                In this scenario, if you do not have a car insurance, you may
                end up paying far more than what it costs to purchase your car.
                <br />
                ✔ Do you have that much money to pay?
                <br />
                ✔ Should the other party’s insurance pay for your actions?
                <br />
                ✔ What if they don't have insurance?
                <br />
                That is why the laws of the land make it mandatory to have car
                insurance. While motor insurance doesn’t prevent these things
                from happening, it provides a financial security blanket for
                you.
                <br />
                Apart from an accident, the car can also be stolen, damaged by
                an accident or destroyed by fire and you would suffer
                financially.
                <br />
                Motor insurance must be taken by a vehicle owner whose vehicle
                is registered in her / his name with the Regional Transport
                Authority in India.
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                <strong>Mandatory Third Party Insurance</strong>
                <br />
                As per the Motor Vehicles Act, 1988, it is mandatory for every
                owner of a vehicle plying on public roads, to take an insurance
                policy, to cover the amount, which the owner becomes legally
                liable to pay as damages to third parties as a result of
                accidental death, bodily injury or damage to property. A
                Certificate of Insurance must be carried in the vehicle as a
                proof of such insurance.
                <br />
              </li>
              <li>
                <strong>1. Motor insurance coverage</strong>
                <br />
                The country has a large vehicle population. A number of new
                vehicles keep coming on to the road every day. Many of them are
                very costly as well. People say that in India, vehicles do not
                get junked, but only keep changing hands. This means that old
                vehicles continue to be on the road and new vehicles get added.
                The area of the roads (the space for driving) is not growing
                correspondingly with the number of vehicles. The number of
                people walking on the road is also increasing. Police and
                hospital statistics say that the number of road accidents in the
                country is increasing. The amount of compensations awarded to
                accident victims by Courts of Law are increasing. Even vehicle
                repair costs are going up.
                <br />
                <strong className="text-red-700">Information</strong>
                <br />
                <strong>‘Third-Party Insurance’</strong>
                <br />
                An insurance policy purchased for protection against the legal
                actions of another party. Third-party insurance is purchased by
                the insured (first party) from an insurance company (second
                party) for protection against another party's claims (third
                party) for liability arising out of the action of the insured.
                Third party insurance is called ‘Liability Insurance’ as well
                <br />
                <strong className="text-red-700">Summary</strong>
                <br />
                a) A householder’s insurance policy only provides coverage on
                losses incurred to an insured property from hazards or events
                named in the policy. The perils covered will be clearly spelt
                out.
                <br />
                b) Householder’s insurance covers the structure and its contents
                against fire, riots, bursting of pipes, earthquakes etc. Apart
                from the structure, it covers the contents against burglary,
                housebreaking, larceny and theft.
                <br />
                c) Package or umbrella covers give, under a single document, a
                combination of covers.
                <br />
                d) For a householder’s insurance policy generally there are two
                methods of fixing the sum insured: Market Value (MV) and
                Reinstatement Value (RIV).
                <br />
                e) Shopkeeper’s insurance usually covers damage to the shop
                structure and contents due to fire, earthquake, flooding or
                malicious damage; and burglary. Shop insurance can also include
                business interruption protection.
                <br />
                f) Motor insurance covers the loss of vehicles and the damages
                to them due to accidents and some other reasons. Motor insurance
                also covers the legal liability of vehicle owners to compensate
                the victims of the accidents caused by their vehicles.
                <br />
              </li>
            </ul>
          </div>
        );

      case "CHAPTER-05":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 5:COMMERCIAL INSURANCE
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            In the previous chapter we considered various kinds of insurance
            products that cover the risks faced by individuals and households.
            There is another set of customers who have other needs for
            protection. These are the commercial or business enterprises or
            firms, who are engaged in or deal with of various kinds of goods and
            services. In this chapter we shall consider the insurance products
            available to cover the risks faced by this segment.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">
                  A. Property / Fire Insurance
                </strong>{" "}
                <br />
                <strong className="text-red-700">
                  B. Business Interruption Insurance
                </strong>
                <br />
                <strong className="text-red-700">C. Burglary Insurance</strong>
                <br />
                <strong className="text-red-700">D. Money Insurance.</strong>
                <br />
                <strong className="text-red-700">
                  E. Fidelity Guarantee Insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  F. Bankers Indemnity Insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  G. Jewelers’ Block Policy
                </strong>
                <br />
                <strong className="text-red-700">
                  H. Engineering Insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  I. Industrial All Risks Insurance
                </strong>
                <br />
                <strong className="text-red-700">J. Marine Insurance</strong>
                <br />
                <strong className="text-red-700">K. Liability policies</strong>
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  A. Property / Fire Insurance
                </strong>
                <br />
                Commercial enterprises are broadly divided into two types
                <br />
                ✔Small and Medium Enterprises [SMEs] and
                <br />
                ✔Large Business Enterprises
                <br />
                Historically, general insurance sector has largely developed by
                catering to the needs of these customers.
                <br />
                Selling general insurance products to commercial enterprises
                calls for a careful matching of insurance products with their
                needs. Agents must have a proper understanding of the products
                available. Let us briefly consider some of these general
                insurance products.
                <br />
                <strong>Property / Fire Insurance</strong>
                <br />
                Fire insurance policy is suitable for commercial establishments
                as well as for the owner of property, one who holds property in
                trust or in commission and for , individuals / financial
                institutions who have financial interest in the property.
                <br />
                All immovable and movable property located at a particular
                premises such as buildings, plant and machinery, furniture,
                fixtures, fittings and other contents, stocks and stock in
                process, including stocks at suppliers / customer's premises,
                machinery temporarily removed from the premises for repairs can
                be insured. Monetary relief is essential to rebuild and renew
                the property damaged to bring back the business to its normal
                course. It is here that fire insurance plays its role.
                <br />
              </li>
              <li className="mt-5">
                <strong>1. What does the Fire policy cover?</strong>
                <br />
                Some of the perils covered by the fire policy are discussed
                below. The fire policy for commercial risks covers the perils
                of:
                <br />
                ✔ Fire
                <br />
                ✔ Lightning
                <br />
                ✔ Explosion / implosion
                <br />
                ✔ Riot strike and malicious damage
                <br />
                ✔ Impact damage
                <br />
                ✔ Aircraft damage
                <br />
                ✔ Storm, tempest, cyclone, typhoon, hurricane, tornado, flood
                and inundation
                <br />
                ✔ Earthquake
                <br />
                ✔ Subsidence and landslide including rock slide
                <br />
                ✔ Bursting and overflowing of water tanks, apparatus and pipes
                <br />
                ✔ Missile testing operations
                <br />
                ✔ Leakages from automatic sprinkler installation
                <br />
                ✔ Bush fire
                <br />
                <br />
                <strong>2. What are the exclusions?</strong>
                <br />
                The exclusions are:
                <br />
                <strong>a) Losses due to excepted perils like</strong>
                <br />
                (I) War and war like activities
                <br />
                (II) Nuclear perils
                <br />
                (III) Ionisation and radiation
                <br />
                (IV) Pollution and contamination losses
                <br />
                <strong>
                  b) Perils that are covered by other policies in General
                  Insurance
                </strong>
                (I) Machinery Breakdown,
                <br />
                (II) Business Interruption
                <br />
                (III) Variants of fire policy
                <br />
                Fire policies are generally issued for a period of 12 months.
                Only for dwellings, insurance companies offer long term
                policies, i.e. for a period over 12 months. In some cases short
                period policies are also issued, to which the short period
                scales are applicable.
                <br />
                <br />
                <strong>3. Market Value or Reinstatement Value Policies</strong>
                <br />
                In the event of a loss, the insurer would normally pay the
                market value [which is the depreciated value]. Under
                Reinstatement Value Policy however, the insurers would pay cost
                of replacement of the damaged property by new property of the
                same kind. The sum insured is required to reflect the new
                replacement value and not the market value as under the normal
                fire policy.
                <br />
                <br />
                <strong>4. Declaration Policy</strong>
                <br />
                Stocks stored in warehouse can be covered by what in termed as a
                declaration policy as such stocks are subject to fluctuation in
                quantity. The sum insured should be the highest value that is
                expected to be stored in the godown during the period of policy.
                On this value a provisional premium is charged. The insured has
                to declare the value of his stocks at agreed intervals, during
                the currency of policy. This is adjustable along with the
                premium at the end of the policy period.
                <br />
                <br />
                <strong>5. Floater Policies</strong>
                Another kind of policy is the Floater Policy. These policies may
                be issued for stocks of goods which are stored at various
                specified locations under one sum insured. Unspecified locations
                are not covered. The premium rate is the highest rate applicable
                to insured’s stocks at any one location with a loading of 10%.
                These are also called fire floater policies as the sum insured
                ‘floats’ over multiple locations.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  B. Business Interruption Insurance
                </strong>
                <br />
                This type of insurance is also known as Consequential Loss
                Insurance or Loss of Profit Insurance
                <br />
                Fire insurance provides indemnity against material or property
                damage or loss suffered to building, plant, machinery fixtures,
                fittings, merchandise goods, etc. by insured perils. This may
                result in total or partial interruption of the insured’s
                business, resulting in various economic losses, during the
                period of interruption.
                <br />
                <strong>1. Coverage under Business Interruption Policy</strong>
                <br />
                Consequential Loss (CL) Policy [Business Interruption (BI)]
                provides indemnity for loss of what is termed as gross profit –
                which includes Net Profit plus Standing Charges along with the
                increased cost of working incurred by the insured to get the
                business back to normalcy, as soon as possible to reduce the
                final loss. The perils covered and conditions are the same as
                those covered under the fire policy.
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                If an earthquake results in damage to the car manufacturer's
                plant, the production loss will result in loss of income to the
                manufacturer. This loss of income along with extra expenses
                incurred can be insured provided it has resulted from a peril
                insured.
                <br />
                This policy can be taken only in conjunction with standard fire
                and special perils policy as claims under this policy are
                admissible only if there is a claim under standard fire and
                special perils policy.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">C. Burglary Insurance</strong>
                <br />
                The policy is meant for business premises like factories, shops,
                offices, warehouses and godowns which may contain stocks, goods,
                furniture fixtures and cash in a locked safe which can be
                stolen. The scope of cover is clearly expressed in the policy.
                <br />
                <br />
                <strong>1. Coverage of Money Insurance</strong>
                Money insurance policy is designed to cover the losses that may
                occur while cash, cheques / postal orders / postal stamps are
                being handled. The policy normally provides cover under two
                sections
                <br />
                <br />
                <strong>a) Transit section</strong>
                <br />
                It covers loss of cash as a result of robbery or theft or
                similar actions whilst it is carried outside by the insured or
                her authorised employees.
                <br />
                The transit section specifies two amounts:
                <br />
                (I) Limit per carrying:This is the maximum amount that insurers
                may be required to pay in respect of each loss.
                <br />
                (II) Estimated amount in transit during the policy period:It
                represents the amount to which the rate of premium is to be
                applied to arrive at the amount of premium.
                <br />
                Policies can be issued on “declaration basis”, similar to the
                practice in fire insurance. Insurers thus charge a provisional
                premium on the estimated amount in transit and adjust this
                premium at the time of expiry of the policy, based on actual
                amount in transit during the policy period, as declared by the
                insured.
                <br />
                <br />
                <strong>b) Premises section</strong>
                <br />
                This section covers loss of cash from one’s premises / locked
                safe due to burglary, housebreaking, hold up etc. Other features
                of the policy are normally the same as of burglary insurance (of
                business premises) that we have discussed under Learning Outcome
                C above.
                <br />
                <br />
                <strong>2. Important exclusions</strong>
                <br />
                These include:
                <br />
                a) Shortage due to error or omission,
                <br />
                b) Loss of money that has been entrusted to other than
                authorized person and
                <br />
                c) Riot strike and terrorism: This can be covered as an
                extension by paying an extra premium.
                <br />
                <br />
                <strong> 3. Extensions</strong>
                <br />
                On payment of additional premium the policy may be extended to
                cover:
                <br />
                a) Dishonesty of persons carrying cash,
                <br />
                b) Riot, strike and terrorism risks
                <br />
                c) Disbursement risk, which is the loss suffered during payment
                of wages to employees
                <br />
                On payment of additional premium the policy may be extended to
                cover:
                <br />
                <br />
                <strong>4. Premium</strong>
                <br />
                Premium rate is fixed depending on the insured, cash carrying
                liability of the company at any one time, the mode of
                conveyance, distance involved, safety measures taken etc.
                Premium is adjustable according to actual cash carried
                throughout the year based on declaration made within 30 days of
                expiry of the policy.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  E. Fidelity Guarantee Insurance
                </strong>
                <br />
                Companies suffer financial loss due to what are termed as white
                collar crimes like fraud or dishonesty of their employees.
                Fidelity guarantee insurance indemnifies employers against the
                financial loss suffered by them due to fraud or dishonesty of
                their employees by forgery, embezzlement, larceny,
                misappropriation and default.
                <br />
                <br />
                <strong>1. Coverage under Fidelity Guarantee Insurance</strong>
                <br />
                Cover is granted against a direct pecuniary loss and does not
                include consequential losses.
                <br />
                a) The loss should be in respect of moneys, securities or goods
                <br />
                b) The act should be committed in the course of the duties
                specified;
                <br />
                c) The loss has be discovered within 12 months of expiry of the
                policy or death retirement resignation or dismissal of the
                employee, whichever is earlier
                <br />
                d) No cover is provided in respect of a dishonest employee who
                has been re-employed
                <br />
                <br />
                <strong>2. Types of Fidelity Guarantee Policy</strong>
                <br />
                There are various types of fidelity guarantee policies, as
                discussed below:
                <strong>a) Individual policy</strong>
                <br />
                This type of policy is used where only one individual is to be
                guaranteed. Name, designation of the employee and amount of
                guarantee has to be specified.
                <br />
                <strong>b) Collective policy</strong>
                This policy comprises a schedule listing out the names of those
                employees to whom the guarantee applies, along with a note on
                the duties of each employee and separate individual sums
                insured.
                <br />
                <strong>c) Floating policy or floater</strong>
                In this policy, the names and duties of the individuals to be
                covered are inserted in a schedule, but instead of individual
                amounts of guarantee, a specified amount of guarantee is
                “floated” over the whole group. A claim in respect of any one
                employee will, therefore, reduce the floated guarantee, unless
                the original sum is reinstated by payment of an extra premium.
                <br />
                <strong>d) Positions policy</strong>
                <br />
                This is similar to a collective policy with the difference that
                only the schedule lists out "positions’ that are to be
                guaranteed for a specified amount and the name are not
                mentioned.
                <br />
                <strong>e) Blanket policy</strong>
                <br />
                This policy covers the entire staff without showing names or
                positions. No enquiries about the employees are made by the
                insurers. Such policies are only suitable for an employer with a
                large staff and the organization makes adequate enquiries into
                the antecedents of employees. The references that the employer
                obtains must be available to the insurers in the event of a
                claim. The policy is granted only to large firms of repute.
                <br />
                <br />
                <strong>3. Premium</strong>
                <br />
                The rate of premium depends upon the type of business
                occupation, status of the employee, the system of check and
                supervision.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  F. Bankers Indemnity Insurance
                </strong>
                <br />
                This comprehensive cover was drafted for the banks, NBFC's and
                other institutions who deal with operations involving money,
                considering the special risks faced by them regarding money and
                securities.
                <br />
                <br />
                <strong>1. Coverage under Bankers Indemnity Insurance</strong>
                <br />
                There are different variations to this policy based on the
                requirement of banker.
                <br />
                a) Money securities lost or damaged whilst within the premises
                due to fire, burglary, riot and strike.
                <br />
                b) Loss suffered due to any cause whatsoever including
                negligence of the employees, when the property is carried
                outside the premises in the hands of authorized employees.
                <br />
                c) Forgery or alteration of cheques, drafts, fixed deposit
                receipts etc.
                <br />
                d) Dishonesty of employees with reference to money/securities or
                in respect of goods pledged.
                <br />
                e) Dispatches by registered post parcels.
                <br />
                f) Dishonesty of appraisers.
                <br />
                g) Money lost while in the hands of agents of the bank like
                ‘Janata Agents’, ‘Chhoti Bachat Yojana Agents’.
                <br />
                <br />
                <strong>2. Important exclusions</strong>
                <br />
                These include:
                <br />
                a) Trading losses
                <br />
                b) Negligence
                <br />
                c) software crimes and
                <br />
                d) dishonesty of the partners / directors]
                <br />
                <br />
                <strong>3. Sum insured</strong>
                <br />
                The bank has to fix the sum insured which would usually float
                over the first 5 sections. This is termed as ‘basic sum
                insured’. Additional sum insured can be purchased for section
                (1) and (2) if the basic sum insured is not sufficient. The
                policy also allows one compulsory and automatic reinstatement of
                sum insured by payment of an extra premium
                <br />
                <br />
                <strong>4. Rating</strong>
                <br />
                The premium calculation is based on:
                <br />
                a) Basic sum insured
                <br />
                b) Additional sum insured
                <br />
                c) Number of staff
                <br />
                d) Number of branches.
                <br />
              </li>
              <li className="mt-8">
                <strong>G. Jewelers’ Block Policy</strong>
                <br />
                In recent years India has emerged as a leading center in world
                trade for jewelry, especially diamonds. Imported raw diamonds
                are cut, polished and exported. It takes care of all risks of a
                jeweler whose business involves sale of articles of high value
                in small bulk like jewelry gold & silver articles, diamonds and
                precious stones, wrist watches etc. The trade involves stocking
                these expensive items in large quantity and moving them between
                different premises.
                <br />
                <br />
                <strong>1. Coverage of Jeweler’s Block Policy</strong>
                <br />
                Jewelers block policy covers such risks. It is divided into four
                sections. Coverage under Section 1 is compulsory. The insured
                can avail of other sections at her option. It’s a package
                policy.
                <br />
                <strong>a) Section I:</strong>Covers loss of or damage to
                property whilst in the premises insured, as a result of fire,
                explosion, lightning burglary, house-breaking, theft, hold-up,
                robbery, riot, strikes and malicious damage and terrorism.
                <br />
                <strong>b) Section II:</strong>Covers loss or damage whilst the
                property insured is in the custody of the insured and other
                specified persons.
                <br />
                <strong>c) Section III:</strong>Covers loss or damage whilst
                such property is in transit by registered insured parcel post,
                air freight etc.
                <br />
                <strong>d) Section IV:</strong>Provides cover for trade and
                office furniture and fittings in the premises against the perils
                specified in Section I.
                <br />
                <br />
                <strong>2. Important exclusions are:</strong>
                <br />
                a) Dishonesty of agents, cutters, goldsmiths,
                <br />
                b) Property kept during public exhibition
                <br />
                c) Lost whilst being worn / carried for personal purpose
                <br />
                d) Property not kept in safe outside business hours
                <br />
                e) Property kept in display windows at night
                <br />
                f) Loss due to infidelity of employees or members of the insured
                family is not covered.
                <br />
                <br />
                <strong>3. Premium</strong>
                <br />
                Risks are rated on merits of each case. Different premium rates
                are applied for each section with discounts for exclusive round
                the clock watchman, close circuit TV / alarm system, exclusive
                strong room and for any other safety expedient etc.
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  H. Engineering Insurance
                </strong>
                <br />
                Engineering insurance is a branch of general insurance that
                developed parallel with the growth of fire insurance. Its
                origins can be traced to the development of industrialization,
                which highlighted the need for a separate cover for plant and
                machinery. Concept of All Risks cover was also developed with
                regard to engineering projects - covering damage due to any
                cause except those specifically excluded. The products covered
                various stages – from construction to testing till the plant
                became operational. The customers for this insurance are both
                large and small industrial units. This also includes units
                having electronic equipment and contractors doing big projects.
                <br />
                e) Property kept in display windows at night
                <br />
                <br />
                <strong>Types of engineering insurance policies</strong>
                <br />
                Let us briefly consider the major policies that fall under this
                type of insurance
                <br />
                <strong> 1. Contractors All Risks (C.A.R.) Policy</strong>
                <br />
                This is designed to protect the interests of contractors and
                principals engaged in civil engineering projects from small
                buildings to massive dams, buildings, bridges, tunnels, etc. The
                policy provides an “All Risk” cover – thus providing indemnity
                against any s udden and unforeseen loss or damage that occurs to
                property insured at the construction site. This can be extended
                to cover third party liability and other exposures. Premium
                chargeable depends on the nature of the project, the project
                cost, the project period, geographic location and the period of
                testing.
                <br />
                <strong>2. Contractors Plant & Machinery (CPM) Policy</strong>
                <br />
                The cover is operative whilst the equipment is at work or at
                rest or being dismantled for cleaning or overhauling or
                re-assembling thereafter. The cover also applies while the same
                are lying at contractors own premises.
                <br />
                <strong>3. Erection All Risks (EAR) Policy</strong>
                <br />
                This policy is also known as Storage-cum-Erection (SCE) policy.
                It is suitable for the principal or contractors of a project
                whereas plant and machinery is being erected as it is exposed to
                various external risks. This is a comprehensive insurance policy
                that covers any sort of contingency right from the moment the
                materials are unloaded at the project site and continues during
                the entire project period until the project is tested,
                commissioned and handed over.
                <br />
                <strong>4. Machinery Breakdown Policy (MB)</strong>
                <br />
                This policy is suitable for every industry which operates on
                machines and for whom breakdown of plant and machinery is of
                serious consequence. This policy covers machines like
                generators, transformer and other electrical, mechanical and
                lifting equipment.
                <br />
                <strong>5. Boiler and Pressure Plant Policy</strong>
                <br />
                Since fire policy and boiler insurance policy are mutually
                exclusive, for adequate cover, both the policies need to be
                taken. Sum insured under all Engineering Policies should be the
                current replacement value.
                <br />
                <strong>6. Machinery Loss of Profits (MLOP) Policy</strong>
                <br />
                This policy is suitable for industries where interruptions or
                delays as a result of machinery breakdown or boiler explosion
                result in huge consequential losses.
                <br />
                Where the time lag between the breakdown or loss and the
                restoration is large, this policy compensates for the loss of
                profits during the intervening period due to reduction in
                turnover and increase in cost of working. The terms and
                conditions and coverage of business interruption policy is the
                same as the business interruption policy following a fire policy
                loss, which has been discussed earlier in this chapter.
                <br />
                <strong>7. Deterioration of Stock Policy</strong>
                <br />
                This policy is suitable for the owner of the cold storage
                (individual or a cooperative society) or those who take the cold
                storage on lease or hire for storage of perishable commodities.
                The cover is against the risk of deterioration and contamination
                following breakdown of the refrigeration plant and machinery and
                also due to rise in temperature and sudden and unforeseen escape
                of refrigerants into the cold storage rooms.
                <br />
                <strong>8. Electronic Equipment Policy</strong>
                <br />
                This covers various kinds of electronic equipment, which
                includes the entire computer system consisting of CPU,
                keyboards, monitors, printers, UPS, system software etc.
                Auxiliary equipment such as air-conditioning, heating and power
                conversion, etc. are also covered.
                <br />
                <strong>
                  {" "}
                  9. Advance Loss of Profit Cover (ALOP) or Delay in Start-up
                  Policy (D.S.U.)
                </strong>
                <br />
                This covers financial consequences of a project being delayed
                because of accidental damages during the project. It is suitable
                for the insured who is deprived of the anticipated earning and
                the financial institutions to the extent of their interest in
                the project. It is issued as an extension to the MCE/EAR/CAR
                Policy before the actual commencement of project.
                <br />
              </li>
              <li className="mt-5">
                <strong>I. Industrial All Risks Insurance</strong>
                <br />
                The Industrial All Risks Policy was designed to cover,
                industrial properties – both manufacturing and storage
                facilities, anywhere in India under one policy. It provides
                indemnification against material damage and business
                interruption. Usually, the policy provides cover for the
                following:
                <br />
                i. Fire and specified perils as per fire insurance practice,
                <br />
                ii. Burglary (except larceny)
                <br />
                iii. Machinery breakdown / boiler explosion / electronic
                equipment
                <br />
                iv. Business interruption following operation of perils
                mentioned above
                <br />
                <br />
                <strong className="text-red-700">J. Marine Insurance</strong>
                <br />
                Marine insurance is classified into two types: marine cargo and
                marine hull
                <br />
                <br />
                <strong>1. Marine Cargo Insurance</strong>
                <br />
                Though the term ‘marine’ may indicate only losses due to sea
                (marine) mis- adventures, marine cargo insurance covers much
                more. It provides indemnity in respect of loss of o r damage to
                goods during transit by rail, road, sea, air or registered post,
                within the country as well as abroad. Type of goods may range
                from diamonds to household goods, bulk items like cement,
                grains, over dimensional cargoes for projects etc.
                <br />
                While the basic policy document contains general conditions, the
                scope of cover and exceptions and special exclusions are
                attached by separate clauses known as Institute cargo Clauses
                (ICC). These are drafted by the Institute of London Underwriters
                <br />
                <strong>a) Coverage under Marine Cargo Insurance</strong>
                <br />
                Cargo policies are essentially voyage policies, i.e. they cover
                the subject matter from one place to another. However, the
                insured is required to always act with reasonable care in all
                circumstances within his control. The main feature of this
                policy is that it's an Agreed Value Policy. The valuation is
                agreed between the insurer and insured and is not subject to
                revaluation later unless fraud is suspected. Another unique
                feature is that the policy is freely assignable.
                <br />
                The terms and conditions applicable are governed by either;
                <br />
                i. Inland Transit Clause (ITC) A, B or C for inland transit
                <br />
                ii. Institute Cargo Clause (ICC) A, B, or C for voyage by sea
                <br />
                These exclusions are common to all clauses of inland, air and
                sea. There are separate clauses also for trading of specific
                commodities like coal, bulk oil and tea etc. Marine cover can be
                extended by paying additional premium to cover War, Strikes,
                Riots, Civil Commotion and Terrorism. Marine and Aviation
                policies is the only branch of insurance that offer cover
                against War perils.
                <br />
                <br />
                <strong>b) Different types of marine policies</strong>
                <br />
                <strong>ii. Open Policy</strong>
                <br />
                This policy covers a single shipment. It is valid for the
                particular voyage or transit. Merchants who are engaged in
                regular import and export trade or who are sending consignments
                regularly by inland transit would find it convenient to arrange
                insurances under special arrangements like the open policy.
                <br />
                <strong>ii. Open Policy</strong>
                <br />
                The carriage of goods within the country can be covered under an
                open policy. The policy is valid for one year and all
                consignments during this period have to be declared by the
                insured to the insurer as agreed between them on a fortnightly,
                monthly or quarterly basis.
                <br />
                <strong>iii. Open Cover</strong>
                <br />
                For large exporters and importers who have continuous trade, an
                open cover is issued. It sets out the terms of cover and rates
                of premium for one-year transaction of marine dispatches. The
                open cover is not a policy and it is not stamped. A certificate
                of insurance is issued for each declaration duly stamped for
                appropriate value.
                <br />
                <strong>iv. Duty and increased value insurance</strong>
                <br />
                These policies provide extra insurance if the value of the cargo
                is increased due to payment of customs duty or increase in the
                market value of the goods at the destination on the date of the
                landing.
                <br />
                <strong>v. Delay in Start Up</strong>
                <br />
                Many insured are opting for this cover. In case of new project
                any loss or damage to the equipment during transit may involve
                ordering of fresh equipment which leads to delay in completion
                of the project, and thereby loss of profits. The financial
                institutions who are interested in timely completion of the
                project for their debt servicing, would like this risk covered
                by an insurance contract and the marine (cargo) insurance policy
                can be extended against consequential loss due to marine delays'
                or simply - delay start up.
                <br />
                <br />
                <strong>2. Marine Hull insurance</strong>
                <br />
                The term ‘Hull’ refers to the body of a ship or other water
                transport vessel
                <br />
                Marine hull insurance is done as per international clauses
                applicable across different countries. Marine hull covers are
                essentially of two types:
                <br />
                <strong>a) Covering a particular Voyage:</strong>The set of
                clauses used here are called Institute Voyage Clauses
                <br />
                <strong>b) Covering a period of time:</strong>Usually one year.
                The set of clauses used here are called Institute (Time) Clauses
                <br />
                <br />
              </li>
              <li>
                <strong>K. Liability Policies</strong>
                <br />
                Accidents cannot be avoided altogether, however careful a person
                is. This could result in injury to oneself and damage to one’s
                property and also may simultaneously cause injury to third
                parties and damage to their property. The persons thus affected
                would claim compensation for such loss.
                <br />
                A liability could also arise from a defect in a product
                manufactured and sold, say chocolates or medicines, causing harm
                to the consumer. Similarly, liability could arise from wrong
                diagnosis / treatment of a patient or from a case improperly
                handled by a lawyer for his client.
                <br />
                <br />
                <strong>1. Compulsory Public Liability Policy</strong>
                <br />
                The Public Liability Insurance Act, 1991 imposes liability on no
                fault basis on those who handle hazardous substances if a third
                party is injured or his property is damaged during the course of
                such handling. The names of hazardous substances and the
                quantity of each, is listed in the 'Act'
                <br />
                The amount of compensation payable per person is fixed as shown
                below.
                <br />
                <br />
                <strong>Compensation payable</strong>
                <br />
                <table className="border border-black w-full bg-white shadow-md table-auto">
                  <tbody>
                    <tr className="border border-black">
                      <th className="p-3 text-left border border-black w-1/2">
                        Fatal Accident
                      </th>
                      <td className="p-3 text-right border border-black w-1/2">
                        Rs. 25,000
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th className="p-3 text-left border border-black">
                        Permanent Total Disability
                      </th>
                      <td className="p-3 text-right border border-black">
                        Rs. 25,000
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th className="p-3 text-left border border-black">
                        Permanent Partial Disability
                      </th>
                      <td className="p-3 text-right border border-black">
                        % of Rs. 25,000 based on % of disability
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th className="p-3 text-left border border-black">
                        Temporary Partial Disablement
                      </th>
                      <td className="p-3 text-right border border-black">
                        Rs. 1000 per month, maximum 3 months
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th className="p-3 text-left border border-black">
                        Actual Medical Expenses
                      </th>
                      <td className="p-3 text-right border border-black">
                        Upto a maximum of Rs. 12,500
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th className="p-3 text-left border border-black">
                        Actual damage to property up to
                      </th>
                      <td className="p-3 text-right border border-black">
                        Rs. 6,000
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <br />
                <strong>
                  2. Public Liability Policy (Industrial / Non-industrial Risks)
                </strong>
                <br />
                This type of policy covers liability arising out of fault /
                negligence of the insured causing third party personal injury or
                property destruction [TPPI OR TPPD].
                <br />
                There are separate policies covering industrial risks as well as
                non-industrial risks like those affecting hotels, cinema halls,
                auditoriums, residential premises, offices, stadiums, godowns
                and shops. It covers the legal liability to pay compensation
                including claimant’s costs, fees and expense according to Indian
                Law, in respect of TPPI/TPPD.
                <br />
                <br />
                <strong>3. Products Liability Policy</strong>
                <br />
                The demand for products liability insurance has arisen because
                of the wide variety of products (e.g. canned food stuff, aerated
                waters, medicines and injections, electrical appliances,
                mechanical equipment, chemicals etc.) that are today
                manufactured and sold to the public. If a defect in the product
                causes death, bodily injury or illness or even damage to the
                property of third parties, it could cause a claim to arise.
                Product liability policies cover this liability of the insured.
                <br />
                <br />
                <strong>4. Lift (Third Party) Liability Insurance</strong>
                <br />
                The policy provides indemnity to owners of buildings in respect
                of liabilities arising out of the use and operation of lifts. It
                covers legal liabilities for:
                <br />
                a) Death / bodily injury of any person (excluding employees of
                the insured) b) Damage to property (excluding insured’s own or
                employee’s property)
                <br />
                <br />
                <strong>5. Professional Liability</strong>
                <br />
                Professional indemnities are designed to provide insurance
                protection to professional people against their legal liability
                to pay damages arising out of negligence in the performance of
                their professional duties. Such covers are available for doctors
                hospitals; engineers, architects; chartered accountants,
                financial consultants, lawyers, insurance brokers.
                <br />
                <br />
                <strong>6. Directors' and Officers' Liability Policy</strong>
                <br />
                Directors and Officers of a company hold positions of trust and
                responsibility. They may become liable to pay damages to
                shareholders, employees, creditors and other stakeholders of the
                company, for wrongful acts committed by them in the supervision
                and management of the affairs of the company. A policy has been
                devised to cover such liability and is issued to the company
                covering all their directors.
                <br />
                <br />
                <strong>7. Employee’s Compensation Insurance</strong>
                <br />
                This policy provides indemnity to the insured in respect of his
                legal liability to pay compensation to his employees who sustain
                personal injury by accident or disease arising out of and in the
                course of his employment. This is also called Workman’s
                Compensation Insurance.
                <br />
              </li>
            </ul>
          </div>
        );

      case "CHAPTER-06":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 6:CLAIMS PROCEDURE
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            At the core of any insurance contract is the promise made at the
            beginning i.e. to indemnify the insured in the event of a loss. This
            chapter talks about the procedures and documents involved, from the
            time loss takes place, making it easier to comprehend the entire
            process of claims settlement. It also explains the method of dealing
            with disputed claims either by insured or insurer.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong>A. Claims settlement process</strong> <br />
                1. Argue the importance of claim settlement functions
                <br />
                2. Describe the procedures for intimation of loss
                <br />
                3. Appraise claim investigation and assessment
                <br />
                4. Explain the importance of surveyors and loss assessors
                <br />
                5. Illustrate the contents of claim forms
                <br />
                6. Define claims adjustment and settlement
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  Claims settlement process
                </strong>
                <br />
                <strong>1. Importance of settling claims</strong>
                <br />
                The most important function of an insurance company is to settle
                claims of policyholders on the happening of a loss event.
                Insurer fulfils this promise by providing prompt, fair and
                equitable service in either paying the policyholder or paying
                claims made against the insured by a third party.
                <br />
                Insurance is marketed as a financial mechanism to provide
                indemnity on losses due to insured perils. Were it not for
                insurance and the claim settlement process, recovery to normal
                state after an unfortunate accident / event might be slow,
                inefficient and difficult.
                <br />
                One of the non-life insurance companies had the inscription “Pay
                if you can; repudiate if you must” in its board room. That is
                the spirit of the noble business of insurance.
                <br />
                <br />
                <strong>
                  Settling claims professionally is regarded the biggest
                  advertisement for an insurance company.
                </strong>
                <br />
                <strong>a) Promptness</strong>
                <br />
                Prompt settlement of claims, whether the insured is a corporate
                client or an individual or whether the size of the loss is big
                or small is very important. It must be understood that the
                insured needs insurance compensation as soon as the possible
                after the loss.
                <br />
                If he gets the money promptly, it is of maximum use to him. It
                is insurance company’s duty to pay the claim amount when insured
                needs it most – as early as possible after the loss.
                <br />
                <br />
                <strong>b) Professionalism</strong>
                <br />
                The insurance officials consider each and every claim on its
                merits and do not apply prejudicial or pre-conceived notions to
                reject the claim without examining all the documents that would
                answer the following questions.
                <br />
                (I) Did the loss really happen?
                <br />
                (II) If so, did the loss making event really cause the damage?
                <br />
                (III) The extent of damage out of this event.
                <br />
                (IV) What was the reason for the loss?
                <br />
                (V) Was the loss covered under the policy?
                <br />
                (VI) Is the claim payable as per the contract/ policy
                conditions?
                <br />
                (VII) If so, how much is payable?
                <br />
                The answers to all these questions need to be found out by the
                insurance company.
                <br />
                Processing claims is an important activity. All claims forms,
                procedures and processes have been carefully designed by the
                company to ensure that all claims ‘payable’ under the policy are
                promptly paid and those that are not payable are not paid.
                <br />
                <br />
              </li>
              <li>
                <strong>2. Intimation or Notice of Loss</strong> <br />
                Policy conditions provide that the loss be intimated to the
                insurer immediately. The purpose of an immediate notice is to
                allow the insurer to investigate a loss at its early stages.
                Delays may result in loss of valuable information relating to
                the loss. It would also enable the insurer to suggest measures
                to minimise the loss and to take steps to protect salvage. The
                notice of loss is to be given as soon as reasonably possible.
                <br />
                Under certain types of policies (e.g. Burglary) notice is also
                to be given to police authorities. Under cargo rail transit
                policies, notice has to be served on the Railways.
                <br />
                <br />
                <strong>3. Investigation and assessment</strong>
                <br />
                <strong>a) Overview</strong>
                <br />
                On receipt of the claim form, from the insured, the insurers
                decide about investigation and assessment of the loss. If the
                claim amount is small, the investigation to determine the cause
                and extent of loss is done, by an officer of the insurers.
                <br />
                <strong>The investigation</strong>of other claims is entrusted
                to independent licensed professional surveyors who are
                specialists in loss assessment. The assessment of loss by
                independent surveyors is based on the principle that since both
                the insurers and insured are interested parties, the unbiased
                opinion of an independent professional person should be
                acceptable to both the parties as well as to a court of law in
                the event of any dispute.
                <br />
                <strong>b) Claims assessment</strong> <br />
                In case of fire, claim is assessed on the basis of a police
                report, investigators report if cause is unknown and a survey
                report. For personal accident claims, the insured is required to
                submit a report from the attending doctor specifying the cause
                of accident or the nature of illness as the case may be, and the
                duration of disablement.
                <br />
                Under policy conditions, the insurers reserve the right to
                arrange an independent medical examination. Medical evidence is
                also required in support of “Workmen’s Compensation” claims.
                Livestock and cattle claims are assessed on the basis of the
                report of a veterinary doctor.
                <br />
              </li>
              <li>
                <strong className="text-red-700">Information</strong>
                <br />
                On receipt of intimation of loss or damage insurers check
                whether:
                <br />
                1. The insurance policy is in force on the date of occurrence of
                the loss or damage
                <br />
                2. The loss or damage is caused by an insured peril
                <br />
                3. The property (subject matter of insurance) affected by the
                loss is the same as insured under the policy
                <br />
                Notice of loss has been received without delay.
                <br />
                <br />
                <strong>4. Surveyors and Loss Assessors</strong>
                <br />
                <strong>a) Surveyors</strong>
                <br />
                Surveyors are professionals licensed by IRDAI. They are experts
                in inspecting and evaluating losses in specific areas. Surveyors
                are generally paid fees by the insurance company, engaging them.
                Surveyors and loss assessors are hired by general insurance
                companies normally, at the time of a claim. They inspect the
                property in question, examine and verify the causes and
                circumstances of the loss. They also estimate the quantum of the
                loss and submit reports to the insurance company.
                <br />
                They also advise insurers, regarding appropriate measures to
                prevent further losses. Surveyors are governed by provisions of
                the Insurance Act, 1938, Insurance Rules 1939 and specific
                regulations issued by IRDAI. Claims made outside the country in
                case of ‘Travel Policy’ or ‘Marine Open Cover’ for exports, are
                assessed by the claims settling agents abroad named in the
                policy.
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                <strong>Section 64 UM of Insurance Act</strong>
                <br />
                Where, in the case of a claim of less than twenty thousand
                rupees in value on any policy of insurance it is not practicable
                for an insurer to employ an approved surveyor or loss assessor
                without incurring expenses disproportionate to the amount of the
                claim, the insurer may employ any other person (not being a
                person disqualified for the time being for being employed as a
                surveyor or loss assessor) for surveying such loss and may pay
                such reasonable fee or remuneration to the person so employed as
                he may think fit.
                <br />
                <br />
              </li>
              <li>
                <strong>5. Claim forms</strong>
                <br />
                The contents of the claim form vary with each class of
                insurance. In general the claim form is designed to get full
                information regarding the circumstances of the loss, such as
                date of loss, time, cause of loss, extent of loss, etc. The
                other questions vary from one class of insurance to another.
                <br />
                <br />
                <strong>6. Loss Assessment and Claim settlement</strong>
                <br />
                Claims assessment is the process of determining whether the loss
                suffered by the insured is caused by the insured peril and there
                is no breach of warranty.
                <br />
                Settlement of claims has to be based on considerations of
                fairness and equity. For a non-life Insurance company,
                expeditious settlement of claim is the benchmark of efficiency
                for its services. Each company has internal guidelines about
                time taken in claims processing, which its employees follow.
                <br />
                This is generally known by the term “Turnaround time” (TAT).
                Some insurers have also put in place, facility for the insured
                to check claim status online from time to time. Some non-life
                insurance companies have also set up claims hub for speedy
                processing of claims.
                <br />
                <br />
                <strong>a) Categories of claim</strong>
                <br />
                <strong>
                  {" "}
                  The claims which are dealt with in insurance policies fall
                  into the following categories
                </strong>
                <br />
                <strong> i. Standard claims</strong>
                <br />
                These are claims which are clearly within the terms and
                conditions of the policy. The assessment of claim is done
                keeping in view scope and the sum insured opted for and other
                methods of indemnity laid down for various classes of insurance.
                <br />
                The claim amount payable by the insurer takes into account
                various factors like valuation at time of loss, insurable
                interest, salvage prospects, loss of earnings, loss of use,
                depreciation, replacement value depending on the policy taken.
                <br />
                <strong> ii. Non-Standard claims</strong>
                <br />
                These are claims where the insured may have committed a breach
                of condition or warranty. The settlement of these claims is
                considered subject to rules and regulations framed by the
                non-life insurance companies.
                <br />
                <strong> iii. Condition of average or average clause</strong>
                <br />
                This is a condition in some policies which penalises the insured
                for insuring his property at a sum insured less than its actual
                value known as underinsurance. In the event of a claim the
                insured gets an amount that is proportionately reduced from his
                actual loss in accordance to the amount underinsured.
                <br />
                <strong> iv. Act of God perils - Catastrophic losses</strong>
                <br />
                Natural perils like storm, cyclone, flood, inundation, and
                earthquake are termed as “Act of God” perils. These perils may
                result in losses to many policies of insurer in the affected
                region.
                <br />
                In such major and catastrophic losses, the surveyor is asked to
                proceed to the loss site immediately for an early assessment and
                loss minimisation efforts. Simultaneously, insurers’ officials
                also visit the scene of loss particularly when the amount
                involved is large. The purpose of the visit is to obtain an
                immediate, on the spot idea of the nature and extent of loss.
                <br />
                Preliminary reports are also submitted if the surveyors face
                some problems in regards to the assessment and may desire
                guidance and instructions from insurers who are thus given an
                opportunity to discuss the issues with the insured, if
                necessary.
                <br />
                <strong> v. On account payment</strong>
                <br />
                Apart from preliminary reports, interim reports are submitted
                from time to time where repairs and/or replacements are made
                over a long period. Interim reports also give the insurer an
                idea of the development of assessment of loss. It also helps in
                recommendation of "On account payment" of the claim if desired
                by the insured. This usually happens if the loss is large and
                the completion of assessment may take some time.
                <br />
                If the claim is found to be in order, payment is made to the
                claimant and entries made in the company records. Appropriate
                recoveries are made from the co-insurers and reinsurers, if any.
                In some cases, the insured may not be the person to whom the
                money is to be paid.
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                If the property insured under a fire policy is mortgaged to a
                bank, then according to the “Agreed Bank Clause”, claim monies
                are to be paid to the bank.
                <br />
                Similarly claims for “Total Loss” on vehicles subject to hire
                purchase agreements are paid to financiers.
                <br />
                Marine cargo claims are paid to the claimant who produces the
                marine policy duly endorsed in his favour, at the time of the
                loss.
                <br />
                <br />
                <strong> b) Discharge vouchers</strong>
                <br />
                Settlement of the claim is made only after obtaining a discharge
                under the policy. A sample of discharge receipt for claims
                (under personal accident insurance) for injuries is worded along
                the following lines: (may vary from company to company)
                <br />
                <br />
                <strong> c) Post settlement action</strong>
                <br />
                The action taken after settlement of the claim in relation to
                underwriting varies from one class of business to another.
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                Sum insured under a fire policy stands reduced to the extent of
                the amount of claim paid. However, it can be reinstated on
                payment of pro-rata premium, which is deducted from the amount
                of claim paid.
                <br />
                On payment of the capital sum insured under a personal accident
                policy, the policy stands cancelled.
                <br />
                Similarly, payment of a claim under individual fidelity
                guarantee policy automatically terminates the policy.
                <br />
                <br />
              </li>
              <li>
                <strong> 7. Disputes related to claims</strong>
                <br />
                Despite best efforts, there could be reasons for either delay or
                non-payment (repudiation) of claim, either due to delay in
                notice of loss or non-submission of documents by clients.
                <br />
                <strong>
                  {" "}
                  Apart from these, the most common reasons, to name a few are:
                </strong>
                <br />
                ✔ Non-disclosure of material facts
                <br />
                ✔ Lack of coverage
                <br />
                ✔ Loss caused by excluded perils
                <br />
                ✔ Lack of adequate sum insured
                <br />
                ✔ Breach of warranty
                <br />
                ✔ Issues regarding quantum due to underinsurance, depreciation,
                etc
                <br />
                All this could cause considerable grief to the insured at a time
                when he is already suffering from financial constraints arising
                due to losses. In order to reduce his sufferings, grievance
                redressal and dispute handling procedures are well laid out in
                the policy itself. Policies of fire or property have the
                condition of “Arbitration” in the policy itself.
                <br />
                <strong className="text-red-700"> Example</strong>
                <br />
                If the insurers contend that the loss is not payable because it
                is not covered under the policy, the matter has to be decided by
                a Court of Law. Again, if the insurers refuse to pay the claim
                on the ground that the policy is void because it was obtained
                through fraudulent non-disclosure of material facts (breach of
                the legal duty of ‘utmost good faith’), the issue has to be
                resolved through litigation.
                <br />
                <br />
                <strong> 8. Other dispute resolution mechanisms</strong>
                <br />
                As per IRDA regulations, all policies have to mention about the
                grievance redressal system available to the insured in the event
                the insured is dissatisfied with the service of the insurer for
                any reason.
                <br />
                In case of claims under personal lines of business, a
                dissatisfied insured can approach the ombudsman, the details of
                whose office are provided in the policy.
                <br />
                <strong className="text-red-700">Summary</strong>
                <br />
                a) Settling claims professionally is regarded as the biggest
                advertisement for an insurance company.
                <br />
                b) Policy conditions provide that the loss be intimated to the
                insurer immediately.
                <br />
                c) If the claim amount is small, the investigation to determine
                the cause and extent of loss is done by an officer of the
                insurer. But for other claims it is entrusted to independent
                licensed professional surveyors who are specialists in loss
                assessment.
                <br />
                d) In general the claim form is designed to get full information
                regarding the circumstances of the loss, such as date of loss,
                time, cause of loss, extent of loss, etc.
                <br />
                e) Claims assessment is the process of determining whether the
                loss suffered by the insured is caused by the insured peril that
                there is no breach of warranty, the quantum of loss suffered by
                the insured and the insurers liability under the policy.
                <br />
                f) Settlement of the claim is made only after obtaining a
                discharge under the policy.
                <br />
                Arbitration is a method of settling disputes arising out of
                contracts.
                <br />
                <br />
                <br />
              </li>
              <div className="w-[65%] h-full flex justify-center items-center mx-auto">
                <div className="w-4/5 h-4/5">
                  <img
                    className="mx-4 h-full w-full"
                    src="https://www.notioninsurance.in/newportal/index/13.jpg"
                    alt=""
                  />
                </div>
              </div>
            </ul>
          </div>
        );

      case "CHAPTER-07":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 7:INTRODUCTION TO HEALTH INSURANCE
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            This chapter will tell you about how insurance evolved over time. It
            will also explain what healthcare is, levels of healthcare and types
            of healthcare. You will also learn about the healthcare system in
            India and factors affecting it. Finally, it will explain how health
            insurance evolved in India and also the various players in the
            health insurance market in India.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">A. What is Healthcare</strong>
                <br />
                <strong className="text-red-700">
                  B. Levels of Healthcare
                </strong>
                <br />
                <strong className="text-red-700">C. Types of Healthcare</strong>
                <br />
                <strong className="text-red-700">
                  D. Factors affecting health systems in India
                </strong>
                <br />
                <strong className="text-red-700">
                  E. Evolution of Health Insurance in India
                </strong>
                <br />
                <strong className="text-red-700">
                  F. Health Insurance Market 289
                </strong>
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700"> A. What is Healthcare</strong>
                <br />
                You have heard of the saying “Health is Wealth”. Have you ever
                tried to know what Health actually means? The word ‘Health’ was
                derived from the word ‘hoelth’, which means ‘soundness of the
                body’.
                <br />
                In olden days, health was considered to be a ‘Divine Gift’ and
                illness was believed to have been caused due to the sins
                committed by the concerned person. It was Hippocrates (460 to
                370 BC) who came up with the reasons behind illness. According
                to him, illness is caused due to various factors relating to
                environment, sanitation, personal hygiene and diets.
                <br />
                The Indian system of Ayurveda which existed many centuries
                before Hippocrates, considered health as a delicate balance of
                four fluids: blood, yellow bile, black bile and phlegm and an
                imbalance of these fluids causes ill health. Susruta, the Father
                of Indian medicine is even credited with complex surgeries
                unknown to the West in those times.
                <br />
                Over a period of time, modern medicine has evolved into a
                complex science and the goal of modern medicine is no longer
                mere treatment of sickness but includes prevention of disease
                and promotion of quality of life. A widely accepted definition
                of health is the one given by World Health Organisation in 1948;
                it states that “Health is a state of complete physical, mental
                and social wellbeing and not merely the absence of disease”. It
                is to be noted that Indian system of medicine like Ayurveda
                incorporated such a complete view of health from times
                immemorial.
                <br />
                <strong className="text-red-700">Definition</strong>
                <br />
                World Health Organisation (WHO): Health is a state of complete
                physical, mental and social wellbeing and not merely the absence
                of disease.
                <br />
                <br />
                <strong> Determinants of health</strong>
                <br />
                It is generally believed that the following factors determine
                the health of any individual:
                <br />
                <br />
                <strong> a) Lifestyle factors</strong>
                <br />
                Lifestyle factors are those which are mostly in the control of
                the individual concerned e.g. exercising and eating within
                limits, avoiding worry and the like leading to good health; and
                bad lifestyles and habits such as smoking, drug abuse,
                unprotected sex and sedentary life style (with no exercise) etc.
                leading to diseases such as cancer, aids, hypertension and
                diabetes, to name a few.
                <br />
                Though the Government plays a critical role in controlling /
                influencing such behaviour (e.g. punishing people with
                non-bailable imprisonment who abuse drugs, imposing high taxes
                on tobacco products etc.), the personal responsibility of an
                individual plays a deciding role in controlling diseases due to
                life style factors.
                <br />
                <br />
                <strong> b) Environmental factors</strong>
                <br />
                Safe drinking water, sanitation and nutrition are crucial to
                health, lack of which leads to serious health issues as seen all
                over the world, especially in developing countries. Communicable
                diseases like Influenza and Chickenpox etc. are spread due to
                bad hygiene, diseases like Malaria and Dengue are spread due to
                bad environmental sanitation, while certain diseases are also
                caused due to environmental factors e.g. people working in
                certain manufacturing industries are prone to diseases related
                to occupational hazards such as Asbestos in workers in asbestos
                manufacture and also diseases of the lungs in coal miners.
                <br />
                <br />
                <strong> c) Genetic factors</strong>
                <br />
                Diseases may be passed on from parents to children through
                genes. Such genetic factors result in differing health trends
                amongst the population spread across the globe based on race,
                geographical location and even communities.
                <br />
                It is quite obvious that a country’s social and economic
                progress depends on the health of its people. A healthy
                population not only provides productive workforce for economic
                activity but also frees precious resources which is all the more
                crucial for a developing country like India. At an individual
                level, ill health can cause loss of livelihood, inability to
                perform daily essential activities and push people to poverty
                and even commit suicide.
                <br />
                Thus the world over, governments take measures to provide for
                health and wellbeing of their people and ensuring access and
                affordability of healthcare for all citizens. Thus ‘spend’ on
                healthcare usually forms a significant part of every country’s
                GDP.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  {" "}
                  B. Levels of healthcare
                </strong>
                <br />
                Healthcare is nothing but a set of services provided by various
                agencies and providers including the government, to promote,
                maintain, monitor or restore health of people. Health care to be
                effective must be:
                <br />
                • Appropriate to the needs of the people
                <br />
                • Comprehensive
                <br />
                • Adequate
                <br />
                • Easily available
                <br />
                • Affordable
                <br />
                Health status of a person varies from person to person. It is
                neither feasible nor necessary to make the infrastructure
                available at same level for all types of health problems. The
                health care facilities should be based upon the probability of
                the incidence of disease for the population. For example, a
                person may get fever, cold, cough, skin allergies etc. many
                times a year, but the probability of him/her suffering from
                Hepatitis B is less as compared to cold and cough.
                <br />
                Based on the above factors, the government decides upon setting
                up of centres for primary, secondary and tertiary health care
                and takes other measures to make appropriate healthcare
                affordable and accessible to the population.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  {" "}
                  C. Types of Healthcare
                </strong>
                <br />
                Healthcare is broadly categorized as follows:
                <br />
                Primary health care refers to the services offered by the
                doctors, nurses and other small clinics which are contacted
                first by the patient for any sickness, that is to say that
                primary healthcare provider is the first point of contact for
                all patients within a health system.
                <br />
                In developed countries, more attention is paid to primary health
                care so as to deal with health issues before the same become
                widespread, complicated and chronic or severe. Primary health
                care establishments also focus on preventive health care,
                vaccinations, awareness, medical counselling etc. and refer the
                patient to the next level of specialists when required.
                <br />
                For example, if a person visits a doctor for fever and the first
                diagnosis is indicative of Dengue fever, the primary health care
                provider will prescribe some medicines but also direct the
                patient to get admitted in a hospital for specialized treatment.
                For most of the primary care cases, the doctor acts like a
                ‘Family Doctor’ where all the members of the family visit the
                doctor for any minor sickness.
                <br />
                This method also helps the medical practitioner in prescribing
                for symptoms based on genetic factors and give medical advice
                appropriately. For example, the doctor will advise a patient
                with parental diabetic history to be watchful of the lifestyle
                from young age to avoid diabetes to the extent possible.
                <br />
                At a country level, Primary Health care centres are set up both
                by Government and private players. Government primary health
                care centres are established depending upon the population size
                and are present right up to the village level in some form or
                the other.
                <br />
                <br />
                <strong> 1.Secondary healthcare</strong>
                <br />
                Secondary health care refers to the healthcare services provided
                by medical specialists and other health professionals who
                generally do not have first contact with patient. It includes
                acute care requiring treatment for a short period for a serious
                illness, often (but not necessarily) as an in-patient, including
                Intensive Care services, ambulance facilities, pathology,
                diagnostic and other relevant medical services.
                <br />
                Most of the times, the patients are referred to the secondary
                care by primary health care providers / primary physician. In
                some instances, the secondary care providers also run an
                ‘In-house’ Primary healthcare facility in order to provide
                integrated services. Mostly, the secondary health care providers
                are present at the Taluk / Block level depending upon the
                population size.
                <br />
                <br />
                <strong> 3. Tertiary healthcare</strong>
                <br />
                Tertiary Health care is specialized consultative healthcare,
                usually for inpatients and on referral from primary/secondary
                care providers. The tertiary care providers are present mostly
                in the state capitals and a few at the district headquarters.
                <br />
                Examples of Tertiary Health care providers are those who have
                advanced medical facilities and medical professionals, beyond
                the scope of secondary health care providers e.g. Oncology
                (cancer treatment), Organ Transplant facilities, High risk
                pregnancy specialists etc.
                <br />
                It is to be noted that as the level of care increases, the
                expenses associated with the care also increase. While people
                may find it relatively easy to pay for the primary care, it
                becomes difficult for them to spend when it comes to secondary
                care and much more difficult when it comes to tertiary care. The
                infrastructure for different levels of care also varies from
                country to country , rural-urban areas, while socio-economic
                factors also influence the same.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  {" "}
                  D. Factors affecting the health systems in India
                </strong>
                <br />
                The Indian health system has had and continues to face many
                problems and challenges. These, in turn, affect the nature and
                extent of the healthcare system and the requirement at the
                individual level and healthcare organization at the structural
                level. These are discussed below:
                <br />
                1. Demographic or Population related trends a) India is second
                largest populated country in the world. b) This exposes us to
                the problems associated with population growth. c) The level of
                poverty has also had its effect on the people’s ability to pay
                for medical care. 2. Social trends a) Increase in urbanization
                or people moving from rural to urban areas has posed challenges
                in providing healthcare. b) Health issues in rural areas also
                remain, mainly due to lack of availability and accessibility to
                medical facilities as well as affordability. c) The move to a
                more sedentary lifestyle with reduced need to exercise oneself
                has led to newer types of diseases like diabetes and high blood
                pressure.
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  E. Evolution of Health Insurance in India
                </strong>
                <br />
                While the government had been busy with its policy decisions on
                healthcare, it also put in place health insurance schemes.
                Insurance companies came with their health insurance policies
                only later. Here is how health insurance developed in India:
                <br />
                <strong>a) Employees’ State Insurance Scheme</strong>
                <br />
                Health Insurance in India formally began with the beginning of
                the Employees’ State Insurance Scheme, introduced vide the ESI
                Act, 1948, shortly after the country’s independence in 1947.
                This scheme was introduced for blue-collar workers employed in
                the formal private sector and provides comprehensive health
                services through a network of its own dispensaries and
                hospitals.
                <br />
                <strong>b) Central Government Health Scheme</strong> <br />
                The ESIS was soon followed by the Central Government Health
                Scheme (CGHS), which was introduced in 1954 for the central
                government employees including pensioners and their family
                members working in civilian jobs. It aims to provide
                comprehensive medical care to employees and their families and
                is partly funded by the employees and largely by the employer
                (central government).
                <br />
                <strong>c) Commercial health insurance</strong>
                <br />
                Commercial health insurance was offered by some of the non-life
                insurers before as well as after nationalisation of insurance
                industry. But, as it was mostly loss making for the insurers, in
                the beginning, it was largely available for corporate clients
                only and that too for a limited extent.
                <br />
                In 1986, the first standardised health insurance product for
                individuals and their families was launched in the Indian market
                by all the four nationalized non-life insurance companies (these
                were then the subsidiaries of the General Insurance Corporation
                of India). This product, Mediclaim was introduced to provide
                coverage for the hospitalisation expenses up to a certain annual
                limit of indemnity with certain exclusions such as maternity,
                pre-existing diseases etc. It underwent several rounds of
                revisions as the market evolved, the last being in 2012.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  F. Health Insurance Market
                </strong>
                <br />
                The health insurance market today consists of a number of
                players some providing the health care facilities called
                providers, others the insurance services and also various
                intermediaries. Some form the basic infrastructure while others
                provide support facilities. Some are in the government sector
                while others are in the private sector. These are briefly
                described below:
                <br />
                <br />
                <strong>A. INFRASTRUCTURE:</strong>
                <br />
                <strong>1. Public health sector</strong>
                <br />
                The Public health system operates at the national level, state
                level, district level and to a limited extent at the village
                level where, to implement the national health policies in
                villages, community volunteers have been involved to serve as
                links between the village community and government
                infrastructure. These include:
                <br />
                <strong>a) The Anganwadi workers</strong>(1 for every 1,000
                population) who are enrolled under the nutrition supplementation
                programme and the Integrated Child Development Service scheme
                (ICDS) of Ministry of Human Resource Development.
                <br />
                <strong>b) The Trained Birth Attendants</strong> (TBA) and the
                Village Health guides (an earlier scheme of health departments
                in states).
                <br />
                <strong>c) ASHA (Accredited Social Health Activist) </strong>
                volunteers, selected by the community under the NRHM (National
                Rural Health Mission) programme, who are new, village-level,
                voluntary health workers trained to serve as health sector’s
                links in the rural areas.
                <br />
                <br />
                <strong>2. Private sector providers</strong>
                <br />
                India has a very large private health sector providing all three
                types of healthcare services - primary, secondary as well as
                tertiary. These range from voluntary, not-for-profit
                organisations and individuals to for-profit corporate, trusts,
                solo practitioners, stand-alone specialist services, diagnostic
                laboratories, pharmacy shops, and also the unqualified providers
                (quacks). In India nearl y 77% of the allopathic (MBBS and
                above) doctors are practicing in the private sector. Private
                health expenditure accounts for more than 75% of all health
                spending in India. The private sector accounts fo r 82% of all
                outpatient visits and 52% of hospitalization at the all India
                level2.
                <br />
                India also has the largest number of qualified practitioners in
                other systems of Medicine (Ayurveda/ Siddha/ Unani/ Homeopathy)
                which is over 7 lakh practitioners. These are located in the
                public as well as the private sector.
                <br />
                It is estimated that more than 7,000 voluntary agencies are
                involved in health- related activities. A large number of
                secondary and tertiary hospitals are also registered as
                non-profit societies or trusts, and contribute significantly to
                provision of inpatient services to insured persons.
                <br />
                <br />
                <strong>3. Pharmaceutical industry</strong>
                <br />
                Coming to provider of medicines and health related products,
                India has a large pharmaceutical industry, which has grown from
                a Rs 10 crore industry in 1950 to a Rs 55,000 crore business
                today (including exports). It employs about 5 million people,
                with manufacturing taking place in over 6000 units.
                <br />
                <br />
                <strong>B. INSURANCE PROVIDERS:</strong>
                <br />
                Insurance Companies especially in the general insurance sector
                provide the bulk of the health insurance services. These have
                been listed earlier. What is most encouraging is the presence of
                stand-alone health insurance companies - five as on date - with
                likelihood of a few more coming in to increase the health
                insurance provider network.
                <br />
                <br />
                <strong>C. INTERMEDIARIES:</strong>
                <br />
                A number of people and organizations providing services as part
                of the insurance industry also form part of the health insurance
                market. All such intermediaries are governed by IRDA. These
                include:
                <br />
                <strong>1. Insurance Broker</strong>swho may be individuals or
                corporates and work independently of insurance companies. They
                represent the people who want insurance and connect them to
                insurance companies obtaining best possible insurance covers at
                best possible premium rates. They also assist the insuring
                people during times of loss and making insurance claims. Brokers
                may place insurance business with any insurance company handling
                such business. They are remunerated by insurance companies by
                way of insurance commission.
                <br />
                <strong>2. Insurance Agents</strong>are usually individuals but
                some can be corporate agents too. Unlike brokers, agents cannot
                place insurance with any insurance company but only with the
                company for which they have been granted an agency. As per
                current regulations, an agent can act only on behalf of one
                general insurance company and one life insurance company one
                health insurer and one of each of the mono line insurers. at the
                most. They too are remunerated by insurance companies by way of
                insurance commission.
                <br />
                <strong>3. Third Party Administrators</strong>are a new type of
                service providers who came into business since 2001. They are
                not authorized to sell insurance but provide administrative
                services to insurance companies. Once a health insurance policy
                is sold, the details of the insured persons are shared with a
                appointed TPA who then prepares the data base and issues health
                cards to the insured persons. Such health cards enable the
                insured person to avail cashless medical facilities (treatment
                without having to pay cash immediately) at hospitals and
                clinics. Even if the insured person does not use cashless
                facility, he can pay the bills and seek reimbursement from the
                appointed TPA. TPAs are funded by the insurance companies for
                their respective claims and are remunerated by them by way of
                fees which are a percentage of the premium.
                <br />
                <strong>4. Insurance Web Aggregators</strong>are one of the
                newest types of service providers to be governed by IRDAI
                regulations. Through their web site and/or telemarketing, they
                can solicit insurance business through distance marketing
                without coming face to face with the prospect and generate leads
                of interested prospects to insurers with whom they have an
                agreement. They also display products of such insurance
                companies for comparison. They may also seek IRDAI authorization
                to perform telemarketing and outsourcing functions for the
                insurers such as premium collection through online portal,
                sending premium reminders and also various types of policy
                related services. They are remunerated by insurance companies
                based on the leads converted to business, display of insurance
                products as well as the outsourcing services performed by them.
                <br />
                <strong>5. Insurance Marketing Firmsare</strong> the latest
                types of intermediaries to be governed by IRDAI. They can
                perform the following activities by employing individuals
                licensed to market, distribute and service such products:
                <br />
                <strong>Insurance Selling Activities:</strong>To sell by
                engaging Insurance Sales Persons (ISP) insurance products of two
                Life, two General and two Health Insurance companies at any
                point of time, under intimation to the Authority. In respect of
                general insurance, the IMF is allowed to solicit or procure only
                retail lines of insurance products as given in the file & use
                guidelines namely motor, health, personal accident,
                householders, shopkeepers and such other insurance products
                approved by the Authority from time to time. Any change in the
                engagement with the insurance companies can be done only with
                the prior approval of the Authority and with suitable
                arrangements for servicing existing policyholders.
                <br />
                <br />
                <strong>D. OTHERS IMPORTANT ORGANIZATIONS:</strong>
                <br />
                There are a few more entities which form part of the health
                insurance market and these include:
                <br />
                <strong>
                  1. Insurance Regulatory and Development Authority of India
                  (IRDAI)
                </strong>
                which is the Insurance regulator formed by an Act of Parliament
                which regulates all business and players in the insurance
                market. It came into being in 2000 and is entrusted with the
                task of not only regulating but also developing insurance
                business.
                <br />
                <strong>
                  2. General Insurance and Life Insurance Councils
                </strong>
                ,who also make recommendations to IRDAI for governing their
                respective life or general insurance business.
                <br />
                <strong>3. Insurance Information Bureau of India</strong>was
                promoted in year 2009 by IRDA and is a registered society with a
                governing council of 20 members mostly from the insurance
                sector. It collects analyses and creates various sector- level
                reports for the insurance sector to enable data-based and
                scientific decision making including pricing and framing of
                business strategies. It also provides key inputs to the
                Regulator and the Government to assist them in policymaking. The
                Bureau has generated many reports, both periodic and one-time,
                for the benefit of the industry.
                <br />
                <strong>4. Educational institutions</strong>such as Insurance
                Institute of India and National Insurance Academy which provide
                a wide variety of insurance and management related training and
                a host of private training institutes which provide training to
                would-be agents
                <br />
                <strong>5. Medical Practitioners</strong>also assist insurance
                companies and TPAs in assessing health insurance risks of
                prospective clients during acceptance of risks and also advise
                insurance companies in case of difficult claims.
                <br />
                <strong>6. Legal entities</strong>such as the Insurance
                Ombudsman, Consumer courts as well as civil courts also play a
                role in the health insurance market when it comes to redressal
                of consumer grievances
                <br />
              </li>
            </ul>
          </div>
        );
      case "CHAPTER-08":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 8:INSURANCE DOCUMENTATION
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            In the insurance industry, we deal with a large number of forms,
            documents etc. This chapter takes us through the various documents
            and their importance in an insurance contract. It also gives an
            insight to the exact nature of each form, how to fill it and the
            reasons for calling specific information.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">A. Proposal forms</strong>
                <br />
                <strong className="text-red-700">
                  B. Acceptance of the proposal (underwriting)
                </strong>
                <br />
                <strong className="text-red-700"> C. Prospectus</strong>
                <br />
                <strong className="text-red-700"> D. Premium receipt</strong>
                <br />
                <strong className="text-red-700"> E. Policy Document </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  F. Conditions and Warranties{" "}
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  H. Interpretation of policies{" "}
                </strong>
                <br />
                <strong className="text-red-700"> I. Renewal notice </strong>
                <br />
                <strong className="text-red-700">
                  J. Anti-Money Laundering and ‘Know Your Customer Guidelines
                </strong>
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">A. Proposal forms</strong>
                <br />
                As stated earlier, insurance is a contract which is reduced in
                writing to a policy. Insurance documentation is not limited to
                issuance of policies. As there are many intermediaries like
                brokers and agents who operate between them, it is possible that
                an insured and his insurer may never meet.
                <br />
                <br />
                <strong className="text-red-700">1. Proposal forms</strong>
                <br />
                The first stage of documentation is basically the proposal form
                through which the insured informs:
                <br />
                ✔ who he/she is
                <br />
                ✔ what kind of insurance he/she needs
                <br />
                ✔ details of what he/she wants to insure and
                <br />
                ✔ for what period of time
                <br />
                <br />
                <strong className="text-red-700">
                  Standard form of declaration
                </strong>
                <br />
                The IRDAI has specified the format of the standard declaration
                in the health insurance proposal as under:
                <br />
                1. I/We hereby declare, on my behalf and on behalf of all
                persons proposed to be insured, that the above statements,
                answers and/or particulars given by me are true and complete in
                all respects to the best of my knowledge and that I/We am/are
                authorized to propose on behalf of these other persons.
                <br />
                2. I understand that the information provided by me will form
                the basis of the insurance policy, is subject to the Board
                approved underwriting policy of the insurance company and that
                the policy will come into force only after full receipt of the
                premium chargeable.
                <br />
                3. I/We further declare that I/we will notify in writing any
                change occurring in the occupation or general health of the life
                to be insured/proposer after the proposal has been submitted but
                before communication of the risk acceptance by the company.
                <br />
                4. I/We declare and consent to the company seeking medical
                information from any doctor or from a hospital who at any time
                has attended on the life to be insured/proposer or from any past
                or present employer concerning anything which affects the
                physical or mental health of the life to be assured/proposer and
                seeking information from any insurance company to which an
                application for insurance on the life to be assured/proposer has
                been made for the purpose of underwriting the proposal and/or
                claim settlement
                <br />
                5. I/We authorize the company to share information pertaining to
                my proposal including the medical records for the sole purpose
                of proposal underwriting and/or claims settlement and with any
                Governmental and/or Regulatory authority.
                <br />
                <br />
                <strong>b) Nature of questions in a proposal form</strong>
                <br />
                The number and nature of questions in a proposal form vary
                according to the class of insurance concerned.
                <br />
                In personal lineslike health, personal accident and travel
                insurance, proposal forms are designed to get information about
                the proposer’s health, way of life and habits, pre-existing
                health conditions, medical history, hereditary traits, past
                insurance experience etc.
                <br />
                <br />
                <strong>Elements of a proposal</strong>
                <br />
                <strong>i. Proposer’s name in full</strong>
                <br />
                The proposer should be able to identify herself unambiguously.
                It is important for the insurer to know with whom the contract
                has been entered, so that the benefits under the policy would be
                received only by the insured. Establishing identity is important
                even in cases where someone else may have acquired an interest
                in the risk insured (like legal heirs in case of death) and have
                to make a claim.
                <br />
                <strong>ii. Proposer’s address and contact details</strong>
                <br />
                The reasons stated above are applicable for collecting the
                proposer’s address and contact details as well.
                <br />
                <strong>
                  iii. Proposer’s profession, occupation or business
                </strong>
                <br />
                In some cases like health and personal accident insurance, the
                proposer’s profession, occupation or business are of importance
                as they could have a material bearing on the risk.
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                Given below are some of the details of proposal form for a
                health insurance policy:
                <br />
                1. The proposal form incorporates a prospectus which gives
                details of the cover, such as coverage, exclusions, provisions
                etc. The prospectus forms part of the proposal form and the
                proposer has to sign it as having noted its contents.
                <br />
                2. The proposal form collects information relating to the name,
                address, occupation, date of birth, sex, and relationship of
                each insured person with the proposer, average monthly income
                and income tax PAN No., name and address of the Medical
                Practitioner, his qualifications and registration number. Bank
                details of the insured are also now a days collected to make
                payment of claim money directly through bank transfer.
                <br />
                3. In addition, there are questions relating to the medical
                condition of the insured person. These detailed questions in the
                form are based on past claims experience and are to achieve
                proper underwriting of the risk.
                <br />
                4. The insured person is required to state full details if he
                has suffered from any of the specified diseases in the form.
                <br />
                5. The insured person has to state any additional facts which
                should be disclosed to insurers and if he has any knowledge of
                any positive existence or presence of any illness or injury
                which may require medical attention.
                <br />
                6. The form also includes questions relating to past insurance
                and claims history and additional present insurance with any
                other insurer.
                <br />
                7. The special features of the declaration to be signed by the
                proposer must be noted.
                <br />
                8. The insured person agrees and authorises the insurer to seek
                medical information from any hospital / medical practitioner who
                has at any time attended or may attend concerning any illness
                which affects his physical or mental health.
                <br />
                9. The insured person confirms that he has read the prospectus
                forming part of the form and is willing to accept the terms and
                conditions.
                <br />
                10. The declaration includes the usual warranty regarding the
                truth of the statements and the proposal form as the basis of
                the contract.
                <br />
                <strong>Medical Questionnaire</strong>
                <br />
                In case of adverse medical history in the proposal form, the
                insured person has to complete a detailed questionnaire relating
                to diseases such as Diabetes, Hypertension, Chest pain or
                Coronary Insufficiency or Myocardial Infarction.
                <br />
                These have to be supported by a form completed by a consulting
                physician. This form is scrutinised by company’s panel doctor,
                based on whose opinion, acceptance, exclusion, etc. are decided.
                <br />
                IRDAI has stipulated that a copy of the proposal form and the
                annexures thereof, have to be attached to the policy document
                and the same should be sent to the insured for his records.
                <br />
                <br />
                <strong>2. Role of intermediary</strong>
                <br />
                The intermediary has a responsibility towards both parties i.e.
                insured and insurer
                <br />
                An agent or a broker, who acts as the intermediary between the
                insurance company and the insured has the responsibility to
                ensure all material information about the risk is provided by
                the insured to insurer.
                <br />
                IRDAI regulation provides that intermediary has responsibility
                towards the client.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  B. Acceptance of the proposal (underwriting)
                </strong>
                <br />
                We have seen that a completed proposal form broadly gives the
                following information:
                <br />
                Details of the insured
                <br />
                ✔ Details of the subject matter
                <br />
                ✔ Type of cover required
                <br />
                ✔ Details of the physical features both positive and negative
                <br />
                ✔ Previous history of insurance and loss
                <br />
                In the case of a health insurance proposal, the insurer may also
                refer the prospective customer e.g. above 45 years of age to a
                doctor and/or for medical check-up. Based on the information
                available in the proposal and, where medical check-up has been
                advised, based on the medical report and the recommendation of
                the doctor, the insurer takes the decision. Sometimes, where the
                medical history is not satisfactory, an additional questionnaire
                to get more information is also required to be obtained from the
                prospective client. The insurer then decides about the rate to
                be applied to the risk factor and calculates the premium based
                on various factors, which is then conveyed to the insured.
                <br />
                Proposals are processed by the insurer with speed and efficiency
                and all decisions thereof are communicated by it in writing
                within a reasonable period.
                <br />
                <strong className="text-red-700">
                  Note on Underwriting and processing of proposals
                </strong>
                <br />
                As per IRDAI guidelines, the insurer has to process the proposal
                within 15 days’ time. The agent is expected to keep track of
                these timelines, follow up internally and communicate with the
                prospect / insured as and when required by way of customer
                service. This entire process of scrutinizing the proposal and
                deciding about acceptance is known as underwriting
                <br />
              </li>
              <li>
                <strong className="text-red-700">C. Prospectus</strong>
                <br />
                A Prospectus is a document issued by the insurer or on its
                behalf to the prospective buyers of insurance. It is usually in
                the form of a brochure or leaflet and serves the purpose of
                introducing a product to such prospective buyers. Issue of
                prospectus is governed by the Insurance Act, 1938 as well as by
                Protection of Policyholders’ Interest Regulations 2002 and the
                Health Insurance Regulations 2013 of the IRDAI.
                <br />
                The prospectus of any insurance product should clearly state the
                scope of benefits, the extent of insurance cover and explain in
                a clear manner the warranties, exceptions and conditions of the
                insurance cover.
                <br />
                The allowable riders (also called Add-on covers) on the product
                should also be clearly stated with regard to their scope of
                benefits. Also, the premium related to all the riders put
                together should not exceed 30% of the premium of the main
                product.
                <br />
                Other important information which a Prospectus should also
                disclose includes:
                <br />
                1. Any differences in covers and premium for different age
                groups or for different entry ages
                <br />
                2. Renewal terms of the policy
                <br />
                3. Terms of cancellation of policy under certain circumstances
                <br />
                4. The details of any discounts or loading applicable under
                different circumstances
                <br />
                5. The possibility of any revision or modification of the terms
                of the policy including the premium
                <br />
                6. Any incentives to reward policyholders for early entry,
                continued renewals, favourable claims experience etc. with the
                same insurer
                <br />
                7. A declaration that all its Health insurance policies are
                portable which means that these policies can be renewed with any
                other insurer who offers similar cover with the same benefits he
                would have enjoyed had he continued with the existing insurer.
                <br />
                <strong>
                  Insurers of Health policies usually publish Prospectuses about
                  their Health insurance products. The proposal form in such
                  cases would contain a declaration that the customer has read
                  the Prospectus and agrees to it
                </strong>
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">D. Premium receipt</strong>
                <br />
                When the premium is paid by the customer to the insurer towards
                premium, the insurer is bound to issue a receipt. A receipt is
                also to be issued in case any premium is paid in advance.
                <br />
                <strong>Definition</strong>
                <br />
                <strong>
                  Premium is the consideration or amount paid by the insured to
                  the insurer for insuring the subject matter of insurance,
                  under a contract of insurance.
                </strong>
                <br />
                <strong>
                  1. Payment of Premium in Advance (Section 64 VB of Insurance
                  Act, 1938)
                </strong>{" "}
                <br />
                As per Insurance Act, premium is to be paid in advance, before
                the start of the insurance cover. This is an important
                provision, which ensures that only when the premium is received
                by the insurance company, a valid insurance contract can be
                completed and the risk can be assumed by the insurance company.
                This section is a special feature of non-life insurance industry
                in India.
                <br />
                <strong className="text-red-700">Important</strong>
                <br />
                a) Section 64 VB of the Insurance Act-1938 provides that no
                insurer shall assume any risk unless and until the premium is
                received in advance or is guaranteed to be paid or a deposit is
                made in advance in the prescribed manner
                <br />
                b) Where an insurance agent collects a premium on a policy of
                insurance on behalf of an insurer, he shall deposit with or
                dispatch by post to the insurer the premium so collected in full
                without deduction of his commission within twenty-four hours of
                the collection excluding bank and postal holidays.
                <br />
                c) It is also provided that the risk may be assumed only from
                the date on which the premium has been paid in cash or by
                cheque.
                <br />
                d) Where the premium is tendered by postal or money order or
                cheque sent by post, the risk may be assumed on the date on
                which the money order is booked or the cheque is posted as the
                case may be.
                <br />
                e) Any refund of premium which may become due to an insured on
                account of the cancellation of policy or alteration in its terms
                and conditions or otherwise, shall be paid by the insurer
                directly to the insured by a crossed or order cheque or by
                postal / money order and a proper receipt shall be obtained by
                the insurer from the insured. It is the practice now a days to
                credit the amount directly to the Insured’s bank account. Such
                refund shall in no case be credited to the account of the agent
                <br />
                There are exceptions to the above pre-condition payment of
                premium, provided in the Insurance Rules 58 and 59. One is for
                payment in instalments in case of policies which run for more
                than 12 months such as life insurance policies. Others include
                payment through a bank guarantee in specified cases where the
                exact premium cannot be ascertained in advance or by debit to a
                Cash Deposit account maintained by the client with the insurer.
                <br />
                <br />
                <strong className="mt-10 text-red-700">
                  E. Policy Document
                </strong>
                <br />
                <strong>Policy Document</strong>
                <br />
                The policy is a formal document which provides an evidence of
                the contract of insurance. This document has to be stamped in
                accordance with the provisions of the Indian Stamp Act, 1899.
                <br />
                IRDAI Regulations for protecting policy holder’s interest
                specified what
                <br />
                <strong>A health insurance policy should contain:</strong>
                <br />
                a) The name(s) and address(es) of the insured and any other
                person having insurable interest in the subject matter
                <br />
                b) Full description of the persons or interest insured
                <br />
                c) The sum insured under the policy person and/or peril wise
                <br />
                d) Period of insurance
                <br />
                e) Perils covered and exclusions
                <br />
                f) Any excess / deductible applicable
                <br />
                g) Premium payable and where the premium is provisional subject
                to adjustment, the basis of adjustment of premium
                <br />
                h) Policy terms, conditions and warranties
                <br />
                i) Action to be taken by the insured upon occurrence of a
                contingency likely to give rise to a claim under the policy
                <br />
                j) The obligations of the insured in relation to the
                subject-matter of insurance upon occurrence of an event giving
                rise to a claim and the rights of the insurer in the
                circumstances
                <br />
                k) Any special conditions
                <br />
                l) Provision for cancellation of the policy on grounds of
                misrepresentation, fraud, non-disclosure of material facts or
                non-cooperation of the insured
                <br />
                m) The address of the insurer to which all communications in
                respect of the policy should be sent
                <br />
                n) The details of the riders, if any
                <br />
                o) Details of grievance redressal mechanism and address of
                ombudsman
                <br />
                Every insurer has to inform and keep (the insured) informed
                periodically on the requirements to be fulfilled by the insured
                regarding lodging of a claim arising in terms of the policy and
                the procedures to be followed by him to enable the insurer to
                settle a claim early.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  F. Conditions and Warranties
                </strong>
                <br />
                Here, it is important to explain two important terms used in
                policy wordings. These are called Conditions and Warranties.
                <br />
                <strong>1. Conditions</strong>
                <br />
                A condition is a provision in an insurance contract which forms
                the basis of the agreement.
                <br />
                <strong>Examples</strong>
                <br />
                a. One of the standard conditions in most insurance policies
                states: If the claim be in any respect fraudulent, or if any
                false declaration be made or used in support thereof or if any
                fraudulent means or devices are used by the Insured or any one
                acting on his behalf to obtain any benefit under the policy or
                if the loss or damage be occasioned by the wilful act, or with
                the connivance of the Insured, all benefits under this policy
                shall be forfeited.
                <br />
                b. The Claim Intimation condition in a Health policy may state:
                Claim must be filed within certain days from date of discharge
                from the Hospital. However, waiver of this Condition may be
                considered in extreme cases of hardship where it is proved to
                the satisfaction of the Company that under the circumstances in
                which the insured was placed it was not possible for him or any
                other person to give such notice or file claim within the
                prescribed time-limit.
                <br />
                <strong>2. Warranties</strong>
                <br />
                Warranties are used in an insurance contract to limit the
                liability of the insurer under certain circumstances. Insurers
                also include warranties in a policy to reduce the hazard. With a
                warranty, the insured, undertakes certain obligations that need
                to be complied within a certain period of time and also during
                the policy period and the liability of the insurer depends on
                the insured’s compliance with these obligations. Warranties play
                an essential role in managing and improving the risk.
                <br />
                A warranty is a condition expressly stated in the policy which
                has to be literally complied with for validity of the contract.
                Warranty is not a separate document. It is part of the policy
                document. It is a condition precedent to (which operates prior
                to other terms of) the contract. It must be observed and
                complied with strictly and literally, whether it is material to
                the risk or not.
                <br />
                If a warranty is not fulfilled, the policy becomes voidable at
                the option of the insurers even when it is clearly established
                that the breach has not caused or contributed to a particular
                loss. However, in practice, if the breach of warranty is of a
                purely technical nature and does not, in any way, contribute to
                or aggravate the loss, insurers at their discretion may process
                the claims according to norms and guidelines as per company
                policy. In such case, losses can be treated as compromise claims
                and settled usual for a high percentage of the claim but not for
                100 percent.
                <br />
                <br />
                <strong className="text-red-700">G. Endorsements</strong>
                <br />
                It is the practice of insurers to issue policies in a standard
                form; covering certain perils and excluding certain others.
                <br />
                <strong>DEFINITION</strong>
                <br />
                If certain terms and conditions of the policy need to be changed
                at the time of issuance, it is done by setting out the
                amendments / changes through a document called endorsement.
                <br />
                It is attached to the policy and forms part of it. The policy
                and the endorsement together make up the contract. Endorsements
                may also be issued during the currency of the policy to record
                changes / amendments.
                <br />
                Whenever material information changes, the insured has to advice
                the insurance company who will take note of this and incorporate
                the same as part of the insurance contract through the
                endorsement.
                <br />
                <strong>
                  Endorsements normally required under a policy relate to:
                </strong>
                <br />
                a) Variations /changes in sum insured b) Change of insurable
                interest by way of taking of a loan and mortgaging the policy to
                a bank. c) Extension of insurance to cover additional perils /
                extension of policy period d) Change in risk, e.g. change of
                destinations in the case of an overseas travel policy e)
                Transfer of property to another location f) Cancellation of
                insurance g) Change in name or address etc.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  H. Interpretation of policies
                </strong>
                <br />
                Contracts of insurance are expressed in writing and the
                insurance policy wordings are drafted by insurers. These
                policies have to be interpreted according to certain
                well-defined rules of construction or interpretation which have
                been established by various courts. The most important rule of
                construction is that the intention of the parties must prevail
                and this intention is to be looked for in the policy itself. If
                the policy is issued in an ambiguous manner, it will be
                interpreted by the courts in favour of the insured and against
                the insurer on the general principle that the policy was drafted
                by the insurer.
                <br />
                Policy wordings are understood and interpreted as per the
                following rules:
                <br />
                a) An express or written condition overrides an implied
                condition except where there is inconsistency in doing so.
                <br />
                b) In the event of a contradiction in terms between the standard
                printed policy form and the typed or handwritten parts, the
                typed or handwritten part is deemed to express the intention of
                the parties in the particular contract, and their meaning will
                overrule those of the original printed words.
                <br />
                c) If an endorsement contradicts other parts of the contract the
                meaning of the endorsement will prevail as it is the later
                document.
                <br />
                d) Clauses in italics over-ride the ordinary printed wording
                where they are inconsistent.
                <br />
                e) Clauses printed or typed in the margin of the policy are to
                be given more importance than the wording within the body of the
                policy.
                <br />
                f) Clauses attached or pasted to the policy override both
                marginal clauses and the clauses in the body of the policy.
                <br />
                g) Printed wording is over-ridden by typewritten wording or
                wording impressed by an inked rubber stamp.
                <br />
                h) Handwriting takes precedence over typed or stamped wording.
                <br />
                i) Finally, the ordinary rules of grammar and punctuation are
                applied if there is any ambiguity or lack of clarity.
                <br />
                <br />
                <strong className="text-red-700">
                  J. Anti-Money Laundering and Know Your Customer Guidelines
                </strong>
                <br />
                Criminals obtain funds through their illegal activities but seek
                to pass it on as legal money by a process called money
                laundering.
                <br />
                Money Laundering is the process by which criminals transfer
                funds to conceal the true origin and ownership of the proceeds
                of criminal activities. By this process, money can lose its
                criminal identity and appear valid.
                <br />
                Criminals attempt to use financial services, including banks and
                insurance, to launder their money. They make transactions by
                using false identities, for example, by purchasing some form of
                insurance and then managing to withdraw that money and then
                disappearing once their purpose is served.
                <br />
                Steps to prevent such attempts at money laundering have been
                receiving efforts at government levels world-wide, including
                India.
                <br />
                The legislation of Prevention of Money Laundering Act was
                enacted by the government in 2002. The Anti-Money Laundering
                guidelines issued by IRDAI soon after have indicated suitable
                measures to determine the true identity of customers requesting
                for insurance services, reporting of suspicious transactions and
                proper record keeping of cases involving or suspected of
                involving money laundering.
                <br />
                According to the Know Your Customer guidelines, every customer
                needs to be properly identified by collection of the following
                documents:
                <br />
                1. Address verification
                <br />
                2. Recent photograph
                <br />
                3. Financial status
                <br />
                4. Purpose of insurance contract
                <br />
                The agent is therefore required to collect documents at the time
                of bringing in business to establish the identity of customers:
                <br />
                1. In case of Individuals - Collect full name, address, contact
                numbers of insured with ID and address proof, PAN number and
                full bank details for NEFT purposes
                <br />
                2. In case of corporates - collect Certificate of Incorporation,
                Memorandum and Articles of Association, Power of Attorney to
                transact the business, copy of PAN card3. In case of Partnership
                firms - Collect Registration certificate (if registered),
                Partnership deed, Power of Attorney granted to a partner or an
                employee of the firm to transact business on its behalf, Proof
                of identity of such person
                <br />
                3. In case of Partnership firms - Collect Registration
                certificate (if registered), Partnership deed, Power of Attorney
                granted to a partner or an employee of the firm to transact
                business on its behalf, Proof of identity of such person
                <br />
                4. In case of Trusts and foundations - similar to that of
                partnership It is important to note here that such information
                also helps in cross-selling of products and is a helpful
                marketing tool.
                <br />
              </li>
            </ul>
          </div>
        );
      case "CHAPTER-09":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 9:HEALTH INSURANCE PRODUCTS
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            This chapter will give you an overall insight into the various
            health insurance products offered by insurance companies in India.
            From just one product – Mediclaim to hundreds of products of
            different kinds, the customer has a wide range to choose appropriate
            cover. The chapter explains the features of various health products
            that can cover individuals, family and group.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">
                  A. Classification of health insurance products
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  B. IRDA guidelines on Standardization in health insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  C. Hospitalization indemnity product
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  D. Top-up covers or high deductible insurance plans
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  E. Senior citizen policy
                </strong>
                <br />
                <strong className="text-red-700">
                  F. Fixed benefit covers – Hospital cash, critical illness
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  G. Long term care product
                </strong>
                <br />
                <strong className="text-red-700"> H. Combi-products</strong>
                <br />
                <strong className="text-red-700"> I. Package policies</strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  J. Micro insurance and health insurance for poorer sections
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  K. Rashtriya Swasthya Bima Yojana
                </strong>
                <br />
                <strong className="text-red-700">
                  L. Pradhan Mantri Suraksha Bima Yojana
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  M. Pradhan Mantri Jan Dhan Yojana
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  N. Personal accident and disability cover
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  O. Overseas travel insurance
                </strong>
                <br />
                <strong className="text-red-700"> P. Group health cover</strong>
                <br />
                <strong className="text-red-700"> Q. Special products</strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  R. Key terms in health policies
                </strong>
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  A. Classification of health insurance products
                </strong>
                <br />
                <strong>1. Introduction to health insurance products</strong>
                <br />
                The Health Insurance Regulations of IRDA define health cover as
                follows
                <br />
                <strong>Definition</strong>
                <br />
                <strong>
                  “Health insurance business” or “health cover” means the
                  effecting of insurance contracts which provide for sickness
                  benefits or medical, surgical or hospital expense benefits,
                  including assured benefits and long-term care, travel
                  insurance and personal accident cover.
                </strong>
                <br />
                <strong>
                  Health insurance products available in the Indian market are
                  mostly in the nature of hospitalization products. These
                  products cover the expenses incurred by an individual during
                  hospitalization. Again, these types of expenses are very high
                  and mostly beyond the reach of the common man due to
                  increasing cost of healthcare, surgical procedures, new and
                  more expensive technology coming in the market and cost of
                  newer generation of medicines. In fact, it is becoming very
                  difficult for an individual even if he is financially sound to
                  bear such high expenses without any health insurance.
                </strong>
                <br />
                <br />
                <strong>2. Features of health policies</strong>
                <br />
                Health insurance basically deals with sickness and therefore
                expenses incurred due to sickness. Sometimes, the disease
                contracted by a person could be chronic or long lasting,
                lifelong or critical in terms of impact on day to day living
                activities. Expenses could also be incurred due to accidental
                injuries or due to disablement arising out of accident.
                <br />
                Various customers with different life styles, paying capacity
                and health status would have different requirements which need
                to be considered while designing suitable products to be offered
                to each customer segment. Customers also desire comprehensive
                cover while buying health insurance which would cover all their
                needs. At the same time, to achieve greater acceptability and
                bigger volume, health insurance products need to be kept
                affordable, they should also be easy to understand for the
                customer and also for the sales team to market them.
                <br />
                <br />
                <strong>
                  3. Broad classification of health insurance products
                </strong>
                <br />
                Whatever be the product design, health insurance products can be
                broadly classified into 3 categories:
                <br />
                <strong>a) Indemnity covers</strong>
                <br />
                These products constitute the bulk of the health insurance
                market and pay for actual medical expenses incurred due to
                hospitalization.
                <br />
                <strong>b) Fixed benefit covers</strong>
                <br />
                Also called as ‘hospital cash’, these products pay for a fixed
                sum per day for the period of hospitalization. Some products
                also have a fixed graded surgery benefit incorporated in the
                product.
                <br />
                <strong>c) Critical illness covers</strong>
                <br />
                This is a fixed benefit plan for payout on occurrence of a
                pre-defined critical illness like heart attack, stroke, cancer
                etc.
                <br />
                The world over health and disability insurance go together but
                in India, personal accident cover has traditionally been sold
                independent of health insurance.
                <br />
                Also health insurance usually does not include expenses incurred
                whilst outside India. For this purpose, another product –
                overseas health insurance or travel insurance - needs to be
                purchased. Only in recent times, a few high end health insurance
                products of private insurers include overseas insurance cover as
                part of regular health insurance cover, subject to certain terms
                and conditions.
                <br />
                <br />
                <strong>4. Classification based on customer segment</strong>
                <br />
                Products are also designed keeping in mind the target customer
                segment. The benefit structure, pricing, underwriting and
                marketing for each segment is quite distinct. Products
                classified based on customer segments are:
                <br />
                a) Individual cover offered to retail customers and their family
                members
                <br />
                b) Group cover offered to corporate clients, covering employees
                and groups, covering their members
                <br />
                c) Mass policies for government schemes like RSBY covering very
                poor sections of the population.333
                <br />
                <br />
                <strong className="text-red-700">
                  B. IRDA Guidelines on Standardization in health insurance
                </strong>
                <br />
                With so many insurers providing numerous varied products and
                with different definitions of various terms and exclusions,
                confusion arose in the market. It became difficult for the
                customer to compare products and for third party administrators
                to pay claims against products of individual companies.
                Moreover, in critical illness policies, there was no clear
                understanding as to what was a critical illness and what was
                not. Maintaining electronic data for the health insurance
                industry was also becoming difficult.
                <br />
                To remove the confusion among insurers, service providers, TPAs
                and hospitals and the grievances of the insuring public, various
                organizations like IRDA, service providers, hospitals, Health
                Advisory Committee of the Federation of Chambers of Commerce and
                Industry got together to provide some kind of standardization in
                health insurance. Based on a common understanding, IRDA issued
                Guidelines on standardization in health insurance in 2013.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  C. Hospitalization indemnity product
                </strong>
                <br />
                An indemnity based health insurance policy is the most common
                and highest sold health insurance product in India. The
                Mediclaim policy introduced in the eighties by the PSU insurers
                was the earliest standard health product and was the only
                product available in the market for a long time. Though this
                product, with a few changes, is marketed by different insurers
                under different brand names, Mediclaim continues to be the
                largest selling health insurance in the country.
                <br />
                Hospitalization indemnity products protect individuals from the
                expenditure they may need to incur in the event of
                hospitalisation. In most of the cases, they also cover a
                specific number of days before and after hospitalisation, but
                exclude any expenses not involving hospitalisation.
                <br />
                Such a cover is provided on an ‘indemnity’ basis, that is, by
                making good part or all of the expenses incurred or amount spent
                during hospitalisation. This may be contrasted with the
                insurance coverage on ‘benefit’ basis, where the amount that
                will be paid on the occurrence of a certain event (like
                hospitalisation, diagnosis of critical illness or each day of
                admission) is as stated in the insurance policy and is not
                related to the actual expenditure incurred.
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                Raghu has a small family consisting of his wife and a 14 year
                old son. He has taken a Mediclaim policy, covering each member
                of his family, from a health insurance company, for an
                individual cover of Rs. 1 lakh each. Each of them could get
                recovery of medical expenses up to Rs. 1 lakh in case of
                hospitalisation.
                <br />
                Raghu was hospitalised due to heart attack and required surgery.
                The medical bill raised was Rs. 1.25 lakhs. The insurance
                company paid Rs 1 lakh according to the plan coverage and Raghu
                had to pay the remaining amount of Rs. 25,000 from his own
                pocket.
                <br />
                <br />
                <strong className="text-red-700">
                  D. Top-up covers or high deductible insurance plans
                </strong>
                <br />
                A top-up cover is also known as a high deductible policy. Most
                people in the international markets buy top-up covers in
                addition to high co-pay policies or uncovered diseases or
                treatment. However in India, the key reason for introduction of
                top-up cover initially seems to be lack of high sum insured
                products, though the same is no longer the case. The maximum
                amount of cover under a health policy remained at Rs 5,00,000
                for a very long time. Anyone wanting a higher cover was forced
                to buy two policies paying double the premium. This led to the
                development of the Top-Up policies by insurers, which offers
                cover for high sums insured over and above a specified amount
                (called threshold).
                <br />
                This policy works along with a basic health cover having a low
                sum insured and comes at a comparatively reasonable premium. For
                example, Individuals covered by their employers can also opt for
                a top-up cover for additional protection (keeping the sum
                insured of the first policy as the threshold). This can be for
                self and family, which comes in handy in the unfortunate event
                of high cost treatment.
                <br />
                To be eligible to receive a claim under the top-up policy, the
                medical costs must be greater than the deductible (or threshold)
                level chosen under the plan and the reimbursement under the high
                deductible plan would be the amount of expense incurred i.e.
                greater than the deductible
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                An individual is covered for a sum insured of Rs. 3 lacs by his
                employer. He could opt for a top-up policy of Rs. 10 lacs in
                excess of Rs. three lacs. If the cost of a single
                hospitalization is Rs. 5 lacs, the basic policy would cover up
                to Rs. three lacs only. With the top-up cover, the balance sum
                of Rs. two lacs would be paid out by the top-up policy. Top-up
                policies come cheap and the cost of a single Rs. 10 lacs policy
                would be far higher than the top-up policy of Rs. 10 lacs in
                excess of Rs. three lacs.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  E. Senior citizen policy
                </strong>
                <br />
                These plans are designed to offer cover to elderly people who
                often were denied coverage after certain age (e.g. people over
                60 years of age). The structure of the coverage and exclusions
                are much like a hospitalization policy.
                <br />
                Special attention is paid to diseases of the elderly in setting
                coverage and waiting period. Entry age is mostly after 60 years
                and renewable lifelong. Sum insured range from Rs. 50,000 to Rs.
                5,00,000. There is variation of waiting period applicable to
                certain ailments. Example: Cataract may have 1 year waiting for
                one insurer and 2 year waiting period for some other insurer.
                <br />
                Also certain ailments may not have waiting period for a
                particular insurer where as another may have. Example: Sinusitis
                does not fall in waiting period clause of some insurers but few
                others include it in their waiting period clause.
                <br />
                Pre-existing disease has either a waiting period or capping in
                some policies. Pre- post hospital expenses are either paid as a
                percentage of hospital claims or a sub limit whichever is
                higher. In some policies they follow the typical indemnity plans
                such as expenses falling within specified period of 30/60 days
                or 60/90 days.
                <br />
                <br />
                <strong className="text-red-700">
                  F. Fixed benefit covers - Hospital cash, critical illness
                </strong>
                <br />
                The greatest risk to an insurer in a health insurance policy is
                unnecessary and unreasonable use of the policy benefits. Knowing
                that the patient is covered under a health policy, doctors,
                surgeons and hospitals tend to over treat him. They prolong the
                length of stay in the hospital, carry out unnecessary diagnostic
                and laboratory tests and thus inflate the cost of treatment
                beyond the necessary amount. Another major impact on insurer’s
                costs is the constant rise in medical costs, usually higher than
                the increase in premium rates.
                <br />
                The answer to this is the Fixed Benefit cover. While providing
                adequate protection to the insured persons, the fixed benefits
                cover also help the insurer to effectively price his policy for
                a reasonable duration. In this product, commonly occurring
                treatments are listed under each system such as ENT,
                Ophthalmology, Obstetrics and Gynaecology, etc. and the maximum
                pay out for each of these is spelt out in the policy.
                <br />
                The insured also gets a fixed sum as claim amount irrespective
                of the amount spent by him for the named treatment. The package
                charges payable for each of these treatments is generally based
                on a study of the reasonable cost that would be needed for
                treating the condition.
                <br />
                <strong>1. HOSPITAL DAILY CASH POLICY</strong>
                <br />
                <strong>a) Per day amount limit</strong>
                <br />
                Hospital cash coverage provides a fixed sum to the insured
                person for each day of hospitalization. Per day cash coverage
                could vary from (for example) Rs. 1,500 per day to Rs. 5,000 or
                even more per day. An upper limit is provided on the daily cash
                payout per illness as well as for the duration of the policy,
                which is usually an annual policy.
                <br />
                <strong>b) Number of payment days</strong>
                <br />
                In some of the variants of this policy, the number of days of
                daily cash allowed is linked to the disease for which treatment
                is being taken. A detailed list of treatments and duration of
                stay for each is stipulated which limits the daily cash benefit
                allowed for each type of procedure/ illness.
                <br />
                <strong>c) Standalone cover or add-on cover</strong>
                <br />
                The hospital daily cash policy is available as a standalone
                policy as offered by some insurers while, in other cases, it is
                an add-on cover to a regular indemnity policy. These policies
                help the insured to cover incidental expenses as the payout is a
                fixed sum and not related to the actual cost of treatment. This
                also allows the payout under the policy to be provided in
                addition to any cover received under an indemnity based health
                insurance plan.
                <br />
                <strong>d) Supplementary cover</strong>
                <br />
                These policies could supplement a regular hospital expenses
                policy as it is cost effective and provides compensation for
                incidental expenses and also expenses not payable under the
                indemnity policy such as exclusions, co-pay etc.
                <br />
                <strong>e) Other advantages of the cover</strong>
                From the insurer’s point of view, this plan has several
                advantages as it is easy to explain to a customer and hence can
                be sold more easily. It beats medical inflation as a fixed sum
                per day is paid for the duration of hospitalization whatever may
                be the actual expense. Also, acceptance of such insurance covers
                and claims settlements are really simplified.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  G. Long term care insurance
                </strong>
                <br />
                Today, with increasing life expectancy, the population of aged
                people in the world is going up. With an ageing population, the
                world over, long term care insurance is also gaining importance.
                Elderly people require long term care and also those people
                suffering from any kind of disability. Long term care means all
                forms of continuing personal or nursing care for people who are
                unable to look after themselves without a degree of support and
                whose health is not going to get better in future.
                <strong>Bhavishya Arogya policy</strong>
                <br />
                The first pre-funded insurance plan was the Bhavishya Arogya
                policy marketed by the four public sector general insurance
                companies. Introduced in the year 1990, the policy is basically
                meant to take care of the healthcare needs of an insured person
                after his retirement, while he pays premium during his
                productive life. It is similar to taking a life insurance policy
                except that it covers future medical expenses rather than death.
                <br />
                <strong>a) Deferred Mediclaim</strong>
                <br />
                The policy is a sort of deferred or future Mediclaim policy and
                provides cover similar to the Mediclaim policy. The proposer can
                join the scheme any time between the age of 25 and 55 years.
                <br />
                <strong>b) Retirement age</strong>
                <br />
                He can choose a retirement age between 55 and 60 years with a
                condition that there should be a clear gap of 4 years between
                the date of joining and the retirement age chosen. The policy
                retirement age means the age selected by the insured at the time
                of signing the proposal and specified in the schedule for the
                purpose of start of benefit under the policy. This age cannot be
                advanced.
                <br />
                <strong>c) Pre-retirement period</strong>
                <br />
                The pre-retirement period means the period starting from the
                date of acceptance of the proposal and ending with the policy
                retirement age specified in the schedule. During this period the
                insured shall be paying installment/single premium amount as
                applicable. The insured has the option of paying either one
                lump-sum premium or in installments.
                <br />
                <strong>d) Withdrawal</strong>
                <br />
                In case, the insured dies or wishes to withdraw from the scheme
                either before the retirement age or after retirement age chosen,
                then appropriate refund of premium would be allowed subject to
                no claim having occurred under the policy. There is a provision
                of grace period of 7 days for payment of premium in the event of
                satisfactory reason for delay in renewal.
                <br />
                <strong>e) Assignment</strong>
                <br />
                The scheme provides for assignment.
                <br />
                <strong>f) Exclusions</strong>
                <br />
                The policy does not have exclusion of pre-existing diseases, 30
                days waiting period and first year exclusion for specified
                diseases as in Mediclaim. Since it is a future Mediclaim policy,
                this is quite logical.
                <br />
                <strong>g) Group insurance variant</strong>
                <br />
                Policy can also be availed of on group basis in which case,
                facility of group discount is available.
                <br />
                <br />
                <strong className="text-red-700">H. Combi-products</strong>
                <br />
                Sometimes, products pertaining to life insurance are combined
                with health insurance products. This is a good way of promoting
                more products in a packaged way through two insurers coming
                together and entering into an understanding.
                <br />
                <strong>Health plus Life Combi Products</strong>therefore mean
                products which offer the combination of a life insurance cover
                of a life insurance company and a health insurance cover offered
                by non-life and/or standalone health insurance company.
                <br />
                The products are jointly designed by the two insurers and
                marketed through the distribution channels of both insurers.
                Obviously, this would entail a tie-up between two companies and
                as per current guidelines, such tie-up is permitted only between
                one life insurer and one non-life insurer at any time. A
                Memorandum of Understanding between such companies must be in
                place for the way marketing, policy servicing and sharing of
                common expenses will be carried out and also policy servicing
                parameters and transmission of premium. Approval of IRDAI for
                the tie-up may be sought by any one of the insurers. The
                agreement should be of a long term nature and withdrawal from
                the tie-up will not be permitted except under exceptional
                circumstances and to the satisfaction of the IRDAI.
                <br />
                One of the insurance companies may be mutually agreed to act as
                a lead insurer to play a critical role in facilitating the
                policy service as a contact point for rendering various services
                as required for combi products. The lead insurer may play a
                major role in facilitating underwriting and policy service.
                However, the claims and commission payouts are handled by the
                respective insurers depending on which section of the policy is
                affected.
                <br />
                'Combi Product' filing shall follow the File and Use guidelines
                issued from time to time and individually cleared. The premium
                components of both risks are to be separately identifiable and
                disclosed to the policyholders at both pre-sale stage and
                post-sale stage and in all documents like policy document, sales
                literature etc.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">I. Package policies</strong>
                <br />
                Package or umbrella covers give, under a single document, a
                combination of covers.
                <br />
                For instance in other classes of business, there are covers such
                as Householder’s Policy, Shopkeeper’s Policy, Office Package
                Policy etc. that, under one policy, seek to cover various
                physical assets including buildings, contents etc. Such policies
                may also include certain personal lines or liability covers.
                <br />
                Examples of package policy in health insurance include combining
                Critical illness cover benefits with indemnity policies and even
                life insurance policies and hospital daily cash benefits with
                indemnity policies.
                <br />
                In the case of travel insurance, the policy offered is also a
                package policy covering not only health insurance but also
                accidental death / disability benefits along with Medical
                expenses due to illness / accident, Loss of or delay in arrival
                of checked in baggage, Loss of passport and documents, Third
                party liability for property / personal damages, Cancellation of
                trips and even Hijack cover.
                <br />
                <br />
                <strong className="text-red-700">
                  J. Micro insurance and health insurance for poorer sections
                </strong>
                <br />
                Micro-insurance products are specifically designed to aim for
                the protection of low income people from rural and informal
                sectors. The low income people form a sizable part of our
                population and usually don’t have any health security cover.
                Therefore, this low value product, with an affordable premium
                and benefit package, is initiated to help these people to cope
                with and recover from common risks. Micro insurance is governed
                by the IRDA Micro Insurance Regulations, 2005.
                <br />
                These products come with a small premium and typically, the sum
                insured is below Rs.30,000, as required vide the IRDA
                micro-insurance regulations, 2005. Such covers are mostly taken
                on a group basis by various community organizations or
                non-governmental organizations (NGOs) for their members. The
                IRDA’s rural and social sector obligations also require that
                insurers should sell a defined proportion of their policies as
                micro-insurance products, to enable wider reach of insurance.
                <br />
                <br />
                <strong>1. Jan Arogya Bima Policy</strong>
                <br />
                Following are the features of Jan Arogya Bima Policy:
                <br />
                a. This policy is designed to provide cheap medical insurance to
                poorer sections of the society.
                <br />
                b. The coverage is along the lines of the individual Mediclaim
                policy. Cumulative bonus and medical check-up benefits are not
                included.
                <br />
                c. The policy is available to individuals and family members.
                <br />
                d. The age limit is five to 70 years.
                <br />
                e. Children between the age of three months and five years can
                be covered provided one or both parents are covered
                concurrently.
                <br />
                f. The sum insured per insured person is restricted to Rs.5,000
                and the premium payable as per the following table.
                <br />
                K. Rashtriya Swasthya Bima Yojana
                <br />
                The government has also launched various health schemes, some of
                them applicable to particular states. To extend the reach of
                health benefits to the masses, it has implemented the Rashtriya
                Swasthya Bima Yojana in association with insurance companies.
                RSBY has been launched by the Ministry of Labour and Employment,
                Government of India, to provide health insurance coverage for
                the below poverty line (BPL) families.
                <br />
                <br />
                <strong>
                  Following are the features of Rashtriya Swasthya Bima Yojana:
                </strong>
                <br />
                a. Total sum insured of Rs. 30,000 per BPL family on a family
                floater basis.
                <br />
                b. Pre-existing diseases to be covered.
                <br />
                c. Coverage of health services related to hospitalization and
                services of surgical nature which can be provided on a day-care
                basis.
                <br />
                d. Cashless coverage of all eligible health services.
                <br />
                e. Provision of smart card.
                <br />
                f. Provision of pre and post hospitalization expenses.
                <br />
                g. Transport allowance of Rs.100/- per visit.
                <br />
                h. The Central and State Government pays the premium to the
                insurer.
                <br />
                i. Insurers are selected by the State Government on the basis of
                a competitive bidding.
                <br />
                j. Choice to the beneficiary between public and private
                hospitals.j. Choice to the beneficiary between public and
                private hospitals.
                <br />
                k. Premium to be borne by the Central and State governments in
                the proportion of 3:1. Central Government to contribute a
                maximum amount of Rs. 565/- per family.
                <br />
                l. Contribution by the State Governments: 25 percent of the
                annual premium and any additional premium beyond Rs 750.
                <br />
                m. Beneficiary to pay Rs. 30/- per annum as registration fee/
                renewal fee.
                <br />
                n. Administrative cost to be borne by the State Government.
                <br />
                o. Cost of smart card additional amount of Rs. 60/- per
                beneficiary would be available for this purpose.
                <br />
                p. The scheme shall commence operation from the first of the
                month after the next month from the date of issue of smart card.
                Thus, if the initial smart cards are issued anytime during the
                month of February in a particular district, the scheme will
                commence from 1st of April.
                <br />
                <br />
                <strong className="text-red-700">
                  L. Pradhan Mantri Suraksha Bima Yojana
                </strong>
                <br />
                The recently announced PMSBY covering personal accident death
                and disability cover insurance has attracted lot of interest and
                the scheme details are as under:
                <br />
                <strong>Scope of coverage:</strong>All savings bank account
                holders in the age 18 to 70 years in participating banks are
                entitled to join. Participating banks must tie up with any
                approved non-life insurer who will offer a Master Policy to such
                bank for the cover. Any person would be eligible to join the
                scheme through one savings bank account only and if he enrols in
                more than one bank, he gets no extra benefit and the extra
                premium paid will stand forfeited. Aadhar would be the primary
                KYC for the bank account.
                <br />
                <strong>Enrollment Modality / Period:</strong>The cover shall be
                for the one year period from 1st June to 31st May for which
                option to join / pay by auto-debit from the designated savings
                bank account on the prescribed forms will be required to be
                given by 31st May of every year, extendable up to 31st August
                2015 in the initial year. Initially on launch, the period for
                joining may be extended by Govt. of India for another three
                months, i.e. up to 30th of November, 2015.
                <br />
                Joining subsequently on payment of full annual premium may be
                possible on specified terms. Applicants may give an indefinite /
                longer option for enrolment / auto-debit, subject to
                continuation of the scheme with terms as may be revised on the
                basis of past experience. Individuals who exit the scheme at any
                point may re-join the scheme in future years through the above
                modality. New entrants into the eligible category from year to
                year or currently eligible individuals who did not join earlier
                shall be able to join in future years while the scheme is
                continuing.
                <br />
                <strong>Premium:</strong>Rs.12/- per annum per member. The
                premium will be deducted from the account holder’s savings bank
                account through ‘auto debit’ facility in one instalment on or
                before 1st June of each annual coverage period. However, in
                cases where auto debit takes place after 1st June, the cover
                shall commence from the first day of the month following the
                auto debit. Participating banks will deduct the premium amount
                in the same month when the auto debit option is given,
                preferably in May of every year, and remit the amount due to the
                Insurance Company in that month itself.
                <br />
                <strong>Termination of cover::</strong> The accident cover for
                the member shall terminate:
                <br />
                1. On member attaining the age of 70 years (age nearest birth
                day) or
                <br />
                2. Closure of account with the Bank or insufficiency of balance
                to keep the insurance in force or
                <br />
                3. In case a member is covered through more than one account,
                insurance cover will be restricted to one only and the other
                cover will terminate while the premium shall be forfeited.
                <br />
                If the insurance cover is ceased due to any technical reasons
                such as insufficient balance on due date or due to any
                administrative issues, the same can be reinstated on receipt of
                full annual premium, subject to conditions that may be laid
                down. During this period, the risk cover will be suspended and
                reinstatement of risk cover will be at the sole discretion of
                Insurance Company.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  {" "}
                  M. Pradhan Mantri Jan Dhan Yojana
                </strong>
                <br />
                This financial inclusion campaign for Indian citizens in Banking
                Savings & Deposit Accounts, Remittance, Credit, Insurance and
                Pension in an affordable manner was launched by the Prime
                Minister of India, Narendra Modi on 28 August 2014 as announced
                on his first Independence Day speech on 15 August 2014. This
                scheme has set a world record in bank account opening during any
                one week. Aimed at including maximum number of people in the
                banking mainstream
                <br />
                An account can be opened in any bank branch or Business
                Correspondent (Bank Mitra) outlet. PMJDY accounts are being
                opened with Zero balance. However, if the account-holder wishes
                to get cheque book, he/she will have to fulfill minimum balance
                criteria.
                <br />
                <br />
                <strong>Special Benefits under PMJDY Scheme</strong>
                <br />
                1. Interest on deposit.
                <br />
                2. Accidental insurance cover of Rs.1.00 lac
                <br />
                3. No minimum balance required.
                <br />
                4. Life insurance cover of Rs.30,000/-
                <br />
                5. Easy Transfer of money across India
                <br />
                6. Beneficiaries of Government Schemes will get Direct Benefit
                Transfer in these accounts.
                <br />
                7. After satisfactory operation of the account for 6 months, an
                overdraft facility will be permitted
                <br />
                8. Access to Pension, insurance products.
                <br />
                9. Accidental Insurance Cover
                <br />
                10. RuPay Debit Card which must be used at least once in 45
                days.
                <br />
                11. Overdraft facility upto Rs.5000/- is available in only one
                account per household, preferably lady of the household.
                <br />
                As on 13th May 2015, a record 15.59 Crore accounts have been
                opened with a balance in account of Rs. 16,918.91 Crores. Of
                these, 8.50 Crore accounts have been opened with zero balance.
                <br />
                <br />
                <strong className="text-red-700">
                  N. Personal Accident and disability cover
                </strong>
                <br />
                A Personal Accident (PA) Cover provides compensation due to
                death and disability in the event of unforeseen accident. Often
                these policies provide some form of medical cover along with the
                accident benefit.
                <br />
                In a PA policy, while the death benefit is payment of 100% of
                the sum insured, in the event of disability, compensation varies
                from a fixed percentage of the sum insured in the case of
                permanent disability to weekly compensation for temporary
                disablement.
                <br />
                Weekly compensation means payment of a fixed sum per week of
                disablement subject to a maximum limit in terms of number of
                weeks for which the compensation would be payable.
                <br />
                <strong>1. Types of disability covered</strong>
                <br />
                <br />
                <strong>
                  Types of disability which are normally covered under the
                  policy are:
                </strong>
                <br />
                i. Permanent total disability (PTD):means becoming totally
                disabled for lifetime viz. paralysis of all four limbs, comatose
                condition, loss of both eyes/ both hands/ both limbs or one hand
                and one eye or one eye and one leg or one hand and one leg,
                <br />
                ii. Permanent partial disability (PPD):means becoming partially
                disabled for lifetime viz. loss of fingers, toes, phalanges etc.
                <br />
                iii. Temporary total disability (TTD):means becoming totally
                disabled for a temporary period of time. This section of cover
                is intended to cover the loss of income during the disability
                period.
                <br />
                The client has choice to select only death cover or death plus
                permanent disablement of Or Death plus permanent disablement and
                also temporary total disablement.
                <br />
                <strong>2. Sum insured</strong>
                <br />
                Sums insured for PA policies are usually decided on the basis of
                gross monthly income. Typically, it is 60 times of the gross
                monthly income. However, some insurers also offer on fixed plan
                basis without considering the income level. In such policies sum
                insured for each section of cover varies as per the plan opted.
                <br />
                <strong>3. Benefit plan</strong>
                <br />
                Being a benefit plan, PA policies do not attract contribution.
                Thus, if a person has more than one policy with different
                insurers, in the event of accidental death, PTD or PPD, claims
                would be paid under all the policies.
                <br />
                <strong>4. Scope of cover</strong>
                <br />
                These policies are often extended to cover medical expenses,
                which reimburses the hospitalization and other medical costs
                incurred following the accident. Today we have health policies
                which are issued to cover medical/ hospitalization expenses
                incurred consequent to an accident. Such policies do not cover
                diseases and their treatment and instead cover only accident
                related medical costs.
                <br />
                <strong>5. Value added benefits</strong>
                <br />
                Along with personal accident, many insurers also offer value
                added benefits like hospital cash on account of hospitalization
                due to accident, cost of t ransportation of mortal remains,
                education benefit for a fixed sum and ambulance charges on the
                basis of actual or fixed limit whichever is lower.
                <br />
                <br />
                <strong className="text-red-700">
                  O. Overseas travel insurance
                </strong>
                <br />
                <strong>1. Need for the policy</strong>
                <br />
                An Indian citizen travelling outside India for business,
                holidays or studies is exposed t o the risk of accident, injury
                and sickness during his stay overseas. The cost of medical care,
                especially in countries such as USA and Canada, is very high and
                could cause major financial problems if a person travelling to
                these countries were to meet with an unfortunate accident/
                illness. To protect against such unfortunate events, travel
                policies or overseas health and accident policies are available.
                <br />
                <strong>2. Scope of coverage</strong>
                <br />
                Such policies are primarily meant for accident and sickness
                benefits, but most products available in the market package a
                range of covers within one product. The covers offered are:
                <br />
                i. Accidental death / disability
                <br />
                ii. Medical expenses due to illness / accident
                <br />
                iii. Loss of checked in baggage
                <br />
                iv. Delay in arrival of checked in baggage
                <br />
                v. Loss of passport and documents
                <br />
                vi. Third party liability for property / personal damages
                <br />
                vii. Cancellation of trips
                <br />
                viii. Hijack cover
                <br />
                <strong>3. Types of plans</strong>
                <br />
                The popular policies are the Business and Holiday Plans, the
                Study Plans and the Employment Plans.
                <br />
                <strong>4. Who can provide this insurance</strong>
                <br />
                Overseas or Domestic Travel Insurance policies may only be
                offered by non-life and standalone health insurance companies,
                either as a standalone product or as an add-on cover to an
                existing health policy, provided that the premium for the add-on
                cover is approved by the Authority under File And Use Procedure.
                <br />
                <strong>5. Who can take the policy</strong>
                <br />
                An Indian citizen travelling abroad on business, holiday or for
                studies can avail this policy. Employees of Indian employers
                sent on contracts abroad can also be covered.
                <br />
                <br />
                <strong className="text-red-700">P. Group health cover</strong>
                <br />
                <strong>1. GROUP POLICIES</strong>
                <br />
                As explained earlier in the chapter a group policy is taken by a
                group owner who could be an employer, an association, a bank’s
                credit card division, where a single policy covers the entire
                group of individuals.
                <br />
                Group Health Insurance Policies may be offered by any insurance
                company, provided that all such products shall only be one year
                renewable contracts.
                <br />
                Features of group policies- Hospitalisation benefit covers.
                <br />
                <strong>1. Scope of coverage</strong>
                <br />
                The most common form of group health insurance is the policy
                taken by employers covering employees and their families
                including dependent spouse, children and parents / parents in
                law.
                <br />
                <strong>2. Tailor-made cover</strong>
                <br />
                Group policies are often tailor-made covers to suit the
                requirements of the group. Thus, in group policies, one will
                find several standard exclusions of the individual policy being
                covered under the group policy.
                <br />
                <strong>3. Maternity cover</strong>
                <br />
                One of the most common extensions in a group policy is the
                maternity cover. This is now being offered by some insurers
                under individual policies , but with a waiting period of two to
                three years. In a group policy, it normally has a waiting period
                of nine months only and in some cases, even this is waived.
                Maternity cover would provide for the expenses incurred in
                hospitalization for delivery of child and includes C- section
                delivery. This cover is generally restricted to Rs. 25,000 to
                Rs. 50,000 within the overall sum insured of the family.
                <br />
                <strong>4. Child cover</strong>
                <br />
                Children are normally covered from the age of three months only
                in individual health policies. In group policies, coverage is
                given to babies from day one, sometimes restricted to the
                maternity cover limit and sometimes extended to include the full
                sum insured of the family.
                <br />
                <strong>
                  5. Pre-existing diseases covered, waiting period waived off
                </strong>
                <br />
                Several exclusions such as the pre-existing disease exclusion,
                thirty days waiting period, two years waiting period, congenital
                diseases may be covered in a tailor-made group policy.
                <br />
                <strong>6. Premium calculation</strong>
                <br />
                The premium charged for a group policy is based on the age
                profile of the group members, the size of the group and most
                importantly the claims experience of the group. As the premium
                varies year on year based on experience, additional covers as
                mentioned above are freely given to the groups, as it is in the
                interest of the group policyholder to manage his claims within
                the premiums paid.
                <br />
                <strong>7. Non-employer employee groups</strong>
                <br />
                In India, regulatory provisions strictly prohibit formation of
                groups primarily for the purpose of taking out a group insurance
                cover. When group policies are given to other than employers, it
                is important to determine the relation of the group owner to its
                members.
                <br />
                <strong>Example</strong>
                <br />
                A bank taking a policy for its saving bank account holders or
                credit card holders constitutes a homogenous group, whereby a
                large group is able to benefit by a tailor-made policy designed
                to suit their requirements.
                <br />
                Here the premium collected from each individual account holder
                may be quite low, but as a group the premium obtained by the
                insurer would be substantial and the bank offers a value add to
                its customers in the form of a superior policy and at better
                premium rates.
                <br />
                <strong>Definition</strong>
                <br />
                <strong>Group definition could be summarized as below:</strong>
                <br />
                a) A group should consist of persons with a commonality of
                purpose, and the group organizer should have the mandate from a
                majority of the members of the group to arrange insurance on
                their behalf.
                <br />
                b) No group should be formed with the main purpose of availing
                insurance.
                <br />
                c) The premium charged and benefits available should be clearly
                indicated in the group policy issued to individual members.
                <br />
                Group discounts should be passed on to individual members and
                premium charged should not be more than that given to the
                insurance company
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700"> Q. Special Products</strong>
                <br />
                <strong>1. Disease covers</strong>
                <br />
                In recent years, disease specific covers like cancer, diabetes
                have been introduced in the Indian market, mostly by life
                insurance companies. The cover is long term - 5 years to 20
                years and a wellness benefit is also included – a regular health
                check-up paid for by the insurer. There is incentive for better
                control of factors like blood glucose, LDL, blood pressure etc.
                in the form of reduced premiums from second year of policy
                onwards. On the other hand, a higher premium would be chargeable
                for poor control
                <br />
                <strong>2. Product designed to cover diabetic persons</strong>
                <br />
                This policy can be taken by persons between 26 and 65 years and
                is renewable up to 70 years. Sum Insured ranges from Rs. 50,000
                to Rs. 5,00,000. Capping on Room rent is applicable. Product is
                aimed to cover hospitalization complications of diabetes like
                diabetic retinopathy (eye), kidney, diabetic foot, kidney
                transplant including donor expenses.
                <br />
                <br />
                <strong className="text-red-700">
                  R. Key terms in health policies
                </strong>
                <br />
                <strong>1. Network Provider</strong>
                <br />
                Network provider refers to a hospital/nursing home/day care
                center which is under tie-up with an insurer/TPA for providing
                cashless treatment to insured patients. Insurers / TPAs normally
                negotiate favourable discounts on charges and fees from such
                providers who also guarantee a good level of service. Patients
                are free to go to out-of-network providers but there they are
                generally charged much higher fees.
                <br />
                <strong>2. Preferred provider network (PPN)</strong>
                <br />
                An insurer has the option to create a preferred network of
                hospitals to ensure quality treatment and at best rates. When
                this group is limited to only a select few by the insurer based
                on experience, utilization and cost of providing care, then we
                have what is known as the preferred provider network.
                <br />
                <strong>3. Cashless service</strong>
                <br />
                Experience has shown that one of the causes of debt is borrowing
                for treatment of illness. A cashless service enables the insured
                to avail of the treatment up to the limit of cover without any
                payment to the hospitals. All that the insured has to do is
                approach a network hospital and present his medical card as
                proof of insurance. The insurer facilitates a cashless access to
                the health service and directly makes payment to the network
                provider for the admissible amount. However, the insured has to
                make payment for amounts beyond the policy limits and for
                expenses not payable as per policy conditions.
                <br />
                <strong>4. Third party administrator (TPA)</strong>
                <br />
                A major development in the field of health insurance is the
                introduction of the third party administrator or TPA. Several
                insurers across the world utilize the services of independent
                organizations for managing health insurance claims. These
                agencies are known as the TPAs.
                <br />
                <strong>5. Hospital</strong>
                <br />
                A hospital means any institution established for in-patient care
                and day care treatment of sickness and / or injuries and which
                has been registered as a hospital with the local authorities,
                wherever applicable, and is under the supervision of a
                registered and qualified medical practitioner AND must comply
                with all minimum criteria as under:
                <br />
                a) has at least 10 inpatient beds in those towns having a
                population of less than 10,00,000 and 15 inpatient beds in all
                other places;
                <br />
                b) has qualified nursing staff under its employment round the
                clock;
                <br />
                c) has qualified medical practitioner(s) in charge round the
                clock;
                <br />
                d) has a fully equipped operation theatre of its own where
                surgical procedures are carried out;
                <br />
                e) maintains daily records of patients and will make these
                accessible to the Insurance company’s authorized personnel.
                <br />
                <strong>6. Medical practitioner</strong>
                <br />
                A Medical practitioner is a person who holds a valid
                registration from the medical council of any state of India and
                is thereby entitled to practice medicine within its
                jurisdiction; and is acting within the scope and jurisdiction of
                his license. However, insurance companies are free to make a
                restriction that the registered practitioner should not be the
                insured or any close family member.
                <br />
                <strong>Summary</strong>
                <br />
                a) A health insurance policy provides financial protection to
                the insured person in the event of an unforeseen and sudden
                accident / illness leading to hospitalization.
                <br />
                b) Health insurance products can be classified on the basis of
                number of people covered under the policy: individual policy,
                family floater policy, group policy.
                <br />
                c) A hospitalization expenses policy or Mediclaim reimburses the
                cost of hospitalization expenses incurred on account of illness
                / accident.
                <br />
                d) Pre hospitalization expenses would be relevant medical
                expenses incurred during period up to the defined number of days
                (generally 30 days) prior to hospitalization and will be
                considered as part of claim.
                <br />
                e) Post hospitalization expenses would be relevant medical
                expenses incurred during period up to the defined number of days
                (generally 60 days) after hospitalization and will be considered
                as part of claim.
                <br />
                f) In a family floater policy, the family consisting of spouse,
                dependent children and dependent parents are offered a single
                sum insured which floats over the entire family.
                <br />
                g) A hospital daily cash policy provides a fixed sum to the
                insured person for each day of hospitalization.
                <br />
                h) Critical illness policy is a benefit policy with a provision
                to pay a lump sum amount on diagnosis of certain named critical
                illness.
                <br />
                i) High Deductible or Top-up Covers offer cover for higher sum
                insured over and above a specified chosen amount (called
                threshold or deductible).
                <br />
                j) The fixed benefits cover provides adequate cover to the
                insured person and also helps the insurer to effectively price
                his policy
                <br />
                k) A Personal Accident (PA) Cover provides compensation in the
                form of death and disability benefits due to unforeseen
                accidents.
                <br />
                l) Out-patient covers provide for medical expenses like dental
                treatments, vision care expenses, routine medical examinations
                and tests etc. that do not require hospitalization.
                <br />
                m) A group policy is taken by a group owner who could be an
                employer, an association, a bank’s credit card division, where a
                single policy covers the entire group of individuals.
                <br />
                n) Corporate Floater or Buffer Cover amount helps meet excess
                expenses over and above the family sum insured.
                <br />
                o) Overseas Mediclaim / Travel Policies provide cover to an
                individual against exposure to the risk of accident, injury and
                sickness during his stay overseas.
                <br />
                p) Corporate Frequent Travelers’ Plan is an annual policy
                whereby a corporate takes individual policies for its executives
                who frequently make trips outside India.
                <br />
                q) Many terms used in health insurance have been standardized by
                IRDA by regulation to avoid confusion especially for the
                insureds.
                <br />
              </li>
            </ul>
          </div>
        );
      case "CHAPTER-10":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 10:HEALTH INSURANCE UNDERWRITING
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            This chapter aims to provide you detailed knowledge about
            underwriting in health insurance. Underwriting is a very important
            aspect of any type of insurance and plays a vital role in issuance
            of an insurance policy. In this chapter, you will get an
            understanding about basic principles, tools, methods and process of
            underwriting. It will also provide you the knowledge about group
            health insurance underwriting
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">
                  {" "}
                  A. What is underwriting?
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  B. Underwriting - Basic concepts
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  C. File and Use guidelines
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  D. Other health insurance regulations of IRDAI{" "}
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  E. Basic principles and tools for underwriting
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  F. Underwriting process{" "}
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  G. Group health insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  H. Underwriting of Overseas Travel Insurance
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  I. Underwriting of Personal Accident Insurance
                </strong>
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700"> Look at this Scenario</strong>
                <br />
                Manish aged 48 years, working as a software engineer, decided to
                take a health insurance policy for himself. He went to an
                insurance company, where they gave him a proposal form in which
                he was required to answer a number of questions related to his
                physical build and health, mental health, pre-existing
                illnesses, his family health history, habits and so on.
                <br />
                On receipt of his proposal form, he was also required to submit
                many documents such as identity and age proof, proof of address
                and previous medical records. Then they told him to undergo a
                health check-up and some medical tests which frustrated him.
                <br />
                Manish, who considered himself a healthy person and with a good
                income level, started wondering why such a lengthy process was
                being followed by the insurance company in his case. Even after
                going through all this, the insurance company told him that high
                cholesterol and high BP had been diagnosed in his medical tests,
                which increased the chances of heart diseases later. Though they
                offered him a policy, the premium was much higher than what his
                friend had paid and so he refused to take the policy.
                <br />
                Here, the insurance company was following all these steps as
                part of their underwriting process. While providing risk
                coverage, an insurer needs to evaluate risks properly and also
                to make reasonable profit. If the risk is not assessed properly
                and there is a claim, it will result in a loss. Moreover,
                insurers collect premiums on behalf of all insuring persons and
                have to handle these moneys like a trust.
                <br />
                <br />
                <strong>A. What is underwriting?</strong>
                <br />
                <strong>1. Underwriting</strong>
                <br />
                Insurance companies try to insure people who are expected to pay
                adequate premium in proportion to the risk they bring to the
                insurance pool. This process of collecting and analyzing
                information from a proposer for the risk selection is known as
                underwriting. On the basis of information collected through this
                process, they decide whether they want to insure a proposer . If
                they decide to do so, then at what premium, terms and conditions
                so as to make a reasonable profit from taking such risk.
                <br />
                Health insurance is based on the concept of morbidity. Here
                morbidity is defined as the likelihood and risk of a person
                becoming ill or sick thereby requiring treatment or
                hospitalization. To a large extent, morbidity is influenced by
                age (generally being higher in senior citizens than in young
                adults) and also increases due to various other adverse factors,
                such as being overweight or underweight, personal history of
                certain past and present diseases or ailments, personal habits
                like smoking, current health status and also occupation of the
                proposer if it is deemed to be hazardous. Conversely, morbidity
                also decreases due to certain favourable factors like lower age,
                a healthy lifestyle etc.
                <br />
                <strong className="text-red-700">Definition</strong>
                <br />
                Underwriting is the process of assessing the risk appropriately
                and deciding the terms on which the insurance cover is to be
                granted. Thus, it is a process of risk selection and risk
                pricing.
                <br />
                <br />
                <strong>2. Need for underwriting</strong>
                <br />
                Underwriting is the backbone of an insurance company as
                acceptance of the risk carelessly or for insufficient premiums
                will lead to insurer’s insolvency. On the other hand, being too
                selective or careful will prevent the insurance company from
                creating a big pool so as to spread the risk uniformly. <br />
                It is therefore critical to strike the correct balance between
                risk and business, thereby being competitive and yet profitable
                for the organization.
                <br />
                This process of balancing is done by the underwriter, in
                accordance with the philosophy, policies and risk hunger of the
                insurance company concerned. The job of the underwriter is to
                classify the risk and decide the terms of acceptance at a proper
                price. It is important to note that acceptance of risk is like
                giving a promise of future claim settlement to the insured.
                <br />
                <br />
                <strong>3. Underwriting – risk assessment</strong>
                <br />
                Underwriting is a process of risk selection which is based upon
                the characteristics of a group or individual. Here based on the
                degree of the risk, the underwriter decides whether to accept
                the risk and at what price. Under any circumstances, the process
                of acceptance has to be done with fairness and on an equitable
                basis i.e. every similar risk should be classified equally
                without any prejudice. This classification is normally done
                through standard acceptance charts whereby every represented
                risk is quantified and premiums are calculated accordingly.
                <br />
                Although age affects the chance of sickness as well as death, it
                must be remembered that sickness usually comes much before death
                and could be frequent. Hence, it is quite logical that the
                underwriting norms and guidelines are much tighter for health
                coverage than death coverage.
                <br />
                <strong className="text-red-700"> Example</strong>
                <br />
                An individual who is diabetic has a far higher chance of
                developing a cardiac or kidney complication requiring
                hospitalization than of death, and also health episodes can
                happen multiple times during the course of insurance coverage. A
                life insurance underwriting guideline might rate this individual
                as an average risk. However, for medical underwriting, he would
                be rated as a higher risk.
                <br />
                In health insurance, there is a higher focus on medical or
                health findings than financial or income based underwriting.
                However, the latter cannot be ignored as there has to be an
                insurable interest and financial underwriting is important to
                rule out any adverse selection and ensure continuity in health
                insurance.
                <br />
                <br />
                <strong> 4. Factors which affect chance of illness</strong>
                <br />
                The factors which affect morbidity (risk of falling ill) should
                be considered carefully while assessing risk are as follows:
                <br />
                <strong>a) Age:</strong>Premiums are charged corresponding with
                age and the degree of risk. For e.g. the morbidity premiums for
                infants and children are higher than young adults due to
                increased risk of infections and accidents. Similarly, for
                adults beyond the age of 45 years, the premiums are higher, as
                the probability of an individual suffering from a chronic
                ailment like diabetes, a sudden heart ailment or other such
                morbidity is much higher.
                <br />
                <strong> b) Gender:</strong>Women are exposed to additional risk
                of morbidity during child bearing period. However, men are more
                likely to get affected by heart attacks than women or suffer job
                related accidents than women as they may be more involved in
                hazardous employment.
                <br />
                <strong>c) Habits:</strong>Consumption of tobacco, alcohol or
                narcotics in any form has a direct bearing on the morbidity
                risk.
                <br />
                <strong>d) Occupation:</strong>Extra risk to accidents is
                possible in certain occupations, e.g. driver, blaster, aviator
                etc. Likewise, certain occupations may have higher health risks,
                like an X-Ray machine operator, asbestos industry workers,
                miners etc.
                <br />
                <strong>e) Family history:</strong>This has greater relevance,
                as genetic factors influence diseases like asthma, diabetes and
                certain cancers. This does impact the morbidity and should be
                taken into consideration while accepting risk.
                <br />
                <strong>f) Build:</strong>Stout, thin or average build may also
                be linked to morbidity in certain groups.
                <br />
                <strong> g) Past illness or surgery:</strong>It has to be
                ascertained whether the past illness has any possibility of
                causing increased physical weakness or even recur and
                accordingly the policy terms should be decided. For e.g. kidney
                stones are known to recur and similarly, cataract in one eye
                increases possibility of cataract in the other eye.
                <br />
                <strong>
                  {" "}
                  h) Current health status and other factors or complaints:
                </strong>
                This is important to ascertain the degree of risk and
                insurability and can be established by proper disclosure and
                medical examination.
                <br />
                <strong> i) Environment and residence:</strong>These also have a
                bearing on morbidity rates.
                <br />
                <br />
                <strong> B. Underwriting – Basic concepts</strong>
                <br />
                <strong> 1. Underwriting purpose</strong>
                <br />
                We begin with examining the purpose of underwriting. There are
                two purposes
                <br />
                i. To prevent anti-selection that is selection against the
                insurer
                <br />
                ii. To classify risks and ensure equity among risks
                <br />
                <strong>Definition</strong>
                <br />
                The term selection of risks refers to the process of evaluating
                each proposal for health insurance in terms of the degree of
                risk it represents and then deciding whether or not to grant
                insurance and on what terms. Anti-selection (or adverse
                selection) is the tendency of people, who suspect or know that
                their chance of experiencing a loss is high, to seek out
                insurance eagerly and to gain in the process.
                <br />
                <strong> Example</strong>
                <br />
                If insurers were not selective about whom and how they offered
                insurance, there is a chance that people with serious ailments
                like diabetes, high BP, heart problems or cancer, who knew that
                they would soon require hospitalization, would seek to buy
                health insurance, create losses for the insurer.
                <br />
                In other words, if an insurer did not exercise selection it
                would be selected against and suffer losses in the process.
                <br />
                <strong> 2. Equity among risks</strong>
                <br />
                Let us now consider equity among risks. The term “Equity” means
                that applicants who are exposed to similar degrees of risk must
                be placed in the same premium class. Insurers would like to have
                some type of standardization to determine the premiums to be
                charged. Thus people posing average risks should pay similar
                premium while people who pose higher risks should pay higher
                premium. They would like standardization to apply to the vast
                majority of individuals who pose average risks while they could
                devote more time to decide upon and rate risks which are more
                risky.
                <br />
                <strong> a) Risk classification</strong>
                <br />
                To usher equity, the underwriter engages in a process known as
                risk classification i.e. individuals are categorized and
                assigned to different risk classes depending on the degree of
                risks they pose. There are four such risk classes.
                <br />
                <strong> 3. Selection process</strong>
                <br />
                Underwriting or the selection process may be said to take place
                at two levels:
                <br />
                ✔ At field level
                <br />
                ✔ At underwriting department level
                <br />
                <strong>
                  {" "}
                  Diagram 7: Underwriting or the selection process
                </strong>
                <br />
                <div>
                  <img
                    src="https://www.notioninsurance.in/newportal/index/14.jpg"
                    alt=""
                    className="mt-10 mx-auto"
                  />
                  <strong> c) Field or Primary level</strong>
                  <br />
                  Field level underwriting may also be known as primary
                  underwriting. It includes information gathering by an agent or
                  company representative to decide whether an applicant is
                  suitable for granting insurance coverage. The agent plays a
                  critical role as primary underwriter. He is in the best
                  position to know the prospective client to be insured .<br />
                  <strong>d) Underwriting department level</strong>
                  <br />
                  The second level of underwriting is at the department or
                  office level. It involves specialists and persons who are
                  proficient in such work and who consider all the relevant data
                  on the case to decide whether to accept a proposal for
                  insurance and on what terms.
                  <br />
                </div>
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  {" "}
                  C. File and Use guidelines
                </strong>
                <br />
                It must be remembered that every insurer has to create it
                products before marketing them and this is also one of the
                functions of the underwriting department. The IRDAI has issued
                guidelines for this which are summarized below:
                <br />
                Every company designs its products keeping in mind the target
                customers’ needs, wants and affordability, underwriting
                considerations, actuarial pricing, competitive conditions in the
                market etc. Thus we see high number of options for different
                categories of customers to choose from even though at the base
                level, hospitalization expense indemnity products dominate the
                Indian market.
                <br />
                Every new product needs approval of IRDA before introduction.
                The product needs to be filed with the Regulator under ‘File and
                Use’ provisions as mentioned below. Once introduced, product
                withdrawal also needs to follow guidelines. Students are advised
                to familiarize themselves with all provisions, forms, returns
                etc. related to File and Use guidelines.
                <br />
                <strong>
                  {" "}
                  File and use procedure for health insurance products as per
                  IRDA guidelines:
                </strong>
                <br />
                a) No health insurance product shall be marketed by any insurer
                unless it has the prior clearance of the Authority accorded as
                per the File and Use Procedure.
                <br />
                c) The File and Use application form has been standardized by
                IRDAI and has to be sent along with many annexures including the
                Database sheet and the Customer Information Sheet.
                <br />
                The Customer Information Sheet which is to be given to every
                insured along with the prospectus and the policy contains
                details of the cover, the exclusions, waiting period if any
                before claim becomes payable, whether the payout will be on
                reimbursement basis or a fixed amount, renewal conditions and
                benefits, details of co-pay or deductible and cancellation
                conditions etc.
                <br />
                The File and Use application for the prior approval of the
                Authority shall be certified by the Appointed Actuary and the
                CEO of the insurance company and shall be in such formats and
                accompanied by such documentation as may be stipulated by the
                Authority from time to time.
                <br />
                e) All particulars of any product shall after introduction be
                reviewed by the Appointed Actuary at least once a year. If the
                product is found to be financially unviable, or is deficient in
                any particular the Appointed Actuary may revise the product
                appropriately and apply for revision under File and Use
                procedure.
                <br />
                f) Five years after a product has been accorded File and Use
                approval, the Appointed Actuary shall review the performance of
                the product in terms of morbidity, lapse, interest rates,
                inflation, expenses and other relevant particulars as compared
                to the original assumptions made while designing such product
                and seek fresh approval with suitable justifications or
                modifications of the earlier assumptions made.
                <br />
                <br />
                <strong className="text-red-700">
                  {" "}
                  D. Other Health Insurance regulations of IRDAI 394
                </strong>
                <br />
                In addition to the File and Use guidelines, the Health Insurance
                regulations also require the following:
                <br />
                a. All Insurance Company’s shall evolve a Health Insurance
                Underwriting Policy which shall be approved by the Board of the
                Company. The policy should among other matters prescribe the
                proposal form in which prospects may apply for purchasing a
                Health Policy. Such form should capture all the information
                necessary to underwrite a proposal in accordance with the stated
                Policy of the Company.
                <br />
                b. The Underwriting Policy shall be filed with the Authority.
                The Company retains the right to modify the Policy as it deems
                necessary, but every modification shall also be filed with the
                Authority.
                <br />
                c. Any proposal for health insurance may be accepted or denied
                wholly based on the Board approved underwriting policy. A denial
                of a proposal shall be communicated to the prospect in writing,
                recording the reasons for denial.
                <br />
                d. The insured shall be informed of any underwriting loading
                charged over and above the premium and the specific consent of
                the policyholder for such loadings shall be obtained before
                issuance of a policy.
                <br />
                e. If an insurance company requires any further information,
                such as change of occupation, at any subsequent stage of a
                policy or at the time of its renewal, it shall prescribe
                standard forms to be filled up by the insured and shall make
                these forms part of the policy document, clearly state the
                events which will require the submission of such information and
                the conditions applicable in such event.
                <br />
                f. Insurers may devise mechanisms or incentives to reward
                policyholders for early entry, continued renewals, favourable
                claims experience etc. with the same insurer and disclose
                upfront such mechanism or incentives in the prospectus and the
                policy document, as approved under File and Use guidelines.
                <br />
                <strong>
                  {" "}
                  Guidelines regarding portability of health policies
                </strong>
                <br />
                IRDAI has brought out very clear guidelines regarding
                portability of life and health insurance policies. These are
                enumerated below:
                <br />
                <strong>
                  {" "}
                  1. Portability shall be allowed in the following cases:
                </strong>
                <br />
                a. All individual health insurance policies issued by non-life
                insurance companies including family floater policies
                <br />
                b. Individual members, including the family members covered
                under any group health insurance policy of a non-life insurance
                company shall have the right to migrate from such a group policy
                to an individual health insurance policy or a family floater
                policy with the same insurer. Thereafter, he/she shall be
                accorded the right for portability at next renewal.
                <br />
                2. Portability can be opted by the policyholder only at renewal
                and not during currency of the policy.
                <br />
                3. A policyholder wanting to port his policy to another
                insurance company has to apply to such insurance company, to
                port the entire policy along with all the members of the family,
                if any, at least 45 days before the premium renewal date of the
                existing policy.
                <br />
                4. The new insurer may or may not offer portability if
                policyholder fails to make an application in the
                IRDAI-prescribed form at least 45 days before the premium
                renewal date.
                <br />
                5. On receipt of such intimation, the insurance company shall
                furnish the applicant, the Portability Form as set out in
                Annexure 'I' to the IRDAI guidelines together with a proposal
                form and relevant product literature on the various health
                insurance products which could be offered.
                <br />
                6. The policyholder shall fill in the portability form along
                with proposal form and submit the same to the insurance company.
                <br />
                7. On receipt of the Portability Form, the insurance company
                shall address the existing insurance company seeking necessary
                details of medical history and claim history of the concerned
                policyholder. This shall be done through the web portal of the
                IRDA.
                <br />
                8. The insurance company receiving such a request on portability
                shall furnish the requisite data in the data format for porting
                insurance policies prescribed in the web portal of IRDA within 7
                working days of the receipt of the request.
                <br />
                9. In case the existing insurer fails to provide the requisite
                data in the data format to the new insurance company within the
                specified time frame, it shall be viewed as violation of
                directions issued by the IRDA and the insurer shall be subject
                to penal provisions under the Insurance Act, 1938.
                <br />
                10. On receipt of the data from the existing insurance company,
                the new insurance company may underwrite the proposal and convey
                its decision to the policyholder in accordance with the
                Regulation 4 (6) of the IRDA (Protection of Policyholders'
                interest) Regulations, 2002.
                <br />
                11. If on receipt of data within the above time frame, the
                insurance company does not communicate its decision to the
                requesting policyholder within 15 days in accordance with its
                underwriting policy as filed by the company with the Authority,
                then the insurance company shall not retain the right to reject
                such proposal and shall have to accept the proposal.
                <br />
                <br />
                <strong className="text-red-700">
                  {" "}
                  E. Basic principles of insurance and tools for underwriting
                </strong>
                <br />
                <strong>1. Basic principles relevant to underwriting</strong>
                <br />
                In any form of insurance, whether it is life insurance or
                general insurance, there are certain legal principles which
                operate along with acceptance of risks. Health insurance is
                equally governed by these principles and any violation of the
                principles results in the insurer deciding to avoid the
                liability, much to the dissatisfaction and frustration of the
                policyholders. These core principles are:
                <br />
                <strong>
                  {" "}
                  1. Utmost good faith (Uberrima fides) and the insurable
                  interest
                </strong>
                <br />
                <strong>2. Tools for underwriting</strong>
                <br />
                These are the sources of information for the underwriter and the
                basis on which the risk classification is done and premiums
                finally decided. The following are the key tools for
                underwriting:
                <br />
                <strong>a) Proposal form</strong>
                <br />
                This document is the base of the contract where all the critical
                information pertaining to the health and personal details of the
                proposer (i.e. age, occupation, build, habits, health status,
                income, premium payment details etc.) are collected. This could
                range from a set of simple questions to a fully detailed
                questionnaire according to product and the needs/policy of the
                company, so as to ensure that all material facts are disclosed
                and the coverage is given accordingly. Any breach or concealment
                of information by the insured shall render the policy void.
                <br />
                <strong> b) Age proof</strong>
                <br />
                Premiums are determined on the basis of the age of the insured.
                Hence it is imperative that the age disclosed at the time of
                enrollment is verified through submission of an age proof.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  {" "}
                  F. Underwriting process
                </strong>
                <br />
                Once the required information is received, the underwriter
                decides the terms of the policy. The common forms used for
                underwriting health insurance business are as below:
                <br />
                <strong>1. Medical underwriting</strong>
                <br />
                Medical underwriting is a process in which medical reports are
                called for from the proposer to determine the health status of
                an individual applying for health insurance policy. The health
                information collected is then evaluated by the insurers to
                determine whether to offer coverage, up to what limit and on
                what conditions and exclusions. Thus medical underwriting can
                determine the acceptance or declining of a risk and also the
                terms of cover.
                <br />
                However, medical underwriting involves high costs in terms of
                receiving and examining medical reports. Also, when insurers use
                a high degree of medical underwriting, they are blamed for
                ‘cream-skimming’ (accepting only the best kind of risk and
                denying others). It also causes frustration among prospective
                clients and reduces the number of people willing to insure with
                those insurers as they do not want to provide the requisite
                information and detail and to undergo the required tests.
                <br />
                Health status and age are important underwriting considerations
                for individual health insurance. Also current health status,
                personal and family medical history enable an underwriter to
                determine presence of any pre-existing diseases or conditions
                and eventually the probability of future health problems that
                may require hospitalization or surgical intervention.
                <br />
                Further proposal forms are designed in a manner to elicit
                information about past treatments taken, hospitalizations and
                surgeries undergone. This helps an underwriter to evaluate the
                possibility of recurrence of an earlier ailment, its impact on
                current or future health status or future complications. Some
                diseases for which the proposer is taking medicines only may
                soon require hospitalization any time soon or recur.
                <br />
                <strong className="text-red-700"> Example</strong>
                <br />
                Medical conditions like hypertension, overweight/obesity and
                raised sugar levels have a high probability of future
                hospitalization for diseases of the heart, kidney and the
                nervous system. So, these conditions should be carefully
                considered while assessing the risk for medical underwriting.
                <br />
                Since adverse changes in health status generally occur post 40
                years, mainly due to normal ageing process, insurers do not
                require any medical examination or tests of the proposer earlier
                than the age of 45 years (some insurers could raise this
                requirement to 50 or 55 years too). Medical underwriting
                guidelines may also require a signed declaration of the
                proposer’s health status by his/her family physician.
                <br />
                In the Indian health insurance market, the key medical
                underwriting factor for individual health insurance is the age
                of the person. Persons above the age of 45-50 years, enrolling
                for the first time are normally required to undergo specified
                pathological investigations to assess health risk profile and to
                obtain information on their current health status. Such
                investigations also provide an indication of prevalence of any
                pre-existing medical conditions or diseases.
                <br />
                <strong> 2. Non-medical underwriting</strong>
                <br />
                Most of the proposers which apply for health insurance do not
                need medical examination. If it could be known with a fair
                degree of accuracy that only one- tenth or less of such cases
                will bring the adverse results during medical examination,
                insurers could dispense with medical examination in majority of
                the cases.
                <br />
                Even, if the proposer were to disclose all material facts
                completely and truthfully and the same were checked by agent
                carefully, then also the need for medical examination could have
                been much less. In fact, a slight increase in the claims ratio
                can be accepted if there is savings in the costs of medical
                checkup and other expenses and also as it will reduce the
                inconvenience to the proposer.
                <br />
                Therefore, insurance companies are coming up with some medical
                policies where the proposer is not required to undergo any
                medical examination. In such cases, companies usually create a
                ‘medical grid’ to indicate at what age and stage should a
                medical underwriting be done, and therefore these non- medical
                limits are carefully designed so as to strike a proper balance
                between business and risk.
                <br />
                <strong className="text-red-700"> Example</strong>
                <br />
                If an individual has to take health insurance coverage quickly
                without going through a long process of medical examinations,
                waiting periods and processing delays, then he can opt for a
                non-medical underwriting policy. In a non-medical underwriting
                policy, premium rates and sum assured are usually decided on the
                basis of answers to a few health questions mostly based on age,
                gender, smoking class, build etc. The process is speedy but the
                premiums may be relatively higher.
                <br />
                <strong> 3. Numerical rating method</strong>
                <br />
                This is a process adopted in underwriting, wherein numerical or
                percentage assessments are made on each component of the risk.
                <br />
                Factors like age, sex, race, occupation, residence, environment,
                build, habits, family and personal history are examined and
                scored numerically based on pre- determined criteria.
                <br />
                <strong>4. Underwriting decisions</strong>
                <br />
                The underwriting process is completed when the received
                information is carefully assessed and classified into
                appropriate risk categories. Based on the above tools and his
                judgment, the underwriter classifies the risk into the following
                categories:
                <br />
                a) Accept risk at standard rates
                <br />
                b) Accept risk at an extra premium (loading), though it may not
                be practiced in all companies
                <br />
                c) Postpone the cover for a stipulated period/term
                <br />
                d) Decline the cover
                <br />
                e) Counter offer (either restrict or deny part of the cover)
                <br />
                f) Impose a higher deductible or Co-pay
                <br />
                g) Levy permanent exclusion(s) under the policy
                <br />
                If any illness is permanently excluded, it is endorsed on the
                policy certificate. This becomes an additional exclusion apart
                from the standard policy exclusion and shall form the part of
                the contract.
                <br />
                Expert individual risk assessment by underwriters is vital to
                insurance companies as it keeps the insurance system in balance.
                Underwriting enables insurers to group together those with the
                same level of expected risk and to charge them the same premium
                for the protection they choose. The benefit for the policyholder
                is availability of insurance at a fair and competitive price
                whereas the benefit for an insurer is the ability to maintain
                the experience of its portfolio in line with the morbidity
                assumptions.
                <br />
                <strong> 5. Use of general or standard exclusions</strong>
                <br />
                The majority of policies impose exclusions that apply to all
                their members. These are known as standard exclusions or
                sometimes referred to as general exclusions. Insurers limit
                their exposure by the implementation of standard exclusions.
                <br />
                <div>
                  <img
                    src="https://www.notioninsurance.in/newportal/index/15.jpg"
                    alt=""
                    className="mx-auto mt-10 w-[50%]"
                  />
                </div>
              </li>
              <li>
                <strong className="text-red-700">
                  {" "}
                  G. Group health insurance
                </strong>
                <br />
                <strong>1. Group health insurance</strong>
                <br />
                Group insurance is underwritten mainly on the law of averages,
                implying that when all members of a standard group are covered
                under a group health insurance policy, the individuals
                constituting the group cannot anti-select against the insurer.
                Thus, while accepting a group for health insurance, the insurers
                take into consideration the possibility of existence of a few
                members in the group who may have severe and frequent health
                problems.
                <br />
                Underwriting of group health insurance requires analyzing the
                characteristics of the group to evaluate whether it falls within
                the insurance company’s underwriting guidelines as well as the
                guidelines laid down for group insurance by the insurance
                regulators.
                <br />
                Standard underwriting process for group health insurance
                requires evaluating the proposed group on the following factors:
                <br />
                a) Type of group
                <br />
                b) Group size
                <br />
                c) Type of industry
                <br />
                d) Eligible persons for coverage
                <br />
                e) Whether entire group is being covered or there is an option
                for members to opt out
                <br />
                f) Level of coverage – whether uniform for all or differently
                <br />
                g) Composition of the group in terms of sex, age, single or
                multiple locations, income levels of group members, employee
                turnover rate, whether premium paid entirely by the group holder
                or members are required to participate in premium payment
                <br />
                h) Difference in healthcare costs across regions in case of
                multiple locations spread in different geographical locations
                <br />
                i) Preference of the group holder for administration of the
                group insurance by a third party administrator (of his choice or
                one selected by the insurer) or by the insurer itself
                <br />
                j) Past claims experience of the proposed group
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                A group of members working in mines or factories is at higher
                health risk than a group of members working in air-conditioned
                offices. Also the nature of diseases (thereby claims) are also
                likely to be quite different for both groups. Therefore, the
                insurer will price the group health insurance policy accordingly
                in both the cases.
                <br />
                Similarly to avoid adverse selection in case of groups with high
                turnover such as IT companies, insurers can introduce
                precautionary criteria requiring employees to serve their
                probationary period before becoming eligible for insurance.
                <br />
                Due to highly competitive nature of group health insurance
                business, insurers allow substantial flexibility and
                customization in benefits of the group insurance plans. In
                employer-employee group insurance plans, the benefits design is
                usually developed over time and used as an employee retention
                tool by the human resources department of the employer. Often,
                the flexibility is the result of competition among insurers to
                match or improve the benefits of the existing group insurance
                plan given by another insurer to capture and shift business.
                <br />
                <strong>
                  2. Underwriting other than employer- employee groups
                </strong>
                <br />
                Employer-employee groups are traditionally the most common
                groups offered group health insurance. However, as health
                insurance gains acceptance as an effective vehicle of financing
                healthcare expenditure, different types of group formations have
                now developed. In such a scenario, it is important for group
                health insurance underwriters to take into consideration the
                character of the group composition while underwriting the group.
                <br />
                In addition to employee-employer groups, insurers have provided
                group health insurance coverage to varied type of groups such
                as: labour unions, trusts and societies, multiple-employer
                groups, franchisee dealers, professional associations, clubs and
                other brotherhood organizations.
                <br />
                Governments in different countries have been buyers of group
                health insurance coverage for poorer sections of the society. In
                India, governments both at the central and state level have
                aggressively been sponsoring group health insurance schemes for
                the poor e.g. RSBY, Yeshaswini etc.
                <br />
                The rationale of the group insurance guidelines is to restrict
                formation of groups for the sole purpose of availing insurance
                with advantage of flexible design, coverage of benefits not
                available on individual policies and cost savings. It has been
                observed that such ‘groups of convenience’ have often led to
                adverse selection against the insurers and eventually high claim
                ratios. Group insurance guidelines by the regulatory authority,
                thus, help in responsible market conduct by the insurers. They
                instill discipline in underwriting by insurance companies and
                also in canvassing group insurance schemes by setting up
                administration standards for group schemes.
                <br />
                <br />
                <strong className="text-red-700">
                  H. Underwriting of Overseas Travel Insurance
                </strong>
                <br />
                Since the main cover under Overseas Travel Insurance policies is
                the health cover, the underwriting would follow the pattern for
                health insurance in general.
                <br />
                The premium rating and acceptance would as per individual
                company guidelines but a few important considerations are given
                below:
                <br />
                1. Premium rate would depend on the age of the proposer and the
                duration of foreign travel.
                <br />
                2. As medical treatment is costly overseas, the premium rates
                are normally much higher compared to domestic health insurance
                policies.
                <br />
                3. Even among the foreign countries, USA and Canada premium is
                the highest.
                <br />
                4. Care should be taken to rule out the possibility of a
                proposer using the policy to take medical treatment abroad and
                hence the existence of any pre-existing disease must be
                carefully considered at the proposal stage.
                <br />
                <br />
                <strong className="text-red-700">
                  I. Underwriting of Personal Accident Insurance
                </strong>
                <br />
                The underwriting considerations for personal accident policies
                are discussed below:
                <br />
                <strong>Classification of Risk</strong>
                <br />
                On the basis of occupation, the risks associated with the
                insured person may be classified into three groups:
                <br />
                <strong>• Risk group I</strong>
                <br />
                Accountants, Doctors, Lawyers, Architects, Consulting Engineers,
                Teachers, Bankers, persons engaged in administration functions,
                persons primarily engaged in occupations of similar hazards.
                <br />
                <strong>• Risk group II</strong>
                <br />
                Builders, Contractors and Engineers engaged in superintending
                functions only, Veterinary Doctors, paid drivers of motor cars
                and light motor vehicles and persons engaged in occupation of
                similar hazards. All persons engaged in manual labour (except
                those falling under Group III), cash carrying employees, garage
                and motor Mechanics, Machine operators, Drivers of trucks or
                lorries and other heavy vehicles, professional athletes and
                sportsmen, woodworking Machinists and persons engaged in
                occupations of similar hazards.
                <br />
                <strong>• Risk group III</strong>
                <br />
                Persons working in underground mines, explosives magazines,
                workers involved in electrical installation with high tension
                supply, Jockeys, circus personnel, persons engaged in activities
                like racing on wheels or horseback, big game hunting,
                mountaineering, winter sports, skiing, ice hockey, ballooning,
                hang gliding, river rafting, polo and persons engaged in
                occupations / activities of similar hazard. Risk groups are also
                known in the form of ‘Normal’, ‘Medium’ and ‘High’ respectively.
                <br />
                <strong>Age Limits</strong>
                <br />
                The minimum and maximum age for being covered and renewed varies
                from company to company. Generally a band of 5 years to 70 years
                is the norm. However, in case of persons who already have a
                cover, policies may be renewed after they complete 70 years but
                up to the age of 80 subject to a loading of the renewal premium.
                <br />
                No medical examination is usually required for renewal or fresh
                cover.
                <br />
                <strong>Medical Expenses</strong>
                <br />
                The medical expenses cover is as follows:
                <br />
                • A personal accident policy can be extended by endorsement, on
                payment of extra premium to cover medical expenses incurred by
                the insured in connection with the accidental bodily injury.
                <br />
                • These benefits are in addition to the other benefits under the
                policies.
                <br />
                • It is not necessary that person has to be hospitalised.
                <br />
                <strong>War and Allied Risks</strong>
                <br />
                War risk cover may be covered to Indian personnel / experts
                working in foreign countries on civilian duties with additional
                premium.
                <br />
                • P.A. policies issued during peace time or normal period would
                be at say 50 percent extra over the normal rate (i.e. 150
                percent of the normal rate.)
                <br />
                • P.A. policies issued during abnormal/ apprehensive period
                (i.e. during the period when warlike conditions have already
                occurred or are imminent in foreign country/i.e. where the
                Indian personnel are working on civilian duties) at say 150
                percent extra over the normal rate (i.e. 250 percent of the
                normal rate)
                <br />
                <strong>The Proposal Form</strong>
                <br />
                The form elicits information on the following:
                <br />
                • Personal details
                <br />
                • Physical condition
                <br />
                • Habits and pastimes
                <br />
                • Other or previous insurances
                <br />
                • Previous accidents or illness
                <br />
                • Selection of benefits and sum insured
                <br />
                • Declaration
                <br />
                <strong>
                  The above required details can be explained as follows:
                </strong>
                <br />
                • Personal details relate to, inter alia, age, height and
                weight, full description of occupation and average monthly
                income.
                <br />
                • Age will show whether the proposer is within the limits of age
                for entrants for the policy desired. Weight and height should be
                compared with a table of average weight for sex, height and age
                and further investigation would be made if the proposer is say
                15 percent or more over or under the average.
                <br />
                • Physical condition details relate to any physical infirmity or
                defect, chronic diseases etc.
                <br />
                • Proposers who have lost a limb or the sight of an eye may only
                be accepted on special terms in approved cases. They constitute
                abnormal risks because they are “less able to avoid certain
                types of accidents and in view of the fact that if the remaining
                arm or leg is injured or the sight or the remaining eye is
                affected, the degree and length of disablement is likely to be
                much greater than normal.
                <br />
                • Diabetes may retard recovery as the wound may not heal quickly
                and the disablement may be unduly prolonged. The medical history
                of the proposer must be examined in order to determine whether
                and to what extent injuries or illnesses may affect the future
                accident risks. There are many complaints of such an obviously
                serious nature as to make the risk uninsurable, e.g. valvular
                disease of the heart.
                <br />
                • Hazardous pastimes like mountaineering, polo, motor racing,
                acrobatics etc., require extra premium.
                <br />
                <strong className="text-red-700">Summary</strong>
                <br />
                a) Health insurance is based on the concept of morbidity which
                is defined as the risk of a person falling ill or sick.
                <br />
                b) Underwriting is the process of risk selection and risk
                pricing.
                <br />
                c) Underwriting is required to strike a proper balance between
                risk and business thereby maintaining the competitiveness and
                yet profitability for the organisation.
                <br />
                d) Some of the factors which affect a person’s morbidity are
                age, gender, habits, occupation, build, family history, past
                illness or surgery, current health status and place of
                residence.
                <br />
                e) The purpose of underwriting to prevent adverse selection
                against the insurer and also ensure proper classification and
                equity among risks.
                <br />
                f) The agent is the first level underwriter as he is in the best
                position to know the prospective client to be insured.
                <br />
                g) The core principles of insurance are: utmost good faith,
                insurable interest, indemnity, contribution, subrogation and
                proximate cause.
                <br />
                h) The key tools for underwriting are: proposal form, age proof,
                financial documents, medical reports and sales reports.
                <br />
                i) Medical underwriting is a process which is used by the
                insurance companies to determine the health status of an
                individual applying for health insurance policy.
                <br />
                j) Non-medical underwriting is a process where the proposer is
                not required to undergo any medical examination.
                <br />
                k) Numerical rating method is a process adopted in underwriting,
                wherein numerical or percentage assessments are made on each
                aspect of the risk.
                <br />
                l) The underwriting process is completed when the received
                information is carefully assessed and classified into
                appropriate risk categories.
                <br />
                m) Group insurance is mainly underwritten based on the law of
                averages, implying that when all members of a standard group are
                covered under a group health insurance policy, the individuals
                constituting the group cannot anti-select against the insurer.
                <br />
              </li>
            </ul>
          </div>
        );

      case "CHAPTER-11":
        return (
          <div>
            <Typography
              variant="h5"
              className="mb-0 font-pt_serif text-2xl text-blue-800"
            >
              Chapter 11:HEALTH INSURANCE CLAIMS
            </Typography>
            <br />
            <Typography variant="h5" className=" underline font-pt_serif">
              Introduction
            </Typography>
            In this chapter we will discuss about claim management process in
            health insurance, documentation required and the process of claim
            reserving. Apart from this we will also look into claims management
            under personal accident insurance and understand the role of TPAs.
            <br />
            <Typography variant="h6" className="mt-4 underline">
              Learning Outcomes
            </Typography>
            <ul>
              <li>
                <strong className="text-red-700">
                  {" "}
                  A. Claims management in insurance{" "}
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  B. Management of health insurance claims{" "}
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  C. Documentation in health insurance claims{" "}
                </strong>
                <br />
                <strong className="text-red-700">D. Claims reserving </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  E. Role of third party administrators (TPA)
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  F. Claims management – personal accident{" "}
                </strong>
                <br />
                <strong className="text-red-700">
                  {" "}
                  G. Claims management- Overseas travel insurance{" "}
                </strong>
                <br />
              </li>
              <li className="mt-8">
                <strong className="text-red-700">
                  A. Claims management in insurance
                </strong>
                <br />
                It is very well understood that insurance is a ‘promise’ and the
                policy is a ‘witness’ to that promise. The occurrence of an
                insured event leading to a claim under the policy is the true
                test of that promise. How well an insurer performs is evaluated
                by how well it keeps its claims promises. One of the key rating
                factors in insurance is the claims paying ability of the
                insurance company.
                <br />
                <strong> 1. Stakeholders in claim process</strong>
                <br />
                Before we look in detail at how claims are managed, we need to
                understand who are the interested parties in the claims process.
                <br />
                <strong> Diagram 1: Stakeholders in claim process</strong>
                <br />
                <div>
                  <img
                    src="https://www.notioninsurance.in/newportal/index/16.jpg"
                    className="mx-auto  mt-10 w-[50%]"
                  />
                </div>
                <table className="border border-black w-full bg-white shadow-md table-auto">
                  <tbody>
                    <tr>
                      <th className="p-3 text-left border border-black">
                        MONTH
                      </th>
                      <th className="p-3 text-left border border-black">
                        SAVINGS
                      </th>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Customer
                      </td>
                      <td className="p-3 text-left border border-black">
                        The person who buys insurance is the first stakeholder
                        and ‘receiver of the claim’.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Owners
                      </td>
                      <td className="p-3 text-left border border-black">
                        Owners of the insurance company have a big stake as the
                        ‘payers of the claims’. Even if the claims are met from
                        the policy holders’ funds, in most cases, it is they who
                        are liable to keep the promise.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Underwriters
                      </td>
                      <td className="p-3 text-left border border-black">
                        Underwriters within an insurance company and across all
                        insurers have the responsibility to understand the
                        claims and design the products, decide policy terms,
                        conditions and pricing etc.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Regulator
                      </td>
                      <td className="p-3 text-left border border-black">
                        The regulator (Insurance Regulatory and Development
                        Authority of India) is a key stakeholder in its
                        objective to:
                        <br />
                        ✔ Maintain order in the insurance environment
                        <br />
                        ✔ Protect policy holders’ interest
                        <br />✔ Ensure long term financial health of insurers.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Third Party Administrators
                      </td>
                      <td className="p-3 text-left border border-black">
                        Service intermediaries known as Third Party
                        Administrators, who process health insurance claims.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Insurance agents / brokers
                      </td>
                      <td className="p-3 text-left border border-black">
                        Insurance agents / brokers not only sell policies but
                        are also expected to service the customers in the event
                        of a claim.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-left border border-black">
                        Providers / Hospitals
                      </td>
                      <td className="p-3 text-center border border-black">
                        They ensure that the customer gets a smooth claim
                        experience, especially when the hospital is on the panel
                        of the TPA the Insurer to provide cashless
                        hospitalization.
                      </td>
                    </tr>
                  </tbody>
                </table>
                Thus managing claims well means managing the objectives of the
                each of these stakeholders related to the claims. Of course, it
                may happen that some of these objectives can conflict with each
                other.
                <br />
                <strong>
                  2. Role of claims management in insurance company
                </strong>
                <br />
                As per industry data- “the health insurance loss ratio of
                various insurers ranges from 65% to above 120%, with major part
                of the market operating at above 100% loss ratio”. Most
                companies are making losses in health insurance business.
                <br />
                This means that there is a great need to adopt sound
                underwriting practices and efficient management of claims to
                bring better results to the company and the policyholders.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  {" "}
                  B. Management of health insurance claims
                </strong>
                <br />
                <strong> 1. Challenges in health insurance</strong>
                <br />
                It is important to understand the peculiar features of the
                health insurance portfolio in depth so that health claims can be
                effectively managed. These are:
                <br />
                a) Majority of the policies are for hospitalization indemnity
                where the subject matter covered is a human being. This brings
                forth emotional issues that are not normally faced in other
                classes of insurance.
                <br />
                b) India presents very peculiar patterns of illnesses, approach
                to treatment and follow up. These result in some people being
                excessively cautious with some others being unworried about
                their illness and treatment.
                <br />
                c) Health insurance can be purchased by an individual, a group
                such as a corporate organization or through a retail selling
                channel like a bank. This results in the product being sold as a
                standard commodity at one extreme while being tailored to
                satisfy needs of the customer at the other.
                <br />
                d) Health insurance depends on the act of being hospitalized, to
                trigger a claim under the policy. However, there is great
                difference in the availability, specialization, treatment
                methods, billing patterns and charges of all health service
                providers whether doctors, surgeons or hospitals which make it
                very difficult to assess claims.
                <br />
                e) The discipline of healthcare is the fastest developing one.
                New diseases and conditions keep occurring resulting in
                development of new treatment methods. Examples of this are
                key-hole surgeries, laser treatments, etc. This makes health
                insurance more technical and the skills to handle the insurance
                claims for such procedure needs constant improvement.
                <br />
                f) More than all these factors, the fact that a human body
                cannot be standardized adds a completely new dimension. Two
                people could respond differently to the same treatment for the
                same illness or require different treatments or varying periods
                of hospitalization.
                <br />
                Efficient claims management ensures that right claim is paid to
                right person at the right time.
                <br />
                <br />
                <strong> 2. Claim process in health insurance</strong>
                <br />
                A claim may be serviced either by the insurance company itself
                or through the services of a Third Party Administrator (TPA)
                authorized by the insurance company.
                <br />
                From the time a claim is made known to the insurer / TPA to the
                time the payment is made as per the policy terms, the health
                claim passes through a set of well-defined steps, each having
                its own relevance.
                <br />
                The processes detailed below are in specific reference to health
                insurance (hospitalization) indemnity products which form the
                major part of health insurance business.
                <br />
                The general process and supporting documents for a claim under
                fixed benefit product or critical illness or daily cash product
                etc. would be quite similar, except for the fact that such
                products may not come with cashless facility.
                <br />
                <strong>
                  {" "}
                  The claim under an indemnity policy could be a:
                </strong>
                <br />
                <strong> a) Cashless claim</strong>
                <br />
                The customer does not pay the expenses at the time of admission
                or treatment. The network hospital provides the services based
                on a pre- approval from the insurer/TPA and later submits the
                documents to the insurer/TPA for settlement of the claim.
                <br />
                <br />
                <strong> b) Reimbursement claim</strong> <br />
                The customer pays the hospital from his own resources and then
                files his claim with Insurer/TPA for payment of the admissible
                claim.
                <br />
                In both cases, the basic steps remain the same.
                <br />
                <br />
                <strong>
                  Diagram 2: Claim process broadly comprises of following steps
                  (not in exact order)
                </strong>
                <br />
                <div>
                  <img
                    src="https://www.notioninsurance.in/newportal/index/17.jpg"
                    className="mt-10 mx-auto w-[60%]"
                  />
                </div>
                <strong>a) Intimation</strong>
                <br />
                Claim intimation is the first instance of contact between the
                customer and the claims team. The customer could inform the
                company that he is planning to avail a hospitalization or the
                intimation would be made after the hospitalization has taken
                place, especially in case of emergency admission to a hospital.
                <br />
                Till recently, the act of intimation of a claim event was a
                formality. However, recently insurers have started insisting on
                the intimation of claim as soon as practicable. Typically it is
                required before hospitalization in case of planned admission,
                and within 24 hours of hospitalization in case of an emergency.
                <br />
                The timely availability of information about hospitalization
                helps the Insurer/TPA to verify that the hospitalization of the
                customer is genuine and there is no impersonation or fraud and
                sometimes, to negotiate the charges.
                <br />
                <br />
                <strong> b) Registration</strong>
                <br />
                Registration of a claim is the process of entering the claim in
                the system and creating a reference number using which the claim
                can be traced any time. This number is called Claim number,
                Claim reference number or Claim control number. The claim number
                could be numeric or alpha-numeric based on the system and
                processes used by the processing organization
                <br />
                Registration and generation of a reference no. is usually done
                once the claim intimation is received and the correct policy
                number and insured person’s particulars are matched.
                <br />
                Once a claim is registered in the system, a reserve for the same
                would be created simultaneously in the accounts of the insurer.
                At the time of intimation/registration, the exact claim amount
                or estimate may not be known. The initial reserve amount is
                therefore a standard reserve (mostly based on historical average
                claim size). Once the estimate or expected amount of liability
                is known, the reserve is revised upward/downward to reflect the
                same.
                <br />
                <br />
                <strong> c) Verification of documents</strong>
                <br />
                Once a claim is registered, the next step is to check for the
                receipt of all the required documents for processing.
                <br />
                It must be appreciated that for a claim to be processed
                following are the most important requirements:
                <br />
                1. The documentary evidence of the illness
                <br />
                2. Treatment provided
                <br />
                3. In-patient duration
                <br />
                4. Investigation Reports
                <br />
                5. Payment made to the hospital
                <br />
                6. Further advice for treatment
                <br />
                7. Payment proofs for implants etc.
                <br />
                Verification of documents follows a checklist which the claim
                processor checks out. Most of the companies ensure that such
                checklists are part of the processing documentation.
                <br />
                The missing documentation is noted at this stage – while some
                processes involve requesting for the documents not submitted by
                the customer / hospital at this point, most of the companies
                first complete the scrutiny of all the documents submitted
                before requesting for additional information so that the
                customer is not inconvenienced.
                <br />
                <br />
                <strong> d) Capturing the billing information</strong> <br />
                Billing is an important part of the claim processing cycle.
                Typical health insurance policies provide for indemnifying
                expenses incurred in the treatment with specific limits under
                various heads. The standard practice is to classify the
                treatment charges into:
                <br />
                ✔ Room, board and nursing expenses including registration and
                service charges.
                <br />
                ✔ Charges for ICU and any intensive care operations.
                <br />
                ✔ Operation theatre charges, anaesthesia, blood, oxygen,
                operation theatre charges, surgical appliances, medicines and
                drugs, diagnostic materials and X-ray, dialysis, chemotherapy,
                radiotherapy, cost of pacemaker, artificial limbs and any
                medical expenses incurred which is integral part of the
                operation.
                <br />
                ✔ Surgeon, anaesthetist, medical practitioner, consultant's,
                specialists fees.
                <br />
                ✔ Ambulance charges.
                <br />
                ✔ Investigation charges covering blood test, X-ray, scans, etc.
                <br />
                ✔ Medicines and drugs.
                <br />
                Documents submitted by the customer are examined to capture
                information under these heads so that the settlement of claims
                can be done with accuracy.
                <br />
                <br />
                <strong> e) Coding of claims</strong>
                <br />
                The most important code set used is the World Health
                Organization (WHO) developed International Classification of
                Diseases (ICD) codes.
                <br />
                While ICD is used to capture the disease in a standardized
                format, procedure codes such as Current Procedure Terminology
                (CPT) codes capture the procedures performed to treat the
                illness.
                <br />
                Insurers are relying on the coding increasingly and Insurance
                Information Bureau (IIB), which is part of Insurance Regulatory
                and Development Authority (IRDAI), has started an information
                bank where such information that can be analyzed.
                <br />
                <br />
                <strong> f) Processing of claim</strong>
                <br />
                A reading of the health insurance policy shows that while it is
                a commercial contract, it involves medical terms that define
                when a claim is payable and to what extent. The heart of claims
                processing in any insurance policy, is in answering two key
                questions:
                <br />
                ✔ Is the claim payable under the policy?
                <br />
                ✔ If yes, what is the net payable amount?
                <br />
                Each of these questions requires understanding of a number of
                terms and conditions of the policy issued as well as the rates
                agreed with the hospital in case treatment has taken place at a
                network hospital.
                <br />
                <br />
                <strong> g) Arriving at the final claim payable</strong>
                <br />
                Once the claim is admissible, the next step is to decide the the
                amount of claim payable. To compute this we need to understand
                the factors that decide the claim amount payable. These factors
                are:
                <br />
                <strong>
                  i. Sum insured available for the member under the policy
                </strong>
                <br />
                There are policies issued with individual sum insured, some
                issued on floater basis where the sum insured is available
                across the family or policies which are on floater basis but
                with a limit per member.
                <br />
                <strong>
                  {" "}
                  ii. Balance sum insured available under the policy for the
                  member after taking into account any claim made already:
                </strong>
                <br />
                While calculating the balance of sum insured available after
                deducting claims already paid, any later cashless authorization
                provided to the hospitals will also have to be noted.
                <br />
                <strong> iii. Sub-Limits</strong>
                <br />
                Most policies specify room rent limitation, nursing charges etc.
                either as a percentage of sum insured or as a limit per day.
                Similar limitation could be in force for consultant fee, or
                ambulance charges, etc.
                <br />
                <strong> iv. Check for any limits specific to illness</strong>
                <br />
                The policy could specify a certain amount or capping for
                maternity cover or for other diseases say, cardiac illness.
                <br />
                <strong>
                  v. Check whether entitled or not to cumulative bonus
                </strong>
                <br />
                Verify whether the insured is entitled to any no-claim bonus (in
                case the insured has not claimed from his policy in the previous
                year/s). No-claim bonus often comes in the form of additional
                sum insured, which in fact increases the sum insured of the
                patient/insured. Sometimes, the cumulative bonus may also be
                wrongly stated as claims intimated towards the end of the
                previous year may not have been taken into account.
                <br />
                <strong> vi. Other expenses covered with limitation:</strong>
                <br />
                There could be other limits e.g. if treatment is undertaken
                under Ayurvedic system of medicine, usually the same has a much
                lower limit. Health check- up costs are only up to a certain
                limit after four years of the policy. Hospital cash payment also
                has a per day limit.
                <br />
                <strong> vii. Co-payment</strong>
                <br />
                This is normally a flat percentage of the assessed claim before
                payment. The co-pay could also be applicable only in select
                circumstances – only for parent claims, only for maternity
                claims, only from second claim onwards or even only on claims
                exceeding a certain amount.
                <br />
                Before the payable amount is adjusted to these limits, the claim
                amount payable is computed net of deductions for non-payable
                items.
                <br />
                Non-payable items in a health claim
                <br />
                The expenses incurred in treating an illness can be classified
                into:
                <br />
                ✔ Expenses for cure and
                <br />
                ✔ Expenses for care.
                <br />
                Expenses for curing an illness comprise of all the medical costs
                and the normal related facilities. In addition, there could be
                costs incurred to make the stay in a hospital more comfortable
                or even luxurious.
                <br />
                A typical health insurance policy attends to the expenses for
                curing an illness and unless stated specifically, the extra
                expenses for luxury are not payable.
                <br />
                These expenses can be classified into non-treatment charges such
                as registration charge, documentation charges, etc. and to items
                that can be considered if directly relating to the cure (e.g.
                protein supplement during the inpatient period specifically
                prescribed).
                <br />
                Earlier every TPA/insurer had its own list of non-payable items,
                now the same has been standardized under IRDAI Health Insurance
                Standardization Guidelines.
                <br />
                <br />
                <strong> h) Payment of claim</strong>
                <br />
                Once the payable claim amount is arrived at, payment is done to
                the customer or the hospital as the case may be. The approved
                claim amount is advised to the Finance / Accounts function and
                the payment may be made either by cheque or by transferring the
                claim money to the customer’s bank account.
                <br />
                When the payment is made to the hospital, necessary tax
                deduction, if any is made from the payment.
                <br />
                Where the payment is handled by the Third Party Administrator,
                the payment process may vary from insurer to insurer. A more
                detailed insight into working of TPAs is provided later on.
                <br />
                Payment updates in the system are crucial for handling customer
                inquiries. <br />
                Typically these details will be shared through the system with
                the call centre / customer service team.
                <br />
                Once payment is made, the claim is treated as settled. Reports
                have to be periodically sent to the company’s management,
                intermediaries, customers and IRDAI for number and amount of
                settled claims. The typical analysis of settled claims includes
                the % settled, amount of non-payables as a proportion, average
                time taken to settle claims, etc.
                <br />
                <br />
                <strong>
                  {" "}
                  i) Management of deficiency of documents / additional
                  information required
                </strong>
                <br />
                Processing of a claim requires the scrutiny of a list of key
                documents. These are:
                <br />
                ✔ Discharge summary with admission notes,
                <br />
                ✔Supporting investigation reports,
                <br />
                ✔Final consolidated bill with break up into various parts,
                <br />
                ✔Prescriptions and pharmacy bills,,
                <br />
                ✔Payment receipts,
                <br />
                ✔Claim form and,
                <br />
                ✔Customer identification.
                <br />
                Experience shows that one out of four claims submitted has a
                suffer from being incomplete in terms of the basic documents. It
                is therefore required that the customer is advised of the
                documents not submitted and is given a time limit within which
                he can attach them to his claim.
                <br />
                <strong className="text-red-700">Example</strong>
                <br />
                The insurer may ask for indoor case papers to study the case in
                detail and may come to a conclusion that the procedure /
                treatment does not fall within the policy conditions. The act of
                asking for more information should not be treated as an act that
                implies that the insurer has accepted the claim.
                <br />
                <br />
                <strong>j) Denial claims</strong>
                <br />
                The experience in health claims show that 10% to 15% of the
                claims submitted do not fall within the terms of the policy.
                This could be because of a variety of reasons some of which are:
                <br />
                i. Date of admission is not within the period of insurance.
                <br />
                ii. The Member for whom the claim is made is not covered.
                <br />
                iii. Due to Pre-existing illness (where the policy excludes such
                condition).
                <br />
                iv. Undue delay in submission without valid reason.
                <br />
                v. No active treatment; admission is only for investigation
                purpose.
                <br />
                vi. Illness treated is excluded under the policy.
                <br />
                vii. The cause of illness is abuse of alcohol or drugs
                <br />
                viii. Hospitalization is less than 24 hours.
                <br />
                Denial or repudiation of a claim (due to whatever reason) has to
                be informed to the customer in writing. Usually, such denial
                letter clearly states the reason for denial, narrating the
                policy term / condition on which the claim was denied.
                <br />
                Most insurers have a process by which a denial is authorized by
                a manager senior to the one authorized to approve the claim.
                This is to ensure that any denial is fully justified and will be
                explained in case the insured seeks any legal remedy.
                <br />
                <br />
                <strong>
                  {" "}
                  k) Suspect claims for more detailed investigation
                </strong>
                <br />
                Insurers have been trying to handle the problem of fraud in all
                lines of business. In terms of sheer number of fraud claims
                handled, health insurance presents a great challenge to the
                insurers.
                <br />
                Few examples of frauds committed in health insurance are:
                <br />
                i. Impersonation,, the person insured is different from person
                treated.
                <br />
                ii. Fabrication of documentsto make a claim where there is no
                hospitalization.
                <br />
                iii. Inflation of expenses,either with the help of the hospital
                or by addition of external bills fraudulently created.
                <br />
                iv. Outpatient treatment converted to in-patient /
                hospitalizationto cover cost of diagnosis, which could be high
                in some conditions.
                <br />
                With newer methods of frauds emerging on a daily basis, the
                insurers and TPAs have to continuously monitor the situation on
                the ground and come up with measures to find and control such
                frauds.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  C. Documentation in health insurance claims
                </strong>
                <br />
                This section explains the need for and content of each of the
                documents required to be submitted by the customers:
                <br />
                <strong>1. Discharge summary</strong>
                <br />
                Discharge summary can be termed as the most important document
                that is required to process a health insurance claim. It details
                the complete information about the condition of the patient and
                the line of treatment.
                <br />
                <strong>
                  {" "}
                  As per IRDAI Standardization Guidelines the contents of a
                  standard Discharge Summary are as follows:
                </strong>
                <br />
                1. Patient’s Name
                <br />
                2. Telephone No / Mobile No3. IPD No
                <br />
                4. Admission No
                <br />
                5. Treating Consultant/s Name, contact numbers and Department /
                Specialty
                <br />
                6. Date of Admission with Time
                <br />
                7. Date of Discharge with Time
                <br />
                8. MLC No / FIR No
                <br />
                9. Provisional Diagnosis at the time of Admission
                <br />
                10. Final Diagnosis at the time of Discharge
                <br />
                11. ICD-10 code(s) or any other codes, as recommended by the
                Authority, for Final diagnosis
                <br />
                12. Presenting Complaints with Duration and Reason for Admission
                <br />
                13. Summary of Presenting Illness
                <br />
                14. Key findings on physical examination at the time of
                admission
                <br />
                15. History of alcoholism, tobacco or substance abuse, if any
                <br />
                16. Significant Past Medical and Surgical History, if any
                <br />
                17. Family History if significant/relevant to diagnosis or
                treatment
                <br />
                18. Summary of key investigations during Hospitalization
                <br />
                19. Course in the Hospital including complications if any
                <br />
                20. Advice on Discharge
                <br />
                21. Name & Signature of treating Consultant/ Authorized Team
                Doctor
                <br />
                22. Name & Signature of Patient / Attendant
                <br />
                A well written discharge summary helps the claim processing
                person immensely to understand the illness / injury and the line
                of treatment, thereby speeding up the process of settlement.
                Where the patient unfortunately does not survive, the discharge
                summary is termed Death Summary in many hospitals.
                <br />
                <br />
                <strong> 2. Investigation reports</strong>
                <br />
                Investigation reports assist in comparing the diagnosis and the
                treatment, thereby providing the necessary information to
                understand the exact condition that prompted the treatment and
                the progress made during the hospitalization.
                <br />
                <strong> Investigation reports usually consist of:</strong>
                <br />
                a) Blood test reports;
                <br />
                b) X-ray reports;
                <br />
                c) Scan reports and
                <br />
                d) Biopsy reports
                <br />
                All investigation reports carry the name, age, gender, date of
                test etc. and typically presented in original. The insurer may
                return the X-ray and other films to the customer on specific
                request.
                <br />
                <br />
                <strong>3. Consolidated and detailed bills:</strong>
                <br />
                This is the document that decides what needs to be paid under
                the insurance policy. Earlier there was no standard format for
                the bill, but IRDAI Standardization Guidelines provide format
                for consolidated and detailed bills. The student is advised to
                understand the details available on the IRDAI website.
                <br />
                While the consolidated bill presents the overall picture, the
                detailed bill will provide the break up, with reference codes.
                <br />
                Scrutiny of non-payable expenses is done using the detailed
                bill, where the non- admissible expenses are rounded off and
                used for deduction under the expense head to which it belongs.
                <br />
                <br />
                <strong> 4. Receipt for payment</strong>
                <br />
                Being a contract of indemnity, the reimbursement of a health
                insurance claim will also require the formal receipt from the
                hospital of the amount paid.
                <br />
                While the amount paid must correspond to the total of the bill,
                many hospitals do provide an element of concession or discount
                in the payable amount. In such a case, the insurer is called to
                pay only the amount actually paid on behalf of the patient.
                <br />
                <br />
                <strong> 5. Claim form</strong>
                <br />
                Claim form is the formal and legal request for processing the
                claim and is submitted in original signed by the customer. The
                claim form has now been standardized by IRDAI and broadly
                consists of:
                <br />
                a) Details of the primary insured and the policy number under
                which the claim is made.
                <br />
                b) Details of the insurance history
                <br />
                c) Details of the insured person hospitalized.
                <br />
                d) Details of the hospitalization such as hospital, room
                category, date and time of admission and discharge, whether
                reported to police in case of accident, system of medicine etc.
                <br />
                e) Details of the claim for which the hospitalization was done
                including breakdown of the costs, pre and post-hospitalization
                period, details of lump-sum/cash benefit claimed etc.
                <br />
                f) Details of bills enclosed
                <br />
                g) Details of bank account of primary insured for remittance of
                sanctioned claim
                <br />
                h) Declaration from the insured.
                <br />
                Besides information on disease, treatment etc., the declaration
                from the insured person makes the claim form the most important
                document in the legal sense.
                <br />
                It is this declaration which applies the “doctrine of utmost
                good faith” into the claim, breach of which attracts the
                misrepresentation clause under the policy.
                <br />
                <br />
                <strong> 6. Identity proof</strong>
                <br />
                With the increasing use of identity proof across various
                activities in our life, the general proof of identity serves an
                important purpose – that of verifying whether the person covered
                and the person treated are one and the same.
                <br />
                <strong>
                  {" "}
                  Usually identification document which is sought could be:
                </strong>
                <br />
                a) Voters identity card,
                <br />
                b) Driving license,
                <br />
                c) PAN card,
                <br />
                d) Aadhaar card etc.
                <br />
                Insistence on identity proof has resulted in a significant
                reduction of impersonation cases in cashless claims as the
                identity proof is sought before hospitalization, making it a
                duty of the hospital to verify and present the same to the
                insurer or the TPA.
                <br />
                <br />
                <strong> 7. Documents contingent to specific claims</strong>
                <br />
                <strong>
                  There are certain types of claims that require additional
                  documents apart from what has been stated above. These are:
                </strong>
                <br />
                a) Accident claims, where FIR or Medico-legal certificate issued
                by the hospital to the registered police station, may be
                required. It states the cause of accident and if the person was
                under the influence of alcohol, in case of traffic accidents.
                <br />
                b) Case indoor papers in case of complicated or high value
                claims. Indoor case paper or case sheet is a document which is
                maintained at the hospital end, detailing all treatment given to
                patient on day to day basis for entire duration of
                hospitalization.
                <br />
                c) Dialysis / Chemotherapy / Physiotherapy charts where
                applicable.
                <br />
                d) Hospital registration certificate, where the compliance with
                the definition of hospital needs to be checked.
                <br />
                <strong>
                  {" "}
                  The claims team uses certain internal document formats for
                  processing a claim. These are:
                </strong>
                <br />
                i. Checklists for document verification,
                <br />
                ii. Scrutiny/ settlement sheet,
                <br />
                iii. Quality checks / control format.
                <br />
                <br />
                <strong className="text-red-700">D. Claims reserving</strong>
                <br />
                <strong> 1. Reserving</strong>
                <br />
                This refers to the amount of provision made for all claims in
                the books of the insurer based on the status of the claims.
                While this looks very simple, the process of reserving requires
                enormous care – any mistake in reserving affects the insurer’s
                profits and solvency margin calculation.
                <br />
                Processing systems today have built in capability to compute the
                reserves as at any point of time.
                <br />
              </li>
              <li className="mt-10">
                <strong className="text-red-700">
                  E. Role of third party administrators (TPA)
                </strong>
                <br />
                The insurance sector was opened to private players in the year
                2000. Meanwhile, the demand for healthcare products was also
                growing with new products being launched. A need was therefore
                felt for the introduction of a channel for post-sale services in
                health insurance. This offered the opportunity for professional
                Third Party Administrators to be introduced.
                <br />
                Seeing this, the Insurance Regulatory and Development Authority
                allowed TPAs to be introduced into the market under license from
                IRDAI, provided they complied with The IRDAI (Third Party
                Administrators – Health Insurance) Regulations, 2001 notified on
                17th Sept 2001.
                <br />
                <strong className="text-red-700">Definition</strong>
                <br />
                "Third Party Administrators or TPA means any person who is
                licensed under the IRDAI (Third Party Administrators - Health
                Services) Regulations, 2001 by the Authority, and is engaged,
                for a fee or remuneration by an insurance company, for the
                purposes of providing health services.
                <br />
                "Health Services by TPA" means the services rendered by a TPA to
                an insurer under an agreement in connection with health
                insurance business but does not include the business of an
                insurance company or the soliciting either directly or
                indirectly, of health insurance business or deciding on the
                admissibility of a claim or its rejection.
                <br />
                Thus the scope of TPA services starts after the sale and issue
                of the insurance policy. In case of insurers not using TPAs, the
                services are performed by in- house team.
                <br />
                <strong> 2. Post sale service of health insurance</strong>
                <br />
                a) Once the proposal (and the premium) is accepted, the coverage
                commences.
                <br />
                b) If a TPA is to be used for servicing the policy, the insurer
                passes on the information about the customer and the policy to
                the TPA.
                <br />
                c) The TPA enrolls the members (while the proposer is the person
                taking the policy, members are those covered under the policy)
                and may issue a membership identification in the form of a card,
                either physical or electronic.
                <br />
                d) The membership with the TPA is used for availing cashless
                facility as well as processing of claims when the member
                requires the support of the policy for a hospitalization or
                treatment that is covered.
                <br />
                e) TPA processes the claim or cashless request and provides the
                services within the time agreed with the insurer.
                <br />
                The cut-off point from which the role of a TPA begins is the
                moment of allocation of the policy in the name of the TPA as the
                servicing entity. The servicing requirement continues through
                the policy period and through any further period that is allowed
                under the policy for reporting a claim.
                <br />
                When thousands of policies are serviced, this activity is
                continuous, especially when the same policy is renewed and the
                same TPA is servicing the policy.
                <br />
                <strong>
                  {" "}
                  3. Objectives of third party administration (TPA)
                </strong>
                <br />
                The concept of Third Party Administration in health insurance
                can be said to have been created with the following objectives:
                <br />
                a) To facilitate service to a customer of health insurance in
                all possible manners at the time of need.
                <br />
                b) To organise cashless treatment for the insured patient at
                network hospitals.
                <br />
                c) To provide fair and fast settlement of claims to the
                customers based on the claim documents submitted and as per
                procedure and guidelines of the insurance company.
                <br />
                d) To create functional expertise in handling health insurance
                claims and related services.
                <br />
                e) To respond to customers in a timely and proper manner.
                <br />
                f) To create an environment where the market objective of an
                insured person being able to access quality healthcare at a
                reasonable cost is achieved and
                <br />
                g) To help generate/collate relevant data pertaining to
                morbidity, costs, procedures, length of stay etc.,
                <br />
                <strong> 4. Relationship between insurer and TPA</strong>
                <br />
                Many insurers utilize the services of the TPA for post-sale
                service of health insurance policies while few insurers,
                especially from the life insurance sector also seek assistance
                of a TPA for arranging pre-policy medical check-up service.
                <br />
                The relationship between an insurer and the TPA is contractual
                with a host of requirements and process steps built into the
                contract. IRDAI Health Insurance Standardization guidelines now
                lay down guidelines and provide a set of suggested standard
                clauses for contract between TPA and insurance company,
                <br />
                The services that an insurer expects out of the TPA are as
                follows:
                <br />
                <strong>A. Provider networking services</strong>
                <br />
                The TPA is expected to build a relationship with a network of
                hospitals across the country, with the objective of providing
                cashless claim payments for health claims to the insured
                persons. The recent guidelines by IRDAI require the relationship
                to be tri-partite including the insurer and not just between the
                TPA and the provider.
                <br />
                They also negotiate good scheduled rates for various
                hospitalization procedures and packages from such network
                hospitals reducing costs to insureds and also insurers.
                <br />
                <strong> B. Call centre services</strong>
                <br />
                The TPA is usually expected to maintain a call centre with
                toll-free numbers reachable at all times including nights,
                weekends and holidays i.e. 24*7*365. The call centre of the TPA
                will provide information relating to:
                <br />
                a) Coverage and benefits available under the policy.
                <br />
                b) Processes and procedures relating to health claims.
                <br />
                c) Guidance relating to the services and cashless
                hospitalization.
                <br />
                d) Information on network hospitals.
                <br />
                e) Information on balance sum insured available under the
                policy.
                <br />
                f) Information on claim status.
                <br />
                g) Advice on missing documents in case of claims.
                <br />
                The call centre should be accessible through a national toll
                free number and the customer service staff should be able to
                communicate in the major languages normally spoken by the
                customers. These details are of course governed by the contract
                between the insurers and their TPAs.
                <br />
                <strong> C. Cashless access services</strong>
                <br />
                <strong className="text-red-700"> Definition</strong>
                <br />
                "Cashless facility" means a facility extended by the insurer to
                the insured where the payments, of the costs of treatment
                undergone by the insured in accordance with the policy terms and
                conditions, are directly made to the network provider by the
                insurer to the extent pre-authorization approved.
                <br />
                <strong>
                  {" "}
                  To provide this service, the requirements of the insurer under
                  the contract are:
                </strong>
                <br />
                a) All policy related information must be available with the
                TPA. It is the duty of the insurer to provide this to the TPA.
                <br />
                b) Data of members included in the policy should be available
                and accessible, without any error or deficiency.
                <br />
                c) The insured persons must carry an Identity Card that relates
                them to the policy and the TPA. This Identity Card must be
                issued by the TPA in an agreed format, reach the member within a
                reasonable time and should be valid throughout the policy
                period.
                <br />
                d) TPA must issue a pre-authorization or a Letter of Guarantee
                to the hospital based on the information provided for requesting
                the cashless facility. It could seek more information to
                understand the nature of illness, treatment proposed and the
                cost involved.
                <br />
                e) Where the information is not clear or not available, the TPA
                can reject the cashless request, making it clear that denial of
                cashless facility is not to be construed as denial of treatment.
                The member is also free to pay and file a claim later, which
                will be considered on its merits.
                <br />
                f) In emergency cases, the intimation should be done within 24
                hours of admission and the decision on cashless communicated.
                <br />
                <strong>
                  {" "}
                  D. Customer relationship and contact management
                </strong>
                <br />
                The TPA needs to provide a mechanism by which the customers can
                represent their grievances. It is usual for health insurance
                claims to be subjected to scrutiny and verification. It is also
                noted that a small percentage of the health insurance claims are
                denied which are outside the purview of the policy terms and
                conditions.
                <br />
                In addition, almost all health insurance claims are subject to
                deduction on some amount of the claim. These deductions cause
                customer dissatisfaction, especially where the reason for the
                deduction or denial is not properly explained to the customer.
                <br />
                To make sure that such grievances are resolved as quickly as
                possible, the insurer requires the TPA to have an effective
                grievance solution management.
                <br />
                <strong> E. Billing services</strong>
                <br />
                <strong>
                  {" "}
                  Under billing services, the insurer expects the TPA to provide
                  three functions:
                </strong>
                <br />
                a) Standardized billing pattern that can help the insurer
                analyze the use of coverage under various heads as well as
                decide the pricing.
                <br />
                b) Confirmation that the amount charged is relevant to the
                treatment really required for the illness.
                <br />
                c) Diagnosis and procedure codes are captured so that
                standardization of data is possible across all TPAs in
                accordance with national or international standards.
                <br />
                This requires trained and skilled manpower in the TPA who are
                capable of coding, verifying the tariff and standardizing the
                billing data capture.
                <br />
                <strong>F. Claim processing and payment services</strong>
                <br />
                This is the most critical service offered by the TPAs. Claim
                processing services offered by the TPA to the insurer is usually
                end-to-end service from registering intimation to processing to
                recommending approval and payment.
                <br />
                Payment of claims is done through the funds received from the
                insurer. The funds may be provided to the TPA in the form of
                advance money or may be settled directly by the insurer through
                its bank to the customer or to the hospital.
                <br />
                The TPA is expected to keep an account of the monies and provide
                periodic reconciliation of the amounts received from the
                insurance company. The money cannot be used for any other
                purpose except for payment of approved claims.
                <br />
                <strong> G. Management Information Services</strong>
                <br />
                Since the TPA performs claim processing, all information
                relating to the claims individually or collectively is available
                with the TPA. The insurer requires the data for various purposes
                and such data must be provided accurately and on a timely basis
                by the TPA.
                <br />
                Thus the scope of a TPA’s services can be stated as end-to-end
                service of the health insurance policies issued by the insurers,
                could be restricted to few activities, depending on requirements
                and MOU with particular insurer.
                <br />
                <strong>H. TPA Remuneration</strong>
                <br />
                For these services, the TPA is paid a fee on one of the
                following basis:
                <br />
                a) A percentage of the premium (excluding service tax) charged
                to the customer,
                <br />
                b) A fixed amount for each member serviced by the TPA for a
                defined time period, or
                <br />
                c) A fixed amount for each transaction of the service provided
                by the TPA – e.g. cost per member card issued, per claim etc.
                <br />
                Thus through services of TPA, insurers gain access to:
                <br />
                i. Cashless services
                <br />
                ii. Data compilation and analysis
                <br />
                iii. A 24 hour call centre and assistance for the customers
                <br />
                iv. Network of hospitals and other medical facilities
                <br />
                v. Support to major group customers
                <br />
                vi. Facilitation of the claims interaction with the customer
                <br />
                vii. Negotiation of tariffs and procedure prices with the
                hospitals
                <br />
                viii. Technology enabled services to ease customer service
                <br />
                ix. Verification and investigation of suspect cases
                <br />
                x. Analysis of claim patterns across companies and provision of
                crucial information on costs, newer methods of treatment,
                emerging trends and in controlling frauds
                <br />
                xi. Expansion of reach of services quickly
                <br />
                <br />
                <strong className="text-red-700">
                  F. Claims management – personal accident
                </strong>
                <br />
                <strong> 1. Personal accident</strong>
                <br />
                <strong className="text-red-700">Definition</strong>
                <br />
                Personal accidentis a benefit policy and covers accidental
                death, accidental disability (permanent / partial), Temporary
                total disability and may also have add-on coverage of accidental
                medical expenses, funeral expenses, educational expenses etc.
                depending on particular product.
                <br />
                The peril covered under the PA policy is “Accident”.
                <br />
                <strong className="text-red-700"> Definition</strong>
                <br />
                Accident is defined as anything sudden, unforeseen,
                unintentional, external, violent and by visible means.
                <br />
                Claims manager should mark caution and check following areas on
                receipt of the notification of the claim:
                <br />
                a) Person in respect of whom the claim is made is covered under
                the policy
                <br />
                b) Policy is valid as on date of loss and premium is received
                <br />
                c) Loss is within the policy period
                <br />
                d) Loss has arisen out of “Accident” and not sickness
                <br />
                e) Check for any fraud triggers and assign investigation if need
                be
                <br />
                f) Register the claim and create reserve for the same
                <br />
                g) Maintain the turnaround time (claim servicing time) and keep
                the customer informed of the development of the claim.
                <br />
                <strong> 2. Claims investigation</strong>
                <br />
                If any red alert is noticed in the claim intimation or on
                receipt of the claim documents, claim may be assigned to a
                professional investigator for verification simultaneously.
                <br />
                <br />
              </li>
              <li>
                <strong className="text-red-700">
                  {" "}
                  G. Claims management- Overseas travel insurance
                </strong>
                <br />
                <strong> 1. Overseas travel insurance policy</strong>
                <br />
                Though Overseas travel insurance policy has many sections
                covering non- medical benefits, its underwriting and claims
                management has traditionally been under health insurance
                portfolio because medical and sickness benefit is the main cover
                under the policy.
                <br />
                The covers under the policy can be broadly divided into
                following sections.
                <strong>
                  {" "}
                  A specific product may cover all or few of the below mentioned
                  benefits:
                </strong>
                <br />
                a) Medical and sickness section
                <br />
                b) Repatriation and evacuation
                <br />
                c) Personal accident cover
                <br />
                d) Personal liability
                <br />
                <strong> Claims services essentially include:</strong>
                <br />
                a) Taking down the claim notification 24*7 basis;
                <br />
                a) Taking down the claim notification 24*7 basis;
                <br />
                b) Sending the claim form and procedure;
                <br />
                c) Guiding customer on what to do immediately after loss;
                <br />
                d) Extending cashless services for medical and sickness claims;
                <br />
                e) Arranging for repatriation and evacuation, emergency cash
                advance.
                <br />
                2. Assistance companies – Role in overseas claims
                <br />
                Assistance companies have their own offices and tie ups with
                other similar providers world over. These companies offer
                assistance to the customers of insurance companies in case of
                contingencies covered under the policy.
                <br />
                These companies operate a 24*7 call centre including
                international toll free numbers for claim registration and
                information. They also offer the following services and charges
                for the services vary depending on agreement with the particular
                insurance company, benefits covered etc.
                <br />
                <br />
                <strong> a) Medical assistance services:</strong>
                <br />
                i. Medical service provider referrals
                <br />
                ii. Arrangement of hospital admission
                <br />
                iii. Arrangement of Emergency Medical Evacuation
                <br />
                iv. Arrangement of Emergency Medical Repatriation
                <br />
                v. Mortal remains repatriation
                <br />
                vi. Compassionate visit arrangements
                <br />
                vii. Minor children assistance/escort
                <br />
                b) Monitoring of Medical Condition during and after
                hospitalisation
                <br />
                c) Delivery of Essential Medicines
                <br />
                d) Guarantee of Medical Expenses Incurred during hospitalization
                subject to terms and condition of the policy and approval of
                insurance company.
                <br />
                <strong>
                  b) Pre-trip information services and other services:
                </strong>
                <br />
                i. Visas and inoculation requirements
                <br />
                ii. Embassy referral services
                <br />
                iii. Lost passport and lost luggage assistance services
                <br />
                iv. Emergency message transmission services
                <br />
                v. Bail bond arrangement
                <br />
                vi. Financial Emergency Assistance
                <br />
                f) Interpreter Referral
                <br />
                g) Legal Referral
                <br />
                h) Appointment with lawyer
                <br />
                <br />
                <strong>
                  {" "}
                  3. Claims management for cashless medical cases
                </strong>
                <br />
                Claims management approach differs for cashless medical cases,
                reimbursement medical cases and other non-medical cases. Again,
                cashless medical claims management differs in US than cashless
                medical in other countries. We shall now study step by step
                process
                <br />
                <strong>a) Claim notification</strong>
                <br />
                As and when loss happens, the patient takes admission into the
                hospital and shows the insurance details to the admission
                counter. Assistance Company receives notification of a new case
                from hospital and/or from patient or relatives/friends. Claim
                procedure is then explained to the claimant.
                <br />
                <strong> b) Case management steps:</strong>
                <br />
                <strong>
                  {" "}
                  These may vary from company to company, common steps are
                  listed below:
                </strong>
                <br />
                i. Assistance Company case manager verifies the benefits, sum
                insured, policy period, name of the policy holder.
                <br />
                ii. Case manager then gets in touch with the hospital to obtain
                clinical /medical notes for an update on the patient’s medical
                condition, billing information, estimates of cost. Assistance
                Company receives the clinical notes and estimate of medical cost
                and send an update to the Insurer.
                <br />
                iii. Admissibility of the claim is determined and Guarantee of
                payment is placed to hospital subject to approval from Insurance
                Company.
                <br />
                iv. There can be scenario where investigation may be necessary
                in India (local place of insured) and/or in loss location.
                Process of investigation is similar to what is explained in
                personal accident claims section. Investigator abroad is
                selected with the help of Assistance Company or through direct
                contact of insurance company.
                <br />
                v. Assistance Company’s case manager continues to monitor the
                case on a daily basis to provide Insurer with a clinical and
                cost update, progress notes, etc. in order to obtain
                authorization for continuation of treatment.
                <br />
                vi. Once the patient is discharged, case manager works
                diligently with the hospital to confirm final charges.
                <br />
                vii. Assistance Company ensures that the bill is properly
                scrutinized, scrubbed and audited. Any error found is notified
                to the billing department of the hospital for rectification.
                <br />
                viii. Final bill is then re-priced as per the rates agreed
                between the provider and Assistance Company or its associate
                reprising agent. The earlier the payment assurance made to
                hospital, better discount through re-pricing is possible.
                <br />
                Re-pricing is typically characteristic of US healthcare and as
                such, is not applicable for non US cases. This is a major
                difference between cashless medical case in US and non-US cases.
                <br />
                <strong> c) Claims processing Steps:</strong>
                <br />
                i. The claims assessor receives the re-priced/original bill,
                verifies and ensures that coverage was in place for the dates of
                service and treatment rendered. The bill received by the
                Assistance Company is audited by the claims department to ensure
                the charges are in line and as per the treatment protocol. The
                discount is re-confirmed and the bill is processed.
                <br />
                ii. The bill is then sent to Insurer for payment accompanied by
                re-pricing notification sheet and explanation of benefits (EOB).
                <br />
                iii. Insurance company receives the bill and authorizes
                immediate payment to Assistance Company.
                <br />
                <strong> d) Payment process steps:</strong>
                <br />
                i. Assistance Company receives authorization from Insurer to
                release payment to the hospital via local office.
                <br />
                ii. The finance department releases the payment
                <br />
                <strong> e) Hospitalization Procedures</strong>
                <br />
                i. The system in overseas countries, especially US and Europe
                are quite different from the hospitals in India since majority
                of population has universal health coverage either through
                private insurance or through government schemes. Most hospitals
                accept Guarantee of Payments from all international insurance
                companies once the insured provides them with a valid health or
                overseas travel insurance policy.
                <br />
                In most countries treatment is not delayed for want of
                confirmation of insurance coverage or cash deposit.
                <br />
                Hospitals start the treatment immediately. If there is insurance
                cover the insurance policy pays or the patient person has to
                pay. The hospitals tend to inflate charges since payments are
                delayed.
                <br />
                If payment is immediate, hospitals tend to offer very high
                discounts for immediate payment. Re-pricing agencies generally
                negotiate with hospitals for discounts for early settlement of
                hospital bills.
                <br />
                ii. Information regarding network hospitals and the procedures
                is available to the insured on the toll free numbers provided by
                the assistance companies.
                <br />
                iii. In event of the necessity of a hospitalization the insured
                needs to intimate the same at the call centre and proceed to a
                specified hospital with the valid travel insurance policy.
                <br />
                iv. Hospitals usually contact the assistance companies/insurers
                on the call centre numbers to check the validity of the policy
                and verify coverage’s.
                <br />
                v. Once the policy is accepted by the hospital the insured would
                undergo treatment in the hospital on a cashless basis.
                <br />
                <strong>
                  {" "}
                  f) Reimbursement of medical expenses and other non-medical
                  claims:
                </strong>
                <br />
                Reimbursement claims are normally filed by insured after they
                return to India. Upon receipt of the claim papers, claim is
                processed as per usual process. Payments for all admissible
                claims are made in Indian Rupee (INR), unlike in cashless claims
                where payment is made in foreign currency.
                <br />
                While processing the reimbursement claims, currency conversion
                rate is applied as on date of loss to arrive at quantum of
                liability in INR. Then the payment is made though cheque or
                electronic transfer.
                <br />
                i. Personal accident claimsare processed in similar fashion as
                explained in personal accident claims section.
                <br />
                ii. Bail bond cases and financial emergency cases arepaid
                upfront by Assistance Company and later claimed from insurance
                company.
                <br />
                iii. Claims repudiationof untenable claims follows the same
                process as for all other claims.
                <br />
                <strong>
                  {" "}
                  g) Claim documentation for Medical Accident and Sickness
                  Expenses
                </strong>
                <br />
                i. Claim form
                <br />
                ii. Doctor’s report
                <br />
                iii. Original Admission/discharge card
                <br />
                iv. Original Bills/Receipts/Prescription
                <br />
                v. Original X-ray reports/ Pathological/ Investigative reports
                <br />
                vi. Copy of passport/Visa with Entry and exit stamp <br />
                The above list is only indicative. Additional
                information/documents may be required depending on specific case
                details or depending upon claim settlement policy/procedure
                followed by particular insurer.
                <br />
                <strong className="text-red-700">Summary</strong>
                <br />
                a) Insurance is a ‘promise’ and the policy is a ‘witness’ to
                that promise. The occurrence of insured event leading to a claim
                under the policy is the true test of that promise.
                <br />
                b) One of the key rating parameter in insurance is the claims
                paying ability of the insurance company.
                <br />
                c) Customers, who buys insurance is the primary stakeholder as
                well as the receiver of the claim.
                <br />
                d) In Cashless claim a network hospital provides the medical
                services based on a pre-approval from the insurer / TPA and
                later submits the documents for settlement of the claim.
                <br />
                e) In reimbursement claim, the customer pays the hospital from
                his own resources and then files claim with Insurer / TPA for
                payment.
                <br />
                f) Claim intimation is the first instance of contact between the
                customer and the claims team.
                <br />
                g) If a fraud is suspected by insurance company in case of
                insurance claim, it is sent for investigation. Investigation of
                a claim could be done in-house by an insurer/TPA or be entrusted
                to a professional investigation agency.
                <br />
                h) Reserving refers to the amount of provision made for all
                claims in the books of the insurer based on the status of the
                claims.
                <br />
                i) In case of a denial, the customer has the option, apart from
                the representation to the insurer, to approach the Insurance
                Ombudsman or the consumer forums or even the legal authorities.
                <br />
                j) Frauds occur mostly in hospitalization indemnity policies but
                Personal accident policies also are used to make fraud claims.
                <br />
                k) The TPA provides many important services to the insurer and
                gets remunerated in the form of fees.
                <br />
              </li>
            </ul>
          </div>
        );
      default:
        return (
          <div>
            <Typography variant="h6">Section not found</Typography>
          </div>
        );
    }
  };

  return (
    <div className="main-content ">
      {/* <Typography
        variant="h4"
        className="lg:mt-14"
        color="blue-gray"
      ></Typography> */}
      {renderContent()}
    </div>
  );
};

export default MainContent;
