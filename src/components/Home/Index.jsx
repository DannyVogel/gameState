import useUserStore from "@/stores/userStore";
import Welcome from "@/components/Home/Welcome";
import SearchInput from "@/components/Home/SearchInput";

export default function Index() {
  const UID = useUserStore((state) => state.UID);
  return (
    <div className="flex-grow flex flex-col justify-center ">
      <Welcome />

      <SearchInput />
    </div>
  );
}
