import { createTourRouteExports } from "@/lib/tour-page";

const { generateStaticParams, generateMetadata, Page } = createTourRouteExports("cycling");

export { generateStaticParams, generateMetadata };
export default Page;
