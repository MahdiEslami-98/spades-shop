"use server";
import getAllCategory from "@/api/getAllCategory";
import getProductsByCategory from "@/api/getProductsByCategory";
import Category from "@/components/category";
import CategoryContainer from "@/components/categoryContainer";
import Slider from "@/components/swiper";

const Home = async () => {
  const category = await getAllCategory();
  let result;
  category && (result = await getProductsByCategory(category.data.categories));
  const products = result?.slice(0, 6);

  return (
    <div className="container mx-auto flex flex-col gap-y-20 py-8">
      <Slider></Slider>
      <div>{category && <Category category={category} />}</div>
      {category &&
        products &&
        products.map((item, i) => (
          <CategoryContainer
            key={i}
            data={item}
            category={category}
            index={i}
          />
        ))}
    </div>
  );
};

export default Home;
