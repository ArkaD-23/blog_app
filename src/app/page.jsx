import { CardFullWidth, CardLarge, CardMedium } from "@/components/Cards";

const Home = () => {
  return (
    <div>
      <div className="text-white py-10 text-center">
        <h1 className="text-7xl sm:text-[8rem] md:text-[9rem] lg:text-[12rem] font-bold uppercase">
          The Blog
        </h1>
        <div>
          <div className="hidden md:flex justify-center gap-5 mb-10">
            <CardLarge />
            <div className="flex flex-col gap-5">
              <CardMedium />
              <CardMedium />
              <CardMedium />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-5">
            <CardFullWidth
              blogTitle="Full Width Blog Title 1"
              authorName="Author Name 1"
              blogContent="This is a portion of the blog content for the first full-width card."
            />
            <CardFullWidth
              blogTitle="Full Width Blog Title 2"
              authorName="Author Name 2"
              blogContent="This is a portion of the blog content for the second full-width card."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
