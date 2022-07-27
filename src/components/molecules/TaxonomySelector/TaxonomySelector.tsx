import { FC } from "react";
import { TaxonomySelectorProps } from "./types";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useWindowSize } from "usehooks-ts";
import { TaxonomyLink } from "components/atoms/TaxonomyLink";

const TaxonomySelector: FC<TaxonomySelectorProps> = ({ taxonomies }) => {
  const { width } = useWindowSize();
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      isIntrinsicHeight
      totalSlides={taxonomies.length}
      visibleSlides={width >= 768 ? 5 : 2}
    >
      <div className="mx-22 relative space-x-10 whitespace-nowrap px-10 pt-2 sm:space-x-20 sm:px-20">
        <Slider className="relative overflow-hidden">
          {taxonomies.map((taxonomy, index) => (
            <Slide
              key={index}
              index={index}
              tabIndex={-1}
              className="transform snap-center text-center transition hover:scale-125 md:text-2xl"
            >
              <TaxonomyLink {...taxonomy} />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="absolute top-3 -left-8 transition disabled:pointer-events-none disabled:text-gray-600 hover:scale-125 md:top-2 ">
          <ArrowLeftIcon className="h-5 w-5 md:h-8 md:w-8" />
        </ButtonBack>
        <ButtonNext className="absolute top-3 right-0 transition disabled:pointer-events-none disabled:text-gray-600 hover:scale-125 md:top-2 md:right-0">
          <ArrowRightIcon className="h-5 w-5 md:h-8 md:w-8" />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default TaxonomySelector;
