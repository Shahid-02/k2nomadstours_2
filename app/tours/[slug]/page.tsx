import { createTourRouteExports } from "@/lib/tour-page";

const { generateStaticParams, generateMetadata, Page } = createTourRouteExports("tour");

export { generateStaticParams, generateMetadata };
export default Page;
