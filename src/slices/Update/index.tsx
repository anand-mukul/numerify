import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Dot } from "lucide-react";

export type UpdateProps = SliceComponentProps<Content.UpdateSlice>;

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="font-bold text-black px-5 py-2 flex-wrap">
      {children}
    </p>
  ),

  listItem: ({ children }) => (
    <li className="flex pl-7 pr-3 pt-1 pb-3 text-black font-medium text-md font-sans">
      <Dot />
      {children}
    </li>
  ),
};

const Update = ({ slice }: UpdateProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 md:px-6"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-gradient-to-b from-orange-400 via-orange-200 to-orange-50 shadow-md rounded-xl">
          <p className="pt-3 px-3 pb-2 font-bold leading-tight tracking-tight text-xl md:text-2xl text-black">
            {slice.primary.release_date || 'No Release Date'}
          </p>
          <div className="">
            {slice.items.map((item, index) => (
              <div key={index} className="mb-4 md:mb-6 lg:mb-8">
                <PrismicRichText field={item.release_title} components={components} />
                <PrismicRichText field={item.release_message} components={components} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Update;
