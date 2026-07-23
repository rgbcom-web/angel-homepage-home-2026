import { cn } from "@/shared/lib/utils";
import { Header } from "./componenets/header";
import { Footer } from "./componenets/footer";

export const metadata = {
  title: "엔젤로보틱스",
};

export default function PrivateLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cn("flex min-h-screen flex-col justify-between")}>
        <main className={cn("py-[150px]", "tablet:py-[100px]")}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
