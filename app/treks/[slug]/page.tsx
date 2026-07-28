import { createTourRouteExports } from "@/lib/tour-page";

const { generateStaticParams, generateMetadata, Page } = createTourRouteExports("trek");

export { generateStaticParams, generateMetadata };
export default Page;
