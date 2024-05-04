import useUserStore from "@/stores/userStore";
import Welcome from "@/components/Home/Welcome";
import SearchInput from "@/components/Home/SearchInput";

export default function Index() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center ">
      <Welcome />

      <SearchInput />
    </div>
  );
}
