import useUserStore from "@/stores/userStore";
import LoggedUser from "@/components/Home/LoggedUser";
import Default from "@/components/Home/Default";
import SearchInput from "@/components/Home/SearchInput";

export default function Index() {
  const UID = useUserStore((state) => state.UID);
  return (
    <div className="flex flex-col">
      {!UID ? <Default /> : <LoggedUser />}
      <div className="mt-20">
        <SearchInput />
      </div>
    </div>
  );
}
