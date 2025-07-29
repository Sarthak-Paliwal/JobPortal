import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchText } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "AI/ML Engineer",
  "Project Manager",
];
const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const navigate=useNavigate();
  const handleSearch=(search)=>{
    dispatch(setSearchText(search));
    navigate("/browse");    
}
return (
    <div className="mt-6 md:mt-10 mb-6 md:mb-10 px-4">
        <Carousel
            className="w-full max-w-7xl mx-auto"
            plugins={[plugin.current]}
            // onMouseEnter={plugin.current.stop}
            // onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {category.map((cat, index) => (
                    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                        <Button variant="outline" className="rounded-full text-xs md:text-sm w-full" onClick={()=>handleSearch(cat)}>
                            {cat}
                        </Button>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
        </Carousel>
    </div>
);
};

export default CategoryCarousel;
